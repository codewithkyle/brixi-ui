import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import Component from "~brixi/component";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";

env.css(["button"]);

export type ButtonKind = "solid" | "outline" | "text";
export type ButtonColor = "primary" | "danger" | "grey" | "success" | "warning" | "white";
export type ButtonShape = "pill" | "round" | "sharp" | "default";
export type ButtonSize = "default" | "slim" | "large";
export type ButtonType = "submit" | "button" | "reset";

export interface IButton {
    label: string;
    icon: string;
    iconPosition: "left" | "right" | "center";
    kind: ButtonKind;
    color: ButtonColor;
    shape: ButtonShape;
    size: ButtonSize;
    disabled: boolean;
    type: ButtonType;
}
export default class Button extends Component<IButton> {
    constructor() {
        super();
        this.model = {
            label: null,
            kind: "solid",
            color: "grey",
            shape: "default",
            size: "default",
            icon: "",
            iconPosition: "left",
            disabled: false,
            type: "button",
        };
    }

    static get observedAttributes() {
        return ["data-label", "data-icon", "data-icon-position", "data-kind", "data-color", "data-shape", "data-size", "data-disabled", "data-type"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
        this.addEventListener("keydown", this.handleKeydown);
        this.addEventListener("keyup", this.handleKeyup);
        this.addEventListener("click", this.handleClick);
    }

    private renderIcon(): string | TemplateResult {
        let icon: string | TemplateResult = "";
        if (this.model.icon.length) {
            icon = html`${unsafeHTML(this.model.icon)}`;
        } else {
            icon = "";
        }
        return icon;
    }

    private renderLabel(): string | TemplateResult {
        let label: string | TemplateResult = "";
        if (this.model.label != null) {
            label = html`<span>${this.model.label}</span>`;
        } else {
            label = "";
        }
        return label;
    }

    private dispatchClick() {
        this.dispatchEvent(new CustomEvent("action", { bubbles: true, cancelable: true }));
    }

    private handleClick: EventListener = () => {
        if (this.model.disabled) {
            return;
        }
        this.dispatchClick();
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
                this.dispatchClick();
            }
        }
    };

    override render() {
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
