import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";
import { noop } from "~utils/general";
import soundscape from "~controllers/soundscape";

export interface IRadio {
    label: string,
    required: boolean,
    name: string,
    checked: boolean,
    disabled: boolean,
    className: string,
    callback: Function,
}
export interface RadioSettings {
    label: string,
    name?: string,
    required?: boolean,
    checked?: boolean,
    disabled?: boolean,
    className?: string,
    callback?: Function,
}
export default class Radio extends SuperComponent<IRadio>{
    constructor(settings:RadioSettings){
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
        env.css("radio").then(() => {
            this.update(settings);
        });
    }

    public getName(){
        return this.model.name;
    }

    public getValue(){
        const input = this.querySelector("input");
        return input.checked;
    }

    public validate():boolean{
        return true;
    }

    private handleChange:EventListener = (e:Event) => {
        const target = e.currentTarget as HTMLInputElement;
        this.model.callback(target.checked);
    }

    render(){
        const id = `${this.model.label.replace(/\s+/g, "-").trim()}-${this.model.name}`;
        const view = html`
            <div class="inline-block mr-auto">
                <input @change=${this.handleChange} type="radio" name="${this.model.name}" id="${id}" ?checked=${this.model.checked} ?disabled=${this.model.disabled} >
                <label sfx="button" for="${id}">
                    <i tabindex="0" role="button" aria-label=${`click to ${this.model.checked ? "uncheck" : "check"} the option ${this.model.label}`}></i>
                    <span>${this.model.label}</span>
                </label>
            </div>
        `;
        this.setAttribute("state", this.state);
        this.className = `radio js-input ${this.model.className}`;
        render(view, this);
    }
}
env.mount("radio-component", Radio);