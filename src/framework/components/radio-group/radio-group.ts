import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";
import Radio, { RadioSettings } from "~components/radio/radio";

export interface IRadioGroup {
    options: Array<RadioSettings>,
    instructions: string,
    disabled: boolean,
    label: string,
    name: string,
    css: string,
    class: string,
    attributes: {
        [name:string]: string|number,
    },
}
export interface RadioGroupSettings {
    label: string,
    instructions?: string,
    options: Array<RadioSettings>,
    disabled?: boolean,
    name: string,
    css?: string,
    class?: string,
    attributes?: {
        [name:string]: string|number,
    },
}
export default class RadioGroup extends SuperComponent<IRadioGroup>{
    constructor(settings:RadioGroupSettings){
        super();
        settings.options.map(option => {
            option.name = settings.name;
            option.disabled = settings?.disabled ?? false;
        });
        this.model = {
            label: "",
            instructions: "",
            disabled: false,
            name: "",
            options: [],
            css: "",
            class: "",
            attributes: {},
        };
        Object.keys(this.dataset).map(key => {
            if (key in this.model){
                this.model[key] = this.dataset[key];
            }
        });
        env.css("radio-group").then(() => {
            this.update(settings);
        });
    }

    public getName():string {
        return this.model.name;
    }

    public getValue():string {
        const input:HTMLInputElement = this.querySelector("input:checked");
        return input.value;
    }

    override render(){
        const view = html`
            <p>
                <strong>${this.model.label}</strong>
                ${this.model.instructions}
            </p>
            ${this.model.options.map(option => {
                return new Radio(option);
            })}
        `;
        this.className = `${this.model.class} ${this.model.disabled ? "is-disabled" : ""}`;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        render(view, this);
    }
}
env.mount("radio-group", RadioGroup);