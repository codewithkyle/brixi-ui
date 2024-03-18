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
    required: boolean;
    error: string;
}
export default class CheckboxGroup extends Component<ICheckboxGroup> {
    constructor() {
        super();
        this.stateMachine = {
            IDLING: {
                ERROR: "ERROR",
                DISABLED: "DISABLED",
            },
            ERROR: {
                RESET: "IDLING",
            },
        };
        this.model = {
            label: "",
            instructions: "",
            disabled: false,
            name: "",
            options: [],
            required: false,
            error: "",
        };
    }

    static get observedAttributes() {
        return ["data-label", "data-instructions", "data-disabled", "data-name", "data-options", "data-required"];
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

    public validate(): boolean {
        if (this.state === "DISABLED" || !this.model.required) {
            return true;
        }
        const updated = this.get();
        const checked = updated.options.filter((option) => option.checked);
        if (checked.length === 0) {
            this.setError("Please select at least one option");
            return false;
        }
        this.clearError();
        return true;
    }

    private handleChange = (e: CustomEvent) => {
        const updated = this.get();
        const index = updated.options.findIndex((option) => option.value === e.detail.value);
        updated.options[index].checked = e.detail.checked;
        this.set(updated);
        this.validate();
    }

    override render() {
        this.setAttribute("state", this.state);
        this.setAttribute("form-input", "");
        const view = html`
            <p>
                <strong>${this.model.label}</strong>
                ${this.state === "ERROR" ? this.model.error : unsafeHTML(this.model.instructions)}
            </p>
            ${this.model.options.map((option: ICheckbox) => {
                return html`
                    <brixi-checkbox
                        data-label="${option?.label ?? ""}"
                        data-value="${option?.value ?? ""}"
                        data-checked="${option?.checked ?? false}"
                        data-disabled="${option?.disabled ?? false}"
                        data-name="${this.model.name}"
                        @change=${this.handleChange}
                    ></brixi-checkbox>
                `;
            })}
        `;
        render(view, this);
    }
}
env.bind("brixi-checkbox-group", CheckboxGroup);
