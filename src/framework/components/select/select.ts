import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";
import soundscape from "~brixi/controllers/soundscape";

export type SelectOption = {
    label: string;
    value: string | number;
    selected?: boolean;
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
    value: string;
    disabled: boolean;
    callback: Function;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
}
export interface SelectOptions {
    label?: string;
    name: string;
    options: Array<SelectOption>;
    icon?: string | HTMLElement;
    instructions?: string;
    required?: boolean;
    disabled?: boolean;
    callback?: Function;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
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
            value: "",
            disabled: false,
            callback: noop,
            css: "",
            class: "",
            attributes: {},
        };
        this.model = parseDataset<ISelect>(this.dataset, this.model);
        for (let i = 0; i < this.model.options.length; i++) {
            if (this.model.options[i]?.selected) {
                this.model.selected = i;
            }
        }
        env.css("select").then(() => {
            this.set(settings, true);
            this.render();
        });
    }

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

    public validate(input: HTMLSelectElement, clearOnly: boolean = false): boolean {
        let isValid = true;
        if (this.model.required && !input.value.length) {
            isValid = false;
            this.setError("This field is required.", clearOnly);
        } else {
            this.clearError();
        }
        return isValid;
    }

    private handleChange: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLSelectElement;
        const index = parseInt(target.dataset.index);
        this.update({
            selected: index,
            value: target.value,
        });
        this.validate(target, true);
        this.model.callback(target.value);
    };

    public getName() {
        return this.model.name;
    }

    public getValue() {
        this.model.value;
    }

    public handleBlur: EventListener = (e: Event) => {
        const input = e.currentTarget as HTMLSelectElement;
        this.validate(input);
    };

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
            <select-container>
                ${this.renderIcon()}
                <select
                    @blur=${this.handleBlur}
                    @change=${this.handleChange}
                    id="${id}"
                    name="${this.model.name}"
                    ?required=${this.model.required}
                    ?disabled=${this.model.disabled}
                >
                    ${this.model.options.map((option, index) => {
                        return html`<option value="${option.value}" ?selected=${this.model.selected === index} data-index="${index}">${option.label}</option>`;
                    })}
                </select>
                <i class="selector">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                </i>
            </select-container>
        `;
        this.setAttribute("state", this.state);
        this.className = `select js-input ${this.model.class}`;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        render(view, this);
    }
}
env.mount("select-component", Select);
