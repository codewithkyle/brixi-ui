import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import Component from "~brixi/component";
import env from "~brixi/controllers/env";
import pos from "~brixi/controllers/pos";
import { noop } from "~brixi/utils/general";

env.css("overflow-menu");

export interface OverflowItem {
    label: string;
    id: string;
    icon?: string;
    danger?: boolean;
}
export interface IOverflowMenu {
    items: Array<OverflowItem>;
    uid: string;
    offset?: number;
    target: HTMLElement;
    callback: (id: string) => void;
}
export default class OverflowMenu extends Component<IOverflowMenu> {
    constructor(settings: IOverflowMenu) {
        super();
        this.model = {
            items: [],
            uid: null,
            offset: 0,
            target: null,
            callback: noop,
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
        e.stopImmediatePropagation();
        // @ts-ignore
        this.model.callback(e.currentTarget.dataset.id);
    };

    private renderItem(item: OverflowItem) {
        if (item === null) {
            return html`<hr />`;
        }
        return html`
            <button sfx="button" type="button" @click=${this.handleItemClick} data-id="${item.id}" class="${item?.danger ? "danger" : ""}">
                ${item?.icon ? html` <i> ${unsafeHTML(decodeURI(item.icon))} </i> ` : ""}
                <span>${item.label}</span>
            </button>
        `;
    }

    override render() {
        if (!this.isConnected) {
            document.body.appendChild(this);
        }
        this.setAttribute("overflow-menu-container-id", this.model.uid);
        const view = html`
            ${this.model.items.map((item) => {
                return this.renderItem(item);
            })}
        `;
        render(view, this);
        pos.positionElementToElement(this, this.model.target, this.model.offset);
    }
}
env.bind("overflow-menu", OverflowMenu);
