import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import { noop } from "~brixi/utils/general";
import { InputBase, IInputBase, IInputBaseSettings, IInputEvents } from "../input-base";

interface IPhoneInput extends IInputBase {
    label: string;
    instructions: string;
    autocomplete: string;
    icon: string | HTMLElement;
    placeholder: string;
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
interface PhoneInputSettings extends IInputBaseSettings {
    label?: string;
    instructions?: string;
    autocomplete?: string;
    icon?: string | HTMLElement;
    placeholder?: string;
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

export default class PhoneInput extends InputBase<IPhoneInput> {
    constructor(settings: PhoneInputSettings) {
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
            value: null,
            disabled: false,
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
        const PhoneNumberCheck = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim);
        if (this.model.required && !this.model.value?.length) {
            isValid = false;
            this.setError("This field is required.");
        }
        if ((!this.model.required && this.model.value?.length) || this.model.required) {
            if (!PhoneNumberCheck.test(`${this.model.value}`)) {
                isValid = false;
                this.setError(`Invalid phone number.`);
            }
        }
        if (isValid) {
            this.clearError();
        }
        return isValid;
    }

    /**
     * Formats phone number string (US)
     * @see https://stackoverflow.com/a/8358141
     * @license https://creativecommons.org/licenses/by-sa/4.0/
     */
    private formatPhoneNumber(phoneNumber: string): string {
        var cleaned = ("" + phoneNumber).replace(/\D/g, "");
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            var intlCode = match[1] ? "+1 " : "";
            return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
        }
        return phoneNumber;
    }

    private handleBlur: EventListener = (e: Event) => {
        const input = e.currentTarget as HTMLInputElement;
        const formattedValue = this.formatPhoneNumber(input.value);
        this.set({
            value: formattedValue,
        });
        this.validate();
        if (this.model.callbacks?.onBlur && typeof this.model.callbacks?.onBlur === "function") {
            this.model.callbacks?.onBlur(formattedValue);
        }
    };

    private handleFocus: EventListener = () => {
        const value = this.model.value?.toString()?.replace(/[\-\+\s\(\)]/g, "") ?? null;
        this.set({
            value: value,
        });
        if (this.model.callbacks?.onFocus && typeof this.model.callbacks?.onFocus === "function") {
            this.model.callbacks?.onFocus(value);
        }
    };

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
                    @focus=${this.handleFocus}
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    inputmode="tel"
                    type="tel"
                    id="${id}"
                    .value=${this.model.value ?? ""}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
        `;
        render(view, this);
    }
}
env.bind("phone-input-component", PhoneInput);
