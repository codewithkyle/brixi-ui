import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";
import { noop, parseDataset } from "~utils/general";
import soundscape from "~controllers/soundscape";

export interface ITextarea {
    label: string;
    name: string;
    instructions: string;
    error: string;
    required: boolean;
    autocomplete: string;
    placeholder: string;
    value: string | number;
    maxlength: number;
    minlength: number;
    disabled: boolean;
    readOnly: boolean;
    rows: number;
    callback: Function;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
}
export interface TextareaSettings {
    label?: string;
    name: string;
    required?: boolean;
    instructions?: string;
    autocomplete?: string;
    placeholder?: string;
    value?: string | number;
    maxlength?: number;
    minlength?: number;
    disabled?: boolean;
    readOnly?: boolean;
    rows?: number;
    callback?: Function;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
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
            value: "",
            maxlength: 9999,
            minlength: 0,
            disabled: false,
            readOnly: false,
            rows: 5,
            callback: noop,
            css: "",
            class: "",
            attributes: {},
        };
        this.model = parseDataset<ITextarea>(this.dataset, this.model);
        env.css("textarea").then(() => {
            this.update(settings);
        });
    }

    public clearError() {
        if (this.state === "ERROR") {
            this.trigger("RESET");
        }
    }

    public setError(error: string, clearOnly: boolean) {
        if (clearOnly) {
            return;
        }
        this.update({
            error: error,
        });
        this.trigger("ERROR");
        soundscape.error();
    }

    public validate(
        input: HTMLInputElement,
        clearOnly: boolean = false
    ): boolean {
        let isValid = true;
        if (this.model.required && !input.value.length) {
            isValid = false;
            this.setError("This field is required.", clearOnly);
        }
        if (
            this.model.required ||
            (!this.model.required && input.value.length)
        ) {
            if (this.model.minlength > input.value.length) {
                console.log(input.value);
                isValid = false;
                this.setError(
                    `This input requires a least ${this.model.minlength} characters.`,
                    clearOnly
                );
            } else if (this.model.maxlength < input.value.length) {
                isValid = false;
                this.setError(
                    `This input requires a least ${this.model.minlength} characters.`,
                    clearOnly
                );
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

    public getValue() {
        this.model.value;
    }

    public handleBlur: EventListener = (e: Event) => {
        const input = e.currentTarget as HTMLInputElement;
        this.validate(input);
    };

    public handleInput: EventListener = (e: Event) => {
        const input = e.currentTarget as HTMLInputElement;
        this.update({
            value: input.value,
        });
        this.validate(input, true);
        this.model.callback(input.value);
    };

    public renderCopy() {
        let output;
        if (this.state === "IDLING" && this.model.instructions) {
            output = html`<p>${this.model.instructions}</p>`;
        } else if (this.state === "ERROR" && this.model.error) {
            output = html`<p class="font-danger-700">${this.model.error}</p>`;
        } else {
            output = "";
        }
        return output;
    }

    public renderLabel(id: string) {
        let output;
        if (this.model.label?.length) {
            output = html`<label for="${id}">${this.model.label}</label>`;
        } else {
            output = "";
        }
        return output;
    }

    render() {
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${
            this.model.name
        }`;
        const view = html`
            ${this.renderLabel(id)} ${this.renderCopy()}
            <textarea
                @input=${this.handleInput}
                @blur=${this.handleBlur}
                placeholder="${this.model.placeholder}"
                autocomplete="${this.model.autocomplete}"
                rows="${this.model.rows}"
                maxlength="${this.model.maxlength}"
                minlength="${this.model.minlength}"
                name="${this.model.name}"
                id="${id}"
                ?readonly=${this.model.readOnly}
                ?required=${this.model.required}
                ?disabled=${this.model.disabled}
            ></textarea>
        `;
        this.setAttribute("state", this.state);
        this.className = `textarea js-input ${this.model.class}`;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        render(view, this);
    }
}
env.mount("textarea-component", Textarea);
