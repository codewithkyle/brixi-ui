class SelectComponent extends HTMLElement {
    private select: HTMLSelectElement;

    constructor() {
        super();
        this.select = this.querySelector("select");
    }

    private validate() {
        if (this.select.required) {
            if (this.select.value === "") {
                if (this.getAttribute("state") !== "invalid") {
                    this.select.reportValidity();
                }
                this.setAttribute("state", "invalid");
            } else {
                this.setAttribute("state", "valid");
                this.select.setCustomValidity("");
            }
        } else {
            this.setAttribute("state", "valid");
            this.select.setCustomValidity("");
        }
    }

    private handleBlur: EventListener = () => {
        this.validate();
    };

    private handleChange: EventListener = () => {
        this.setAttribute("state", "valid");
        this.select.setCustomValidity("");
    };

    connectedCallback() {
        this.select.addEventListener("change", this.handleChange);
        this.select.addEventListener("blur", this.handleBlur);
    }
}
customElements.define("select-component", SelectComponent);
