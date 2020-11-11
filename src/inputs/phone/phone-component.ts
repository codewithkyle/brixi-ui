export default class PhoneComponent extends HTMLElement {
    private input: HTMLInputElement;
    private textEl: HTMLElement;
    private errorEl: HTMLElement;

    constructor() {
        super();
        this.input = this.querySelector("input");
        this.textEl = this.querySelector("p");
        const errorEl = document.createElement("p");
        errorEl.className = "error";
        errorEl.style.display = "none";
        this.insertBefore(errorEl, this.input);
        this.errorEl = errorEl;
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

    public validate(): boolean {
        let isValid = true;
        if (this.input.required) {
            if (this.input.value === "") {
                isValid = false;
                if (this.getAttribute("state") !== "invalid") {
                    this.reportError("This field is required.");
                }
            } else {
                const formattedValue = this.formatPhoneNumber(this.input.value);
                if (formattedValue) {
                    this.input.value = formattedValue;
                    this.clearError();
                } else {
                    isValid = false;
                    if (this.getAttribute("state") !== "invalid") {
                        this.reportError("Provide a valid US phone number.");
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
