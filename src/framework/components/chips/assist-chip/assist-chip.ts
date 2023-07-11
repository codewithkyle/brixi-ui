import { html, render } from "lit-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import Component from "~brixi/component";

env.css(["assist-chip"]);

export interface IAssistChip {
    label: string;
    icon: string;
}
export default class AssistChip extends Component<IAssistChip> {
    constructor() {
        super();
        this.model = {
            label: "",
            icon: "",
        };
    }

    static get observedAttributes() {
        return ["data-label", "data-icon"];
    }

    override connected(): void {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
        this.addEventListener("keyup", this.handleKeyup);
        this.addEventListener("keydown", this.handleKeydown);
    }

    private handleKeydown = (e: KeyboardEvent) => {
        if (e.key === " ") {
            this.classList.add("is-active");
        }
    };

    private handleKeyup = (e: KeyboardEvent) => {
        if (e.key === " ") {
            this.classList.remove("is-active");
            this.click();
        }
    };

    private renderIcon() {
        let out: any = "";
        if (this.model.icon?.length) {
            out = unsafeHTML(this.model.icon);
        }
        return out;
    }

    override render() {
        this.tabIndex = 0;
        this.setAttribute("role", "button");
        const view = html`
            ${this.renderIcon()}
            <span>${this.model.label}</span>
        `;
        render(view, this);
    }
}
env.bind("assist-chip", AssistChip);
