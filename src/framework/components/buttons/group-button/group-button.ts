import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

type ButtonType = "submit" | "button" | "reset";

export interface IGroupButton {
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    buttons: Array<{
        label: string;
        type?: ButtonType;
        icon?: string | HTMLElement;
        callback: Function;
    }>;
}
export interface GroupButtonSettings {
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    buttons: Array<{
        label: string;
        type?: ButtonType;
        icon?: string | HTMLElement;
        callback: Function;
    }>;
}
export default class GroupButton extends SuperComponent<IGroupButton> {
    constructor(settings: GroupButtonSettings) {
        super();
        this.model = {
            css: "",
            class: "",
            attributes: {},
            buttons: [],
        };
        this.model = parseDataset<IGroupButton>(this.dataset, this.model);
        env.css(["group-button", "button"]).then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    private handleClick = (e) => {
        const target = e.currentTarget;
        const index = parseInt(target.dataset.index);
        this.model.buttons[index].callback();
    };

    private renderIcon(icon: string | HTMLElement) {
        let out;
        if (icon instanceof HTMLElement) {
            out = html` <i class="icon">${icon}</i> `;
        } else if (typeof icon === "string" && icon.length) {
            out = html` <i class="icon"> ${unsafeHTML(icon)} </i> `;
        } else {
            out = "";
        }
        return out;
    }

    private renderLabel(label: string) {
        let out;
        if (label) {
            out = html` <span>${label}</span> `;
        } else {
            out = "";
        }
        return out;
    }

    private renderButtons() {
        let out;
        if (!this.model.buttons.length) {
            out = "";
        } else {
            out = html`
                ${this.model.buttons.map((button, i) => {
                    return html`
                        <button class="bttn" @click=${this.handleClick} data-index="${i}" kind="outline" color="grey" type="${button?.type ?? "button"}">
                            ${this.renderIcon(button?.icon ?? "")} ${this.renderLabel(button.label)}
                        </button>
                    `;
                })}
            `;
        }
        return out;
    }

    override render() {
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html` ${this.renderButtons()} `;
        render(view, this);
    }
}
env.bind("group-button", GroupButton);
