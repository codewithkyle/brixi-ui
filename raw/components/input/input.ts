import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";
import soundscape from "~brixi/controllers/soundscape";

interface IInputEvents {
    onInput?: Function;
    onFocus?: Function;
    onBlur?: Function;
}
export interface IInput {
    label: string;
    name: string;
    instructions: string;
    error: string;
    required: boolean;
    autocomplete: string;
    autocapitalize: "off" | "on";
    icon: string | HTMLElement;
    placeholder: string;
    value: string | number;
    maxlength: number;
    minlength: number;
    disabled: boolean;
    readOnly: boolean;
    callbacks: Partial<IInputEvents>;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    datalist: string[];
    autofocus: boolean;
}
export interface InputSettings {
    label?: string;
    name: string;
    required?: boolean;
    instructions?: string;
    autocomplete?: string;
    autocapitalize?: "off" | "on";
    icon?: string | HTMLElement;
    placeholder?: string;
    value?: string | number;
    maxlength?: number;
    minlength?: number;
    disabled?: boolean;
    readOnly?: boolean;
    callbacks?: Partial<IInputEvents>;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    datalist?: string[];
    autofocus?: boolean;
}
export default class Input extends SuperComponent<IInput> {
    constructor(settings: InputSettings) {
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
            autocapitalize: "off",
            icon: null,
            placeholder: "",
            value: "",
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
        this.model = parseDataset<IInput>(this.dataset, this.model);
        env.css("input").then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    public clearError(): void {
        if (this.state === "ERROR") {
            this.trigger("RESET");
        }
    }

    public setError(error: string, clearOnly: boolean): void {
        if (clearOnly) {
            return;
        }
        this.set({
            error: error,
        });
        this.trigger("ERROR");
        soundscape.play("error");
    }

    public validate(input: HTMLInputElement = null, clearOnly: boolean = false): boolean {
        if (!input) {
            input = this.querySelector("input");
        }
        let isValid = true;
        if (this.model.required && !input.value.length) {
            isValid = false;
            this.setError("This field is required.", clearOnly);
        }
        if (this.model.required || (!this.model.required && input.value.length)) {
            if (this.model.minlength > input.value.length) {
                isValid = false;
                this.setError(`This input requires a least ${this.model.minlength} characters.`, clearOnly);
            } else if (this.model.maxlength < input.value.length) {
                isValid = false;
                this.setError(`This input requires a least ${this.model.minlength} characters.`, clearOnly);
            }
        }
        if (isValid) {
            this.clearError();
        }
        return isValid;
    }

    public getName(): string {
        return this.model.name;
    }

    public getValue(): any {
        return this.model.value;
    }

    public handleBlur: EventListener = (e: Event) => {
        const input = e.currentTarget as HTMLInputElement;
        this.validate(input);
        this.model.callbacks.onBlur(this.model.value);
    };

    public handleInput: EventListener = (e: Event) => {
        const input = e.currentTarget as HTMLInputElement;
        this.set({
            value: input.value,
        });
        this.validate(input, true);
        this.model.callbacks.onInput(input.value);
    };

    public handleFocus: EventListener = () => {
        this.model.callbacks.onFocus(this.model.value);
    };

    public renderCopy(): string | TemplateResult {
        let output: string | TemplateResult = "";
        if (this.state === "IDLING" && this.model.instructions) {
            output = html`<p>${unsafeHTML(this.model.instructions)}</p>`;
        } else if (this.state === "ERROR" && this.model.error) {
            output = html`<p class="font-danger-700">${this.model.error}</p>`;
        }
        return output;
    }

    public renderIcon(): string | TemplateResult {
        let output: string | TemplateResult = "";
        if (typeof this.model.icon === "string") {
            output = html`<i>${unsafeHTML(this.model.icon)}</i>`;
        } else if (this.model.icon instanceof HTMLElement) {
            output = html`<i>${this.model.icon}</i>`;
        }
        return output;
    }

    public renderLabel(id: string): string | TemplateResult {
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
                    .value=${this.model.value}
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
        this.setAttribute("state", this.state);
        this.className = `input js-input ${this.model.class}`;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        render(view, this);
    }
}
env.bind("input-component", Input);
