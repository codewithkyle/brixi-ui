import { html, render } from "lit-html";
import env from "~controllers/env";
import { noop } from "~utils/general";
import { IInput, InputSettings, default as Input } from "../input/input";

interface INumberInput extends IInput {
    min: number,
    max: number,
    step: number,
}
export interface NumberInputSettings extends InputSettings {
    min?: number,
    max?: number,
    step?: number,
};
export default class NumberInput extends Input {
    override model: INumberInput;

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
            label: "",
            instructions: null,
            readOnly: false,
            error: null,
            name: "",
            required: false,
            autocomplete: "off",
            autocapitalize: "off",
            icon: null,
            placeholder: "",
            value: "",
            maxlength: 9999,
            minlength: 0,
            min: 0,
            max: 9999,
            step: 1,
            disabled: false,
            css: "",
            class: "",
            callback: noop,
            attributes: {},
        };
        Object.keys(this.dataset).map(key => {
            if (key in this.model){
                this.model[key] = this.dataset[key];
            }
        });
        env.css("input").then(()=>{
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
        if (this.model.required || !this.model.required && input.value.length){
            if (parseFloat(input.value) < this.model.min){
                isValid = false;
                this.setError(`Minimum allowed number is ${this.model.min}.`, clearOnly);
            }
            else if (parseFloat(input.value) > this.model.max){
                isValid = false;
                this.setError(`Maximum allowed number is ${this.model.max}.`, clearOnly);
            }
        }
        if (isValid) {
            this.clearError();
        }
        return isValid;
    }

    override render(){
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${this.model.name}`;
        const view = html`
            ${this.renderLabel(id)}
            ${this.renderCopy()}
            <input-container>
                ${this.renderIcon()}
                <input @input=${this.handleInput} @blur=${this.handleBlur} inputmode="numeric" type="number" id="${id}" min=${this.model.min} max=${this.model.max} step=${this.model.step} .value=${this.model.value} placeholder=${this.model.placeholder} name=${this.model.name} autocapitalize=${this.model.autocapitalize} autocomplete="${this.model.autocomplete}" ?required=${this.model.required} ?disalbed=${this.model.disabled} />
            </input-container>
        `;
        this.setAttribute("state", this.state);
        this.className = `input js-input ${this.model.class}`;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        render(view, this);
    }
}
env.mount("number-input-component", NumberInput);
