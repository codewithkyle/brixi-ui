import SuperComponent from "@codewithkyle/supercomponent";
import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~controllers/env";
import { uuid, parseDataset } from "~utils/general";

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
            this.update(settings);
        });
    }

    override connected() {
        document.addEventListener(
            "click",
            () => {
                document.body
                    .querySelectorAll(
                        `overflow-container[container-id="${this.model.uid}"].is-visible`
                    )
                    .forEach((container: HTMLElement) => {
                        container.remove();
                    });
            },
            { passive: true, capture: true }
        );
        window.addEventListener(
            "resize",
            () => {
                document.body
                    .querySelectorAll(
                        `overflow-container[container-id="${this.model.uid}"].is-visible`
                    )
                    .forEach((container: HTMLElement) => {
                        container.remove();
                    });
            },
            { passive: true, capture: true }
        );
        window.addEventListener(
            "scroll",
            () => {
                document.body
                    .querySelectorAll(
                        `overflow-container[container-id="${this.model.uid}"].is-visible`
                    )
                    .forEach((container: HTMLElement) => {
                        container.remove();
                    });
            },
            { passive: true, capture: true }
        );
    }

    private handleClick: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const bounds = target.getBoundingClientRect();
        const container = this.querySelector(
            "overflow-container"
        ) as HTMLElement;
        if (container) {
            const clone = container.cloneNode(true) as HTMLElement;
            const containerBounds = container.getBoundingClientRect();
            let top = bounds.top + bounds.height;
            if (top + containerBounds.height >= window.innerHeight) {
                top = bounds.top - containerBounds.height;
            }
            let left = bounds.left;
            if (left + containerBounds.width >= window.innerWidth) {
                left = bounds.left + bounds.width - containerBounds.width;
            }
            clone.style.top = `${top}px`;
            clone.style.left = `${left}px`;
            clone.classList.toggle("is-visible");
            document.body.appendChild(clone);
        }
    };

    private renderItem(item: OverflowItem) {
        if (item === null) {
            return html`<hr />`;
        }
        return html`
            <button
                sfx="button"
                type="button"
                @click=${item.callback}
                class="${item?.danger ? "danger" : ""}"
            >
                ${item?.icon ? html` <i> ${unsafeHTML(item.icon)} </i> ` : ""}
                <span>${item.label}</span>
            </button>
        `;
    }

    override render() {
        this.style.cssText = this.model.css;
        this.className = this.model.class;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html`
            <button
                @click=${this.handleClick}
                sfx="button"
                type="button"
                aria-label="${this.model.tooltip || "open menu"}"
                tooltip
            >
                ${unsafeHTML(this.model.icon)}
            </button>
            <overflow-container container-id="${this.model.uid}">
                ${this.model.items.map((item) => {
                    return this.renderItem(item);
                })}
            </overflow-container>
        `;
        render(view, this);
    }
}
env.mount("overflow-menu", OverflowMenu);
