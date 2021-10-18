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
}
export interface TabsSettings {
    tabs: Array<Tab>,
    callback: (tab:string)=>void,
}
export default class Tabs extends SuperComponent<ITabs>{
    constructor(settings:TabsSettings){
        super();
        this.model = {
            tabs: [],
            callback: noop,
            active: 0,
        };
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
