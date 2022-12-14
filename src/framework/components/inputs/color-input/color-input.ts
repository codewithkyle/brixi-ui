import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";

export interface IColorInput {
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    value: string;
    label: string;
    name: string;
    callback: (name: string, value: string) => void;
    disabled: boolean;
    readOnly: boolean;
}
export interface ColorInputSettings {
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    value?: string;
    label: string;
    name: string;
    callback: (name: string, value: string) => void;
    disabled?: boolean;
    readOnly?: boolean;
}
export default class ColorInput extends SuperComponent<IColorInput> {
    constructor(settings: ColorInputSettings) {
        super();
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
        };
        this.model = parseDataset<IColorInput>(this.dataset, this.model);
        env.css(["color-input"]).then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    public validate(): boolean {
        return true;
    }

    public getName(): string {
        return this.model.name;
    }

    public getValue(): any {
        return this.model.value;
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
