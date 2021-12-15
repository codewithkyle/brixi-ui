import SuperComponent from "@codewithkyle/supercomponent";
import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~controllers/env";
import { noop, parseDataset } from "~utils/general";

export interface IButton {
    label: string;
    icon: string;
    iconPosition: "left" | "right" | "center";
    kind: "solid" | "outline" | "text";
    color: "primary" | "black" | "white" | "grey" | "success" | "warning" | "danger";
    shape: "pill" | "round" | "sharp" | "default";
    size: "default" | "slim";
    callback: Function;
    tooltip: string;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
}
export interface ButtonSettings {
    label: string;
    callback: Function;
    kind?: "solid" | "outline" | "text";
    color?: "primary" | "black" | "white" | "grey" | "success" | "warning" | "danger";
    shape?: "pill" | "round" | "sharp" | "default";
    size?: "default" | "slim";
    icon?: string;
    iconPosition?: "left" | "right" | "center";
    tooltip?: string;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
}
export default class Button extends SuperComponent<IButton> {
    constructor(settings: ButtonSettings) {
        super();
        this.model = {
            label: "",
            kind: "solid",
            color: "primary",
            shape: "default",
            size: "default",
            icon: "",
            iconPosition: "left",
            callback: noop,
            tooltip: null,
            css: "",
            class: "",
            attributes: {},
        };
        this.model = parseDataset<IButton>(this.dataset, this.model);
        const classes = ["button"];
        if (settings?.tooltip?.length || this.dataset?.tooltip?.length) {
            classes.push("tooltip");
        }
        env.css(classes).then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    private renderIcon() {
        let icon;
        if (this.model.icon.length) {
            icon = html`${unsafeHTML(this.model.icon)}`;
        } else {
            icon = "";
        }
        return icon;
    }

    private handleClick: EventListener = (e: Event) => {
        this.model.callback();
    };

    private handleKeydown: EventListener = (e: KeyboardEvent) => {
        if (e instanceof KeyboardEvent) {
            const key = e.key.toLowerCase();
            if (key === " ") {
                this.classList.add("is-active");
            }
        }
    };

    private handleKeyup: EventListener = (e: KeyboardEvent) => {
        if (e instanceof KeyboardEvent) {
            const key = e.key.toLowerCase();
            if (key === " ") {
                this.classList.remove("is-active");
                this.model.callback();
            }
        }
    };

    override connected() {
        this.addEventListener("click", this.handleClick);
        this.addEventListener("keydown", this.handleKeydown);
        this.addEventListener("keyup", this.handleKeyup);
    }

    override render() {
        this.style.cssText = this.model.css;
        this.className = this.model.class;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html` ${this.renderIcon()} ${this.model.label} `;
        this.className = "bttn";
        this.setAttribute("role", "button");
        this.tabIndex = 0;
        this.setAttribute("color", this.model.color);
        this.setAttribute("size", this.model.size);
        this.setAttribute("kind", this.model.kind);
        this.setAttribute("shape", this.model.shape);
        if (this.model.icon.length) {
            this.setAttribute("icon", this.model.iconPosition);
        }
        if (this.model.tooltip) {
            this.setAttribute("tooltip", this.model.tooltip);
        }
        this.setAttribute("sfx", "button");
        render(view, this);
    }
}
env.mount("button-component", Button);
