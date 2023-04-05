import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import flatpickr from "flatpickr";
import { noop } from "~brixi/utils/general";
import { IInputBase, IInputBaseSettings, InputBase, IInputEvents } from "../input-base";

export interface IDateInput extends IInputBase {
    label: string;
    instructions: string;
    autocomplete: string;
    autocapitalize: "off" | "on";
    icon: string | HTMLElement;
    placeholder: string;
    readOnly: boolean;
    callbacks: Partial<IInputEvents>;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    datalist: string[];
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
export interface DateInputSettings extends IInputBaseSettings {
    label?: string;
    instructions?: string;
    autocomplete?: string;
    autocapitalize?: "off" | "on";
    icon?: string | HTMLElement;
    placeholder?: string;
    readOnly?: boolean;
    callbacks?: Partial<IInputEvents>;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    datalist?: string[];
    autofocus?: boolean;
    value?: string;
    dateFormat?: string;
    displayFormat?: string;
    enableTime?: boolean;
    minDate?: string;
    maxDate?: string;
    mode?: "multiple" | "single" | "range";
    disableCalendar?: boolean;
    timeFormat?: "24" | "12";
    style?: string;
}
export default class DateInput extends InputBase<IDateInput> {
    private firstRender: boolean;

    constructor(settings: DateInputSettings) {
        super(settings);
        this.firstRender = true;
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
            readOnly: false,
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
            css: "",
            class: "",
            callbacks: {
                onInput: noop,
                onFocus: noop,
                onBlur: noop,
            },
            attributes: {},
            prevValue: null,
            datalist: [],
            autofocus: false,
        };
        env.css(["input", "flatpickr"]).then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    private handleInput: EventListener = (e: Event) => {
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
            if (this.model.value.toString().search(/\bto\b/i) !== -1 || this.model.prevValue === this.model.value) {
                this.model.callbacks?.onInput(input.value);
            }
        } else if (this.model.mode === "single") {
            this.model.callbacks?.onInput(input.value);
        }
    };

    private handleBlur: EventListener = () => {
        this.validate();
        this.model.callbacks?.onBlur(this.model.value);
    };

    private handleFocus: EventListener = () => {
        this.model.callbacks?.onFocus(this.model.value);
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
        if (typeof this.model.icon === "string") {
            output = html`<i>${unsafeHTML(this.model.icon)}</i>`;
        } else if (this.model.icon instanceof HTMLElement) {
            output = html`<i>${this.model.icon}</i>`;
        }
        return output;
    }

    private renderLabel(id: string): string | TemplateResult {
        let output: string | TemplateResult = "";
        if (this.model.label?.length) {
            output = html`<label for="${id}">${unsafeHTML(this.model.label)}</label>`;
        }
        return output;
    }

    override render() {
        if (this.model.mode === "range" && !this.firstRender) {
            return;
        }
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${this.model.name}`;
        this.setAttribute("state", this.state);
        this.className = `input ${this.model.class}`;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html`
            ${this.renderLabel(id)} ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input
                    @input=${this.handleInput}
                    @blur=${this.handleBlur}
                    @focus=${this.handleFocus}
                    inputmode="email"
                    type="email"
                    id="${id}"
                    .value=${this.model.value ?? ""}
                    placeholder=${this.model.placeholder}
                    name=${this.model.name}
                    autocapitalize=${this.model.autocapitalize}
                    autocomplete="${this.model.autocomplete}"
                    ?required=${this.model.required}
                    ?disalbed=${this.model.disabled}
                    ?autofocus=${this.model.autofocus}
                />
            </input-container>
        `;
        render(view, this);

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
        this.firstRender = false;
    }
}
env.bind("date-input-component", DateInput);
