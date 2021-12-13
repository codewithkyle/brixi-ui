import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";
import { noop, parseDataset } from "~utils/general";
import ProgressIndicator from "../progress-indicator/progress-indicator";

export interface IProgressToast {
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
export interface ProgressToastSettings {
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
export default class ProgressToast extends SuperComponent<IProgressToast> {
    constructor(settings: ProgressToastSettings) {
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
        this.model = parseDataset<IProgressToast>(this.dataset, this.model);
        env.css(["progress-toast"]).then(() => {
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
                color: "white",
            })}
            <div class="ml-0.75" flex="column wrap" style="flex:1;">
                <h2 class="block font-medium font-base mb-0.5 font-white">${this.model.title}</h2>
                <h3 class="${this.model.subtitle?.length ? "block" : "none"} font-xs font-grey-300">${this.model.subtitle}</h3>
            </div>
        `;
        setTimeout(() => {
            render(view, this);
        }, 90);
    }
}
env.mount("progress-toast", ProgressToast);
