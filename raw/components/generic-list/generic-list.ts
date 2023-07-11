import { html, render } from "lit-html";
import env from "~brixi/controllers/env";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import Component from "~brixi/component";
import { parseDataset } from "~brixi/utils/general";

env.css(["generic-list"]);

export type ItemStyle = "disc" | "circle" | "decimal" | "leading-zero" | "square" | "custom";
export type ListType = "ordered" | "unordered";
export interface List {
    type: ListType;
    style?: ItemStyle;
    items: Array<string>;
    sub?: List;
    icon?: string;
}
export interface IGenericList {
    list: List;
}
export default class GenericList extends Component<IGenericList> {
    constructor() {
        super();
        this.model = {
            list: null,
        };
    }

    static get observedAttributes() {
        return ["data-list"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
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

    private renderItem(item: string, style: ItemStyle = "disc", customIcon = "") {
        return html` <li style="list-style-type:${this.renderStyleType(style, customIcon)};">${unsafeHTML(decodeURI(item))}</li> `;
    }

    private renderList(list: List) {
        switch (list?.type) {
            case "ordered":
                return html`
                    <ol class="list">
                        ${list.items.map((item: string) => this.renderItem(item, list?.style, list?.icon))} ${list?.sub ? this.renderList(list.sub) : ""}
                    </ol>
                `;
            default:
                return html`
                    <ul class="list">
                        ${list.items.map((item: string) => this.renderItem(item, list?.style, list?.icon))} ${list?.sub ? this.renderList(list.sub) : ""}
                    </ul>
                `;
        }
    }

    override render() {
        const view = html` ${this.renderList(this.model.list)} `;
        render(view, this);
    }
}
env.bind("generic-list", GenericList);
