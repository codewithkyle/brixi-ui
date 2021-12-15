import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";
import { noop, parseDataset } from "~utils/general";
import { calcPercent } from "~utils/numpy";

export interface IProgressIndicator {
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    size: number;
    tick: number;
    total: number;
    tickCallback: Function;
    finishedCallback: Function;
    color: "grey" | "primary" | "success" | "warning" | "danger" | "white";
}
export interface ProgressIndicatorSettings {
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    size?: number;
    total: number;
    tickCallback?: Function;
    finishedCallback?: Function;
    color?: "grey" | "primary" | "success" | "warning" | "danger" | "white";
}
export default class ProgressIndicator extends SuperComponent<IProgressIndicator> {
    constructor(settings: ProgressIndicatorSettings) {
        super();
        this.model = {
            css: "",
            class: "",
            attributes: {},
            size: 24,
            tick: 0,
            total: 1,
            tickCallback: noop,
            finishedCallback: noop,
            color: "grey",
        };
        this.model = parseDataset<IProgressIndicator>(this.dataset, this.model);
        env.css(["progress-indicator"]).then(() => {
            this.set(settings);
        });
    }

    public reset(): void {
        this.set({
            tick: 0,
        });
    }

    public tick(amount = 1): void {
        console.log(this.model.tick, this.model.total);
        const updatedModel = this.get();
        if (updatedModel.tick < updatedModel.total) {
            updatedModel.tick += amount;
            this.set(updatedModel, true);
            this.render();
            if (updatedModel.tick >= updatedModel.total) {
                this.model.finishedCallback();
            } else {
                this.model.tickCallback(updatedModel.tick);
            }
        }
    }

    public setTotal(total: number): void {
        this.set({
            total: total,
        });
    }

    private calcDashOffset(): number {
        const percent = Math.round(this.model.tick / this.model.total);
        let offset = Math.round(70 - 70 * percent + 2);
        if (offset >= 70 && this.model.tick > 0) {
            offset = 69;
        } else if (offset > 70) {
            offset = 70;
        }
        return offset;
    }

    override render() {
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        this.style.width = `${this.model.size}px`;
        this.style.height = `${this.model.size}px`;
        this.setAttribute("tooltip", `${calcPercent(this.model.tick, this.model.total)}%`);
        const view = html`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" color="${this.model.color}">
                <circle class="inner" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" cx="16" cy="16" r="11.05" />
                <circle
                    style="stroke-dashoffset: ${this.calcDashOffset()};"
                    class="outter"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    cx="16"
                    cy="16"
                    r="11.05"
                />
            </svg>
        `;
        render(view, this);
    }
}
env.mount("progress-indicator", ProgressIndicator);
