import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import { InputBase, IInputBase } from "../input-base";
import { calcPercent } from "~brixi/utils/numpy";
import { UUID } from "@codewithkyle/uuid";

env.css(["range-slider"]);

export interface IRangeSlider extends IInputBase {
    label: string;
    instructions: string;
    icon: string;
    readOnly: boolean;
    autofocus: boolean;
    min: number;
    max: number;
    step: number;
    manual: boolean;
    value: number;
    minIcon: string;
    maxIcon: string;
}
export default class RangeSlider extends InputBase<IRangeSlider> {
    private fillPercentage: number;
    private inputId: string;

    constructor() {
        super();
        this.inputId = UUID();
        this.model = {
            manual: false,
            label: "",
            name: "",
            instructions: "",
            readOnly: false,
            required: false,
            disabled: false,
            error: "",
            icon: "",
            minIcon: null,
            maxIcon: null,
            value: null,
            min: 0,
            max: 9999,
            step: 1,
            autofocus: false,
        };
    }

    static get observedAttributes() {
        return [
            "data-label",
            "data-name",
            "data-instructions",
            "data-icon",
            "data-read-only",
            "data-required",
            "data-manual",
            "data-disabled",
            "data-value",
            "data-min",
            "data-max",
            "data-step",
            "data-autofocus",
            "data-min-icon",
            "data-max-icon",
        ];
    }

    private handleChange: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
    };

    private handleInput: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
        const input = e.currentTarget as HTMLInputElement;
        let newValue = parseInt(input.value);
        if (isNaN(newValue)) {
            newValue = this.model.min;
        }
        if (newValue < this.model.min) {
            newValue = this.model.max;
        } else if (newValue > this.model.max) {
            newValue = this.model.max;
        }
        this.renderFill(newValue);
        this.set({
            value: newValue,
        });
        this.dispatchEvent(
            new CustomEvent("change", {
                detail: {
                    value: newValue,
                    name: this.model.name,
                },
                bubbles: true,
                cancelable: true,
            })
        );
    };

    private handleBlur: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
        const input = e.currentTarget as HTMLInputElement;
        let newValue = parseInt(input.value);
        if (isNaN(newValue)) {
            newValue = this.model.min;
        }
        if (newValue < this.model.min) {
            newValue = this.model.max;
        } else if (newValue > this.model.max) {
            newValue = this.model.max;
        }
        this.renderFill(newValue);
        this.set({
            value: newValue,
        });
        this.dispatchEvent(
            new CustomEvent("blur", {
                detail: {
                    value: newValue,
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

    private handleIconClick: EventListener = () => {
        let newValue = 0;
        if (this.model.value === this.model.min) {
            newValue = this.model.max;
        } else {
            newValue = this.model.min;
        }
        this.renderFill(newValue);
        this.set({
            value: newValue,
        });
        this.dispatchEvent(
            new CustomEvent("change", {
                detail: {
                    value: newValue,
                    name: this.model.name,
                },
                bubbles: true,
                cancelable: true,
            })
        );
    };

    override reset() {
        this.set({
            value: this.model.min,
        });
    }

    override validate(): boolean {
        return true;
    }

    private renderCopy(): string | TemplateResult {
        let output: string | TemplateResult = "";
        if (this.state === "IDLING" && this.model.instructions) {
            output = html`<p>${unsafeHTML(this.model.instructions)}</p>`;
        } else if (this.state === "ERROR" && this.model.error) {
            output = html`<p class="font-danger-700">${this.model.error}</p>`;
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

    private renderManualInput(): string | TemplateResult {
        let out: string | TemplateResult = "";
        if (this.model.manual) {
            out = html`
                <input
                    aria-label="manual range input for ${this.model.label}"
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    inputmode="numeric"
                    type="number"
                    min=${this.model.min}
                    max=${this.model.max}
                    step=${this.model.step}
                    .value=${this.model.value}
                    ?readonly=${this.model.readOnly}
                    ?disabled=${this.model.disabled}
                />
            `;
        }
        return out;
    }

    private renderFill(newValue: number): void {
        this.fillPercentage = calcPercent(newValue, this.model.max);
        this.style.setProperty("--track-fill", `${this.fillPercentage}%`);
    }

    private renderIcon(): string | TemplateResult {
        let output: string | TemplateResult = "";
        if (this.model.minIcon != null && this.model.value === this.model.min) {
            if (this.model.minIcon?.length) {
                output = html`<button sfx="button" @click=${this.handleIconClick} type="button">${unsafeHTML(this.model.minIcon)}</button>`;
            }
        } else if (this.model.maxIcon != null && this.model.value === this.model.max) {
            if (this.model.maxIcon?.length) {
                output = html`<button sfx="button" @click=${this.handleIconClick} type="button">${unsafeHTML(this.model.maxIcon)}</button>`;
            }
        } else {
            if (this.model.icon?.length) {
                output = html`<button sfx="button" @click=${this.handleIconClick} type="button">${unsafeHTML(this.model.icon)}</button>`;
            }
        }
        return output;
    }

    override render() {
        this.classList.add("input");
        this.setAttribute("state", this.state);
        this.renderFill(this.model.value);
        const view = html`
            ${this.renderLabel()} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    @change=${this.handleChange}
                    type="range"
                    id="${this.inputId}"
                    min=${this.model.min}
                    max=${this.model.max}
                    step=${this.model.step}
                    .value=${this.model.value ?? this.model.min}
                    name=${this.model.name}
                    ?required=${this.model.required}
                    ?disabled=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                    ?readonly=${this.model.readOnly}
                />
                ${this.renderManualInput()}
            </input-container>
        `;
        render(view, this);
    }
}
env.bind("range-slider", RangeSlider);
