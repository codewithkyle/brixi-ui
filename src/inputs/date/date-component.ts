export default class DateComponent extends HTMLElement {
    private input: HTMLInputElement;
    private textEl: HTMLElement;
    private errorEl: HTMLElement;
    private monthInput: HTMLInputElement;
    private dayInput: HTMLInputElement;
    private yearInput: HTMLInputElement;

    constructor() {
        super();
        this.input = this.querySelector('input[type="hidden"]');
        this.textEl = this.querySelector("p:not(.label)");
        const errorEl = document.createElement("p");
        errorEl.className = "error";
        errorEl.style.display = "none";
        const pEl = this.querySelector("p:last-of-type");
        this.insertBefore(errorEl, pEl);
        this.errorEl = errorEl;
        this.monthInput = this.querySelector("input#month");
        this.dayInput = this.querySelector("input#day");
        this.yearInput = this.querySelector("input#year");
    }

    private validateInput() {
        if (this.input.required) {
            if (this.input.value === "") {
                if (this.getAttribute("state") !== "invalid") {
                    this.reportError("This field is required.");
                }
            } else {
                this.clearError();
            }
        } else {
            this.clearError();
        }
    }

    public reportError(error: string) {
        this.errorEl.innerHTML = error;
        this.errorEl.style.display = "block";
        if (this.textEl){
            this.textEl.style.display = "none";
        }
        this.setAttribute("state", "invalid");
    }

    public clearError() {
        this.errorEl.style.display = "none";
        if (this.textEl){
            this.textEl.style.display = "block";
        }
        this.setAttribute("state", "valid");
    }

    private handleBlur: EventListener = () => {
        if (this.monthInput.value && this.dayInput.value && this.yearInput.value){
            const date = Date.parse(`${this.monthInput.value}/${this.dayInput.value}/${this.yearInput.value}`);
            if (!isNaN(date)){
                this.input.value = new Date(date).toISOString();
            }else{
                this.input.value = "";
            }
        }else{
            this.input.value = "";
        }
        this.validateInput();
    };

    private handleInput: EventListener = this.clearError.bind(this);

    connectedCallback() {
        this.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", this.handleInput);
            input.addEventListener("blur", this.handleBlur);
        });
    }
}
