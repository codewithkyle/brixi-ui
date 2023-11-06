import { html, render, TemplateResult } from "lit-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import soundscape from "~brixi/controllers/soundscape";
import Component from "~brixi/component";
import { UUID } from "@codewithkyle/uuid";

env.css("checkbox");

export interface ICheckbox {
    label: string;
    required: boolean;
    name: string;
    checked: boolean;
    error: string;
    disabled: boolean;
    type: "check" | "line";
    value: string | number;
}

export default class Checkbox extends Component<ICheckbox> {
    constructor() {
        super();
        this.id = UUID();
        this.state = "IDLING";
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
            type: "check",
            value: null,
        };
    }

    static get observedAttributes() {
        return ["data-label", "data-required", "data-name", "data-checked", "data-disabled", "data-type", "data-value"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        if (settings?.disabled) {
            this.state = "DISABLED";
        }
        this.set(settings);
        this.addEventListener("click", this.handleChange);
    }

    private handleChange: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
        if (this.model.disabled) return;
        const isChecked = !this.model.checked;
        this.set({
            checked: isChecked,
        });
        this.dispatchEvent(new CustomEvent("change", { detail: { checked: isChecked, name: this.model.name, value: this.model.value }, bubbles: true, cancelable: true }));
        if (isChecked) {
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
            this.dispatchEvent(new CustomEvent("change", { detail: { checked: isChecked, name: target.name }, bubbles: true, cancelable: true }));
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
        this.setAttribute("state", this.state);
        this.setAttribute("form-input", "");
        this.classList.add("checkbox");
        const view = html`
            <div class="inline-block mr-auto">
                <input
                    @change=${this.handleChange}
                    type="checkbox"
                    name="${this.model.name}"
                    id="${this.id}"
                    .checked=${this.model.checked}
                    ?disabled=${this.model.disabled}
                    .value=${this.model.value || ""}
                />
                <label for="${this.id}">
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
