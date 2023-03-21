import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import Radio, { RadioSettings } from "~brixi/components/radio/radio";
import { parseDataset } from "~brixi/utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import soundscape from "~brixi/controllers/soundscape";

export interface IRadioGroup {
    options: Array<RadioSettings>;
    instructions: string;
    disabled: boolean;
    label: string;
    name: string;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    required: boolean;
}
export interface RadioGroupSettings {
    label: string;
    instructions?: string;
    options: Array<RadioSettings>;
    disabled?: boolean;
    name: string;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    required?: boolean;
}
export default class RadioGroup extends SuperComponent<IRadioGroup> {
    constructor(settings: RadioGroupSettings) {
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
            required: false,
        };
        this.model = parseDataset<IRadioGroup>(this.dataset, this.model);
        env.css("radio-group").then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    public getName(): string {
        return this.model.name;
    }

    public getValue(): string | number | null {
        let value = null;
        for (let i = 0; i < this.model.options.length; i++) {
            if (this.model.options[i].checked) {
                value = this.model.options[i].value;
                break;
            }
        }
        return value;
    }

    public reset(): void {
        const updated = this.get();
        for (let i = 0; i < updated.options.length; i++) {
            updated.options[i].checked = false;
        }
        updated.options[0].checked = true;
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

    public validate(): boolean {
        let isValid = true;
        if (this.model.required) {
            isValid = false;
            for (let i = 0; i < this.model.options.length; i++) {
                if (this.model.options[i].checked) {
                    isValid = true;
                    break;
                }
            }
            if (!isValid) {
                this.setError("This field is required");
            }
        }
        return isValid;
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
                return new Radio(option);
            })}
        `;
        render(view, this);
    }
}
env.bind("radio-group", RadioGroup);
