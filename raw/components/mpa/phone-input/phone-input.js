export class BrixiPhoneInputComponent extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){
        this.inputEl = this.querySelector("input");
        this.descEl = this.querySelector("p");
        if (this.descEl == null) {
            this.descEl = document.createElement("p");
            const containerEl = this.querySelector("input-container");
            this.insertBefore(this.descEl, containerEl);
        }
        this.instructions = this.descEl?.innerHTML ?? "";

        this.inputEl?.addEventListener("blur", this.onBlur.bind(this));
        this.inputEl?.addEventListener("input", this.onInput.bind(this));
        this.inputEl?.addEventListener("focus", this.onFocus.bind(this));
    }

    onBlur = () => {
        if (this.inputEl == null) return;
        this.inputEl.value = this.formatPhoneNumber();
        if (this.inputEl.required && this.inputEl.value.trim().length == 0) {
            this.renderError("This field is required.");
            return;
        }
        else if (this.inputEl?.minLength !== -1 && this.inputEl.value.length < this.inputEl.minLength){
            this.renderError(`This field must be at least ${this.inputEl.minLength} characters.`);
            return;
        }
        else if (this.inputEl.maxLength !== -1 && this.inputEl.value.length > this.inputEl.maxLength){
            this.renderError(`This field must be less than ${this.inputEl.maxLength} characters.`);
            return;
        }
        this.clearError();
    }
    onFocus = () => {
        this.inputEl.value = this.inputEl.value?.toString()?.replace(/[\-\+\s\(\)]/g, "") ?? "";
    }
    onInput = () => {
        this.clearError();
    }

    /**
     * Formats phone number string (US)
     * @see https://stackoverflow.com/a/8358141
     * @license https://creativecommons.org/licenses/by-sa/4.0/
     */
    formatPhoneNumber() {
        var cleaned = this.inputEl.value.replace(/\D/g, "");
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            var intlCode = match[1] ? "+1 " : "";
            return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
        }
        return cleaned;
    }

    /*
    * @param {string} error
    */
    renderError(error){
        if (this.inputEl == null) return;
        this.setAttribute("state", "ERROR");
        this.descEl.innerHTML = error;
    }
    
    clearError(){
        if (this.inputEl == null || this.inputEl.getAttribute("state") === "IDLING") return;
        this.setAttribute("state", "IDLING");
        if (this.descEl == null) return;
        this.descEl.innerHTML = this.instructions;
    }
}
