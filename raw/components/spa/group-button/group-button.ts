import { html, render, TemplateResult } from "lit-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import type { ButtonType } from "~brixi/components/buttons/button/button";
import Component from "~brixi/component";

env.css(["group-button", "button"]);

export interface IGroupButton {
    buttons: Array<{
        label: string;
        type?: ButtonType;
        icon?: string;
        id: string;
    }>;
    active?: string;
}
export default class GroupButton extends Component<IGroupButton> {
    constructor() {
        super();
        this.model = {
            buttons: [],
            active: null,
        };
    }

    static get observedAttributes() {
        return ["data-buttons", "data-active"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
    }

    private handleClick = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        this.set({
            active: target.dataset.id,
        });
        const event = new CustomEvent("change", {
            detail: {
                id: target.dataset.id,
            },
            bubbles: true,
            cancelable: true,
        });
        this.dispatchEvent(event);
    };

    private renderIcon(icon: string) {
        let out: TemplateResult | string;
        if (icon?.length) {
            out = html` <i class="icon"> ${unsafeHTML(decodeURI(icon))} </i> `;
        } else {
            out = "";
        }
        return out;
    }

    private renderLabel(label: string) {
        let out: TemplateResult | string;
        if (label) {
            out = html` <span>${label}</span> `;
        } else {
            out = "";
        }
        return out;
    }

    private renderButtons() {
        let out: TemplateResult | string;
        if (!this.model.buttons.length) {
            out = "";
        } else {
            out = html`
                ${this.model.buttons.map((button) => {
                    return html`
                        <button
                            class="bttn ${button.id === this.model.active ? "is-active" : ""}"
                            @click=${this.handleClick}
                            data-id="${button.id}"
                            kind="outline"
                            color="grey"
                            sfx="button"
                            type="${button?.type ?? "button"}"
                        >
                            ${this.renderIcon(button?.icon ?? "")} ${this.renderLabel(button.label)}
                        </button>
                    `;
                })}
            `;
        }
        return out;
    }

    override render() {
        const view = html` ${this.renderButtons()} `;
        render(view, this);
    }
}
env.bind("group-button-component", GroupButton);
