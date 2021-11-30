import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";
import Button, { ButtonSettings } from "~components/button/button";
import { parseDataset } from "~utils/general";

export interface IToggleButton {
	state: string;
	states: Array<string>;
	buttons: {
		[state: string]: ButtonSettings;
	};
	instructions: string;
	class: string;
	css: string;
	attributes: {
		[name: string]: string | number;
	};
}
export interface ToggleButtonSettings {
	state: string;
	states: Array<string>;
	buttons: {
		[state: string]: ButtonSettings;
	};
	instructions?: string;
	class?: string;
	css?: string;
	attributes?: {
		[name: string]: string | number;
	};
}
export default class ToggleButton extends SuperComponent<IToggleButton> {
	constructor(settings: IToggleButton) {
		super();
		this.model = {
			state: null,
			states: [],
			buttons: {},
			instructions: "",
			css: "",
			class: "",
			attributes: {},
		};
		this.model = parseDataset<IToggleButton>(this.dataset, this.model);
		env.css(["toggle-button", "button"]).then(() => {
			this.update(settings);
		});
	}

	private handleClick: EventListener = (e: Event) => {
		for (let i = 0; i < this.model.states.length; i++) {
			if (this.model.state === this.model.states[i]) {
				let next = i + 1;
				if (next >= this.model.states.length) {
					next = 0;
				}
				this.update({
					state: this.model.states[next],
				});
				break;
			}
		}
	};

	override connected() {
		this.addEventListener("click", this.handleClick);
	}

	private renderButton() {
		return new Button(this.model.buttons[this.model.state]);
	}

	private renderInstructions() {
		let out;
		if (this.model.instructions.length) {
			out = html` <p>${this.model.instructions}</p> `;
		} else {
			out = "";
		}
		return out;
	}

	override render() {
		this.style.cssText = this.model.css;
		this.className = this.model.class;
		Object.keys(this.model.attributes).map((key) => {
			this.setAttribute(key, `${this.model.attributes[key]}`);
		});
		const view = html`
			${this.renderInstructions()} ${this.renderButton()}
		`;
		render(view, this);
	}
}
env.mount("toggle-button", ToggleButton);
