import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import soundscape from "~brixi/controllers/soundscape";
import Component from "~brixi/component";
import { UUID } from "@codewithkyle/uuid";
import alerts from "~brixi/controllers/alerts";

env.css(["textarea", "button", "toast"]);

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
    autofocus: boolean;
}
export default class Textarea extends Component<ITextarea> {
    private inputId: string;

    constructor() {
        super();
        this.inputId = UUID();
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
            maxlength: Infinity,
            minlength: 0,
            disabled: false,
            readOnly: false,
            rows: 5,
            autofocus: false,
        };
    }

    static get observedAttributes() {
        return [
            "data-label",
            "data-name",
            "data-instructions",
            "data-required",
            "data-autocomplete",
            "data-placeholder",
            "data-value",
            "data-maxlength",
            "data-minlength",
            "data-disabled",
            "data-read-only",
            "data-rows",
            "data-autofocus",
        ];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.state = settings?.disabled ? "DISABLED" : "IDLING";
        this.set(settings);
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

    public handleFocus: EventListener = (e: Event) => {
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

    public handleInput: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
        const input = e.currentTarget as HTMLInputElement;
        this.set({
            value: input.value,
        });
        this.validate();
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

    private handleCopyClick: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
        window.navigator.clipboard.writeText(this.model.value).then(() => {
            alerts.toast("Copied to clipboard");
        });
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

    public renderLabel(): string | TemplateResult {
        let output: string | TemplateResult;
        if (this.model.label?.length) {
            output = html`<label for="${this.inputId}">${unsafeHTML(this.model.label)} ${this.model.required ? "" : html`<span class="font-grey-400 dark:font-grey-500 font-xs">(optional)</span>`}</label>`;
        } else {
            output = "";
        }
        return output;
    }

    private renderReadOnlyIcon(): string | TemplateResult {
        let output: string | TemplateResult = "";
        if (this.model.readOnly) {
            output = html`
                <button class="bttn absolute r-0 b-0" kind="text" color="primary" size="slim" shape="round" icon="center" dull @click=${this.handleCopyClick} type="button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
                        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
                    </svg>
                </button>
            `;
        }
        return output;
    }

    public renderCounter(): string | TemplateResult {
        let out: string | TemplateResult;
        if (this.model.maxlength === Infinity || this.model.readOnly) {
            out = "";
        } else {
            out = html` <span class="counter"> ${this.model.value?.length ?? 0}/${this.model.maxlength} </span> `;
        }
        return out;
    }

    render() {
        this.setAttribute("state", this.state);
        this.setAttribute("form-input", "");
        if (this.model.readOnly) {
            this.setAttribute("readonly", "");
        }
        const view = html`
            ${this.renderLabel()} ${this.renderCopy()}
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
                id="${this.inputId}"
                ?readonly=${this.model.readOnly}
                ?required=${this.model.required}
                ?disabled=${this.model.disabled}
                ?autofocus=${this.model.autofocus}
            >
${this.model.value ?? ""}</textarea
            >
            ${this.renderCounter()} ${this.renderReadOnlyIcon()}
        `;
        render(view, this);
    }
}
env.bind("brixi-textarea", Textarea);
