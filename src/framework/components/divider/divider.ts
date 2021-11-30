import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { parseDataset } from "~utils/general";

export type DividerColor =
	| "primary"
	| "success"
	| "warning"
	| "danger"
	| "black"
	| "grey";
export interface IDivider {
	label: string;
	color: DividerColor;
	layout: "horizontal" | "vertical";
	type: "solid" | "dashed" | "dotted";
	css: string;
	class: string;
	attributes: {
		[name: string]: string | number;
	};
}
export interface DividerSettings {
	label?: string;
	color?: DividerColor;
	layout?: "horizontal" | "vertical";
	type?: "solid" | "dashed" | "dotted";
	css?: string;
	class?: string;
	attributes?: {
		[name: string]: string | number;
	};
}
export default class Divider extends SuperComponent<IDivider> {
	constructor(settings: DividerSettings) {
		super();
		this.model = {
			label: "",
			color: "grey",
			layout: "horizontal",
			type: "solid",
			css: "",
			class: "",
			attributes: {},
		};
		this.model = parseDataset<IDivider>(this.dataset, this.model);
		env.css(["divider"]).then(() => {
			this.update(settings);
		});
	}

	override render() {
		this.setAttribute("layout", this.model.layout);
		this.setAttribute("color", this.model.color);
		this.setAttribute("line-style", this.model.type);
		this.style.cssText = this.model.css;
		this.className = this.model.class;
		Object.keys(this.model.attributes).map((key) => {
			this.setAttribute(key, `${this.model.attributes[key]}`);
		});
		let view;
		if (this.model.label?.length) {
			view = html`
				<div></div>
				<span>${unsafeHTML(this.model.label)}</span>
				<div></div>
			`;
		} else {
			view = html` <div></div> `;
		}
		render(view, this);
	}
}
env.mount("divider-component", Divider);
