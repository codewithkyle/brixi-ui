import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";
import { parseDataset } from "~utils/general";

export interface IProgressBadge {
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
}
export interface ProgressBadgeSettings {
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
}
export default class ProgressBadge extends SuperComponent<IProgressBadge> {
    constructor(settings: ProgressBadgeSettings) {
        super();
        this.model = {
            css: "",
            class: "",
            attributes: {},
        };
        this.model = parseDataset<IProgressBadge>(this.dataset, this.model);
        env.css(["progress-badge"]).then(() => {
            this.set(settings);
        });
    }

    override render() {
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html``;
        render(view, this);
    }
}
env.mount("progress-badge", ProgressBadge);
