import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import { noop } from "~brixi/utils/general";
import { InputBase, IInputBase, IInputBaseSettings, IInputEvents } from "../input-base";

interface INumberInput extends IInputBase {
    label: string;
    instructions: string;
    icon: string | HTMLElement;
    placeholder: string;
    readOnly: boolean;
    callbacks: Partial<IInputEvents>;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    autofocus: boolean;
    value: number | null;
    min: number;
    max: number;
    step: number;
}
export interface NumberInputSettings extends IInputBaseSettings {
    label?: string;
    instructions?: string;
    icon?: string | HTMLElement;
    placeholder?: string;
    readOnly?: boolean;
    callbacks?: Partial<IInputEvents>;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    autofocus?: boolean;
    value?: number | null;
    min?: number;
    max?: number;
    step?: number;
}
export default class NumberInput extends InputBase<INumberInput> {
    constructor(settings: NumberInputSettings) {
        super(settings);
        this.model = {
            label: "",
            instructions: null,
            readOnly: false,
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
            css: "",
            class: "",
            callbacks: {
                onInput: noop,
                onFocus: noop,
                onBlur: noop,
            },
            attributes: {},
            autofocus: false,
        };
        env.css("input").then(() => {
            this.set(settings, true);
            this.render();
        });
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
        const input = e.currentTarget as HTMLInputElement;
        this.set(
            {
                value: parseFloat(input.value.replace(/[^\-\d]/g, "")),
            },
            true
        );
        this.clearError();
        this.model.callbacks.onInput(input.value);
    };

    private handleBlur: EventListener = () => {
        this.validate();
        this.model.callbacks.onBlur(this.model.value);
    };

    private handleFocus: EventListener = () => {
        this.model.callbacks.onFocus(this.model.value);
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
        if (typeof this.model.icon === "string") {
            output = html`<i>${unsafeHTML(this.model.icon)}</i>`;
        } else if (this.model.icon instanceof HTMLElement) {
            output = html`<i>${this.model.icon}</i>`;
        }
        return output;
    }

    private renderLabel(id: string): string | TemplateResult {
        let output: string | TemplateResult = "";
        if (this.model.label?.length) {
            output = html`<label for="${id}">${unsafeHTML(this.model.label)}</label>`;
        }
        return output;
    }

    override render() {
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${this.model.name}`;
        this.setAttribute("state", this.state);
        this.className = `input ${this.model.class}`;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html`
            ${this.renderLabel(id)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    inputmode="numeric"
                    type="number"
                    id="${id}"
                    min=${this.model.min}
                    max=${this.model.max}
                    step=${this.model.step}
                    .value=${this.model.value}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
        `;
        render(view, this);
    }
}
env.bind("number-input-component", NumberInput);
