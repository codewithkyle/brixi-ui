import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";
import Checkbox, { CheckboxSettings } from "~components/checkbox/checkbox";

export interface ICheckboxGroup {
    options: Array<CheckboxSettings>,
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
export interface CheckboxGroupSettings {
    label: string,
    instructions?: string,
    options: Array<CheckboxSettings>,
    disabled?: boolean,
    name: string,
    css?: string,
    class?: string,
    attributes?: {
        [name:string]: string|number,
    },
}
export default class CheckboxGroup extends SuperComponent<ICheckboxGroup>{
    constructor(settings:CheckboxGroupSettings){
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
        env.css("checkbox-group").then(() => {
            this.update(settings);
        });
    }

    public getName():string {
        return this.model.name;
    }

    public getValue(){
        const out = [];
        this.querySelectorAll("input:checked").forEach((input:HTMLInputElement) => {
            out.push(input.value);
        })
        return out;
    }

    override render(){
        const view = html`
            <p>
                <strong>${this.model.label}</strong>
                ${this.model.instructions}
            </p>
            ${this.model.options.map(option => {
                return new Checkbox(option);
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
env.mount("checkbox-group", CheckboxGroup);