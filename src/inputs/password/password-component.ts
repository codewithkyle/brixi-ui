export default class PasswordComponent extends HTMLElement {
    private input: HTMLInputElement;
    private button: HTMLButtonElement;
    private visibleIcon: HTMLElement;
    private hiddenIcon: HTMLElement;

    constructor() {
        super();
        this.input = this.querySelector("input");
        this.button = this.querySelector("button");
        this.visibleIcon = this.querySelector(".js-visible");
        this.hiddenIcon = this.querySelector(".js-hidden");
    }

    private validateInput() {
        if (this.input.required) {
            if (this.input.value === "") {
                if (this.getAttribute("state") !== "invalid") {
                    this.input.reportValidity();
                }
                this.setAttribute("state", "invalid");
            } else {
                this.setAttribute("state", "valid");
                this.input.setCustomValidity("");
            }
        } else {
            this.setAttribute("state", "valid");
            this.input.setCustomValidity("");
        }
    }

    public reportError(error: string) {
        this.input.setCustomValidity(error);
        this.input.reportValidity();
        this.setAttribute("state", "invalid");
    }

    public clearError() {
        this.input.setCustomValidity("");
        this.setAttribute("state", "valid");
    }

    private handleBlur: EventListener = () => {
        this.validateInput();
    };

    private handleInput: EventListener = () => {
        this.setAttribute("state", "valid");
        this.input.setCustomValidity("");
    };

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
