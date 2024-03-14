export default class BrixiRangeSliderComponent extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        this.inputEl = this.querySelector("input[type=range]");
        if (!this.inputEl) {
            return;
        }
        this.inputEl.addEventListener("input", this.onInput);
        this.renderFill();

        this.manualInputEL = this.querySelector("input[type=number]");
        if (this.manualInputEL) {
            this.manualInputEL.addEventListener("change", this.onManualInput);
        }
        
        this.buttonEl = this.querySelector("button");
        if (this.buttonEl) {
            this.buttonEl.addEventListener("click", this.onButtonClick);
        }
    }

    onInput = () => {
        this.renderFill();
        this.syncInput();
    }
    onButtonClick = () => {
        if (this.inputEl.value === this.inputEl.min) {
            this.inputEl.value = this.inputEl.max;
        } else {
            this.inputEl.value = this.inputEl.min;
        }
        this.renderFill();
        this.syncInput();
    }
    onManualInput = () => {
        if (+this.manualInputEL.value > +this.inputEl.max) {
            this.manualInputEL.value = this.inputEl.max;
        } else if (+this.manualInputEL.value < +this.inputEl.min) {
            this.manualInputEL.value = this.inputEl.min;
        }
        this.inputEl.value = this.manualInputEL.value;
        this.renderFill();
        this.syncInput();
    }

    /**
    * Converts numbers to a percentage.
    * @example (4, 10) => 40
    */
    calcPercent(value, max) {
        const percent = (value / max) * 100;
        return Math.round(percent);
    }

    renderFill() {
        const fillPercentage = this.calcPercent(+this.inputEl.value, +this.inputEl.max);
        this.style.setProperty("--track-fill", `${fillPercentage}%`);
    }

    syncInput() {
        if (this.manualInputEL) {
            this.manualInputEL.value = this.inputEl.value;
        }
    }
}
