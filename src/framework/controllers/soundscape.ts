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
    private sounds: {
        [handle: string]: ISound;
    };
    private soundState: {
        [handle: string]: number;
    };

    private hasTouched: boolean;
    private hasPointer: boolean;

    constructor() {
        this.hasTouched = false;
        this.hasPointer = false;

        this.sounds = {};
        this.soundState = JSON.parse(localStorage.getItem("sfx") || "{}");

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

    private mousemove: EventListener = () => {
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
            this.play("hover");
        }
    };

    private focus: EventListener = (e: Event) => {
        if (this.hasPointer || this.hasTouched) {
            return;
        }
        const target = e.target as HTMLElement;
        if (target instanceof HTMLElement && target.getAttribute("sfx") === "button") {
            if (target.dataset.isMouseOver === "0" || !target.dataset.isMouseOver) {
                this.play("hover");
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
                this.play("click");
            }
        }
    };

    public toggleSound(handle: string, isEnable: boolean): void {
        if (handle in this.sounds) {
            this.soundState[handle] = isEnable ? 1 : 0;
            if (isEnable) {
                this.sounds[handle].ctx.resume();
            } else {
                this.sounds[handle].ctx.suspend();
            }
            localStorage.setItem("sfx", JSON.stringify(this.sounds));
        }
    }

    public play(handle: string, loop: boolean = false): AudioBufferSourceNode | null {
        if (!(handle in this.sounds)) return null;
        const source = this.sounds[handle].ctx.createBufferSource();
        source.buffer = this.sounds[handle].buffer;
        source.connect(this.sounds[handle].gain);
        source.loop = loop;
        source.start(0);
        return source;
    }

    public setVolume(handle: string, volume: number): void {
        if (!(handle in this.sounds)) return;
        this.sounds[handle].gain.gain.value = volume;
    }

    public async add(handle: string, src: string, force: boolean = false): Promise<ISound | null> {
        if (this.sounds?.[handle] && !force) {
            return this.sounds[handle];
        }
        this.sounds[handle] = await this.createSound(src);
        if (!(handle in this.soundState)) {
            this.soundState[handle] = 1;
        }
        if (this.soundState[handle] === 0) {
            this.sounds[handle].ctx.suspend();
        }
        return this.sounds[handle];
    }

    public get(handle: string): ISound | null {
        return this.sounds?.[handle] ?? null;
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
        const promises = [
            this.add("hover", "/audio/mouseover.wav", true),
            this.add("click", "/audio/mouseclick.wav", true),
            this.add("error", "/audio/error.wav", true),
            this.add("error-alert", "/audio/error-alert.wav", true),
            this.add("warning", "/audio/warning.wav", true),
            this.add("notification", "/audio/notification.wav", true),
            this.add("success", "/audio/success.wav", true),
            this.add("snackbar", "/audio/snackbar.wav", true),
            this.add("activate", "/audio/activate.wav", true),
            this.add("deactivate", "/audio/deactivate.wav", true),
            this.add("camera", "/audio/camera.wav", true),
        ];
        await Promise.all(promises);
    }
}
const sound = new Soundscape();
export { sound as default };
