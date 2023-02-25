import { randomFloat } from "~brixi/utils/numpy";

interface ISound {
    ctx: AudioContext;
    gain: GainNode;
    buffer: AudioBuffer;
}

/**
 * @see https://material.io/design/sound/sound-resources.html
 * @license CC-BY-4.0
 */
class Soundscape {
    private button: {
        hover?: ISound;
        click?: ISound;
    };

    private notifications: {
        error?: ISound;
        success?: ISound;
        alert?: ISound;
        snackbar?: ISound;
        warning?: ISound;
    };

    private toggle: {
        activate?: ISound;
        deactivate?: ISound;
    };

    private general: {
        error?: ISound;
    };

    private camera: ISound | null;

    private hasTouched: boolean;
    private hasPointer: boolean;
    public doButtonSounds: boolean;
    public doNotificationSounds: boolean;
    public doToggleSounds: boolean;
    public doErrorSounds: boolean;
    public doCameraSounds: boolean;

    constructor() {
        this.hasTouched = false;
        this.hasPointer = false;
        this.doButtonSounds = localStorage.getItem("disable-button-sfx") ? false : true;
        this.doNotificationSounds = localStorage.getItem("disable-notification-sfx") ? false : true;
        this.doToggleSounds = localStorage.getItem("disable-toggle-sfx") ? false : true;
        this.doErrorSounds = localStorage.getItem("disable-error-sfx") ? false : true;
        this.doCameraSounds = localStorage.getItem("disable-camera-sfx") ? false : true;

        this.button = {};
        this.notifications = {};
        this.toggle = {};
        this.general = {};
        this.camera = null;

        this.addButtonListeners();
    }

    private addButtonListeners() {
        window.addEventListener("mousemove", this.mousemove, { capture: true, passive: true });
        // Button events
        window.addEventListener("mouseenter", this.mouseover, { capture: true, passive: true });
        window.addEventListener("mouseleave", this.mouseleave, { capture: true, passive: true });
        window.addEventListener("focus", this.focus, {
            capture: true,
            passive: true,
        });
        window.addEventListener("blur", this.mouseleave, {
            capture: true,
            passive: true,
        });
        window.addEventListener("mousedown", this.click, {
            capture: true,
            passive: true,
        });
        window.addEventListener("touchstart", this.click, {
            capture: true,
            passive: true,
        });
        window.addEventListener("keydown", this.click, {
            capture: true,
            passive: true,
        });
    }

    private mousemove: EventListener = (e: Event) => {
        this.hasPointer = true;
        window.removeEventListener("mousemove", this.mousemove);
    };

