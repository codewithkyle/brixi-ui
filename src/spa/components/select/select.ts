import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { cache } from "lit-html/directives/cache";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import soundscape from "~brixi/controllers/soundscape";
import Component from "~brixi/component";
import { UUID } from "@codewithkyle/uuid";

env.css("select");

export type SelectOption = {
    label: string;
    value: string;
};

export interface ISelect {
    label: string;
    icon: string | HTMLElement;
    instructions: string;
    options: Array<SelectOption>;
    required: boolean;
    name: string;
    error: string;
    value: any;
    disabled: boolean;
    autofocus: boolean;
}
export default class Select extends Component<ISelect> {
    private inputId: string;
    constructor() {
        super();
        this.inputId = UUID();
        this.state = this.dataset?.disabled ? "DISABLED" : "IDLING";
        this.stateMachine = {
            IDLING: {
                ERROR: "ERROR",
                DISABLE: "DISABLED",
                ENABLE: "IDLING",
            },
            ERROR: {
                RESET: "IDLING",
                ERROR: "ERROR",
            },
            DISABLED: {
                ENABLE: "IDLING",
                DISABLE: "DISABLED",
            },
        };
        this.model = {
            label: "",
            name: "",
            icon: "",
            instructions: "",
            options: [],
            required: false,
            error: null,
            value: null,
            disabled: false,
            autofocus: false,
        };
    }

    static get observedAttributes() {
        return ["data-label", "data-icon", "data-instructions", "data-options", "data-required", "data-name", "data-value", "data-disabled", "data-autofocus"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        if (settings?.error) {
            this.state = "ERROR";
        }
        if (settings?.disabled) {
            this.state = "DISABLED";
        }
        if (settings?.autofocus) {
            // @ts-ignore
            document?.activeElement?.blur();
        }
        this.set(settings);
    }

    public renderCopy(): string | TemplateResult {
        let output: string | TemplateResult;
        if (this.state === "ERROR" && this.model.error?.length) {
            output = html`<p class="font-danger-700">${this.model.error}</p>`;
        } else if (this.model.instructions?.length) {
            output = html`<p>${unsafeHTML(this.model.instructions)}</p>`;
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
            this.set({ error: null });
            this.trigger("RESET");
        }
    }

    public reset(): void {
        this.set({
            value: "",
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
        e.stopImmediatePropagation();
        const target = e.currentTarget as HTMLSelectElement;
        this.set({
            value: target.value,
        });
        this.validate();
        this.dispatchEvent(
            new CustomEvent("change", {
                detail: {
                    value: target.value,
                    name: this.model.name,
                },
                bubbles: true,
                cancelable: true,
            })
        );
    };

    public getName(): string {
        return this.model.name;
    }

    public getValue(): any {
        return this.model.value;
    }

    public handleBlur: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
        this.validate();
        this.dispatchEvent(
            new CustomEvent("blur", {
                detail: {
                    value: this.model.value,
                    name: this.model.name,
                },
                bubbles: true,
                cancelable: true,
            })
        );
    };

    private handleFocus: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
        this.dispatchEvent(
            new CustomEvent("focus", {
                detail: {
                    value: this.model.value,
                    name: this.model.name,
                },
                bubbles: true,
                cancelable: true,
            })
        );
    };

    public renderLabel(): string | TemplateResult {
        return html`<label for="${this.inputId}">${unsafeHTML(this.model.label)}</label>`;
    }

    render() {
        if (this.state !== "DISABLED" && this.model.disabled) {
            this.trigger("DISABLE");
        } else if (this.state === "DISABLED" && !this.model.disabled) {
            this.trigger("ENABLE");
        }
        this.setAttribute("state", this.state);
        this.setAttribute("form-input", "");
        const view = html`
            ${cache(this.model.label?.length ? this.renderLabel() : "")} ${this.renderCopy()}
            <select-container>
                ${this.renderIcon()}
                <select
                    @blur=${this.handleBlur}
                    @change=${this.handleChange}
                    @focus=${this.handleFocus}
                    id="${this.inputId}"
                    name="${this.model.name}"
                    ?required=${this.model.required}
                    ?disabled=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                    ?value=${this.model.value}
                >
                    ${this.model.options.map((option) => {
                        return html`<option value="${option.value}" ?selected=${this.model.value === option.value}>${option.label}</option>`;
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
