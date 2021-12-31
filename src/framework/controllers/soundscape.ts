import { randomFloat } from "~brixi/utils/numpy";

/**
 * @see https://material.io/design/sound/sound-resources.html
 * @license CC-BY-4.0
 */
class Soundscape {
    private button: {
        hover: HTMLAudioElement;
        click: HTMLAudioElement;
    };

    private notifications: {
        error: HTMLAudioElement;
        success: HTMLAudioElement;
        alert: HTMLAudioElement;
        snackbar: HTMLAudioElement;
        warning: HTMLAudioElement;
    };

    private toggle: {
        activate: HTMLAudioElement;
        deactivate: HTMLAudioElement;
    };

    private general: {
        error: HTMLAudioElement;
    };

    private camera: HTMLAudioElement;

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

        this.button = {
            hover: new Audio("/audio/mouseover.wav"),
            click: new Audio("/audio/mouseclick.wav"),
        };
        this.button.hover.load();
        this.button.click.load();

        this.notifications = {
            error: new Audio("/audio/error-alert.wav"),
            success: new Audio("/audio/success.wav"),
            alert: new Audio("/audio/notification.wav"),
            snackbar: new Audio("/audio/snackbar.wav"),
            warning: new Audio("/audio/warning.wav"),
        };
        this.notifications.error.load();
        this.notifications.success.load();
        this.notifications.alert.load();
        this.notifications.snackbar.load();
        this.notifications.warning.load();

        this.toggle = {
            activate: new Audio("/audio/activate.wav"),
            deactivate: new Audio("/audio/deactivate.wav"),
        };
        this.toggle.activate.load();
        this.toggle.deactivate.load();

        this.general = {
            error: new Audio("/audio/error.wav"),
        };
        this.general.error.load();

        this.camera = new Audio("/audio/camera.wav");
        this.camera.load();

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
        if (e instanceof TouchEvent) {
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
        if (this.doNotificationSounds) {
            const temp = this.notifications.error.cloneNode() as HTMLAudioElement;
            temp.volume = 1;
            // @ts-ignore
            temp.play();
        }
    }

    public warning(): void {
        if (this.doNotificationSounds) {
            const temp = this.notifications.warning.cloneNode() as HTMLAudioElement;
            temp.volume = 1;
            // @ts-ignore
            temp.play();
        }
    }

    public alert(): void {
        if (this.doNotificationSounds) {
            const temp = this.notifications.alert.cloneNode() as HTMLAudioElement;
            temp.volume = 1;
            // @ts-ignore
            temp.play();
        }
    }

    public success(): void {
        if (this.doNotificationSounds) {
            const temp = this.notifications.success.cloneNode() as HTMLAudioElement;
            temp.volume = 1;
            // @ts-ignore
            temp.play();
        }
    }

    public error(): void {
        if (this.doErrorSounds) {
            const temp = this.general.error.cloneNode() as HTMLAudioElement;
            temp.volume = 0.5;
            // @ts-ignore
            temp.play();
        }
    }

    public snackbar(): void {
        if (this.doNotificationSounds) {
            const temp = this.notifications.snackbar.cloneNode() as HTMLAudioElement;
            temp.volume = 1;
            // @ts-ignore
            temp.play();
        }
    }

    public tap(): void {
        if (this.doButtonSounds) {
            const temp = this.button.click.cloneNode() as HTMLAudioElement;
            temp.volume = 0.5;
            // @ts-ignore
            temp.play();
        }
    }

    public hover(): void {
        if (this.doButtonSounds) {
            const temp = this.button.hover.cloneNode() as HTMLAudioElement;
            temp.volume = 0.5;
            // @ts-ignore
            temp.play();
        }
    }

    public activate(): void {
        if (this.doToggleSounds) {
            const temp = this.toggle.activate.cloneNode() as HTMLAudioElement;
            temp.playbackRate = randomFloat(0.75, 1);
            // @ts-ignore
            temp.play();
        }
    }

    public deactivate(): void {
        if (this.doToggleSounds) {
            const temp = this.toggle.deactivate.cloneNode() as HTMLAudioElement;
            temp.playbackRate = randomFloat(0.75, 1);
            // @ts-ignore
            temp.play();
        }
    }

    public cameraShutter(): void {
        if (this.doCameraSounds) {
            const temp = this.camera.cloneNode() as HTMLAudioElement;
            // @ts-ignore
            temp.play();
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
}
const sound = new Soundscape();
export { sound as default };
