import { html, render, TemplateResult } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";

export interface IFilterChip {
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    label: string;
    value: string | number;
    callback: (value: string | number, checked: boolean) => void;
    checked: boolean;
}
export interface FilterChipSettings {
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    label: string;
    value: string | number;
    callback: (value: string | number, checked: boolean) => void;
    checked?: boolean;
}
export default class FilterChip extends SuperComponent<IFilterChip> {
    constructor(settings: FilterChipSettings) {
        super();
        this.model = {
            css: "",
            class: "",
            attributes: {},
            label: null,
            value: null,
            callback: noop,
            checked: false,
        };
        this.model = parseDataset<IFilterChip>(this.dataset, this.model);
        env.css(["filter-chip"]).then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    private handleClick = () => {
        const value = !this.model.checked;
        this.set({ checked: value }, true);
        this.model.callback(this.model.value, value);
    };

    private handleKeydown = (e: KeyboardEvent) => {
        if (e.key === " ") {
            this.classList.add("is-active");
        }
    };

    private handleKeyup = (e: KeyboardEvent) => {
        if (e.key === " ") {
            const value = !this.model.checked;
            this.classList.remove("is-active");
            this.model.callback(this.model.value, value);
            this.set({ checked: value });
        }
    };

    override render() {
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        this.setAttribute("role", "button");
        const id = `${this.model.label.trim().replace(/\s+/g, "-")}-${this.model.value.toString().trim().replace(/\s+/g, "-")}`;
        const view = html`
            <input type="checkbox" ?checked="${this.model.checked}" .value=${this.model.value} id="${id}" />
            <label for="${id}" tabindex="0" @click=${this.handleClick} @keyup=${this.handleKeyup} @keydown=${this.handleKeydown}>
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
                    <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span>${this.model.label}</span>
            </label>
        `;
        render(view, this);
    }
}
env.bind("filter-chip", FilterChip);
