import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";
import { noop, parseDataset } from "~utils/general";
import ProgressIndicator from "../progress-indicator/progress-indicator";

export interface IProgressLabel {
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    title: string;
    subtitle: string;
    tickCallback: Function;
    finishedCallback: Function;
    total: number;
}
export interface ProgressLabelSettings {
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    title: string;
    subtitle?: string;
    total: number;
    tickCallback?: Function;
    finishedCallback?: Function;
}
export default class ProgressLabel extends SuperComponent<IProgressLabel> {
    constructor(settings: ProgressLabelSettings) {
        super();
        this.model = {
            css: "",
            class: "",
            attributes: {},
            total: 1,
            title: "",
            subtitle: "",
            tickCallback: noop,
            finishedCallback: noop,
        };
        this.model = parseDataset<IProgressLabel>(this.dataset, this.model);
        env.css(["progress-label"]).then(() => {
            this.set(settings);
        });
    }

    public tick(): void {
        const progressIndicator: ProgressIndicator = this.querySelector("progress-indicator");
        progressIndicator.tick();
    }

    public reset(): void {
        const progressIndicator: ProgressIndicator = this.querySelector("progress-indicator");
        progressIndicator.reset();
    }

    public setProgress(subtitle: string): void {
        const el: HTMLElement = this.querySelector("h3");
        el.classList.remove("none");
        el.classList.add("block");
        el.innerText = subtitle;
    }

    override render() {
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html`
            ${new ProgressIndicator({
                total: this.model.total,
                tickCallback: this.model.tickCallback.bind(this),
                finishedCallback: this.model.finishedCallback.bind(this),
            })}
            <div class="ml-0.5" flex="column wrap">
                <h2 class="block font-bold font-sm line-snug">${this.model.title}</h2>
                <h3 class="${this.model.subtitle?.length ? "block" : "none"} font-xs font-grey-700 line-snug">${this.model.subtitle}</h3>
            </div>
        `;
        setTimeout(() => {
            render(view, this);
        }, 90);
    }
}
env.mount("progress-label", ProgressLabel);
