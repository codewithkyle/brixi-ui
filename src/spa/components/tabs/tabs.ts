import { html, render, TemplateResult } from "lit-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import Sortable from "sortablejs";
import "~brixi/components/buttons/button/button";
import { UUID } from "@codewithkyle/uuid";
import Component from "~brixi/component";

env.css(["tabs", "button"]);

export interface ITab {
    label: string;
    value: string | number;
    icon?: string;
    active?: boolean;
    index?: number;
}
export interface ITabs {
    tabs: Array<ITab>;
    active: number;
    sortable: boolean;
    expandable: boolean;
    shrinkable: boolean;
}
export default class Tabs extends Component<ITabs> {
    private firstRender: boolean;

    constructor() {
        super();
        this.firstRender = true;
        this.model = {
            tabs: [],
            active: 0,
            sortable: false,
            expandable: false,
            shrinkable: false,
        };
    }

    static get observedAttributes() {
        return ["data-tabs", "data-active", "data-sortable", "data-expandable", "data-shrinkable"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
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

    private handleClick: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
        const { value, index } = (e as CustomEvent).detail;
        this.callback(value, index);
    };

    public callback(value: string | number, index: number) {
        this.set({ active: index });
        this.dispatchEvent(
            new CustomEvent("change", {
                detail: {
                    value: value,
                },
                bubbles: true,
                cancelable: true,
            })
        );
    }

    private sort() {
        const tabsContainer = this.querySelector("tabs-container");
        Sortable.create(tabsContainer, {
            animation: 150,
            onUpdate: () => {
                const values = this.getOrder();
                this.dispatchEvent(
                    new CustomEvent("sort", {
                        detail: {
                            values: values,
                        },
                        bubbles: true,
                        cancelable: true,
                    })
                );
            },
        });
        tabsContainer.addEventListener("sort", (e) => {
            e.stopImmediatePropagation();
        });
        tabsContainer.addEventListener("change", (e) => {
            e.stopImmediatePropagation();
        });
    }

    private addTab() {
        const label = window.prompt("New Tab Label");
        if (label != null && label.trim() !== "") {
            const value = UUID();
            this.dispatchEvent(
                new CustomEvent("add", {
                    detail: {
                        label: label.trim(),
                        value: value,
                    },
                    bubbles: true,
                    cancelable: true,
                })
            );
            const tab: ITab = {
                label: label,
                value: value,
            };
            const updated = this.get();
            updated.tabs.push(tab);
            this.set(updated);
            //this.sort();
            this.callback(value, updated.tabs.length - 1);
            //this.resetIndexes();
        }
    }

    public resetIndexes() {
        this.querySelectorAll("tab-component").forEach((tab: Tab, index) => {
            tab.setAttribute("data-index", index.toString());
        });
    }

    private renderAddButton() {
        let out: string | TemplateResult;
        if (this.model.expandable) {
            out = html`
                <button-component
                    data-kind="text"
                    data-color="grey"
                    data-icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>'
                    data-icon-position="center"
                    data-shape="round"
                    style="margin-bottom:6px;"
                    @click=${this.addTab.bind(this)}
                ></button-component>
            `;
        } else {
            out = "";
        }
        return out;
    }

    override render() {
        const view = html`
            <tabs-container>
                ${this.model.tabs.map((tab, index) => {
                    const isActive = index === this.model.active;
                    return html`
                        <tab-component
                            data-label=${tab.label}
                            data-value=${tab.value}
                            data-icon=${tab.icon}
                            data-active=${isActive}
                            data-index=${index}
                            @tab=${this.handleClick}
                        ></tab-component>
                    `;
                })}
            </tabs-container>
            ${this.renderAddButton()}
        `;
        render(view, this);
        if (this.model.sortable && this.firstRender) {
            this.firstRender = false;
            this.sort();
        }
    }
}
class Tab extends Component<ITab> {
    constructor() {
        super();
        this.model = {
            label: "",
            value: "",
            icon: "",
            active: false,
            index: 0,
        };
        this.render();
    }

    static get observedAttributes() {
        return ["data-label", "data-value", "data-icon", "data-active", "data-index", "data-index"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
        this.addEventListener("click", this.handleClick);
    }

    override disconnected() {
        this.removeEventListener("click", this.handleClick);
    }

    private handleClick = () => {
        this.dispatchEvent(
            new CustomEvent("tab", {
                detail: {
                    value: this.model.value,
                    index: this.model.index,
                },
                bubbles: true,
                cancelable: true,
            })
        );
    };

    private renderIcon() {
        let out: string | TemplateResult;
        if (this.model?.icon?.length) {
            out = html` <i> ${unsafeHTML(decodeURI(this.model.icon))} </i> `;
        } else {
            out = "";
        }
        return out;
    }

    override render() {
        const view = html`<span>${this.renderIcon()} ${this.model.label}</span>`;
        this.tabIndex = 0;
        this.setAttribute("sfx", "button");
        this.className = `${this.model.active ? "is-active" : ""} ${this.model?.icon ? "has-icon" : ""}`;
        this.setAttribute("role", "button");
        this.setAttribute("aria-label", `Open ${this.model.label}`);
        render(view, this);
    }
}
env.bind("tab-component", Tab);
env.bind("tabs-component", Tabs);
