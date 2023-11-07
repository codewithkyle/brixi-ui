import { UUID } from "@codewithkyle/uuid";
import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import { InputBase, IInputBase } from "../input-base";

env.css("input");

interface IPhoneInput extends IInputBase {
    label: string;
    instructions: string;
    autocomplete: string;
    icon: string;
    placeholder: string;
    datalist: string[];
    autofocus: boolean;
    value: string;
}
export default class PhoneInput extends InputBase<IPhoneInput> {
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
            autocomplete: "off",
            icon: null,
            placeholder: "",
            value: null,
            disabled: false,
            datalist: [],
            autofocus: false,
        };
    }

    static get observedAttributes() {
        return ["data-label", "data-instructions", "data-name", "data-required", "data-icon", "data-placeholder", "data-value", "data-disabled", "data-datalist", "data-autofocus"];
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
        e.stopImmediatePropagation();
        const input = e.currentTarget as HTMLInputElement;
        const formattedValue = this.formatPhoneNumber(input.value);
        this.set({
            value: formattedValue,
        });
        this.validate();
        this.dispatchEvent(
            new CustomEvent("blur", {
                detail: {
                    value: formattedValue,
                    name: this.model.name,
                },
                bubbles: true,
                cancelable: true,
            })
        );
    };

    private handleFocus: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
        const value = this.model.value?.toString()?.replace(/[\-\+\s\(\)]/g, "") ?? null;
        this.set({
            value: value,
        });
        this.dispatchEvent(
            new CustomEvent("focus", {
                detail: {
                    value: value,
                    name: this.model.name,
                },
                bubbles: true,
                cancelable: true,
            })
        );
    };

    private handleInput: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
        const input = e.currentTarget as HTMLInputElement;
        this.set(
            {
                value: input.value,
            },
            true
        );
        this.clearError();
        this.dispatchEvent(
            new CustomEvent("input", {
                detail: {
                    value: input.value,
                    name: this.model.name,
                },
                bubbles: true,
                cancelable: true,
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
                    @focus=${this.handleFocus}
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    inputmode="tel"
                    type="tel"
                    id="${this.inputId}"
                    .value=${this.model.value ?? ""}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disabled=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
        `;
        render(view, this);
    }
}
env.bind("phone-input-component", PhoneInput);
