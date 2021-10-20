import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";
import { noop } from "~utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export interface Tab {
    label: string,
    value: string|number,
    icon?: string,
}
export interface ITabs {
    tabs: Array<Tab>,
    callback: (tab:string)=>void,
    active: number,
    css: string,
    class: string,
    attributes: {
        [name:string]: string|number,
    },
}
export interface TabsSettings {
    tabs: Array<Tab>,
    callback: (tab:string)=>void,
    css?: string,
    class?: string,
    attributes?: {
        [name:string]: string|number,
    },
}
export default class Tabs extends SuperComponent<ITabs>{
    constructor(settings:TabsSettings){
        super();
        this.model = {
            tabs: [],
            callback: noop,
            active: 0,
            css: "",
            class: "",
            attributes: {},
        };
        Object.keys(this.dataset).map(key => {
            if (key in this.model){
                this.model[key] = this.dataset[key];
            }
        });
        env.css(["tabs"]).then(()=>{
            this.update(settings);
        });
    }

    private renderIcon(tab){
        let out;
        if (tab?.icon?.length){
            out = html`
                <i>
                    ${unsafeHTML(tab.icon)}
                </i>
            `;
        } else {
            out = "";
        }
        return out;
    }

    private handleClick:EventListener = (e:Event) => {
        const target = e.currentTarget as HTMLElement;
        this.model.callback(target.dataset.value);
        this.update({
            active: parseInt(target.dataset.index),
        });
    }

    override render(){
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html`
            ${this.model.tabs.map((tab, index) => {
                const isActive = index === this.model.active;
                return html`
                    <button class="${isActive ? "is-active" : ""}" data-value="${tab.value}" data-index="${index}" @click=${this.handleClick} sfx="button">
                        ${this.renderIcon(tab)}
                        ${tab.label}
                    </button>
                `;
            })}
        `;
        render(view, this);
    }
}
env.mount("tabs-component", Tabs);
