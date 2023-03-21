import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import { noop } from "~brixi/utils/general";
import { InputBase, IInputBase, IInputBaseSettings, IInputEvents } from "../input-base";
import { calcPercent } from "~brixi/utils/numpy";

export interface IRangeSlider extends IInputBase {
    label: string;
    instructions: string;
    icon: string | HTMLElement;
    placeholder: string;
    readOnly: boolean;
    callbacks: Partial<IInputEvents>;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    autofocus: boolean;
    min: number;
    max: number;
    step: number;
    manual: boolean;
    value: number;
    minValueIcon: string | HTMLElement;
    maxValueIcon: string | HTMLElement;
}
export interface RangeSliderSettings extends IInputBaseSettings {
    label?: string;
    instructions?: string;
    icon?: string | HTMLElement;
    placeholder?: string;
    readOnly?: boolean;
    callbacks?: Partial<IInputEvents>;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    autofocus?: boolean;
    min: number;
    max: number;
    step?: number;
    value?: number;
    manual?: boolean;
    minValueIcon?: string | HTMLElement;
    maxValueIcon?: string | HTMLElement;
}
export default class RangeSlider extends InputBase<IRangeSlider> {
    private fillPercentage: number;

    constructor(settings: RangeSliderSettings) {
        super(settings);
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
            minValueIcon: null,
            maxValueIcon: null,
            placeholder: "",
            value: settings?.min,
            min: 0,
            max: 9999,
            step: 1,
            css: "",
            class: "",
            callbacks: {
                onInput: noop,
                onFocus: noop,
                onBlur: noop,
            },
            attributes: {},
            autofocus: false,
        };
        env.css(["range-slider"]).then(() => {
            this.set(settings, true);
            this.render();
            this.className = `js-input ${this.model.class}`;
            this.style.cssText = this.model.css;
            this.renderFill(this.model.value);
        });
    }

    private handleInput: EventListener = (e: Event) => {
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
        this.set(
            {
                value: newValue,
            },
            true
        );
        this.model.callbacks.onInput(newValue);
    };

    private handleBlur: EventListener = (e: Event) => {
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
        this.model.callbacks.onBlur(newValue);
    };

    private handleFocus: EventListener = () => {
        this.model.callbacks.onFocus(this.model.value);
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
        this.model.callbacks.onInput(newValue);
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

    private renderLabel(id: string): string | TemplateResult {
        let output: string | TemplateResult = "";
        if (this.model.label?.length) {
            output = html`<label for="${id}">${unsafeHTML(this.model.label)}</label>`;
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
        if (this.model.minValueIcon != null && this.model.value === this.model.min) {
            if (typeof this.model.minValueIcon === "string") {
                output = html`<button @click=${this.handleIconClick} type="button">${unsafeHTML(this.model.minValueIcon)}</button>`;
            } else if (this.model.minValueIcon instanceof HTMLElement) {
                output = html`<button @click=${this.handleIconClick} type="button">${this.model.minValueIcon}</button>`;
            }
        } else if (this.model.maxValueIcon != null && this.model.value === this.model.max) {
            if (typeof this.model.maxValueIcon === "string") {
                output = html`<button @click=${this.handleIconClick} type="button">${unsafeHTML(this.model.maxValueIcon)}</button>`;
            } else if (this.model.maxValueIcon instanceof HTMLElement) {
                output = html`<button @click=${this.handleIconClick} type="button">${this.model.maxValueIcon}</button>`;
            }
        } else {
            if (typeof this.model.icon === "string") {
                output = html`<button @click=${this.handleIconClick} type="button">${unsafeHTML(this.model.icon)}</button>`;
            } else if (this.model.icon instanceof HTMLElement) {
                output = html`<button @click=${this.handleIconClick} type="button">${this.model.icon}</button>`;
            }
        }
        return output;
    }

    override render() {
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${this.model.name}`;
        this.setAttribute("state", this.state);
        this.className = `input ${this.model.class}`;
        this.style.cssText = this.model.css;
        this.renderFill(this.model.value);
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html`
            ${this.renderLabel(id)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    type="range"
                    id="${id}"
                    min=${this.model.min}
                    max=${this.model.max}
                    step=${this.model.step}
                    .value=${this.model.value}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
                ${this.renderManualInput()}
            </input-container>
        `;
        render(view, this);
    }
}
env.bind("range-slider", RangeSlider);
