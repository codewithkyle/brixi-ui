import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";
import { noop, parseDataset } from "~utils/general";
import ProgressIndicator from "~components/progress/progress-indicator/progress-indicator";

export interface IProgressBadge {
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    label: string;
    total: number;
    tickCallback: Function;
    finishedCallback: Function;
    color: "grey" | "primary" | "success" | "warning" | "danger";
}
export interface ProgressBadgeSettings {
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    label: string;
    total: number;
    tickCallback?: Function;
    finishedCallback?: Function;
    color?: "grey" | "primary" | "success" | "warning" | "danger";
}
export default class ProgressBadge extends SuperComponent<IProgressBadge> {
    constructor(settings: ProgressBadgeSettings) {
        super();
        this.model = {
            css: "",
            class: "",
            attributes: {},
            label: "",
            total: 1,
            tickCallback: noop,
            finishedCallback: noop,
            color: "grey",
        };
        this.model = parseDataset<IProgressBadge>(this.dataset, this.model);
        env.css(["progress-badge"]).then(() => {
            this.set(settings, true);
            this.render();
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

    override render() {
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        this.setAttribute("color", this.model.color);
        const view = html`
            ${new ProgressIndicator({
                size: 18,
                total: this.model.total,
                tickCallback: this.model.tickCallback.bind(this),
                finishedCallback: this.model.finishedCallback.bind(this),
                color: this.model.color,
            })}
            <span>${this.model.label}</span>
        `;
        render(view, this);
    }
}
env.mount("progress-badge", ProgressBadge);
