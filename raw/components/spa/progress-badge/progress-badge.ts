import { html, render } from "lit-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import "~brixi/components/progress/progress-indicator/progress-indicator";
import Component from "~brixi/component";

env.css(["progress-badge"]);

export interface IProgressBadge {
    label: string;
    total: number;
    color: "grey" | "primary" | "success" | "warning" | "danger";
}
export default class ProgressBadge extends Component<IProgressBadge> {
    private indicator: HTMLElement;

    constructor() {
        super();
        this.indicator = null;
        this.model = {
            label: "",
            total: 1,
            color: "grey",
        };
    }

    static get observedAttributes() {
        return ["data-label", "data-total", "data-color"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
    }

    public tick(): void {
        if (!this.indicator) {
            this.indicator = this.querySelector("progress-indicator");
        }
        // @ts-ignore
        this.indicator?.tick();
    }

    public reset(): void {
        if (!this.indicator) {
            this.indicator = this.querySelector("progress-indicator");
        }
        // @ts-ignore
        this.indicator?.reset();
    }

    override render() {
        this.setAttribute("color", this.model.color);
        const view = html`
            <progress-indicator data-size="18" data-total="${this.model.total}" data-color="${this.model.color}"> </progress-indicator>
            <span>${this.model.label}</span>
        `;
        render(view, this);
    }
}
env.bind("progress-badge", ProgressBadge);
