import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";
import { noop } from "~utils/general";

export interface ICheckbox {
    label: string,
    required: boolean,
    name: string,
    checked: boolean,
    disabled: boolean,
    className: string,
    callback: Function,
}
export interface CheckboxSettings {
    label: string,
    name?: string,
    required?: boolean,
    checked?: boolean,
    disabled?: boolean,
    className?: string,
    callback?: Function,
}
export default class Checkbox extends SuperComponent<ICheckbox>{
    constructor(settings:CheckboxSettings){
        super();
        this.model = {
            label: "",
            required: false,
            name: "",
            checked: false,
            disabled: false,
            className: "",
            callback: noop,
        };
        env.css("checkbox").then(() => {
            this.update(settings);
        });
    }

    private handleChange:EventListener = (e:Event) => {
        const target = e.currentTarget as HTMLInputElement;
        this.update({
            checked: target.checked,
        });
        this.model.callback(target.checked);
    }

    public getName():string{
        return this.model.name;
    }

    public getValue():boolean{
        return this.model.checked;
    }

    public validate():boolean{
        let isValid = true;
        if (this.model.required && !this.model.checked){
            isValid = false;
        }
        return isValid;
    }

    render(){
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${this.model.name}`;
        const view = html`
            <input @change=${this.handleChange} type="checkbox" name="${this.model.name}" id="${id}" .checked=${this.model.checked} ?disabled=${this.model.disabled} >
            <label for="${id}">
                <check-box role="button" tabindex="0" aria-label=${`click to ${this.model.checked ? "uncheck" : "check"} the box ${this.model.label}`}>
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </i>
                </check-box>
                <span>${this.model.label}</span>
            </label>
        `;
        this.setAttribute("state", this.state);
        this.className = `checkbox js-input ${this.model.className}`;
        render(view, this);
    }
}
env.mount("checkbox-component", Checkbox);