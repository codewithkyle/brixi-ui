export default class PinComponent extends HTMLElement {
    private input: HTMLInputElement;
    private textEl: HTMLElement;
    private errorEl: HTMLElement;
    private button: HTMLButtonElement;
    private visibleIcon: HTMLElement;
    private hiddenIcon: HTMLElement;

    constructor() {
        super();
        this.input = this.querySelector("input");
        this.textEl = this.querySelector("p");
        const errorEl = document.createElement("p");
        errorEl.className = "error";
        errorEl.style.display = "none";
        this.insertBefore(errorEl, this.input);
        this.errorEl = errorEl;
        this.button = this.querySelector("button");
        this.visibleIcon = this.querySelector(".js-visible");
        this.hiddenIcon = this.querySelector(".js-hidden");
    }

    public validate(): boolean {
        let isValid = true;
        if (this.input.required) {
            if (this.input.value === "") {
                isValid = false;
                if (this.getAttribute("state") !== "invalid") {
                    this.reportError("This field is required.");
                }
            } else {
                if (new RegExp(/^[0-9]+$/).test(this.input.value)) {
                    if (this.input.minLength || this.input.maxLength) {
                        if (this.input.minLength) {
                            if (this.input.minLength > this.input.value.length) {
                                isValid = false;
                                this.reportError(`Pins must be at least ${this.input.minLength} numbers.`);
                            } else {
                                this.clearError();
                            }
                        } else {
                            if (this.input.maxLength < this.input.value.length) {
                                isValid = false;
                                this.reportError(`Pins cannot be more than ${this.input.maxLength} numbers.`);
                            } else {
                                this.clearError();
                            }
                        }
                    } else {
                        this.clearError();
                    }
                } else {
                    isValid = false;
                    if (this.getAttribute("state") !== "invalid") {
                        this.reportError("Invalid pin format.");
                    }
                }
            }
        } else {
            this.clearError();
        }
        return isValid;
    }

    public reportError(error: string) {
        this.errorEl.innerHTML = error;
        this.errorEl.style.display = "block";
        if (this.textEl) {
            this.textEl.style.display = "none";
        }
        this.setAttribute("state", "invalid");
    }

    public clearError() {
        this.errorEl.style.display = "none";
        if (this.textEl) {
            this.textEl.style.display = "block";
        }
        this.setAttribute("state", "valid");
    }

    private handleBlur: EventListener = () => {
        this.validate();
    };

    private handleInput: EventListener = this.clearError.bind(this);

    private handleClick: EventListener = () => {
        if (this.input.type === "password") {
            this.input.type = "text";
            this.visibleIcon.style.display = "none";
            this.hiddenIcon.style.display = "block";
        } else {
            this.input.type = "password";
            this.visibleIcon.style.display = "block";
            this.hiddenIcon.style.display = "none";
        }
    };

    connectedCallback() {
        this.input.addEventListener("input", this.handleInput);
        this.input.addEventListener("blur", this.handleBlur);
        this.button.addEventListener("click", this.handleClick);
    }
}
