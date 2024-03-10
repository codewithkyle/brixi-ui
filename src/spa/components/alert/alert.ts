import { html, render, TemplateResult } from "lit-html";
import env from "~brixi/controllers/env";
import "~brixi/components/buttons/button/button";
import { parseDataset } from "~brixi/utils/general";
import Component from "~brixi/component";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

env.css(["alert", "button"]);

export interface ActionItem {
    label: string;
    id: string;
}
export interface IAlert {
    type: "warning" | "info" | "danger" | "success";
    heading: string;
    description: string;
    list: Array<string>;
    closeable: boolean;
    actions: Array<ActionItem>;
}
export default class Alert extends Component<IAlert> {
    constructor() {
        super();
        this.model = {
            type: "info",
            heading: null,
            description: null,
            list: [],
            closeable: false,
            actions: [],
        };
    }

    static get observedAttributes() {
        return ["data-type", "data-heading", "data-description", "data-list", "data-closeable", "data-actions"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
    }

    private renderIcon() {
        switch (this.model.type) {
            case "danger":
                return html` <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                    />
                </svg>`;
            case "info":
                return html`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                    />
                </svg>`;
            case "success":
                return html`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                    />
                </svg>`;
            case "warning":
                return html`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                    />
                </svg>`;
        }
    }

    private handleClose: EventListener = () => {
        const event = new CustomEvent("close", { bubbles: true, cancelable: true });
        this.dispatchEvent(event);
        this.remove();
    };

    private handleActionClick: EventListener = (e: Event) => {
        const event = new CustomEvent("action", {
            detail: {
                // @ts-ignore
                id: e.currentTarget.dataset.id ?? null,
            },
            bubbles: true,
            cancelable: true,
        });
        this.dispatchEvent(event);
    };

    private renderCloseButton(): string | TemplateResult {
        let out: string | TemplateResult;
        if (this.model.closeable) {
            out = html`
                <button-component
                    class="close"
                    @click=${this.handleClose}
                    data-type="button"
                    data-kind="text"
                    data-color="${this.model.type}"
                    data-icon='<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>'
                    data-icon-position="center"
                    data-shape="round"
                ></button-component>
            `;
        } else {
            out = "";
        }
        return out;
    }

    private renderList(): string | TemplateResult {
        let out: string | TemplateResult;
        if (this.model.list.length) {
            out = html`
                <ul>
                    ${this.model.list.map((item) => {
                        return html` <li>${unsafeHTML(decodeURI(item))}</li> `;
                    })}
                </ul>
            `;
        } else {
            out = "";
        }
        return out;
    }

    private renderActions(): string | TemplateResult {
        let out: string | TemplateResult;
        if (this.model.actions.length) {
            out = html`
                <div class="actions">
                    ${this.model.actions.map((bttn) => {
                        return html`
                            <button class="bttn" @click=${this.handleActionClick} data-id="${bttn.id}" type="button" kind="text" color="${this.model.type}">${bttn.label}</button>
                        `;
                    })}
                </div>
            `;
        } else {
            out = "";
        }
        return out;
    }

    override render() {
        const view = html`
            ${this.renderCloseButton()}
            <i> ${this.renderIcon()} </i>
            <div class="copy">
                ${this.model.heading ? html`<h3>${this.model.heading}</h3>` : ""} ${this.model.description ? html`<p>${unsafeHTML(decodeURI(this.model.description))}</p>` : ""}
                ${this.renderList()} ${this.renderActions()}
            </div>
        `;
        this.setAttribute("kind", this.model.type);
        if (!this.model.heading && !this.model.list.length) {
            this.setAttribute("flex", "items-center");
        }
        render(view, this);
    }
}
env.bind("alert-component", Alert);
