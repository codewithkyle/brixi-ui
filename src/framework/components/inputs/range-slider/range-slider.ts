import { html, render } from "lit-html";
import env from "~controllers/env";
import { IInput, InputSettings, default as Input } from "../input/input";
import { noop } from "~utils/general";
import { calcPercent } from "~utils/numpy";

export interface IRangeSlider extends IInput {
	min: number;
	max: number;
	step: number;
	manual: boolean;
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
		};
		Object.keys(this.dataset).map((key) => {
			if (key in this.model) {
				this.model[key] = this.dataset[key];
			}
		});
		env.css(["range-slider"]).then(() => {
			this.update(settings);
		});
		this.style.setProperty(
			"--track-fill",
			`${calcPercent(settings?.value ?? 0, settings.max)}%`
		);
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
		const percent = calcPercent(newValue, this.model.max);
		this.style.setProperty("--track-fill", `${percent}%`);
		this.update({
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
		const percent = calcPercent(newValue, this.model.max);
		this.style.setProperty("--track-fill", `${percent}%`);
		this.update({
			value: newValue,
		});
	};

	override validate(
		input: HTMLInputElement = null,
		clearOnly = false
	): boolean {
		return true;
	}

	private renderManualInput() {
		let out;
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
		} else {
			out = "";
		}
		return out;
	}

	override render() {
		const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${
			this.model.name
		}`;
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
				/>
				${this.renderManualInput()}
			</input-container>
		`;
		this.setAttribute("state", this.state);
		this.className = `js-input ${this.model.class}`;
		this.style.cssText = this.model.css;
		Object.keys(this.model.attributes).map((key) => {
			this.setAttribute(key, `${this.model.attributes[key]}`);
		});
		render(view, this);
	}
}
env.mount("range-slider", RangeSlider);
