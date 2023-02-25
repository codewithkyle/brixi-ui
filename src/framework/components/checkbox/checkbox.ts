import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";
import soundscape from "~brixi/controllers/soundscape";

export interface ICheckbox {
    label: string;
    required: boolean;
    name: string;
    checked: boolean;
    disabled: boolean;
    callback: Function;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    type: "check" | "line";
}
export interface CheckboxSettings {
    label?: string;
    name?: string;
    required?: boolean;
    checked?: boolean;
    disabled?: boolean;
    callback?: Function;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    type?: "check" | "line";
}
export default class Checkbox extends SuperComponent<ICheckbox> {
    constructor(settings: CheckboxSettings) {
        super();
        this.model = {
            label: "",
            required: false,
            name: "",
            checked: false,
            disabled: false,
            callback: noop,
            css: "",
            class: "",
            attributes: {},
            type: "check",
        };
        this.model = parseDataset<ICheckbox>(this.dataset, this.model);
        env.css("checkbox").then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    override connected(): void {
        this.addEventListener("click", (e: Event) => {
            e.stopImmediatePropagation();
        });
    }

    private handleChange: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement;
        this.set({
            checked: target.checked,
        });
        this.model.callback(target.checked, target.name);
        if (target.checked) {
            soundscape.tap();
        } else {
            soundscape.hover();
        }
    };

    public getName(): string {
        return this.model.name;
    }

    public getValue(): boolean {
        return this.model.checked;
    }

    public validate(): boolean {
        let isValid = true;
        if (this.model.required && !this.model.checked) {
            isValid = false;
        }
        return isValid;
    }

    private renderIcon() {
        switch (this.model.type) {
            case "line":
                return html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                </svg>`;
            default:
                return html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>`;
        }
    }

    render() {
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${this.model.name}`;
        const view = html`
            <div class="inline-block mr-auto">
                <input @change=${this.handleChange} type="checkbox" name="${this.model.name}" id="${id}" .checked=${this.model.checked} ?disabled=${this.model.disabled} />
                <label for="${id}">
                    <check-box role="button" tabindex="0" aria-label=${`click to ${this.model.checked ? "uncheck" : "check"} the box ${this.model.label}`}>
                        <i> ${this.renderIcon()} </i>
                    </check-box>
                    ${this.model.label?.length ? html`<span>${this.model.label}</span>` : ""}
                </label>
            </div>
        `;
        this.setAttribute("state", this.state);
        this.className = `checkbox js-input ${this.model.class}`;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        render(view, this);
    }
}
env.bind("checkbox-component", Checkbox);
