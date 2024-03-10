import { html, render } from "lit-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import soundscape from "~brixi/controllers/soundscape";
import Component from "~brixi/component";
import { UUID } from "@codewithkyle/uuid";

env.css("radio");

export interface IRadio {
    label: string;
    required: boolean;
    name: string;
    checked: boolean;
    disabled: boolean;
    value: string | number;
}
export default class Radio extends Component<IRadio> {
    private inputId: string;

    constructor() {
        super();
        this.inputId = UUID();
        this.model = {
            label: "",
            required: false,
            name: "",
            checked: false,
            disabled: false,
            value: null,
        };
    }

    static get observedAttributes() {
        return ["data-label", "data-required", "data-name", "data-checked", "data-disabled", "data-value"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
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
        e.stopImmediatePropagation();
        const target = e.currentTarget as HTMLInputElement;
        this.dispatchEvent(
            new CustomEvent("change", {
                detail: {
                    name: this.model.name,
                    value: target.value,
                },
                bubbles: true,
                cancelable: true,
            })
        );
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
            this.dispatchEvent(
                new CustomEvent("change", {
                    detail: {
                        name: this.model.name,
                        value: this.model.value,
                    },
                    bubbles: true,
                    cancelable: true,
                })
            );
        }
    };

    render() {
        this.setAttribute("state", this.state);
        this.setAttribute("form-input", "");
        const view = html`
            <div class="inline-block mr-auto">
                <input
                    @change=${this.handleChange}
                    type="radio"
                    name="${this.model.name}"
                    id="${this.inputId}"
                    .checked=${this.model.checked}
                    ?disabled=${this.model.disabled}
                    .value=${this.model.value ?? ""}
                />
                <label sfx="button" for="${this.inputId}">
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
