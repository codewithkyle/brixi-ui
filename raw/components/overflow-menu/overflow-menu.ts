import SuperComponent from "@codewithkyle/supercomponent";
import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import { UUID as uuid } from "@codewithkyle/uuid";

export interface OverflowItem {
    label: string;
    callback: Function;
    icon?: string;
    danger?: boolean;
}
export interface IOverflowMenu {
    icon: string;
    items: Array<OverflowItem>;
    tooltip: string;
    class: string;
    css: string;
    attributes: {
        [name: string]: string | number;
    };
    uid: string;
}
export interface OverflowMenuSettings {
    items: Array<OverflowItem>;
    icon?: string;
    tooltip?: string;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
}
export default class OverflowMenu extends SuperComponent<IOverflowMenu> {
    constructor(settings: OverflowMenuSettings) {
        super();
        this.model = {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>`,
            items: [],
            tooltip: null,
            class: "",
            css: "",
            attributes: {},
            uid: uuid(),
        };
        this.model = parseDataset<IOverflowMenu>(this.dataset, this.model);
        env.css("overflow-menu").then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    override connected() {
        document.addEventListener(
            "click",
            () => {
                document.body.querySelectorAll(`overflow-menu-container[overflow-menu-container-id="${this.model.uid}"].is-visible`).forEach((container: HTMLElement) => {
                    container.remove();
                });
            },
            { passive: true, capture: true }
        );
        window.addEventListener(
            "resize",
            () => {
                document.body.querySelectorAll(`overflow-container[overflow-menu-container-id="${this.model.uid}"].is-visible`).forEach((container: HTMLElement) => {
                    container.remove();
                });
            },
            { passive: true, capture: true }
        );
        window.addEventListener(
            "scroll",
            () => {
                document.body.querySelectorAll(`overflow-container[overflow-menu-container-id="${this.model.uid}"].is-visible`).forEach((container: HTMLElement) => {
                    container.remove();
                });
            },
            { passive: true, capture: true }
        );
        this.addEventListener("click", (e: Event) => {
            e.stopImmediatePropagation();
        });
    }

    private handleClick: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const bounds = target.getBoundingClientRect();
        const container = new OverflowMenuContainer(this.model.uid, this.model.items);
        document.body.appendChild(container);
        const containerBounds = container.getBoundingClientRect();
        let top = bounds.top + bounds.height;
        if (top + containerBounds.height >= window.innerHeight) {
            top = bounds.top - containerBounds.height;
        }
        let left = bounds.left;
        if (left + containerBounds.width >= window.innerWidth) {
            left = bounds.left + bounds.width - containerBounds.width;
        }
        container.style.top = `${top}px`;
        container.style.left = `${left}px`;
        container.classList.toggle("is-visible");
    };

    override render() {
        this.style.cssText = this.model.css;
        this.className = this.model.class;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html`
            <button @click=${this.handleClick} sfx="button" type="button" aria-label="${this.model.tooltip || "open menu"}" tooltip>${unsafeHTML(this.model.icon)}</button>
        `;
        render(view, this);
    }
}
env.mount("overflow-menu", OverflowMenu);

class OverflowMenuContainer extends HTMLElement {
    private uid: string;
    private items: Array<OverflowItem>;

    constructor(uid: string, items: Array<OverflowItem>) {
        super();
        this.uid = uid;
        this.items = items;
        this.render();
    }

    private handleItemClick: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const index = parseInt(target.dataset.index);
        this.items?.[index]?.callback();
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

    private render() {
        this.setAttribute("overflow-menu-container-id", this.uid);
        const view = html`
            ${this.items.map((item, index) => {
                return this.renderItem(item, index);
            })}
        `;
        render(view, this);
    }
}
env.mount("overflow-menu-container", OverflowMenuContainer);