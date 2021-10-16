class SnackbarComponent extends HTMLElement {
    constructor(snackbar) {
        super();
        this.handleActionButtonClick = (e) => {
            const target = e.currentTarget;
            const index = parseInt(target.dataset.index);
            this.settings.buttons[index].callback();
            this.remove();
        };
        this.handleCloseClickEvent = () => {
            this.remove();
        };
        this.settings = snackbar;
        this.render();
    }
    render() {
        this.dataset.uid = this.settings.uid;
        for (let i = 0; i < this.settings.classes.length; i++) {
            this.classList.add(this.settings.classes[i]);
        }
        this.innerHTML = `
            <p role="${this.settings.closeable || this.settings.buttons.length ? "alertdialog" : "alert"}">${this.settings.message}</p>
            ${this.settings.closeable || this.settings.buttons.length ? `
                <snackbar-actions>
                    ${this.settings.buttons.map((button, index) => {
            return `<button ${button?.ariaLabel ? `aria-label="${button.ariaLabel}"` : ""} data-index="${index}" class="${button.classes?.join(" ")}">${button.label}</button>`;
        })}
                    ${this.settings.closeable ? `
                        <button aria-label="close notification" class="close js-snackbar-close">
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>
                        </button>
                    ` : ""}
                </snackbar-actions>
            ` : ""}
        `;
        this.querySelectorAll("button[data-index]").forEach(button => {
            button.addEventListener("click", this.handleActionButtonClick);
        });
        const closeBttn = this.querySelector(".close");
        if (closeBttn) {
            closeBttn.addEventListener("click", this.handleCloseClickEvent);
        }
    }
    connectedCallback() {
        if (this.settings.autofocus) {
            const closeButton = this.querySelector(".js-snackbar-close");
            if (closeButton) {
                document.activeElement.blur();
                closeButton.focus();
            }
        }
        if (this.settings.buttons.length) {
            for (let i = 0; i < this.settings.buttons.length; i++) {
                if (this.settings.buttons[i]?.autofocus) {
                    const button = this.querySelector(`button[data-index="${i}"]`);
                    if (button) {
                        document.activeElement.blur();
                        button.focus();
                        break;
                    }
                }
            }
        }
    }
}

class ToastComponent extends HTMLElement {
    constructor(snackbar) {
        super();
        this.handleCloseClickEvent = () => {
            this.remove();
        };
        this.handleActionButtonClick = (e) => {
            const target = e.currentTarget;
            const index = parseInt(target.dataset.index);
            this.settings.buttons[index].callback();
            this.remove();
        };
        this.settings = snackbar;
        this.render();
    }
    render() {
        this.dataset.uid = this.settings.uid;
        for (let i = 0; i < this.settings.classes.length; i++) {
            this.classList.add(this.settings.classes[i]);
        }
        this.innerHTML = `
            ${this.settings.icon ? `
                <i>${this.settings.icon}</i>
            ` : ""}
            <copy-wrapper>
                <h3 role="${this.settings.closeable ? "alertdialog" : "alert"}">${this.settings.title}</h3>
                <p>${this.settings.message}</p>
                ${this.settings.buttons.length ? `
                    <toast-actions>
                    ${this.settings.buttons.map((button, index) => {
            return `<button class="${button.classes?.join(" ")}" data-index="${index}" ${button?.ariaLabel ? `aria-label="${button.ariaLabel}"` : ""}>${button.label}</button>`;
        })}
                    </toast-actions>
            ` : ""}
            </copy-wrapper>
            ${this.settings.closeable ? `
                <button aria-label="close notification" class="close js-toast-close">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>
                </button>
            ` : ""}
            ${this.settings.timer ? `
                <toast-timer class="${this.settings.timer}" style="transform: ${this.settings.timer === "horizontal" ? "scaleX(1)" : "scaleY(1)"};"></toast-timer>
            ` : ""}
        `;
        this.querySelectorAll("button[data-index]").forEach(button => {
            button.addEventListener("click", this.handleActionButtonClick);
        });
        const closeBttn = this.querySelector(".js-toast-close");
        if (closeBttn) {
            closeBttn.addEventListener("click", this.handleCloseClickEvent);
        }
    }
    connectedCallback() {
        if (this.settings.autofocus) {
            const closeButton = this.querySelector(".js-toast-close");
            if (closeButton) {
                document.activeElement.blur();
                closeButton.focus();
            }
        }
        if (this.settings.buttons.length) {
            for (let i = 0; i < this.settings.buttons.length; i++) {
                if (this.settings.buttons[i]?.autofocus) {
                    const button = this.querySelector(`button[data-index="${i}"]`);
                    if (button) {
                        button.focus();
                        break;
                    }
                }
            }
        }
    }
}

