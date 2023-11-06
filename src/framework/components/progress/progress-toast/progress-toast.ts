import { html, render } from "lit-html";
import Component from "~brixi/component";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import "../progress-indicator/progress-indicator";

env.css(["progress-toast"]);

export interface IProgressToast {
    title: string;
    subtitle: string;
    total: number;
}
export default class ProgressToast extends Component<IProgressToast> {
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

    public tick(amount = 1): void {
        if (!this.indicator) {
            this.indicator = this.querySelector("progress-indicator");
        }
        // @ts-ignore
        this.indicator?.tick(amount);
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

    private finishedCallback: EventListener = () => {
        this.remove();
    };

    override render() {
        const view = html`
            <progress-indicator data-total="${this.model.total}" data-color="white" @finished=${this.finishedCallback}></progress-indicator>
            <div class="ml-0.75" flex="column wrap" style="flex:1;">
                <h2 class="block font-medium font-base mb-0.5 font-grey-800 dark:font-white">${this.model.title}</h2>
                <h3 class="${this.model.subtitle?.length ? "block" : "none"} font-xs font-grey-700 dark:font-grey-300">${this.model.subtitle}</h3>
            </div>
        `;
        render(view, this);
    }
}
env.bind("progress-toast", ProgressToast);
