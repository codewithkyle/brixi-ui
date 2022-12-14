import { html, render, TemplateResult } from "lit-html";
import env from "~brixi/controllers/env";
import { IInput, InputSettings, default as Input } from "../input/input";
import { noop, parseDataset } from "~brixi/utils/general";
import { calcPercent } from "~brixi/utils/numpy";

export interface IRangeSlider extends IInput {
    min: number;
    max: number;
    step: number;
    manual: boolean;
    value: number;
}
export interface RangeSliderSettings extends InputSettings {
    min: number;
    max: number;
    step?: number;
    value?: number;
    manual?: boolean;
}
export default class RangeSlider extends Input {
    override model: IRangeSlider;
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
            autocapitalize: "off",
            autocomplete: "off",
            icon: "",
            placeholder: "",
            value: settings?.min ?? 0,
            minlength: 0,
            maxlength: 9999,
            min: 0,
            max: 9999,
            step: 1,
            css: "",
            class: "",
            callback: noop,
            attributes: {},
            datalist: [],
            autofocus: false,
        };
        this.model = parseDataset<IRangeSlider>(this.dataset, this.model);
        this.fillPercentage = calcPercent(this.model.value, this.model.max);
        env.css(["range-slider"]).then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    override handleInput: EventListener = (e: Event) => {
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
        this.fillPercentage = calcPercent(newValue, this.model.max);
        this.set({
            value: newValue,
        });
        this.model.callback(newValue);
    };

    override handleBlur: EventListener = (e: Event) => {
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
        this.fillPercentage = calcPercent(newValue, this.model.max);
        this.set({
            value: newValue,
        });
    };

    override validate(input: HTMLInputElement = null, clearOnly = false): boolean {
        return true;
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

    override render() {
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${this.model.name}`;
        const view = html`
            ${this.renderLabel(id)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
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
        this.setAttribute("state", this.state);
        this.className = `js-input ${this.model.class}`;
        this.style.cssText = this.model.css;
        this.style.setProperty("--track-fill", `${this.fillPercentage}%`);
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        render(view, this);
    }
}
env.bind("range-slider", RangeSlider);
