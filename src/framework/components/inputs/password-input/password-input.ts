import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import { noop } from "~brixi/utils/general";
import { InputBase, IInputBase, IInputBaseSettings, IInputEvents } from "../input-base";

interface IPasswordInput extends IInputBase {
    label: string;
    instructions: string;
    autocomplete: string;
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
    type: "text" | "password";
}
interface PasswordSettings extends IInputBaseSettings {
    label?: string;
    instructions?: string;
    autocomplete?: string;
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
export default class PasswordInput extends InputBase<IPasswordInput> {
    constructor(settings: PasswordSettings) {
        super(settings);
        this.model = {
            label: "",
            instructions: null,
            readOnly: false,
            error: null,
            name: "",
            required: false,
            autocomplete: "off",
            icon: null,
            placeholder: "",
            value: "",
            disabled: false,
            maxlength: 9999,
            minlength: 0,
            type: "password",
            css: "",
            class: "",
            callbacks: {
                onInput: noop,
                onFocus: noop,
                onBlur: noop,
            },
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
        if (this.model.required && !this.model.value.length) {
            isValid = false;
            this.setError("This field is required.");
        }
        if (this.model.required || (!this.model.required && this.model.value.length)) {
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

    private toggleVisibility: EventListener = () => {
        switch (this.model.type) {
            case "password":
                this.set({
                    // @ts-ignore
                    type: "text",
                });
                break;
            case "text":
                this.set({
                    // @ts-ignore
                    type: "password",
                });
                break;
        }
    };

    private handleInput: EventListener = (e: Event) => {
        const input = e.currentTarget as HTMLInputElement;
        this.set({
            value: input.value,
        });
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

    private renderEyeIcon(): TemplateResult {
        switch (this.model.type) {
            case "password":
                return html`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                </svg>`;
            case "text":
                return html`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                </svg>`;
        }
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
                    type="${this.model.type}"
                    id="${id}"
                    .value=${this.model.value}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
                <button type="button" @click=${this.toggleVisibility} class="eye">${this.renderEyeIcon()}</button>
            </input-container>
        `;
        render(view, this);
    }
}
env.bind("password-input-component", PasswordInput);
