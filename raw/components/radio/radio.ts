import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";
import soundscape from "~brixi/controllers/soundscape";

export interface IRadio {
    label: string;
    required: boolean;
    name: string;
    checked: boolean;
    disabled: boolean;
    callback: Function;
    class: string;
    css: string;
    attributes: {
        [name: string]: string | number;
    };
    value: string | number;
}
export interface RadioSettings {
    label: string;
    name?: string;
    required?: boolean;
    checked?: boolean;
    disabled?: boolean;
    callback?: Function;
    class?: string;
    css?: string;
    attributes?: {
        [name: string]: string | number;
    };
    value: string | number;
}
export default class Radio extends SuperComponent<IRadio> {
    constructor(settings: RadioSettings) {
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
            value: null,
        };
        this.model = parseDataset<IRadio>(this.dataset, this.model);
        env.css("radio").then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    public getName(): string {
        return this.model.name;
    }

    public getValue(): string | number | null {
        if (this.model.checked) {
            return this.model.value;
        } else {
            return null;
        }
    }

    public reset(): void {
        this.set({
            checked: false,
        });
    }

    public clearError(): void {
        if (this.state === "ERROR") {
            this.trigger("RESET");
        }
    }

    public setError(error: string): void {
        if (error?.length) {
            this.set({
                // @ts-ignore
                error: error,
            });
            this.trigger("ERROR");
            soundscape.play("error");
        }
    }

    public validate(): boolean {
        let isValid = true;
        if (this.model.required && !this.model.checked) {
            isValid = false;
            this.setError("This field is required");
        }
        return isValid;
    }

    private handleChange: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement;
        this.model.callback(target.checked);
    };

    private handleKeydown: EventListener = (e: KeyboardEvent) => {
        if (e.key === " ") {
            this.classList.add("is-active");
        }
    };

    private handleKeyup: EventListener = (e: KeyboardEvent) => {
        if (e.key === " ") {
            this.classList.remove("is-active");
            const input = this.querySelector("input") as HTMLInputElement;
            input.checked = !input.checked;
            this.set({ checked: input.checked });
            this.model.callback(true);
        }
    };

    render() {
        this.setAttribute("state", this.state);
        this.className = `radio js-input ${this.model.class}`;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        this.setAttribute("form-input", "");
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${this.model.name}`;
        const view = html`
            <div class="inline-block mr-auto">
                <input
                    @change=${this.handleChange}
                    type="radio"
                    name="${this.model.name}"
                    id="${id}"
                    .checked=${this.model.checked}
                    ?disabled=${this.model.disabled}
                    .value=${this.model.value ?? ""}
                />
                <label sfx="button" for="${id}">
                    <i
                        @keydown=${this.handleKeydown}
                        @keyup=${this.handleKeyup}
                        tabindex="0"
                        role="button"
                        aria-label=${`click to ${this.model.checked ? "uncheck" : "check"} the option ${this.model.label}`}
                    ></i>
                    <span>${this.model.label}</span>
                </label>
            </div>
        `;
        render(view, this);
    }
}
env.bind("radio-component", Radio);
