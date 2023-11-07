import { html, render } from "lit-html";
import env from "~brixi/controllers/env";
import type { ICheckbox } from "~brixi/components/checkbox/checkbox";
import "~brixi/components/checkbox/checkbox";
import { parseDataset } from "~brixi/utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import soundscape from "~brixi/controllers/soundscape";
import Component from "~brixi/component";

env.css("checkbox-group");

export interface ICheckboxGroup {
    options: Array<ICheckbox>;
    instructions: string;
    disabled: boolean;
    label: string;
    name: string;
}
export default class CheckboxGroup extends Component<ICheckboxGroup> {
    constructor() {
        super();
        this.model = {
            label: "",
            instructions: "",
            disabled: false,
            name: "",
            options: [],
        };
    }

    static get observedAttributes() {
        return ["data-label", "data-instructions", "data-disabled", "data-name", "data-options"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        settings.options.map((option) => {
            option.disabled = settings?.disabled ?? false;
        });
        this.state = settings.disabled ? "DISABLED" : "IDLING";
        this.set(settings);
    }

    public getName(): string {
        return this.model.name;
    }

    public getValue(): Array<string | number> {
        let values = [];
        this.querySelectorAll("checkbox-component").forEach((checkbox) => {
            // @ts-ignore
            const value = checkbox.getValue();
            if (value) {
                values.push(value);
            }
        });
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
        this.setAttribute("state", this.state);
        this.setAttribute("form-input", "");
        const view = html`
            <p>
                <strong>${this.model.label}</strong>
                ${unsafeHTML(this.model.instructions)}
            </p>
            ${this.model.options.map((option: ICheckbox) => {
                return html`
                    <checkbox-component
                        data-label="${option?.label ?? ""}"
                        data-value="${option?.value ?? ""}"
                        data-checked="${option?.checked ?? false}"
                        data-disabled="${option?.disabled ?? false}"
                        data-name="${this.model.name}"
                    ></checkbox-component>
                `;
            })}
        `;
        render(view, this);
    }
}
env.bind("checkbox-group", CheckboxGroup);
