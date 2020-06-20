class InputComponent extends HTMLElement {
    private input: HTMLInputElement;
    constructor() {
        super();
        this.input = this.querySelector("input");
    }
    private validateInput: EventListener = () => {
        if (this.input.required) {
            if (this.input.value === "") {
                if (this.getAttribute("state") !== "invalid") {
                    this.input.reportValidity();
                }
                this.setAttribute("state", "invalid");
            } else {
                switch (this.input.type) {
                    case "email":
                        if (new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).test(this.input.value)) {
                            this.setAttribute("state", "valid");
                            this.input.setCustomValidity("");
                        } else {
                            if (this.getAttribute("state") !== "invalid") {
                                this.input.setCustomValidity("Invalid email format.");
                                this.input.reportValidity();
                            }
                            this.setAttribute("state", "invalid");
                        }
                        break;
                    default:
                        this.setAttribute("state", "valid");
                        this.input.setCustomValidity("");
                        break;
                }
            }
        } else {
            this.setAttribute("state", "valid");
            this.input.setCustomValidity("");
        }
    };

    public reportError(error: string) {
        this.input.setCustomValidity(error);
        this.input.reportValidity();
        this.setAttribute("state", "invalid");
    }

    public clearError() {
        this.input.setCustomValidity("");
        this.setAttribute("state", "valid");
    }

    connectedCallback() {
        this.input.addEventListener("input", this.validateInput);
        this.input.addEventListener("blur", this.validateInput);
    }
}
customElements.define("input-component", InputComponent);
