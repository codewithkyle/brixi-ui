import { html, render, TemplateResult } from "lit-html";
import env from "~brixi/controllers/env";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { parseDataset } from "~brixi/utils/general";
import Component from "~brixi/component";

env.css(["divider"]);

export type DividerColor = "primary" | "success" | "warning" | "danger" | "black" | "grey";
export interface IDivider {
    label: string;
    color: DividerColor;
    layout: "horizontal" | "vertical";
    type: "solid" | "dashed" | "dotted";
}
export default class Divider extends Component<IDivider> {
    constructor() {
        super();
        this.model = {
            label: "",
            color: "grey",
            layout: "horizontal",
            type: "solid",
        };
    }

    static get observedAttributes() {
        return ["data-label", "data-color", "data-layout", "data-type"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
    }

    override render() {
        this.setAttribute("layout", this.model.layout);
        this.setAttribute("color", this.model.color);
        this.setAttribute("line-style", this.model.type);
        let view: TemplateResult;
        if (this.model.label?.length) {
            view = html`
                <div></div>
                <span>${unsafeHTML(this.model.label)}</span>
                <div></div>
            `;
        } else {
            view = html` <div></div> `;
        }
        render(view, this);
    }
}
env.bind("divider-component", Divider);
