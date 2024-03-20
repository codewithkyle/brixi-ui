export class BrixiSelectComponent extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){
        this.selectEl = this.querySelector("select");
        this.descEl = this.querySelector("p");
        if (this.descEl == null) {
            this.descEl = document.createElement("p");
            const containerEl = this.querySelector("select-container");
            this.insertBefore(this.descEl, containerEl);
        }
        this.instructions = this.descEl?.innerHTML ?? "";

        this.selectEl?.addEventListener("blur", this.onBlur.bind(this));
        this.selectEl?.addEventListener("change", this.onInput.bind(this));
    }

    onBlur = () => {
        if (this.selectEl == null) return;
        if (this.selectEl.required && this.selectEl.value.trim().length == 0) {
            this.renderError("This field is required.");
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
        if (this.selectEl == null) return;
        this.setAttribute("state", "ERROR");
        this.descEl.innerHTML = error;
    }
    
    clearError(){
        if (this.selectEl == null || this.selectEl.getAttribute("state") === "IDLING") return;
        this.setAttribute("state", "IDLING");
        if (this.descEl == null) return;
        this.descEl.innerHTML = this.instructions;
    }
}
