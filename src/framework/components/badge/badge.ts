import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";

export interface IBadge {
    value: number,
    offsetX: number,
    offsetY: number,
}
export interface BadgeSettings {
    value?: number,
    offsetX?: number,
    offsetY?: number,
}
export default class Badge extends SuperComponent<IBadge>{
    constructor(settings:BadgeSettings = {}){
        super();
        this.model = {
            value: null,
            offsetX: 0,
            offsetY: 0,
        };
        env.css(["badge"]).then(()=>{
            this.update(settings);
        });
    }

    override render(){
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
        this.style.transform = `translate(${this.model.offsetX}px, ${this.model.offsetY}px)`;
        render(view, this);
    }
}
env.mount("badge-component", Badge);
