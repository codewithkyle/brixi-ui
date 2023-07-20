import { html, render } from "lit-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import OverflowMenu, { OverflowItem } from "~brixi/components/overflow-menu/overflow-menu";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { UUID } from "@codewithkyle/uuid";
import Component from "~brixi/component";
import type { ButtonColor, ButtonKind, ButtonShape, ButtonSize } from "../button/button";

env.css(["button"]);

export interface IOverflowButton {
    icon: string;
    iconPosition: "left" | "right" | "center";
    kind: ButtonKind;
    color: ButtonColor;
    shape: ButtonShape;
    size: ButtonSize;
    disabled: boolean;
    items: Array<OverflowItem>;
}
export default class OverflowButton extends Component<IOverflowButton> {
    private uid: string;

    constructor() {
        super();
        this.uid = UUID();
        this.model = {
            kind: "text",
            color: "grey",
            shape: "round",
            size: "default",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>`,
            iconPosition: "center",
            disabled: false,
            items: [],
        };
    }

    static get observedAttributes() {
        return ["data-kind", "data-color", "data-shape", "data-size", "data-icon", "data-icon-position", "data-disabled", "data-items"];
    }

    override connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
        this.addEventListener("click", this.handleClick);
    }

    private handleClick: EventListener = () => {
        new OverflowMenu({
            uid: this.uid,
            items: this.model.items,
            target: this,
            callback: (id: string) => {
                const event = new CustomEvent("action", {
                    detail: {
                        id: id,
                    },
                    bubbles: true,
                    cancelable: true,
                });
                this.dispatchEvent(event);
            },
        });
    };

    override render() {
        this.classList.add("bttn");
        this.setAttribute("kind", this.model.kind);
        this.setAttribute("color", this.model.color);
        this.setAttribute("shape", this.model.shape);
        this.setAttribute("icon", this.model.iconPosition);
        this.setAttribute("size", this.model.size);
        if (this.model.disabled) {
            this.setAttribute("disabled", `${this.model.disabled}`);
        }
        const view = html` ${unsafeHTML(this.model.icon)} `;
        render(view, this);
    }
}
env.bind("overflow-button", OverflowButton);
