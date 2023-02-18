import SuperComponent from "@codewithkyle/supercomponent";
import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";

type ButtonKind = "solid" | "outline" | "text";
type ButtonColor = "primary" | "black" | "white" | "grey" | "success" | "warning" | "danger" | "info";
type ButtonShape = "pill" | "round" | "sharp" | "default";
type ButtonSize = "default" | "slim" | "large";
type ButtonType = "submit" | "button" | "reset";

export interface IButton {
    label: string;
    icon: string;
    iconPosition: "left" | "right" | "center";
    kind: ButtonKind;
    color: ButtonColor;
    shape: ButtonShape;
    size: ButtonSize;
    callback: Function;
    tooltip: string;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    disabled: boolean;
    type: ButtonType;
}
export interface ButtonSettings {
    label?: string;
    callback?: Function;
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
    type?: ButtonType;
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
            type: "button",
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
        if (this.model.type === "submit") {
            this.closest("form").submit();
        }
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
                if (this.model.type === "submit") {
                    this.closest("form").submit();
                }
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
        this.setAttribute("type", this.model.type);
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
env.bind("button-component", Button);
