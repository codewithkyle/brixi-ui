import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";
import Button from "~components/button/button";
import { noop, parseDataset } from "~utils/general";

export interface Action {
    label: string;
    callback: Function;
}
export interface IAlert {
    type: "warning" | "info" | "danger" | "success";
    heading: string;
    description: string;
    list: Array<string>;
    closeable: boolean;
    actions: Array<Action>;
    closeCallback: Function;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
}
export interface AlertSettings {
    type?: "warning" | "info" | "danger" | "success";
    heading?: string;
    description?: string;
    list?: Array<string>;
    closeable?: boolean;
    actions?: Array<Action>;
    closeCallback?: Function;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
}
export default class Alert extends SuperComponent<IAlert> {
    constructor(settings: AlertSettings) {
        super();
        this.model = {
            type: "info",
            heading: null,
            description: null,
            list: [],
            closeable: false,
            actions: [],
            closeCallback: noop,
            css: "",
            class: "",
            attributes: {},
        };
        this.model = parseDataset<IAlert>(this.dataset, this.model);
        env.css(["alert"]).then(() => {
            this.update(settings);
        });
    }

    private renderIcon() {
        switch (this.model.type) {
            case "danger":
                return html` <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                    />
                </svg>`;
            case "info":
                return html`<svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                    />
                </svg>`;
            case "success":
                return html`<svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                    />
                </svg>`;
            case "warning":
                return html`<svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                    />
                </svg>`;
        }
    }

    private handleClose: EventListener = (e) => {
        this.model.closeCallback();
        this.remove();
    };

    private renderCloseButton() {
        let out;
        if (this.model.closeable) {
            out = html`
                <button sfx="button" @click=${this.handleClose} class="close">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            `;
        } else {
            out = "";
        }
        return out;
    }

    private renderList() {
        let out;
        if (this.model.list.length) {
            out = html`
                <ul>
                    ${this.model.list.map((item) => {
                        return html` <li>${item}</li> `;
                    })}
                </ul>
            `;
        } else {
            out = "";
        }
        return out;
    }

    private renderActions() {
        let out;
        if (this.model.actions.length) {
            let buttonType: string = this.model.type;
            if (buttonType === "info") {
                buttonType = "primary";
            }
            out = html`
                <div class="actions">
                    ${this.model.actions.map((bttn, index) => {
                        return html`
                            ${new Button({
                                label: bttn.label,
                                kind: "text",
                                // @ts-ignore
                                color: buttonType,
                                callback: bttn.callback,
                            })}
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
        this.style.cssText = this.model.css;
        this.className = this.model.class;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html`
            ${this.renderCloseButton()}
            <i> ${this.renderIcon()} </i>
            <div class="copy">
                ${this.model.heading
                    ? html`<h3>${this.model.heading}</h3>`
                    : ""}
                ${this.model.description
                    ? html`<p>${this.model.description}</p>`
                    : ""}
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
env.mount("alert-component", Alert);
