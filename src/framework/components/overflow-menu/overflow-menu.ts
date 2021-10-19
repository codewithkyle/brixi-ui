import SuperComponent from "@codewithkyle/supercomponent";
import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~controllers/env";

export interface OverflowItem {
    label: string,
    callback: Function,
    icon?: string,
    danger?: boolean,
};
export interface IOverflowMenu {
    icon: "vertical" | "horizontal",
    items: Array<OverflowItem>,
    position: "left" | "right",
    tooltip: string,
    class: string,
    css: string,
};
export interface OverflowMenuSettings{
    items: Array<OverflowItem>,
    icon?: "vertical" | "horizontal" | string,
    position?: "left" | "right",
    tooltip?: string,
    css?: string,
    class?: string,
};
export default class OverflowMenu extends SuperComponent<IOverflowMenu>{
    constructor(settings:OverflowMenuSettings){
        super();
        this.model = {
            icon: "vertical",
            items: [],
            position: "right",
            tooltip: null,
            class: "",
            css: "",
        };
        env.css("overflow-menu").then(()=>{
            this.update(settings);
        });
    }

    private renderIcon(){
        switch (this.model.icon){
            case "horizontal":
                return html`
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                `;
            case "vertical":
                return html`
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                `;
            default:
                return html`${unsafeHTML(this.model.icon)}`;
        }
    }

    private renderItem(item:OverflowItem){
        if (item === null){
            return html`<hr>`;
        }
        return html`
            <button sfx="button" type="button" @click=${item.callback} class="${item?.danger ? "danger" : ""}">
                ${item?.icon ? html`
                    <i>
                        ${unsafeHTML(item.icon)}
                    </i>
                ` : ""}
                <span>${item.label}</span>
            </button>
        `;
    }

    override render(){
        this.style.cssText = this.model.css;
        this.className = this.model.class;
        const view = html`
            <button sfx="button" type="button" aria-label="${this.model.tooltip || "open overflow menu"}" ?tooltip=${this.model.tooltip}>
                ${this.renderIcon()}
            </button>
            <overflow-container class="${this.model.position}">
                ${this.model.items.map(item => {
                    return this.renderItem(item);
                })}
            </overflow-container>
        `;
        render(view, this);
    }
}
env.mount("overflow-menu", OverflowMenu);