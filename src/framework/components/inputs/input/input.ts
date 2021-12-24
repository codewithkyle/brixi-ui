import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";
import soundscape from "~brixi/controllers/soundscape";

export interface IInput {
    label: string;
    name: string;
    instructions: string;
    error: string;
    required: boolean;
    autocomplete: string;
    autocapitalize: "off" | "on";
    icon: string;
    placeholder: string;
    value: string | number;
    maxlength: number;
    minlength: number;
    disabled: boolean;
    readOnly: boolean;
    callback: Function;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
}
export interface InputSettings {
    label?: string;
    name: string;
    required?: boolean;
    instructions?: string;
    autocomplete?: string;
    autocapitalize?: "off" | "on";
    icon?: string;
    placeholder?: string;
    value?: string | number;
    maxlength?: number;
    minlength?: number;
    disabled?: boolean;
    readOnly?: boolean;
    callback?: Function;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
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
            callback: noop,
            css: "",
            class: "",
            attributes: {},
        };
        this.model = parseDataset<IInput>(this.dataset, this.model);
        env.css("input").then(() => {
            this.set(settings, true);
            this.render();
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

    public renderIcon() {
        let output;
        if (this.model.icon) {
            output = html` <i> ${unsafeHTML(this.model.icon)} </i> `;
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
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${this.model.name}`;
        const view = html`
            ${this.renderLabel(id)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
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
                />
            </input-container>
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
env.mount("input-component", Input);
