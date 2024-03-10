import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import flatpickr from "flatpickr";
import { IInputBase, InputBase } from "../input-base";
import { UUID } from "@codewithkyle/uuid";

env.css(["input", "flatpickr"]);

export interface IDateInput extends IInputBase {
    label: string;
    instructions: string;
    autocomplete: string;
    autocapitalize: "off" | "on";
    icon: string;
    placeholder: string;
    autofocus: boolean;
    value: string;
    dateFormat: string;
    displayFormat: string;
    enableTime: boolean;
    minDate: string;
    maxDate: string;
    mode: "multiple" | "single" | "range";
    disableCalendar: boolean;
    timeFormat: "24" | "12";
    prevValue: string | number;
}
export default class DateInput extends InputBase<IDateInput> {
    private firstRender: boolean;
    private inputId: string;

    constructor() {
        super();
        this.inputId = UUID();
        this.firstRender = true;
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
            instructions: null,
            error: null,
            name: "",
            required: false,
            autocomplete: "off",
            autocapitalize: "off",
            icon: null,
            placeholder: "",
            value: null,
            disabled: false,
            dateFormat: "Z",
            displayFormat: "F j, Y",
            enableTime: false,
            minDate: null,
            maxDate: null,
            mode: "single",
            disableCalendar: false,
            timeFormat: "12",
            prevValue: null,
            autofocus: false,
        };
    }

    static get observedAttributes() {
        return [
            "data-label",
            "data-instructions",
            "data-name",
            "data-required",
            "data-autocomplete",
            "data-autocapitalize",
            "data-icon",
            "data-placeholder",
            "data-value",
            "data-disabled",
            "data-date-format",
            "data-display-format",
            "data-enable-time",
            "data-min-date",
            "data-max-date",
            "data-mode",
            "data-disable-calendar",
            "data-time-format",
            "data-prev-value",
            "data-autofocus",
        ];
    }

    private handleInput: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
        const input = e.currentTarget as HTMLInputElement;
        this.set(
            {
                // @ts-ignore
                prevValue: this.model.value?.toString(),
                value: input.value,
            },
            true
        );
        this.validate();
        if (this.model.mode === "range") {
            if (this.model.value.toString().search(/\bto\b/i) !== -1 || (this.model.prevValue === this.model.value && this.model.value != null)) {
                const values = this.model.value.toString().split(" to ");
                this.dispatchEvent(
                    new CustomEvent("change", {
                        detail: {
                            name: this.model.name,
                            start: values[0].trim(),
                            end: values[1].trim(),
                        },
                        bubbles: true,
                        cancelable: true,
                    })
                );
            }
        } else if (this.model.mode === "multiple") {
            this.dispatchEvent(
                new CustomEvent("change", {
                    detail: {
                        name: this.model.name,
                        values: this.model.value
                            .toString()
                            .split(",")
                            .map((value) => value.trim()),
                    },
                    bubbles: true,
                    cancelable: true,
                })
            );
        } else {
            this.dispatchEvent(
                new CustomEvent("change", {
                    detail: {
                        name: this.model.name,
                        value: this.model.value.toString(),
                    },
                    bubbles: true,
                    cancelable: true,
                })
            );
        }
    };

    private renderCopy(): string | TemplateResult {
        let output: string | TemplateResult = "";
        if (this.state === "IDLING" && this.model.instructions) {
            output = html`<p>${unsafeHTML(this.model.instructions)}</p>`;
        } else if (this.state === "ERROR" && this.model.error) {
            output = html`<p class="font-danger-700">${this.model.error}</p>`;
        }
        return output;
    }

    private renderIcon(): string | TemplateResult {
        let output: string | TemplateResult = "";
        if (this.model.icon?.length) {
            output = html`<i>${unsafeHTML(this.model.icon)}</i>`;
        }
        return output;
    }

    private renderLabel(): string | TemplateResult {
        let output: string | TemplateResult = "";
        if (this.model.label?.length) {
            output = html`<label for="${this.inputId}">${unsafeHTML(this.model.label)}</label>`;
        }
        return output;
    }

    override render() {
        if (this.model.mode === "range" && !this.firstRender) {
            return;
        }
        this.classList.add("input");
        this.setAttribute("state", this.state);
        const view = html`
            ${this.renderLabel()} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @change=${this.handleInput}
                    inputmode="text"
                    type="text"
                    id="${this.inputId}"
                    .value=${this.model.value ?? ""}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocapitalize=${this.model.autocapitalize}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disabled=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
        `;
        render(view, this);

        if (this.state !== "DISABLED") {
            const input = this.querySelector("input");
            flatpickr(input, {
                dateFormat: this.model.dateFormat,
                enableTime: this.model.enableTime,
                altFormat: this.model.displayFormat,
                altInput: true,
                minDate: this.model.minDate,
                maxDate: this.model.maxDate,
                mode: this.model.mode,
                noCalendar: this.model.disableCalendar,
                time_24hr: this.model.timeFormat === "24",
            });
        }
        this.firstRender = false;
    }
}
env.bind("date-input-component", DateInput);
