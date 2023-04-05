import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import { noop } from "~brixi/utils/general";
import { InputBase, IInputBase, IInputBaseSettings, IInputEvents } from "../input-base";

export interface IInput extends IInputBase {
    label: string;
    instructions: string;
    autocomplete: string;
    autocapitalize: "off" | "on";
    icon: string | HTMLElement;
    placeholder: string;
    maxlength: number;
    minlength: number;
    readOnly: boolean;
    callbacks: Partial<IInputEvents>;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    datalist: string[];
    autofocus: boolean;
    value: string;
}
export interface InputSettings extends IInputBaseSettings {
    label?: string;
    instructions?: string;
    autocomplete?: string;
    autocapitalize?: "off" | "on";
    icon?: string | HTMLElement;
    placeholder?: string;
    maxlength?: number;
    minlength?: number;
    readOnly?: boolean;
    callbacks?: Partial<IInputEvents>;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    datalist?: string[];
    autofocus?: boolean;
    value?: string;
}
export default class Input extends InputBase<IInput> {
    constructor(settings: InputSettings) {
        super(settings);
        this.model = {
            label: "",
            instructions: null,
            error: null,
            name: "",
            required: false,
            autocomplete: "off",
            autocapitalize: "off",
            icon: null,
            placeholder: "",
            value: null,
            maxlength: 9999,
            minlength: 0,
            disabled: false,
            readOnly: false,
            callbacks: {
                onInput: noop,
                onFocus: noop,
                onBlur: noop,
            },
            css: "",
            class: "",
            attributes: {},
            datalist: [],
            autofocus: false,
        };
        env.css("input").then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    override validate(): boolean {
        let isValid = true;
        if (this.model.required && !this.model.value?.length) {
            isValid = false;
            this.setError("This field is required.");
        }
        if (this.model.required || (!this.model.required && this.model.value?.length)) {
            if (this.model.minlength > this.model.value.length) {
                isValid = false;
                this.setError(`This input requires a least ${this.model.minlength} characters.`);
            } else if (this.model.maxlength < this.model.value.length) {
                isValid = false;
                this.setError(`This input requires a least ${this.model.minlength} characters.`);
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
                value: input.value,
            },
            true
        );
        this.clearError();
        if (this.model.callbacks?.onInput && typeof this.model.callbacks?.onInput === "function") {
            this.model.callbacks?.onInput(input.value);
        }
    };

    private handleBlur: EventListener = () => {
        this.validate();
        if (this.model.callbacks?.onBlur && typeof this.model.callbacks?.onBlur === "function") {
            this.model.callbacks?.onBlur(this.model.value);
        }
    };

    private handleFocus: EventListener = () => {
        if (this.model.callbacks?.onFocus && typeof this.model.callbacks?.onFocus === "function") {
            this.model.callbacks?.onFocus(this.model.value);
        }
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

    private renderDatalist(id: string): string | TemplateResult {
        let out: string | TemplateResult = "";
        if (this.model.datalist.length) {
            out = html`
                <datalist id="${id}-datalist">
                    ${this.model.datalist.map((item) => {
                        return html` <option value="${item}"></option> `;
                    })}
                </datalist>
            `;
        }
        return out;
    }

    render() {
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
                    type="text"
                    id="${id}"
                    maxlength=${this.model.maxlength}
                    minlength="${this.model.minlength}"
                    .value=${this.model.value ?? ""}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocapitalize=${this.model.autocapitalize}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disabled=${this.model.disabled}
                    list="${this.model.datalist.length ? `${id}-datalist` : ""}"
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
            ${this.renderDatalist(id)}
        `;
        render(view, this);
    }
}
env.bind("input-component", Input);
