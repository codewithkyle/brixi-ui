import { html, render } from "lit-html";
import env from "~brixi/controllers/env";
import { noop } from "~brixi/utils/general";
import { IInputBase, IInputBaseSettings, InputBase } from "../input-base";

export interface IColorInput extends IInputBase {
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    value: string;
    label: string;
    callback: (name: string, value: string) => void;
    readOnly: boolean;
}
export interface ColorInputSettings extends IInputBaseSettings {
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    value?: string;
    label: string;
    callback: (name: string, value: string) => void;
    readOnly?: boolean;
}
export default class ColorInput extends InputBase<IColorInput> {
    constructor(settings: ColorInputSettings) {
        super(settings);
        this.model = {
            css: "",
            class: "",
            attributes: {},
            value: "000000",
            name: "",
            label: "",
            callback: noop,
            disabled: false,
            readOnly: false,
            error: "",
            required: false,
        };
        env.css(["color-input"]).then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    override validate(): boolean {
        return true;
    }

    private handleInput = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement;
        const value = target.value;
        this.set({
            value: value.substring(1),
        });
        this.model.callback(target.name, value.substring(1));
    };

    override render() {
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${this.model.name}`;
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html`
            <input
                name="${this.model.name}"
                id="${id}"
                @change=${this.handleInput}
                type="color"
                .value="${this.model.value}"
                ?disabled=${this.model.disabled}
                ?readonly=${this.model.readOnly}
            />
            <label for="${id}">
                <color-preview style="background-color:#${this.model.value};"></color-preview>
                <span>${this.model.label}</span>
            </label>
        `;
        render(view, this);
    }
}
env.bind("color-input", ColorInput);
