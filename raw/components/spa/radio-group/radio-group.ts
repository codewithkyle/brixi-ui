import { html, render } from "lit-html";
import env from "~brixi/controllers/env";
import "~brixi/components/radio/radio";
import { parseDataset } from "~brixi/utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import soundscape from "~brixi/controllers/soundscape";
import Component from "~brixi/component";
import type { IRadio } from "~brixi/components/radio/radio";

env.css(["radio-group", "radio"]);

export interface IRadioGroup {
    options: Array<IRadio>;
    instructions: string;
    disabled: boolean;
    label: string;
    name: string;
    required: boolean;
}
export default class RadioGroup extends Component<IRadioGroup> {
    constructor() {
        super();
        this.model = {
            label: "",
            instructions: "",
            disabled: false,
            name: "",
            options: [],
            required: false,
        };
    }

    static get observedAttributes() {
        return ["data-label", "data-instructions", "data-disabled", "data-name", "data-required", "data-options"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        settings.options.map((option) => {
            option.name = settings.name;
            option.disabled = settings?.disabled ?? false;
        });
        this.state = settings.disabled ? "DISABLED" : "IDLING";
        this.set(settings);
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
        this.setAttribute("state", this.state);
        this.setAttribute("form-input", "");
        const view = html`
            <p>
                <strong>${this.model.label}</strong>
                ${unsafeHTML(this.model.instructions)}
            </p>
            ${this.model.options.map((option: IRadio) => {
                return html`
                    <radio-component
                        data-label="${option.label}"
                        data-value="${option.value}"
                        data-checked="${option.checked}"
                        data-disabled="${option.disabled}"
                        data-name="${option.name}"
                        data-required="${option.required}"
                    ></radio-component>
                `;
            })}
        `;
        render(view, this);
    }
}
env.bind("radio-group", RadioGroup);
