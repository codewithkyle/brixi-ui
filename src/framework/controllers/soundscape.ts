/**
 * @see https://material.io/design/sound/sound-resources.html
 * @license CC-BY-4.0
 */
class Soundscape {
    private button: {
        hover: HTMLAudioElement,
        click: HTMLAudioElement,
    };

    private notifications: {
        error: HTMLAudioElement,
        success: HTMLAudioElement,
        alert: HTMLAudioElement,
        snackbar: HTMLAudioElement,
        warning: HTMLAudioElement,
    }

    private toggle: {
        activate: HTMLAudioElement,
        deactivate: HTMLAudioElement,
    }

    private general: {
        error: HTMLAudioElement,
    }

    private camera: HTMLAudioElement;

    constructor(){
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
    private addButtonListeners(){
        // Button events
        document.documentElement.addEventListener("mouseover", this.mouseover, { capture: true, passive: true });
        document.documentElement.addEventListener("mouseout", this.mouseleave, { capture: true, passive: true });
        document.documentElement.addEventListener("focus", this.focus, { capture: true, passive: true });
        document.documentElement.addEventListener("blur", this.mouseleave, { capture: true, passive: true });
        document.documentElement.addEventListener("mousedown", this.click, { capture: true, passive: true });
        document.documentElement.addEventListener("touchstart", this.click, { capture: true, passive: true });
        document.documentElement.addEventListener("keydown", this.click, { capture: true, passive: true });
    }

    private mouseleave:EventListener = (e:Event) => {
        const target = e.target as HTMLElement;
        if (target.getAttribute("sfx") === "button"){
            target.dataset.isMouseOver = "0";
        }
    }

    private mouseover:EventListener = (e:Event) => {
        const target = e.target as HTMLElement;
        if (target.getAttribute("sfx") === "button"){
            if (e instanceof MouseEvent){
                target.dataset.isMouseOver = "1";
            }
        }
    }

    private focus:EventListener = (e:Event) => {
        const target = e.target as HTMLElement;
        if(target.getAttribute("sfx") === "button"){
            if (target.dataset.isMouseOver === "0" || !target.dataset.isMouseOver){
                const temp = this.button.hover.cloneNode();
                // @ts-ignore
                temp.play();
            }
        }
    }

    private click:EventListener = (e:Event) => {
        const target = e.target as HTMLElement;
        let validKey = false;
        if (e instanceof KeyboardEvent){
            const key = e.key.toLowerCase();
            if (key === " "){
                validKey = true;
            }
        }
        if (target.getAttribute("sfx") === "button" && validKey){
            const temp = this.button.click.cloneNode();
            // @ts-ignore
            temp.play();
        }
    }

    public errorAlert(){
        const temp = this.notifications.error.cloneNode();
        // @ts-ignore
        temp.play();
    }

    public warning(){
        const temp = this.notifications.warning.cloneNode();
        // @ts-ignore
        temp.play();
    }

    public alert(){
        const temp = this.notifications.alert.cloneNode();
        // @ts-ignore
        temp.play();
    }

    public success(){
        const temp = this.notifications.success.cloneNode();
        // @ts-ignore
        temp.play();
    }

    public error(){
        const temp = this.general.error.cloneNode();
        // @ts-ignore
        temp.play();
    }

    public snackbar(){
        const temp = this.notifications.snackbar.cloneNode();
        // @ts-ignore
        temp.play();
    }

    public tap(){
        const temp = this.button.click.cloneNode();
        // @ts-ignore
        temp.play();
    }

    public activate(){
        const temp = this.toggle.activate.cloneNode();
        // @ts-ignore
        temp.play();
    }

    public deactivate(){
        const temp = this.toggle.deactivate.cloneNode();
        // @ts-ignore
        temp.play();
    }

    public cameraShutter(){
        const temp = this.camera.cloneNode();
        // @ts-ignore
        temp.play();
    }
}
const sound = new Soundscape();
export { sound as default };