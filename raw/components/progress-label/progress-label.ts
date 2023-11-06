import { html, render } from "lit-html";
import Component from "~brixi/component";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import "../progress-indicator/progress-indicator";

env.css(["progress-label"]);

export interface IProgressLabel {
    title: string;
    subtitle: string;
    total: number;
}
export default class ProgressLabel extends Component<IProgressLabel> {
    private indicator: HTMLElement;

    constructor() {
        super();
        this.indicator = null;
        this.model = {
            total: 1,
            title: "",
            subtitle: "",
        };
    }

    static get observedAttributes() {
        return ["data-title", "data-subtitle", "data-total"];
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

    public setProgress(subtitle: string): void {
        const el: HTMLElement = this.querySelector("h3");
        el.classList.remove("none");
        el.classList.add("block");
        el.innerText = subtitle;
    }

    override render() {
        const view = html`
            <progress-indicator data-total="${this.model.total}"></progress-indicator>
            <div class="ml-0.5" flex="column wrap">
                <h2 class="block font-bold font-sm line-snug">${this.model.title}</h2>
                <h3 class="${this.model.subtitle?.length ? "block" : "none"} font-xs dark:font-grey-300 line-snug">${this.model.subtitle}</h3>
            </div>
        `;
        render(view, this);
    }
}
env.bind("progress-label", ProgressLabel);
