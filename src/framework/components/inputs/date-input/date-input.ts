import { html, render } from "lit-html";
import env from "~controllers/env";
import flatpickr from "~lib/flatpickr";
import { noop } from "~utils/general";
import { IInput, InputSettings, default as Input } from "../input/input";

export interface IDateInput extends IInput {
    dateFormat: string,
    displayFormat: string,
    enableTime: boolean,
    minDate: string,
    maxDate: string,
    mode: "multiple" | "single" | "range",
    disableCalendar: boolean,
    timeFormat: "24" | "12",
}
export default class DateInput extends Input {
    override model: IDateInput;

    constructor(settings:InputSettings){
        super(settings);
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
            }
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
            value: "",
            disabled: false,
            maxlength: 9999,
            minlength: 0,
            dateFormat: "Z",
            displayFormat: "F j, Y",
            enableTime: false,
            minDate: null,
            maxDate: null,
            mode: "single",
            disableCalendar: false,
            timeFormat: "12",
            className: "",
            callback: noop,
        };
        env.css(["input", "flatpickr"]).then(()=>{
            this.update(settings);
        });
    }

    override validate(input:HTMLInputElement = null, clearOnly = false): boolean {
        if (!input){
            input = this.querySelector("input");
        }
        let isValid = true;
        if (this.model.required && !input.value.length) {
            isValid = false;
            this.setError("This field is required.", clearOnly);
        }
        else {
            this.clearError();
        }
        return isValid;
    }

    override render(){
        // @ts-ignore
        if (this.model.mode === "range" && this.model.value?.length && this.model.value?.search(/\bto\b/) === -1){
            return;
        }
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${this.model.name}`;
        const view = html`
            ${this.renderLabel(id)}
            ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input @input=${this.handleInput} @blur=${this.handleBlur} inputmode="email" type="email" id="${id}" .value=${this.model.value} placeholder=${this.model.placeholder} name=${this.model.name} autocapitalize=${this.model.autocapitalize} autocomplete="${this.model.autocomplete}" ?required=${this.model.required} ?disalbed=${this.model.disabled} />
            </input-container>
        `;
        this.setAttribute("state", this.state);
        this.className = `input js-input ${this.model.className}`;
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
    }
}
env.mount("date-input-component", DateInput);