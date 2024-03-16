export class BrixiInputComponent extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){
        this.textareaEl = this.querySelector("textarea");
        if (!this.textareaEl) {
            return;
        }
        this.textareaEl?.addEventListener("blur", this.onBlur.bind(this));
        this.textareaEl?.addEventListener("input", this.onInput.bind(this));
        if (this.textareaEl.maxLength > -1 && (!this.textareaEl.disabled || !this.textareaEl.readOnly)) {
            this.counterEl = document.createElement("span");
            this.counterEl.classList.add("counter");
            this.counterEl.innerHTML = `${this.textareaEl.value.length}/${this.textareaEl.maxLength}`;
            this.appendChild(this.counterEl);
        }

        this.descEl = this.querySelector("p");
        if (this.descEl == null) {
            this.descEl = document.createElement("p");
            this.insertBefore(this.descEl, this);
        }
        this.instructions = this.descEl?.innerHTML ?? "";
    }

    onBlur = () => {
        if (this.textareaEl == null) return;
        if (this.textareaEl.required && this.textareaEl.value.trim().length == 0) {
            this.renderError("This field is required.");
            return;
        }
        else if (this.textareaEl?.minLength !== -1 && this.textareaEl.value.length < this.textareaEl.minLength){
            this.renderError(`This field must be at least ${this.textareaEl.minLength} characters.`);
            return;
        }
        else if (this.textareaEl.maxLength !== -1 && this.textareaEl.value.length > this.textareaEl.maxLength){
            this.renderError(`This field must be less than ${this.textareaEl.maxLength} characters.`);
            return;
        }
        this.clearError();
    }
    onInput = () => {
        this.clearError();
    }

    /*
    * @param {string} error
    */
    renderError(error){
        if (this.textareaEl == null) return;
        this.setAttribute("state", "ERROR");
        this.descEl.innerHTML = error;
    }
    
    clearError(){
        if (this.textareaEl == null || this.textareaEl.getAttribute("state") === "IDLING") return;
        this.setAttribute("state", "IDLING");
        if (this.descEl == null) return;
        this.descEl.innerHTML = this.instructions;
    }
}
