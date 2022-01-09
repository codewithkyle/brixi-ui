import SuperComponent from "@codewithkyle/supercomponent";
import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";

export interface IButton {
    label: string;
    icon: string;
    iconPosition: "left" | "right" | "center";
    kind: "solid" | "outline" | "text";
    color: "primary" | "black" | "white" | "grey" | "success" | "warning" | "danger" | "info";
    shape: "pill" | "round" | "sharp" | "default";
    size: "default" | "slim" | "large";
    callback: Function;
    tooltip: string;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    disabled: boolean;
}
export interface ButtonSettings {
    label?: string;
    callback: Function;
    kind?: "solid" | "outline" | "text";
    color?: "primary" | "black" | "white" | "grey" | "success" | "warning" | "danger" | "info";
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
    disabled?: boolean;
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
            disabled: false,
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

    private renderLabel() {
        let label;
        if (this.model.label.length) {
            label = html`<span>${this.model.label}</span>`;
        } else {
            label = "";
        }
        return label;
    }

    private handleClick: EventListener = (e: Event) => {
        e.stopImmediatePropagation();
        if (this.model.disabled) {
            return;
        }
        this.model.callback();
    };

    private handleKeydown: EventListener = (e: KeyboardEvent) => {
        if (e instanceof KeyboardEvent) {
            const key = e.key.toLowerCase();
            if (key === " ") {
                e.stopImmediatePropagation();
                if (this.model.disabled) {
                    return;
                }
                this.classList.add("is-active");
            }
        }
    };

    private handleKeyup: EventListener = (e: KeyboardEvent) => {
        if (e instanceof KeyboardEvent) {
            const key = e.key.toLowerCase();
            if (key === " ") {
                e.stopImmediatePropagation();
                if (this.model.disabled) {
                    return;
                }
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
        this.className = `${this.model.class} bttn`;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html` ${this.renderIcon()} ${this.renderLabel()} `;
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
        if (this.model.disabled) {
            this.setAttribute("disabled", "true");
        } else {
            this.removeAttribute("disabled");
        }
        render(view, this);
    }
}
env.mount("button-component", Button);
