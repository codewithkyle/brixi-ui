import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";

export interface IInputChip {
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    label: string;
    value: string | number;
    callback: Function;
}
export interface InputChipSettings {
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    label: string;
    value: string | number;
    callback: Function;
}
export default class InputChip extends SuperComponent<IInputChip> {
    constructor(settings: InputChipSettings) {
        super();
        this.model = {
            css: "",
            class: "",
            attributes: {},
            label: null,
            value: null,
            callback: noop,
        };
        this.model = parseDataset<IInputChip>(this.dataset, this.model);
        env.css(["input-chip"]).then(() => {
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
        this.remove();
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
            this.remove();
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
        const view = html`
            <span>${this.model.label}</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
            </svg>
        `;
        render(view, this);
    }
}
env.bind("input-chip", InputChip);
