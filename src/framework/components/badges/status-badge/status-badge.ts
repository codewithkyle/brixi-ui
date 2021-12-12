import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";
import { parseDataset } from "~utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export interface IStatusBadge {
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    color: "grey" | "primary" | "success" | "warning" | "danger";
    label: string;
    dot: "right" | "left" | null;
    icon: string;
}
export interface StatusBadgeSettings {
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    color?: "grey" | "primary" | "success" | "warning" | "danger";
    label: string;
    dot?: "right" | "left" | null;
    icon?: string;
}
export default class StatusBadge extends SuperComponent<IStatusBadge> {
    constructor(settings: StatusBadgeSettings) {
        super();
        this.model = {
            css: "",
            class: "",
            attributes: {},
            color: "grey",
            label: "",
            dot: null,
            icon: null,
        };
        this.model = parseDataset<IStatusBadge>(this.dataset, this.model);
        env.css(["status-badge"]).then(() => {
            this.set(settings);
        });
    }

    override render() {
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        this.setAttribute("color", this.model.color);
        if (this.model.dot && !this.model.icon) {
            this.setAttribute("dot", this.model.dot);
        }
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html` ${this.model.icon ? unsafeHTML(this.model.icon) : ""} ${this.model.label} `;
        render(view, this);
    }
}
env.mount("status-badge", StatusBadge);
