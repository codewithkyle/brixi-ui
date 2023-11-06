import { UUID } from "@codewithkyle/uuid";
import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import { InputBase, IInputBase } from "../input-base";

env.css("input");

interface INumberInput extends IInputBase {
    label: string;
    instructions: string;
    icon: string;
    placeholder: string;
    autofocus: boolean;
    value: number | null;
    min: number;
    max: number;
    step: number;
}
export default class NumberInput extends InputBase<INumberInput> {
    private inputId: string;

    constructor() {
        super();
        this.inputId = UUID();
        this.model = {
            label: "",
            instructions: null,
            error: null,
            name: "",
            required: false,
            icon: null,
            placeholder: "",
            value: null,
            min: 0,
            max: 9999,
            step: 1,
            disabled: false,
            autofocus: false,
        };
    }

    static get observedAttributes() {
        return [
            "data-label",
            "data-instructions",
            "data-icon",
            "data-placeholder",
            "data-value",
            "data-min",
            "data-max",
            "data-step",
            "data-disabled",
            "data-autofocus",
            "data-name",
            "data-required",
        ];
    }

    override validate(): boolean {
        let isValid = true;
        if (this.model.required && this.model.value == null) {
            isValid = false;
            this.setError("This field is required.");
        }
        if (this.model.value !== null) {
            if (this.model.value < this.model.min) {
                isValid = false;
                this.setError(`Minimum allowed number is ${this.model.min}.`);
            } else if (this.model.value > this.model.max) {
                isValid = false;
                this.setError(`Maximum allowed number is ${this.model.max}.`);
            }
        }
        if (isValid) {
            this.clearError();
        }
        return isValid;
    }

    private handleInput: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
        const input = e.currentTarget as HTMLInputElement;
        const value = input.value.replace(/[^\d\.\-]/g, "").trim();
        this.set({
            value: value?.length ? parseFloat(value) : null,
        });
        this.clearError();
        this.dispatchEvent(
            new CustomEvent("input", {
                detail: {
                    value: this.model.value,
                    name: this.model.name,
                },
                bubbles: true,
                cancelable: true,
            })
        );
    };

    private handleBlur: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
        this.validate();
        this.dispatchEvent(
            new CustomEvent("blur", {
                detail: {
                    value: this.model.value,
                    name: this.model.name,
                },
            })
        );
    };

    private handleFocus: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
        this.dispatchEvent(
            new CustomEvent("focus", {
                detail: {
                    value: this.model.value,
                    name: this.model.name,
                },
            })
        );
    };

    private renderCopy(): string | TemplateResult {
        let output: string | TemplateResult = "";
        if (this.state === "IDLING" && this.model.instructions) {
            output = html`<p>${unsafeHTML(this.model.instructions)}</p>`;
        } else if (this.state === "ERROR" && this.model.error) {
            output = html`<p class="font-danger-700">${this.model.error}</p>`;
        }
        return output;
    }

    private renderIcon(): string | TemplateResult {
        let output: string | TemplateResult = "";
        if (this.model.icon?.length) {
            output = html`<i>${unsafeHTML(this.model.icon)}</i>`;
        }
        return output;
    }

    private renderLabel(): string | TemplateResult {
        let output: string | TemplateResult = "";
        if (this.model.label?.length) {
            output = html`<label for="${this.inputId}">${unsafeHTML(this.model.label)}</label>`;
        }
        return output;
    }

    override render() {
        this.setAttribute("state", this.state);
        this.classList.add("input");
        const view = html`
            ${this.renderLabel()} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    inputmode="numeric"
                    type="number"
                    id="${this.inputId}"
                    min=${this.model.min}
                    max=${this.model.max}
                    step=${this.model.step}
                    value=${this.model.value ?? ""}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    ?required=${this.model.required}
                    ?disabled=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
        `;
        render(view, this);
    }
}
env.bind("number-input-component", NumberInput);
