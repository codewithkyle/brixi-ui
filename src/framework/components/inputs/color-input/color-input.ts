import { UUID } from "@codewithkyle/uuid";
import { html, render } from "lit-html";
import env from "~brixi/controllers/env";
import { IInputBase, InputBase } from "../input-base";
import "~brixi/utils/strings";

env.css(["color-input"]);

export interface IColorInput extends IInputBase {
    value: string;
    label: string;
    readOnly: boolean;
}
export default class ColorInput extends InputBase<IColorInput> {
    private inputId: string;

    constructor() {
        super();
        this.inputId = UUID();
        this.model = {
            value: "000000",
            name: "",
            label: "",
            disabled: false,
            readOnly: false,
            error: "",
            required: false,
        };
    }

    static get observedAttributes() {
        return ["data-value", "data-name", "data-label", "data-disabled", "data-read-only", "data-required"];
    }

    override validate(): boolean {
        return true;
    }

    private handleInput = (e: Event) => {
        e.stopImmediatePropagation();
        const target = e.currentTarget as HTMLInputElement;
        const value = target.value;
        this.set({
            value: value,
        });
        this.dispatchEvent(
            new CustomEvent("change", {
                detail: {
                    name: target.name,
                    value: value,
                },
                bubbles: true,
                cancelable: true,
            })
        );
    };

    override render() {
        this.setAttribute("state", this.state);
        const view = html`
            <input
                name="${this.model.name}"
                id="${this.inputId}"
                @change=${this.handleInput}
                type="color"
                value="${this.model.value}"
                ?disabled=${this.model.disabled}
                ?readonly=${this.model.readOnly}
            />
            <label for="${this.inputId}">
                <color-preview style="background-color:#${this.model.value.ltrim("#")};"></color-preview>
                <span>${this.model.label}</span>
            </label>
        `;
        render(view, this);
    }
}
env.bind("color-input", ColorInput);
