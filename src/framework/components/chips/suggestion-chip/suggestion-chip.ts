import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";

export interface ISuggestionChip {
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    label: string;
    value: string | number;
    callback: Function;
}
export interface SuggestionChipSettings {
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    label: string;
    value: string | number;
    callback: Function;
}
export default class SuggestionChip extends SuperComponent<ISuggestionChip> {
    constructor(settings: SuggestionChipSettings) {
        super();
        this.model = {
            css: "",
            class: "",
            attributes: {},
            label: null,
            value: null,
            callback: noop,
        };
        this.model = parseDataset<ISuggestionChip>(this.dataset, this.model);
        env.css(["suggestion-chip"]).then(() => {
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
        this.model.callback(this.model.value);
    };

    private handleKeydown = (e: KeyboardEvent) => {
        if (e.key === " ") {
            this.classList.add("is-active");
        }
    };

    private handleKeyup = (e: KeyboardEvent) => {
        if (e.key === " ") {
            this.classList.remove("is-active");
            this.model.callback(this.model.value);
        }
    };

    override render() {
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        this.tabIndex = 0;
        this.setAttribute("role", "button");
        const view = html` <span>${this.model.label}</span> `;
        render(view, this);
    }
}
env.bind("suggestion-chip", SuggestionChip);
