import { UUID } from "@codewithkyle/uuid";
import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import Component from "~brixi/component";
import env from "~brixi/controllers/env";
import soundscape from "~brixi/controllers/soundscape";
import { parseDataset } from "~brixi/utils/general";

env.css("lightswitch");

export type LightswitchColor = "primary" | "success" | "warning" | "danger";
export interface ILightswitch {
    label: string;
    instructions: string;
    enabled: boolean;
    name: string;
    disabled: boolean;
    color: LightswitchColor;
    value: string | number;
    required: boolean;
}
export default class Lightswitch extends Component<ILightswitch> {
    private inputId: string;

    constructor() {
        super();
        this.inputId = UUID();
        this.model = {
            name: "",
            label: "",
            instructions: "",
            enabled: false,
            disabled: false,
            color: "success",
            value: null,
            required: false,
        };
    }

    static get observedAttributes() {
        return [
            "data-label",
            "data-instructions",
            "data-enabled",
            "data-disabled",
            "data-color",
            "data-value",
            "data-required",
            "data-name",
        ];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.state = settings.disabled ? "DISABLED" : "IDLING";
        this.set(settings);
    }

    public getName(): string {
        return this.model.name;
    }

    public getValue(): string | number | null {
        if (this.model.enabled) {
            return this.model.value;
        } else {
            return null;
        }
    }

    public reset(): void {
        this.set({
            enabled: false,
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
        if (this.model.required && !this.model.enabled) {
            isValid = false;
            this.setError("This field is required");
        }
        return isValid;
    }

    private handleChange: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
        const target = e.currentTarget as HTMLInputElement;
        this.set({
            enabled: target.checked,
        });
        if (target.checked) {
            soundscape.play("activate");
        } else {
            soundscape.play("deactivate");
        }
        this.dispatchEvent(
            new CustomEvent("change", {
                detail: {
                    name: this.model.name,
                    value: this.model.value,
                    enabled: this.model.enabled,
                },
                bubbles: true,
                cancelable: true,
            })
        );
    };

    private handleKeyup: EventListener = (e: KeyboardEvent) => {
        if (e.key === " ") {
            const input = this.querySelector("input") as HTMLInputElement;
            input.checked = !input.checked;
            this.classList.remove("is-active");
            this.set({ enabled: input.checked });
            if (input.checked) {
                soundscape.play("activate");
            } else {
                soundscape.play("deactivate");
            }
            this.dispatchEvent(
                new CustomEvent("change", {
                    detail: {
                        name: this.model.name,
                        value: this.model.value,
                        enabled: this.model.enabled,
                    },
                    bubbles: true,
                    cancelable: true,
                })
            );
        }
    };

    private handleKeydown: EventListener = (e: KeyboardEvent) => {
        if (e.key === " ") {
            this.classList.add("is-active");
        }
    };

    private renderLabel(): TemplateResult | string {
        if (!this.model.label?.length && !this.model.instructions?.length) {
            return "";
        }
        return html`
            <div class="ml-0.75" flex="column wrap">
                <span class="block line-snug font-sm font-medium font-grey-700 dark:font-grey-300">${this.model.label}</span>
                <span class="block line-snug font-xs font-grey-500 dark:font-grey-300">${this.model.instructions}</span>
            </div>
        `;
    }

    override render() {
        this.setAttribute("state", this.state);
        this.setAttribute("color", this.model.color);
        this.setAttribute("form-input", "");
        const view = html`
            <input
                @change=${this.handleChange}
                type="checkbox"
                name="${this.model.name}"
                id="${this.inputId}"
                ?disabled=${this.model.disabled}
                ?checked=${this.model.enabled}
                value=${this.model.value ?? ""}
            />
            <label for="${this.inputId}">
                ${this.renderLabel()}
                <light-switch tabindex="0" @keyup=${this.handleKeyup} @keydown=${this.handleKeydown} aria-label="${this.model.enabled ? "enabled" : "disabled"}">
                    <i style="transform: ${this.model.enabled ? 'translate(26px, 3px)' : 'translate(6px, 3px)'}"></i>
                </light-switch>
            </label>
        `;
        render(view, this);
    }
}
env.bind("brixi-lightswitch", Lightswitch);
