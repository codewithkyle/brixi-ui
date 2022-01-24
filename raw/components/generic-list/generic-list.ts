import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { parseDataset } from "~brixi/utils/general";

export type ItemStyle = "disc" | "circle" | "decimal" | "leading-zero" | "square" | "custom";
export interface List {
    type: "ordered" | "unordered";
    style?: ItemStyle;
    items: Array<string | number>;
    sub?: List;
    icon?: string;
}
export interface IGenericList {
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    list: List;
}
export interface GenericListSettings {
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    list: List;
}
export default class GenericList extends SuperComponent<IGenericList> {
    constructor(settings: GenericListSettings) {
        super();
        this.model = {
            css: "",
            class: "",
            attributes: {},
            list: null,
        };
        this.model = parseDataset<IGenericList>(this.dataset, this.model);
        env.css(["generic-list"]).then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    private renderStyleType(style: ItemStyle, custom: string) {
        switch (style) {
            case "circle":
                return "circle";
            case "disc":
                return "disc";
            case "decimal":
                return "decimal";
            case "leading-zero":
                return "decimal-leading-zero";
            case "square":
                return "square";
            case "custom":
                return `"\\${custom}"`;
            default:
                return "disc";
        }
    }

    private renderItem(item, style: ItemStyle = "disc", customIcon = "") {
        return html` <li style="list-style-type:${this.renderStyleType(style, customIcon)};">${unsafeHTML(item)}</li> `;
    }

    private renderList(list: List) {
        switch (list?.type) {
            case "ordered":
                return html`
                    <ol class="list">
                        ${list.items.map((item) => this.renderItem(item, list?.style, list?.icon))} ${list?.sub ? this.renderList(list.sub) : ""}
                    </ol>
                `;
            default:
                return html`
                    <ul class="list">
                        ${list.items.map((item) => this.renderItem(item, list?.style, list?.icon))} ${list?.sub ? this.renderList(list.sub) : ""}
                    </ul>
                `;
        }
    }

    override render() {
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html` ${this.renderList(this.model.list)} `;
        render(view, this);
    }
}
env.mount("generic-list", GenericList);
