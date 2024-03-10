import { html, render } from "lit-html";
import Component from "~brixi/component";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";

env.css(["badge"]);

export interface IBadge {
    value: number;
    offsetX: number;
    offsetY: number;
}
export default class Badge extends Component<IBadge> {
    constructor() {
        super();
        this.model = {
            value: null,
            offsetX: 0,
            offsetY: 0,
        };
    }

    static get observedAttributes() {
        return ["data-value", "data-offset-x", "data-offset-y"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
    }

    override render() {
        this.style.transform = `translate(${this.model.offsetX}px, ${this.model.offsetY}px)`;
        const hasValue = this.model.value !== null && this.model.value?.toString() !== "";
        if (hasValue) {
            this.classList.add("-text");
        } else {
            this.classList.remove("-text");
        }
        let value: string | number = this.model.value;
        if (value > 9) {
            value = "9+";
        }
        const view = html` ${hasValue ? html`<span>${value}</span>` : ""} `;
        render(view, this);
    }
}
env.bind("badge-component", Badge);
