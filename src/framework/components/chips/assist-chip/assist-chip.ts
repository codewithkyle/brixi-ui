import { html, render, TemplateResult } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export interface IAssistChip {
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    label: string;
    callback: Function;
    icon: string | HTMLElement;
}
export interface AssistChipSettings {
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    label: string;
    callback: Function;
    icon: string | HTMLElement;
}
export default class AssistChip extends SuperComponent<IAssistChip> {
    constructor(settings: AssistChipSettings) {
        super();
        this.model = {
            css: "",
            class: "",
            attributes: {},
            label: null,
            callback: noop,
            icon: "",
        };
        this.model = parseDataset<IAssistChip>(this.dataset, this.model);
        env.css(["assist-chip"]).then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    override connected(): void {
        this.addEventListener("click", this.handleClick);
        this.addEventListener("keyup", this.handleKeyup);
        this.addEventListener("keydown", this.handleKeydown);
    }

    private handleClick = () => {
        this.model.callback();
    };

    private handleKeydown = (e: KeyboardEvent) => {
        if (e.key === " ") {
            this.classList.add("is-active");
        }
    };

    private handleKeyup = (e: KeyboardEvent) => {
        if (e.key === " ") {
            this.classList.remove("is-active");
            this.model.callback();
        }
    };

    private renderIcon() {
        let out: any = "";
        if (this.model.icon instanceof HTMLElement) {
            out = this.model.icon;
        } else if (typeof this.model.icon === "string") {
            out = unsafeHTML(this.model.icon);
        }
        return out;
    }

    override render() {
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
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
