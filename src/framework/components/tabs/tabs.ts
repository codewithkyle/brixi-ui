import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import Sortable from "sortablejs";

export interface ITab {
    label: string;
    value: string | number;
    icon?: string | HTMLElement;
}
export interface ITabs {
    tabs: Array<ITab>;
    callback: (tab: string | number) => void;
    active: number;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    sortable: boolean;
}
export interface TabsSettings {
    tabs: Array<ITab>;
    callback: (tab: string | number) => void;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    sortable?: boolean;
}
export default class Tabs extends SuperComponent<ITabs> {
    constructor(settings: TabsSettings) {
        super();
        this.model = {
            tabs: [],
            callback: noop,
            active: 0,
            css: "",
            class: "",
            attributes: {},
            sortable: false,
        };
        this.model = parseDataset<ITabs>(this.dataset, this.model);
        env.css(["tabs"]).then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    /*
     * Returns the rendered order of the tabs.
     * Use the array of tab values to determine the order.
     */
    public getOrder(): Array<string | number> {
        const values = [];
        this.querySelectorAll("tab-component").forEach((tab: Tab) => {
            values.push(tab.model.value);
        });
        return values;
    }

    public callback(value: string | number, index: number) {
        this.set(
            {
                active: index,
            },
            true
        );
        this.model.callback(value);
        this.querySelectorAll("tab-component").forEach((tab: Tab) => {
            if (tab.index === index) {
                tab.classList.add("is-active");
            } else {
                tab.classList.remove("is-active");
            }
        });
    }

    private sort() {
        const tabsContainer = this.querySelector("tabs-container");
        Sortable.create(tabsContainer);
    }

    override render() {
        console.log(this.model);
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html`
            <tabs-container>
                ${this.model.tabs.map((tab, index) => {
                    const isActive = index === this.model.active;
                    return new Tab(tab, this, isActive, index);
                })}
            </tabs-container>
        `;
        render(view, this);
        if (this.model.sortable) {
            setTimeout(this.sort.bind(this), 80);
        }
    }
}
class Tab extends SuperComponent<ITab> {
    private isActive: boolean;
    private parent: Tabs;
    public index: number;

    constructor(tab: ITab, parent: Tabs, active: boolean, index: number) {
        super();
        this.model = tab;
        this.isActive = active;
        this.parent = parent;
        this.index = index;
        this.render();
    }

    private handleClick = (e) => {
        this.parent.callback(this.model.value, this.index);
    };

    private renderIcon() {
        let out;
        if (this.model?.icon instanceof HTMLElement) {
            out = html`<i>${this.model.icon}</i>`;
        } else if (typeof this.model?.icon === "string" && this.model?.icon?.length) {
            out = html` <i> ${unsafeHTML(this.model.icon)} </i> `;
        } else {
            out = "";
        }
        return out;
    }

    override render() {
        const view = html` ${this.renderIcon()} ${this.model.label} `;
        this.tabIndex = 0;
        this.setAttribute("sfx", "button");
        this.className = this.isActive ? "is-active" : "";
        this.setAttribute("role", "button");
        this.setAttribute("aria-label", `Open ${this.model.label}`);
        render(view, this);
    }

    override connected() {
        this.addEventListener("click", this.handleClick);
    }

    override disconnected(): void {
        this.removeEventListener("click", this.handleClick);
    }
}
env.bind("tab-component", Tab);
env.bind("tabs-component", Tabs);
