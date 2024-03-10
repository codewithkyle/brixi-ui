import { html, render, TemplateResult } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import pos from "~brixi/controllers/pos";

env.css(["context-menu"]);

export interface ContextMenuItem {
    label: string;
    hotkey?: string;
    callback: Function;
}
export interface IContextMenu {
    items: ContextMenuItem[];
    x: number;
    y: number;
}
export interface ContextMenuSettings {
    items: ContextMenuItem[];
    x: number;
    y: number;
}
export default class ContextMenu extends SuperComponent<IContextMenu> {
    constructor(settings: ContextMenuSettings) {
        super();
        this.model = {
            items: [],
            x: 0,
            y: 0,
        };
        this.set(settings);
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
        if (this.model.items?.[index]?.callback && typeof this.model.items?.[index]?.callback === "function") {
            this.model.items[index].callback();
        }
    };

    private renderItem(item: ContextMenuItem, index: number): TemplateResult {
        if (item === null) {
            return html`<hr />`;
        }
        return html`
            <button sfx="button" type="button" @click=${this.handleItemClick} data-index="${index}">
                <span>${item.label}</span>
                ${item.hotkey ? html`<span class="font-grey-400">${item.hotkey}</span>` : ""}
            </button>
        `;
    }

    override render() {
        if (!this.isConnected) {
            document.body.appendChild(this);
        }
        const view = html` ${this.model.items?.map((item, index) => this.renderItem(item, index))} `;
        render(view, this);
        pos.positionElement(this, this.model.x, this.model.y);
    }
}
env.bind("context-menu", ContextMenu);
