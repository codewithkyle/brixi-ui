import { UUID } from "@codewithkyle/uuid";
import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import { InputBase, IInputBase } from "../input-base";

env.css("input");

export interface IInput extends IInputBase {
    label: string;
    instructions: string;
    autocomplete: string;
    autocapitalize: "off" | "on";
    icon: string;
    placeholder: string;
    maxlength: number;
    minlength: number;
    readOnly: boolean;
    datalist: string[];
    autofocus: boolean;
    value: string;
}
export default class Input extends InputBase<IInput> {
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
            autocapitalize: "off",
            icon: null,
            placeholder: "",
            value: null,
            maxlength: 9999,
            minlength: 0,
            disabled: false,
            readOnly: false,
            datalist: [],
            autofocus: false,
        };
    }

    static get observedAttributes() {
        return [
            "data-label", "data-instructions", "data-name", "data-required", "data-autocomplete", "data-autocapitalize",
            "data-icon", "data-placeholder", "data-value", "data-maxlength", "data-minlength", "data-disabled",
            "data-read-only", "data-datalist", "data-autofocus"
        ];
    }

    override validate(): boolean {
        let isValid = true;
        if (this.model.required && !this.model.value?.length) {
            isValid = false;
            this.setError("This field is required.");
        }
        else if (this.model.required || (!this.model.required && this.model.value?.length)) {
            if (this.model.minlength > this.model.value?.length) {
                isValid = false;
                this.setError(`This input requires a least ${this.model.minlength} characters.`);
            } else if (this.model.maxlength < this.model.value?.length) {
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
        e.stopImmediatePropagation();
        const input = e.currentTarget as HTMLInputElement;
        this.set(
            {
                value: input.value,
            },
            true
        );
        this.clearError();
        this.dispatchEvent(new CustomEvent("input", {
            detail: {
                value: input.value,
                name: this.model.name,
            }
        }));
    };

    private handleBlur: EventListener = (e:Event) => {
        e.stopImmediatePropagation();
        this.validate();
        this.dispatchEvent(new CustomEvent("blur", {
            detail: {
                value: this.model.value,
                name: this.model.name,
            }
        }));
    };

    private handleFocus: EventListener = (e:Event) => {
        e.stopImmediatePropagation();
        this.dispatchEvent(new CustomEvent("focus", {
            detail: {
                value: this.model.value,
                name: this.model.name,
            }
        }));
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

    private renderDatalist(): string | TemplateResult {
        let out: string | TemplateResult = "";
        if (this.model.datalist.length) {
            out = html`
                <datalist id="${this.inputId}-datalist">
                    ${this.model.datalist.map((item) => {
                        return html` <option value="${item}"></option> `;
                    })}
                </datalist>
            `;
        }
        return out;
    }

    render() {
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
                    type="text"
                    id="${this.inputId}"
                    maxlength=${this.model.maxlength}
                    minlength="${this.model.minlength}"
                    .value=${this.model.value ?? ""}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocapitalize=${this.model.autocapitalize}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disabled=${this.model.disabled}
                    list="${this.model.datalist.length ? `${this.inputId}-datalist` : ""}"
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
            ${this.renderDatalist()}
        `;
        render(view, this);
    }
}
env.bind("input-component", Input);
