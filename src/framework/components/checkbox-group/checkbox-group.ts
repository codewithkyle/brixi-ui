import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import Checkbox, { CheckboxSettings } from "~brixi/components/checkbox/checkbox";
import { parseDataset } from "~brixi/utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import soundscape from "~brixi/controllers/soundscape";

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

    public getValue(): Array<string | number> {
        let values = [];
        for (let i = 0; i < this.model.options.length; i++) {
            if (this.model.options[i].checked) {
                values.push(this.model.options[i].value);
            }
        }
        return values;
    }

    public reset(): void {
        const updated = this.get();
        for (let i = 0; i < updated.options.length; i++) {
            updated.options[i].checked = false;
        }
        this.set(updated);
    }

    public clearError(): void {
        if (this.state === "ERROR") {
            this.trigger("RESET");
        }
    }

    public setError(error: string): void {
        if (error?.length) {
            this.set({
                // @ts-ignore
                error: error,
            });
            this.trigger("ERROR");
            soundscape.play("error");
        }
    }

    override render() {
        this.className = `${this.model.class} ${this.model.disabled ? "is-disabled" : ""}`;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        this.setAttribute("form-input", "");
        const view = html`
            <p>
                <strong>${this.model.label}</strong>
                ${unsafeHTML(this.model.instructions)}
            </p>
            ${this.model.options.map((option) => {
                return new Checkbox(option);
            })}
        `;
        render(view, this);
    }
}
env.bind("checkbox-group", CheckboxGroup);
