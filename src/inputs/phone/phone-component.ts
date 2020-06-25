class PhoneComponent extends HTMLElement {
    private input: HTMLInputElement;

    constructor() {
        super();
        this.input = this.querySelector("input");
    }

    private validateInput() {
        if (this.input.required) {
            if (this.input.value === "") {
                if (this.getAttribute("state") !== "invalid") {
                    this.input.reportValidity();
                }
                this.setAttribute("state", "invalid");
            } else {
                const formattedValue = this.formatPhoneNumber(this.input.value);
                if (formattedValue) {
                    this.input.value = formattedValue;
                    this.setAttribute("state", "valid");
                    this.input.setCustomValidity("");
                } else {
                    if (this.getAttribute("state") !== "invalid") {
                        this.input.setCustomValidity("Provide a valid US phone number.");
                        this.input.reportValidity();
                    }
                    this.setAttribute("state", "invalid");
                }
            }
        } else {
            this.setAttribute("state", "valid");
            this.input.setCustomValidity("");
        }
    }

    /**
     * Formats phone number string (US)
     * @see https://stackoverflow.com/a/8358141
     * @license https://creativecommons.org/licenses/by-sa/4.0/
     */
    private formatPhoneNumber(phoneNumber: string) {
        var cleaned = ("" + phoneNumber).replace(/\D/g, "");
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            var intlCode = match[1] ? "+1 " : "";
            return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
        }
        return null;
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

    private handleFocus: EventListener = () => {
        if (this.input.value.length) {
            this.input.value = this.input.value.replace(/[\-\+\s\(\)]/g, "");
        }
    };

    connectedCallback() {
        this.input.addEventListener("input", this.handleInput);
        this.input.addEventListener("blur", this.handleBlur);
        this.input.addEventListener("focus", this.handleFocus);
    }
}
customElements.define("phone-component", PhoneComponent);
