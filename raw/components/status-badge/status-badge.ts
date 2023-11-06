import { html, render } from "lit-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import Component from "~brixi/component";

env.css(["status-badge"]);

export interface IStatusBadge {
    color: "grey" | "primary" | "success" | "warning" | "danger";
    label: string;
    dot: "right" | "left" | null;
    icon: string;
}
export default class StatusBadge extends Component<IStatusBadge> {
    constructor() {
        super();
        this.model = {
            color: "grey",
            label: "",
            dot: null,
            icon: null,
        };
    }

    static get observedAttributes() {
        return ["data-color", "data-label", "data-dot", "data-icon"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
    }

    override render() {
        this.setAttribute("color", this.model.color);
        if (this.model.dot && !this.model.icon) {
            this.setAttribute("dot", this.model.dot);
        }
        const view = html` ${this.model.icon ? unsafeHTML(this.model.icon) : ""} ${this.model.label} `;
        render(view, this);
    }
}
env.bind("status-badge", StatusBadge);
