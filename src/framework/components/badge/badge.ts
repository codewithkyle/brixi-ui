import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";

export interface IBadge {
    value: number,
    offsetX: number,
    offsetY: number,
    css: string,
    class: string,
    attributes: {
        [name:string]: string|number,
    },    
}
export interface BadgeSettings {
    value?: number,
    offsetX?: number,
    offsetY?: number,
    css?: string,
    class?: string,
    attributes?: {
        [name:string]: string|number,
    },
}
export default class Badge extends SuperComponent<IBadge>{
    constructor(settings:BadgeSettings = {}){
        super();
        this.model = {
            value: null,
            offsetX: 0,
            offsetY: 0,
            css: "",
            class: "",
            attributes: {},
        };
        Object.keys(this.dataset).map(key => {
            if (key in this.model){
                this.model[key] = this.dataset[key];
            }
        });
        env.css(["badge"]).then(()=>{
            this.update(settings);
        });
    }

    override render(){
        this.style.cssText = `${this.model.css} transform: translate(${this.model.offsetX}px, ${this.model.offsetY}px);`
        this.className = this.model.class;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const hasValue = this.model.value !== null;
        if (hasValue){
            this.className = "-text";
        }
        let value:string|number = this.model.value;
        if (value > 9){
            value = "9+";
        }
        const view = html`
            ${hasValue ?  html`<span>${value}</span>` : ""}
        `;
        render(view, this);
    }
}
env.mount("badge-component", Badge);
