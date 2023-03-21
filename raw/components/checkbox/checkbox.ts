import { html, render, TemplateResult } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";
import soundscape from "~brixi/controllers/soundscape";

export interface ICheckbox {
    label: string;
    required: boolean;
    name: string;
    checked: boolean;
    error: string;
    disabled: boolean;
    callback: Function;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    type: "check" | "line";
    value: string | number;
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
    value: string | number;
}
export default class Checkbox extends SuperComponent<ICheckbox> {
    constructor(settings: CheckboxSettings) {
        super();
        this.state = settings?.disabled ? "DISABLED" : "IDLING";
        this.stateMachine = {
            IDLING: {
                ERROR: "ERROR",
                DISABLE: "DISABLED",
            },
            ERROR: {
                RESET: "IDLING",
                ERROR: "ERROR",
            },
            DISABLED: {
                ENABLE: "IDLING",
            },
        };
        this.model = {
            label: "",
            required: false,
            name: "",
            checked: false,
            error: "",
            disabled: false,
            callback: noop,
            css: "",
            class: "",
            attributes: {},
            type: "check",
            value: null,
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
        this.model.callback(target.checked);
        if (target.checked) {
            soundscape.play("click");
        } else {
            soundscape.play("hover");
        }
    };

    private handleKeydown: EventListener = (e: KeyboardEvent) => {
        if (e.key === " ") {
            this.classList.add("is-active");
        }
    };

    private handleKeyup: EventListener = (e: KeyboardEvent) => {
        if (e.key === " ") {
            this.classList.remove("is-active");
            const target = this.querySelector("input") as HTMLInputElement;
            const isChecked = !target.checked;
            this.set({
                checked: isChecked,
            });
            this.model.callback(isChecked, target.name);
            if (isChecked) {
                soundscape.play("click");
            } else {
                soundscape.play("hover");
            }
        }
    };

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

    private renderIcon(): TemplateResult {
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
        this.setAttribute("state", this.state);
        this.setAttribute("form-input", "");
        this.className = `checkbox ${this.model.class}`;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html`
            <div class="inline-block mr-auto">
                <input
                    @change=${this.handleChange}
                    type="checkbox"
                    name="${this.model.name}"
                    id="${id}"
                    .checked=${this.model.checked}
                    ?disabled=${this.model.disabled}
                    .value=${this.model.value ?? ""}
                />
                <label for="${id}">
                    <check-box
                        @keydown=${this.handleKeydown}
                        @keyup=${this.handleKeyup}
                        role="button"
                        tabindex="0"
                        aria-label=${`click to ${this.model.checked ? "uncheck" : "check"} the box ${this.model.label}`}
                    >
                        <i> ${this.renderIcon()} </i>
                    </check-box>
                    ${this.model.label?.length ? html`<span>${this.model.label}</span>` : ""}
                </label>
            </div>
        `;
        render(view, this);
    }
}
env.bind("checkbox-component", Checkbox);
