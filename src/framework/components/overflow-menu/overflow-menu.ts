import SuperComponent from "@codewithkyle/supercomponent";
import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";

export interface OverflowItem {
    label: string;
    callback: Function;
    icon?: string;
    danger?: boolean;
}
export interface IOverflowMenu {
    items: Array<OverflowItem>;
    uid: string;
}
export default class OverflowMenu extends SuperComponent<IOverflowMenu> {
    constructor(uid: string, items: Array<OverflowItem>) {
        super();
        this.model = {
            items: items,
            uid: uid,
        };
        env.css("overflow-menu").then(() => {
            this.render();
        });
    }

    override connected() {
        document.addEventListener(
            "click",
            () => {
                this.remove();
            },
            { passive: true, capture: true }
        );
        window.addEventListener(
            "resize",
            () => {
                this.remove();
            },
            { passive: true, capture: true }
        );
        window.addEventListener(
            "scroll",
            () => {
                this.remove();
            },
            { passive: true, capture: true }
        );
        this.addEventListener("click", (e: Event) => {
            e.stopImmediatePropagation();
        });
    }

    private handleItemClick: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const index = parseInt(target.dataset.index);
        this.model.items?.[index]?.callback();
    };

    private renderItem(item: OverflowItem, index: number) {
        if (item === null) {
            return html`<hr />`;
        }
        return html`
            <button sfx="button" type="button" @click=${this.handleItemClick} data-index="${index}" class="${item?.danger ? "danger" : ""}">
                ${item?.icon ? html` <i> ${unsafeHTML(item.icon)} </i> ` : ""}
                <span>${item.label}</span>
            </button>
        `;
    }

    override render() {
        this.setAttribute("overflow-menu-container-id", this.model.uid);
        const view = html`
            ${this.model.items.map((item, index) => {
                return this.renderItem(item, index);
            })}
        `;
        render(view, this);
    }
}
env.bind("overflow-menu", OverflowMenu);
