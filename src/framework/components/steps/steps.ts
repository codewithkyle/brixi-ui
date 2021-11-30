import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";
import { noop, parseDataset } from "~utils/general";
import { calcPercent } from "~utils/numpy";

export interface Step {
	label: string;
	description?: string;
	name: string;
}
export interface ISteps {
	steps: Array<Step>;
	callback: Function;
	activeStep: number;
	step: string;
	layout: "horizontal" | "vertical";
	css: string;
	class: string;
	attributes: {
		[name: string]: string | number;
	};
}
export interface StepsSettings {
	steps: Array<Step>;
	callback?: Function;
	step: string;
	layout?: "horizontal" | "vertical";
	css?: string;
	class?: string;
	attributes?: {
		[name: string]: string | number;
	};
}
export default class Steps extends SuperComponent<ISteps> {
	constructor(settings: StepsSettings) {
		super();
		this.model = {
			callback: noop,
			steps: settings?.steps ?? [],
			activeStep: 0,
			step: settings?.step ?? null,
			layout: "vertical",
			css: "",
			class: "",
			attributes: {},
		};
		this.model = parseDataset<ISteps>(this.dataset, this.model);
		for (let i = 0; i < this.model.steps.length; i++) {
			if (this.model.steps[i].name === this.model.step) {
				this.model.activeStep = i;
				break;
			}
		}
		env.css(["steps"]).then(() => {
			this.update(settings);
		});
	}

	private handleClick: EventListener = (e: Event) => {
		const target = e.currentTarget as HTMLElement;
		const index = parseInt(target.dataset.index);
		if (index < this.model.activeStep) {
			this.update({
				activeStep: index,
			});
			this.model.callback(target.dataset.name);
		}
	};

	private renderVerticalStep(step: Step, index: number) {
		let state;
		if (this.model.activeStep === index) {
			state = "active";
		} else if (this.model.activeStep > index) {
			state = "completed";
		} else {
			state = "pending";
		}
		return html`
			<button
				sfx="${state === "completed" ? "button" : ""}"
				state="${state}"
				@click=${this.handleClick}
				data-name="${step?.name}"
				data-index="${index}"
			>
				<i>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</i>
				<div class="copy">
					<h3>${step.label}</h3>
					${step?.description ? html`<p>${step.description}</p>` : ""}
				</div>
			</button>
		`;
	}

	private renderHorizontalStep(step: Step, index: number) {
		let state;
		if (this.model.activeStep === index) {
			state = "active";
		} else if (this.model.activeStep > index) {
			state = "completed";
		} else {
			state = "pending";
		}
		return html`
			<button
				sfx="${state === "completed" ? "button" : ""}"
				state="${state}"
				@click=${this.handleClick}
				data-name="${step?.name}"
				data-index="${index}"
			>
				<h4>Step ${index + 1}</h4>
				<h3>${step.label}</h3>
				${step?.description ? html`<p>${step.description}</p>` : ""}
			</button>
		`;
	}

	override render() {
		const view = html`
			${this.model.steps.map((step, index) => {
				switch (this.model.layout) {
					case "horizontal":
						return this.renderHorizontalStep(step, index);
					case "vertical":
						return this.renderVerticalStep(step, index);
					default:
						return "";
				}
			})}
		`;
		this.className = `${this.model.layout} ${this.model.class}`;
		this.style.cssText = this.model.css;
		if (this.model.layout === "horizontal") {
			this.style.gridTemplateColumns = `repeat(${
				this.model.steps.length
			}, minmax(300px, ${Math.floor(
				calcPercent(1, this.model.steps.length)
			)}%))`;
		}
		Object.keys(this.model.attributes).map((key) => {
			this.setAttribute(key, `${this.model.attributes[key]}`);
		});
		render(view, this);
	}
}
env.mount("steps-component", Steps);
