export class InputComponent extends HTMLElement{

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
    }

    onBlur = () => {
        if (this.inputEl == null) return;
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
    onInput = () => {
        this.clearError();
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
