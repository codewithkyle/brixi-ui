export default class ProgressIndicatorComponent extends HTMLElement {
    constructor(){
        super();
        this.tick = 0;
        this.total = 0;
    }

    connectedCallback(){
        this.circleEl = this.querySelector("circle.outter");
    }

    reset(){
        this.tick = 0;
        this.render();
    }

    progress(amount = 1) {
        if (this.tick < this.total){
            this.tick += amount;
            this.render();
            if (this.tick >= this.total){
                this.dispatchEvent(new CustomEvent("finished", {
                    bubbles: true,
                    cancelable: true,
                }));
            } else {
                this.dispatchEvent(new CustomEvent("finished", {
                    detail: {
                        tick: this.tick,
                    },
                    bubbles: true,
                    cancelable: true,
                }));
            }
        }
    }

    setTotal(total = 0){
        this.total = total;
        this.tick = 0;
    }

    calcPercent() {
        const percent = (this.tick / this.total) * 100;
        return Math.round(percent);
    }

    calcDashOffset() {
        const percent = this.tick / this.total;
        let offset = Math.round(70 - 70 * percent + 2);
        if (offset >= 70 && this.tick > 0) {
            offset = 69;
        } else if (offset > 70) {
            offset = 70;
        }
        return offset;
    }

    render(){
        if (this.circleEl == null) return;
        this.circleEl.style.strokeDashoffset = this.calcDashOffset();
        this.setAttribute("tooltip", `${this.calcPercent()}%`);
    }
}
