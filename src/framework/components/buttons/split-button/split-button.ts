import { html, render, TemplateResult } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

type ButtonType = "submit" | "button" | "reset";

export interface ISplitButton {
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    type: ButtonType;
    label: string;
    icon?: string | HTMLElement;
    buttons: Array<{
        label: string;
        type?: ButtonType;
        icon?: string | HTMLElement;
        callback: Function;
        danger?: boolean;
    }>;
    callback: Function;
}
export interface SplitButtonSettings {
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    type: ButtonType;
    label: string;
    icon?: string | HTMLElement;
    buttons: Array<{
        label: string;
        type?: ButtonType;
        icon?: string | HTMLElement;
        callback: Function;
        danger?: boolean;
    }>;
    callback: Function;
}
export default class SplitButton extends SuperComponent<ISplitButton> {
    constructor(settings: SplitButtonSettings) {
        super();
        this.model = {
            css: "",
            class: "",
            attributes: {},
            type: "button",
            label: "",
            buttons: [],
            icon: "",
            callback: noop,
        };
        this.model = parseDataset<ISplitButton>(this.dataset, this.model);
        env.css(["split-button", "button"]).then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    private hideMenu = () => {
        const buttonMenu: HTMLElement = this.querySelector("button-menu");
        if (buttonMenu) {
            buttonMenu.style.visibility = "hidden";
        }
    };

    private handlePrimaryClick = () => {
        this.model.callback();
    };

    private handleSecondaryClick = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const index = parseInt(target.dataset.index);
        this.model.buttons[index].callback();
    };

    private openMenu = () => {
        const buttonMenu: HTMLElement = this.querySelector("button-menu");
        if (buttonMenu) {
            buttonMenu.style.visibility = "visible";
            const firstMenuBttn: HTMLElement = buttonMenu.querySelector("button-menu button");
            console.log(firstMenuBttn);
            if (firstMenuBttn) {
                firstMenuBttn.focus();
            }
        }
    };

    private renderIcon(icon: string | HTMLElement): string | TemplateResult {
        let out: string | TemplateResult;
        if (icon instanceof HTMLElement) {
            out = html` <i class="icon">${icon}</i> `;
        } else if (typeof icon === "string" && icon.length) {
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
        return html` <button type=${this.model.type} @click=${this.handlePrimaryClick}>${this.renderIcon(this.model.icon)} ${this.renderLabel(this.model.label)}</button> `;
    }

    private renderMenuButtons(): string | TemplateResult {
        let out: string | TemplateResult;
        if (this.model.buttons.length) {
            out = html`
                <button class="split" aria-label="Open button menu" type="button" @click=${this.openMenu} @focus=${this.hideMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
                <button-menu>
                    ${this.model.buttons.map((button, i) => {
                        if (button === null) {
                            return html`<hr />`;
                        } else {
                            return html`
                                <button class="${button?.danger ? "danger" : ""}" type="${button?.type ?? "button"}" @click=${this.handleSecondaryClick} data-index="${i}">
                                    ${this.renderIcon(button?.icon ?? "")} ${this.renderLabel(button.label)}
                                </button>
                            `;
                        }
                    })}
                </button-menu>
            `;
        } else {
            out = "";
        }
        return out;
    }

    override render() {
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html` ${this.renderPrimaryButton()} ${this.renderMenuButtons()} `;
        render(view, this);
    }
}
env.bind("split-button", SplitButton);
