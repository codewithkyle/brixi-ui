import { html, render, TemplateResult } from "lit-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import OverflowMenu, { OverflowItem } from "~brixi/components/overflow-menu/overflow-menu";
import { UUID } from "@codewithkyle/uuid";
import Component from "~brixi/component";
import type { ButtonType } from "../button/button";

env.css(["split-button", "button"]);

export interface ISplitButton {
    type: ButtonType;
    label: string;
    icon?: string;
    buttons: OverflowItem[];
    id: string;
}
export default class SplitButton extends Component<ISplitButton> {
    private uid: string;

    constructor() {
        super();
        this.uid = UUID();
        this.model = {
            type: "button",
            label: "",
            buttons: [],
            icon: "",
            id: "",
        };
    }

    static get observedAttributes() {
        return ["data-type", "data-label", "data-buttons", "data-icon"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
    }

    private hideMenu = () => {
        const buttonMenu: HTMLElement = this.querySelector("button-menu");
        if (buttonMenu) {
            buttonMenu.style.visibility = "hidden";
        }
    };

    private handlePrimaryClick = () => {
        this.dispatchEvent(
            new CustomEvent("action", {
                detail: {
                    id: this.model.id,
                },
                bubbles: true,
                cancelable: true,
            })
        );
    };

    private openMenu = () => {
        new OverflowMenu({
            target: this,
            uid: this.uid,
            items: this.model.buttons,
            offset: 4,
            callback: (id: string) => {
                this.dispatchEvent(
                    new CustomEvent("action", {
                        detail: {
                            id,
                        },
                        bubbles: true,
                        cancelable: true,
                    })
                );
            },
        });
    };

    private renderIcon(icon: string): string | TemplateResult {
        let out: string | TemplateResult;
        if (icon?.length) {
            out = html` <i class="icon"> ${unsafeHTML(icon)} </i> `;
        } else {
            out = "";
        }
        return out;
    }

    private renderLabel(label: string): string | TemplateResult {
        let out: string | TemplateResult;
        if (label) {
            out = html` <span>${label}</span> `;
        } else {
            out = "";
        }
        return out;
    }

    private renderPrimaryButton() {
        return html`
            <button sfx="button" type=${this.model.type} @click=${this.handlePrimaryClick}>${this.renderIcon(this.model.icon)} ${this.renderLabel(this.model.label)}</button>
        `;
    }

    private renderMenuButtons(): string | TemplateResult {
        let out: string | TemplateResult;
        if (this.model.buttons.length) {
            out = html`
                <button sfx="button" class="split" aria-label="Open button menu" type="button" @click=${this.openMenu} @focus=${this.hideMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
            `;
        } else {
            out = "";
        }
        return out;
    }

    override render() {
        const view = html` ${this.renderPrimaryButton()} ${this.renderMenuButtons()} `;
        render(view, this);
    }
}
env.bind("split-button", SplitButton);