    private mouseleave: EventListener = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target instanceof HTMLElement && target.getAttribute("sfx") === "button") {
            target.dataset.isMouseOver = "0";
        }
    };

    private mouseover: EventListener = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target instanceof HTMLElement && e instanceof MouseEvent && target.getAttribute("sfx") === "button" && target.dataset.isMouseOver !== "1") {
            target.dataset.isMouseOver = "1";
            this.hover();
        }
    };

    private focus: EventListener = (e: Event) => {
        if (this.hasPointer || this.hasTouched) {
            return;
        }
        const target = e.target as HTMLElement;
        if (target instanceof HTMLElement && target.getAttribute("sfx") === "button") {
            if (target.dataset.isMouseOver === "0" || !target.dataset.isMouseOver) {
                this.hover();
            }
        }
    };

    private click: EventListener = (e: Event | TouchEvent) => {
        if (window.TouchEvent && e instanceof TouchEvent) {
            this.hasTouched = true;
        }
        const target = e.target as HTMLElement;
        let validKey = false;
        if (e instanceof KeyboardEvent) {
            const key = e.key.toLowerCase();
            if (key === " ") {
                validKey = true;
            }
        }
        if (target instanceof HTMLElement && (target.getAttribute("sfx") === "button" || target.closest(`[sfx="button"]`) !== null)) {
            if (validKey || !(e instanceof KeyboardEvent)) {
                this.tap();
            }
        }
    };

    public errorAlert(): void {
        if (this.doNotificationSounds && this.notifications?.error) {
            this.playSound(this.notifications.error);
        }
    }

    public warning(): void {
        if (this.doNotificationSounds && this.notifications?.warning) {
            this.playSound(this.notifications.warning);
        }
    }

    public alert(): void {
        if (this.doNotificationSounds && this.notifications?.alert) {
            this.playSound(this.notifications.alert);
        }
    }

    public success(): void {
        if (this.doNotificationSounds && this.notifications?.success) {
            this.playSound(this.notifications.success);
        }
    }

    public error(): void {
        if (this.doErrorSounds && this.general?.error) {
            this.playSound(this.general.error);
        }
    }

    public snackbar(): void {
        if (this.doNotificationSounds && this.notifications?.snackbar) {
            this.playSound(this.notifications.snackbar);
        }
    }

    public tap(): void {
        if (this.doButtonSounds && this.button?.click) {
            this.playSound(this.button.click);
        }
    }

    public hover(): void {
        if (this.doButtonSounds && this.button?.hover) {
            this.playSound(this.button.hover);
        }
    }

    public activate(): void {
        if (this.doToggleSounds && this.toggle?.activate) {
            this.playSound(this.toggle.activate);
        }
    }

    public deactivate(): void {
        if (this.doToggleSounds && this.toggle?.deactivate) {
            this.playSound(this.toggle.deactivate);
        }
    }

    public cameraShutter(): void {
        if (this.doCameraSounds && this.camera !== null) {
            this.playSound(this.camera);
        }
    }

    public toggleSFX(sfx: "button" | "notification" | "error" | "camera" | "toggle", isEnable: boolean): void {
        if (isEnable) {
            localStorage.removeItem(`disable-${sfx}-sfx`);
        } else {
            localStorage.setItem(`disable-${sfx}-sfx`, "1");
        }
        switch (sfx) {
            case "button":
                this.doButtonSounds = isEnable;
                break;
            case "camera":
                this.doCameraSounds = isEnable;
                break;
            case "error":
                this.doErrorSounds = isEnable;
                break;
            case "notification":
                this.doNotificationSounds = isEnable;
                break;
            case "toggle":
                this.doToggleSounds = isEnable;
                break;
        }
    }

    private playSound(sound: ISound): void {
        const source = sound.ctx.createBufferSource();
        source.buffer = sound.buffer;
        source.connect(sound.gain);
        source.start(0);
    }

    private async createSound(src: string): Promise<ISound | null> {
        try {
            const req = await fetch(src);
            const arrayBuffer = await req.arrayBuffer();
            const sound: ISound = {
                ctx: new AudioContext(),
                gain: null,
                buffer: null,
            };
            sound.gain = sound.ctx.createGain();
            sound.gain.connect(sound.ctx.destination);
            sound.buffer = await sound.ctx.decodeAudioData(arrayBuffer);
            return sound;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async load(): Promise<void> {
        this.button = {
            hover: await this.createSound("/audio/mouseover.wav"),
            click: await this.createSound("/audio/mouseclick.wav"),
        };

        this.notifications = {
            error: await this.createSound("/audio/error-alert.wav"),
            success: await this.createSound("/audio/success.wav"),
            alert: await this.createSound("/audio/notification.wav"),
            snackbar: await this.createSound("/audio/snackbar.wav"),
            warning: await this.createSound("/audio/warning.wav"),
        };

        this.toggle = {
            activate: await this.createSound("/audio/activate.wav"),
            deactivate: await this.createSound("/audio/deactivate.wav"),
        };

        this.general = {
            error: await this.createSound("/audio/error.wav"),
        };

        this.camera = await this.createSound("/audio/camera.wav");
    }
}
const sound = new Soundscape();
export { sound as default };
