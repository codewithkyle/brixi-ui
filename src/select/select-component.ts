export default class SelectComponent extends HTMLElement {
    private select: HTMLSelectElement;
    private textEl: HTMLElement;
    private errorEl: HTMLElement;

    constructor() {
        super();
        this.select = this.querySelector("select");
        this.textEl = this.querySelector("p");
        const errorEl = document.createElement("p");
        errorEl.className = "error";
        errorEl.style.display = "none";
        this.insertBefore(errorEl, this.select);
        this.errorEl = errorEl;
    }

    public validate(): boolean {
        let isValid = true;
        if (this.select.required) {
            if (this.select.value === "") {
                isValid = false;
                if (this.getAttribute("state") !== "invalid") {
                    this.reportError("This field is required.");
                }
            } else {
                this.clearError();
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

    connectedCallback() {
        this.select.addEventListener("change", this.handleInput);
        this.select.addEventListener("blur", this.handleBlur);
    }
}
