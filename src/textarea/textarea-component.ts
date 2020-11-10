export default class TextareaComponent extends HTMLElement {
    private textarea: HTMLTextAreaElement;

    constructor() {
        super();
        this.textarea = this.querySelector("textarea");
    }

    private validateInput() {
        if (this.textarea.required) {
            if (this.textarea.value === "") {
                if (this.getAttribute("state") !== "invalid") {
                    this.textarea.reportValidity();
                }
                this.setAttribute("state", "invalid");
            } else {
                this.setAttribute("state", "valid");
                this.textarea.setCustomValidity("");
            }
        } else {
            this.setAttribute("state", "valid");
            this.textarea.setCustomValidity("");
        }
    }

    public reportError(error: string) {
        this.textarea.setCustomValidity(error);
        this.textarea.reportValidity();
        this.setAttribute("state", "invalid");
    }

    public clearError() {
        this.textarea.setCustomValidity("");
        this.setAttribute("state", "valid");
    }

    private handleBlur: EventListener = () => {
        this.validateInput();
    };

    private handleInput: EventListener = () => {
        this.setAttribute("state", "valid");
        this.textarea.setCustomValidity("");
    };

    connectedCallback() {
        this.textarea.addEventListener("input", this.handleInput);
        this.textarea.addEventListener("blur", this.handleBlur);
    }
}
