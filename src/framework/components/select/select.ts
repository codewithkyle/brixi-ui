import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";
import soundscape from "~brixi/controllers/soundscape";

export type SelectOption = {
    label: string;
    value: string | number;
};

export interface ISelect {
    label: string;
    icon: string | HTMLElement;
    instructions: string;
    options: Array<SelectOption>;
    required: boolean;
    selected: number;
    name: string;
    error: string;
    value: any;
    disabled: boolean;
    callback: Function;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    autofocus: boolean;
}
export interface SelectOptions {
    label?: string;
    name: string;
    options: Array<SelectOption>;
    icon?: string | HTMLElement;
    instructions?: string;
    required?: boolean;
    disabled?: boolean;
    callback: Function;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    value?: any;
    autofocus?: boolean;
}
export default class Select extends SuperComponent<ISelect> {
    constructor(settings: SelectOptions) {
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
            selected: null,
            label: "",
            name: "",
            icon: "",
            instructions: "",
            options: settings?.options ?? [],
            required: false,
            error: null,
            value: null,
            disabled: false,
            callback: noop,
            css: "",
            class: "",
            attributes: {},
            autofocus: false,
        };
        this.model = parseDataset<ISelect>(this.dataset, this.model);
        for (let i = 0; i < this.model.options.length; i++) {
            if (settings?.value) {
                if (this.model.options[i].value === settings.value) {
                    this.model.selected = i;
                }
            } else if (this.model.options[i].value === this.model.value) {
                this.model.selected = i;
            }
        }
        env.css("select").then(() => {
            this.set(settings, true);
            this.render();
        });
    }

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

    public renderIcon(): string | TemplateResult {
        let output: string | TemplateResult;
        if (this.model.icon instanceof HTMLElement) {
            output = html` <i class="icon"> ${this.model.icon} </i> `;
        } else if (typeof this.model.icon === "string" && this.model.icon.length) {
            output = html` <i class="icon"> ${unsafeHTML(this.model.icon)} </i> `;
        } else {
            output = "";
        }
        return output;
    }

    public clearError() {
        if (this.state === "ERROR") {
            this.trigger("RESET");
        }
    }

    public reset(): void {
        this.set({
            selected: 0,
            value: null,
        });
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
        if (this.model.required && (this.model.value === "" || this.model.value == null)) {
            isValid = false;
            this.setError("This field is required.");
        } else {
            this.clearError();
        }
        return isValid;
    }

    private handleChange: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLSelectElement;
        const index = parseInt(target.value);
        const value = this.model.options[index].value;
        this.set({
            selected: index,
            value: value,
        });
        this.validate();
        this.model.callback(value);
    };

    public getName(): string {
        return this.model.name;
    }

    public getValue(): any {
        return this.model.value;
    }

    public handleBlur: EventListener = () => {
        this.validate();
    };

    public renderLabel(id: string): string | TemplateResult {
        let output: string | TemplateResult;
        if (this.model.label?.length) {
            output = html`<label for="${id}">${unsafeHTML(this.model.label)}</label>`;
        } else {
            output = "";
        }
        return output;
    }

    render() {
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${this.model.name}`;
        this.setAttribute("state", this.state);
        this.setAttribute("form-input", "");
        this.className = `select ${this.model.class}`;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html`
            ${this.renderLabel(id)} ${this.renderCopy()}
            <select-container>
                ${this.renderIcon()}
                <select
                    @blur=${this.handleBlur}
                    @change=${this.handleChange}
                    id="${id}"
                    name="${this.model.name}"
                    ?required=${this.model.required}
                    ?disabled=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                >
                    ${this.model.options.map((option, index) => {
                        return html`<option value="${index}" ?selected=${this.model.selected === index}>${option.label}</option>`;
                    })}
                </select>
                <i class="selector">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                </i>
            </select-container>
        `;
        render(view, this);
    }
}
env.bind("select-component", Select);
