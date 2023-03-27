import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import OverflowMenu, { OverflowItem } from "~brixi/components/overflow-menu/overflow-menu";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { UUID } from "@codewithkyle/uuid";
import pos from "~brixi/controllers/pos";

type ButtonKind = "solid" | "outline" | "text";
type ButtonColor = "primary" | "danger" | "grey" | "success" | "warning" | "info";
type ButtonShape = "pill" | "round" | "sharp" | "default";
type ButtonSize = "default" | "slim" | "large";

export interface IOverflowButton {
    icon: string;
    iconPosition: "left" | "right" | "center";
    kind: ButtonKind;
    color: ButtonColor;
    shape: ButtonShape;
    size: ButtonSize;
    tooltip: string;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    disabled: boolean;
    items: Array<OverflowItem>;
}
export interface OverflowButtonSettings {
    kind?: ButtonKind;
    color?: ButtonColor;
    shape?: ButtonShape;
    size?: ButtonSize;
    icon?: string;
    iconPosition?: "left" | "right" | "center";
    tooltip?: string;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    disabled?: boolean;
    items: Array<OverflowItem>;
}
export default class OverflowButton extends SuperComponent<IOverflowButton> {
    private uid: string;

    constructor(settings: OverflowButtonSettings) {
        super();
        this.uid = UUID();
        this.model = {
            kind: "text",
            color: "grey",
            shape: "round",
            size: "default",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>`,
            iconPosition: "center",
            tooltip: "Open menu",
            css: "",
            class: "",
            attributes: {},
            disabled: false,
            items: [],
        };
        this.model = parseDataset<IOverflowButton>(this.dataset, this.model);
        env.css(["button"]).then(() => {
            this.set(settings);
        });
    }

    override connected() {
        this.addEventListener("click", this.handleClick);
    }

    private handleClick: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
        const target = e.currentTarget as HTMLElement;
        const container = new OverflowMenu(this.uid, this.model.items);
        document.body.appendChild(container);
        pos.positionElementToElement(container, target);
    };

    override render() {
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        this.className = `bttn ${this.model.class}`;
        this.setAttribute("kind", this.model.kind);
        this.setAttribute("color", this.model.color);
        this.setAttribute("shape", this.model.shape);
        this.setAttribute("icon", this.model.iconPosition);
        this.setAttribute("size", this.model.size);
        if (this.model.disabled) {
            this.setAttribute("disabled", `${this.model.disabled}`);
        }
        this.setAttribute("tooltip", "");
        this.setAttribute("aria-label", this.model.tooltip);
        const view = html` ${unsafeHTML(this.model.icon)} `;
        render(view, this);
    }
}
env.bind("overflow-button", OverflowButton);
