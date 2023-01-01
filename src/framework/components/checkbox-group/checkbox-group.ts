import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import Checkbox, { CheckboxSettings } from "~brixi/components/checkbox/checkbox";
import { parseDataset } from "~brixi/utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export interface ICheckboxGroup {
    options: Array<CheckboxSettings>;
    instructions: string;
    disabled: boolean;
    label: string;
    name: string;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
}
export interface CheckboxGroupSettings {
    label: string;
    instructions?: string;
    options: Array<CheckboxSettings>;
    disabled?: boolean;
    name: string;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
}
export default class CheckboxGroup extends SuperComponent<ICheckboxGroup> {
    constructor(settings: CheckboxGroupSettings) {
        super();
        settings.options.map((option) => {
            option.name = settings.name;
            option.disabled = settings?.disabled ?? false;
        });
        this.model = {
            label: "",
            instructions: "",
            disabled: false,
            name: "",
            options: [],
            css: "",
            class: "",
            attributes: {},
        };
        this.model = parseDataset<ICheckboxGroup>(this.dataset, this.model);
        env.css("checkbox-group").then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    public getName(): string {
        return this.model.name;
    }

    public getValue() {
        const out = [];
        this.querySelectorAll("input:checked").forEach((input: HTMLInputElement) => {
            out.push(input.value);
        });
        return out;
    }

    override render() {
        const view = html`
            <p>
                <strong>${this.model.label}</strong>
                ${unsafeHTML(this.model.instructions)}
            </p>
            ${this.model.options.map((option) => {
                return new Checkbox(option);
            })}
        `;
        this.className = `${this.model.class} ${this.model.disabled ? "is-disabled" : ""}`;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        render(view, this);
    }
}
env.bind("checkbox-group", CheckboxGroup);