class Notifier {
    constructor() {
        this.shell = document.body.querySelector("toaster-component");
        if (this.shell === null) {
            this.shell = document.createElement("toaster-component");
            document.body.appendChild(this.shell);
        }
        this.snackbarQueue = [];
        this.toaster = [];
        this.time = performance.now();
        this.loop();
    }
    uid() {
        return new Array(4)
            .fill(0)
            .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
            .join("-");
    }
    loop() {
        const newTime = performance.now();
        const deltaTime = (newTime - this.time) / 1000;
        this.time = newTime;
        if (document.hasFocus()) {
            for (let i = this.toaster.length - 1; i >= 0; i--) {
                if (this.toaster[i]?.duration && this.toaster[i]?.duration !== Infinity) {
                    this.toaster[i].duration -= deltaTime;
                    if (this.toaster[i].timer) {
                        const scale = this.toaster[i].duration / this.toaster[i].timerDuration;
                        if (this.toaster[i].timer === "vertical") {
                            this.toaster[i].timerEl.style.transform = `scaleY(${scale})`;
                        }
                        else {
                            this.toaster[i].timerEl.style.transform = `scaleX(${scale})`;
                        }
                    }
                    if (this.toaster[i].duration <= 0) {
                        this.toaster[i].el.remove();
                        this.toaster.splice(i, 1);
                    }
                }
            }
            if (this.snackbarQueue.length) {
                if (!this.snackbarQueue?.[0]?.el) {
                    this.snackbarQueue[0].el = new SnackbarComponent(this.snackbarQueue[0]);
                    document.body.appendChild(this.snackbarQueue[0].el);
                }
                if (this.snackbarQueue[0]?.duration && this.snackbarQueue[0]?.duration !== Infinity && this.snackbarQueue[0]?.el?.isConnected) {
                    this.snackbarQueue[0].duration -= deltaTime;
                    if (this.snackbarQueue[0].duration <= 0) {
                        this.snackbarQueue[0].el.remove();
                        this.snackbarQueue.splice(0, 1);
                    }
                }
            }
        }
        window.requestAnimationFrame(this.loop.bind(this));
    }
    snackbar(settings) {
        const snackbar = Object.assign({
            message: "Snackbar notificaitons require a message",
            uid: this.uid(),
            el: null,
            duration: 30,
            closeable: true,
            buttons: [],
            force: true,
            classes: [],
            autofocus: true,
        }, settings);
        if (!Array.isArray(snackbar.buttons)) {
            snackbar.buttons = [snackbar.buttons];
        }
        if (!Array.isArray(snackbar.classes)) {
            snackbar.classes = [snackbar.classes];
        }
        if (snackbar.force && this.snackbarQueue.length) {
            if (this.snackbarQueue[0]?.el?.isConnected) {
                this.snackbarQueue[0].el.remove();
            }
            this.snackbarQueue.splice(0, 1, snackbar);
        }
        else {
            this.snackbarQueue.push(snackbar);
        }
    }
    toast(settings) {
        const toast = Object.assign({
            title: "Title Required",
            message: "Toast notificaitons require a message",
            closeable: true,
            icon: null,
            duration: 30,
            classes: [],
            uid: this.uid(),
            el: null,
            timerEl: null,
            autofocus: true,
            buttons: [],
            timer: null,
            timerDuration: 30,
        }, settings);
        if (!Array.isArray(toast.buttons)) {
            toast.buttons = [toast.buttons];
        }
        if (!Array.isArray(toast.classes)) {
            toast.classes = [toast.classes];
        }
        if (toast.duration !== Infinity && toast.timer === "vertical" || toast.timer === "horizontal") {
            toast.timerDuration = toast.duration;
        }
        toast.el = new ToastComponent(toast);
        if (toast.timer) {
            toast.timerEl = toast.el.querySelector("toast-timer");
        }
        this.toaster.push(toast);
        this.shell.appendChild(toast.el);
    }
    append(el) {
        this.shell.appendChild(el);
    }
}

const globalNotifier = new Notifier();
const snackbar = globalNotifier.snackbar.bind(globalNotifier);
const toast = globalNotifier.toast.bind(globalNotifier);
const append = globalNotifier.append.bind(globalNotifier);
customElements.define("snackbar-component", SnackbarComponent);
customElements.define("toast-component", ToastComponent);

export { Notifier, append, snackbar, toast };
