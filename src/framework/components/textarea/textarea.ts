import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";
import soundscape from "~brixi/controllers/soundscape";

export interface ITextarea {
    label: string;
    name: string;
    instructions: string;
    error: string;
    required: boolean;
    autocomplete: string;
    placeholder: string;
    value: string;
    maxlength: number;
    minlength: number;
    disabled: boolean;
    readOnly: boolean;
    rows: number;
    callbacks: {
        onInput: Function;
        onBlur: Function;
        onFocus: Function;
    };
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    autofocus: boolean;
}
export interface TextareaSettings {
    label?: string;
    name: string;
    required?: boolean;
    instructions?: string;
    autocomplete?: string;
    placeholder?: string;
    value?: string;
    maxlength?: number;
    minlength?: number;
    disabled?: boolean;
    readOnly?: boolean;
    rows?: number;
    callback?: {
        onInput?: Function;
        onBlur?: Function;
        onFocus?: Function;
    };
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    autofocus?: boolean;
}
export default class Textarea extends SuperComponent<ITextarea> {
    constructor(settings: TextareaSettings) {
        super();
        this.state = settings?.disabled ? "DISABLED" : "IDLING";
        this.stateMachine = {
            IDLING: {
                ERROR: "ERROR",
                DISABLE: "DISABLED",
            },
            ERROR: {
                RESET: "IDLING",
                ERROR: "ERROR",
            },
            DISABLED: {
                ENABLE: "IDLING",
            },
        };
        this.model = {
            label: "",
            instructions: null,
            error: null,
            name: "",
            required: false,
            autocomplete: "off",
            placeholder: "",
            value: null,
            maxlength: Infinity,
            minlength: 0,
            disabled: false,
            readOnly: false,
            rows: 5,
            callbacks: {
                onInput: noop,
                onBlur: noop,
                onFocus: noop,
            },
            css: "",
            class: "",
            attributes: {},
            autofocus: false,
        };
        this.model = parseDataset<ITextarea>(this.dataset, this.model);
        env.css("textarea").then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    public clearError() {
        if (this.state === "ERROR") {
            this.trigger("RESET");
        }
    }

    public reset(): void {
        this.set({
            // @ts-ignore
            value: null,
        });
        const input = this.querySelector("input") as HTMLInputElement;
        if (input) {
            input.value = null;
        }
    }

    public setError(error: string) {
        this.set({
            error: error,
        });
        this.trigger("ERROR");
        soundscape.play("error");
    }

    public validate(): boolean {
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

    public getName() {
        return this.model.name;
    }

    public getValue(): string {
        return this.model.value;
    }

    public handleBlur: EventListener = () => {
        this.validate();
        if (this.model.callbacks?.onBlur && typeof this.model.callbacks?.onBlur === "function") {
            this.model.callbacks?.onBlur(this.model.value);
        }
    };

    public handleFocus: EventListener = () => {
        if (this.model.callbacks?.onFocus && typeof this.model.callbacks?.onFocus === "function") {
            this.model.callbacks?.onFocus(this.model.value);
        }
    };

    public handleInput: EventListener = (e: Event) => {
        const input = e.currentTarget as HTMLInputElement;
        this.set({
            value: input.value,
        });
        this.validate();
        if (this.model.callbacks?.onInput && typeof this.model.callbacks?.onInput === "function") {
            this.model.callbacks?.onInput(input.value);
        }
    };

    public renderCopy(): string | TemplateResult {
        let output: string | TemplateResult;
        if (this.state === "IDLING" && this.model.instructions) {
            output = html`<p>${unsafeHTML(this.model.instructions)}</p>`;
        } else if (this.state === "ERROR" && this.model.error) {
            output = html`<p class="font-danger-700">${this.model.error}</p>`;
        } else {
            output = "";
        }
        return output;
    }

    public renderLabel(id: string): string | TemplateResult {
        let output: string | TemplateResult;
        if (this.model.label?.length) {
            output = html`<label for="${id}">${unsafeHTML(this.model.label)}</label>`;
        } else {
            output = "";
        }
        return output;
    }

    public renderCounter(): string | TemplateResult {
        let out: string | TemplateResult;
        if (this.model.maxlength === Infinity) {
            out = "";
        } else {
            out = html` <span class="counter"> ${this.model.value?.length ?? 0}/${this.model.maxlength} </span> `;
        }
        return out;
    }

    render() {
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${this.model.name}`;
        this.setAttribute("state", this.state);
        this.setAttribute("form-input", "");
        this.className = `textarea ${this.model.class}`;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html`
            ${this.renderLabel(id)} ${this.renderCopy()}
            <textarea
                @input=${this.handleInput}
                @blur=${this.handleBlur}
                @focus=${this.handleFocus}
                placeholder="${this.model.placeholder}"
                autocomplete="${this.model.autocomplete}"
                rows="${this.model.rows}"
                maxlength="${this.model.maxlength !== Infinity ? this.model.maxlength : 9999}"
                minlength="${this.model.minlength}"
                name="${this.model.name}"
                id="${id}"
                ?readonly=${this.model.readOnly}
                ?required=${this.model.required}
                ?disabled=${this.model.disabled}
                ?autofocus=${this.model.autofocus}
            >
${this.model.value ?? ""}</textarea
            >
            ${this.renderCounter()}
        `;
        render(view, this);
    }
}
env.bind("textarea-component", Textarea);
