import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import "~brixi/components/buttons/button/button";
import "~brixi/components/buttons/submit-button/submit-button";
import "~brixi/components/form/form";
import { noop } from "~brixi/utils/general";
import env from "./env";

interface DangerousSettings {
    title: string;
    message: string;
    confirm?: string;
    cancel?: string;
    width?: number;
    callbacks?: {
        cancel?: () => void;
        confirm?: () => void;
    };
}

interface ConfirmSettings {
    title: string;
    message: string;
    confirm?: string;
    cancel?: string;
    width?: number;
    callbacks?: {
        cancel?: () => void;
        confirm?: () => void;
    };
}

interface PassiveSettings {
    title: string;
    message: string;
    width?: number;
    actions?: Array<{
        label: string;
        callback: () => void;
    }>;
}

interface FormSettings {
    title?: string;
    message?: string;
    width?: number;
    view: TemplateResult;
    callbacks?: {
        submit?: (data: { [key: string]: any }, form: HTMLElement, modal: HTMLElement) => void;
        cancel?: () => void;
    };
    cancel?: string;
    submit?: string;
}

interface RawSettings {
    view: TemplateResult | HTMLElement;
    width?: number;
}

class ModalMaker {
    public raw(settings: RawSettings): ModalComponent {
        const data = Object.assign(
            {
                view: html``,
                width: 512,
            },
            settings
        );
        const el = new ModalComponent(data.view, data.width, "raw");
        document.body.appendChild(el);
        return el;
    }

    public form(settings: FormSettings) {
        const data = Object.assign(
            {
                title: "",
                message: "",
                view: html``,
                width: 512,
                callbacks: {
                    onSubmit: noop,
                    onCancel: noop,
                },
                cancel: "Cancel",
                submit: "Submit",
            },
            settings
        );
        let el: HTMLElement;
        const view = html`
            <form-component
                class="w-full"
                @submit=${(e: Event) => {
                    e.preventDefault();
                    const form = e.currentTarget as HTMLElement;
                    // @ts-ignore
                    const valid = form.checkValidity();
                    if (valid) {
                        // @ts-ignore
                        const formData = form.serialize();
                        data.callbacks.submit(formData, form, el);
                    }
                }}
            >
                <div class="block w-full py-1.5 px-2">
                    ${data.title?.length ? html`<h2>${data.title}</h2>` : ""} ${data.message?.length ? html`<p class="mb-1.5">${unsafeHTML(data.message)}</p>` : ""} ${data.view}
                </div>
                <div class="w-full px-1 pb-1">
                    <div class="w-full py-0.75 px-1 bg-grey-50 dark:bg-grey-950/60 radius-0.5" flex="row nowrap items-center justify-end">
                        <button-component
                            data-label="${data.cancel}"
                            data-type="button"
                            data-color="grey"
                            data-kind="solid"
                            class="mr-0.5"
                            @click=${() => {
                                console.log("cancel");
                                if ("cancel" in data.callbacks && typeof data.callbacks.cancel === "function") {
                                    data.callbacks.cancel();
                                }
                                el.remove();
                            }}
                        ></button-component>
                        <submit-button data-label="${data.submit}"></submit-button>
                    </div>
                </div>
            </form-component>
        `;
        el = new ModalComponent(view, data.width, "static-content");
        document.body.appendChild(el);
    }

    public passive(settings: PassiveSettings) {
        const data = Object.assign(
            {
                title: "",
                message: "",
                actions: [
                    {
                        label: "Close",
                        callback: noop,
                    },
                ],
                width: 512,
            },
            settings
        );
        let el: HTMLElement;
        const view = html`
            <div class="block w-full py-1.5 px-2">
                <h2>${data.title}</h2>
                <p>${unsafeHTML(data.message)}</p>
            </div>
            <div class="w-full px-1 pb-1">
                <div class="w-full py-0.75 px-1 bg-grey-50 dark:bg-grey-950/60 radius-0.5" flex="row nowrap items-center justify-end">
                    ${data.actions.map(
                        (action) => html`
                            <button-component
                                data-label="${action.label}"
                                data-type="button"
                                data-color="grey"
                                data-kind="solid"
                                @click=${() => {
                                    if (typeof action?.callback === "function") {
                                        action.callback();
                                    }
                                    el.remove();
                                }}
                                class="ml-0.5"
                            ></button-component>
                        `
                    )}
                </div>
            </div>
        `;
        el = new ModalComponent(view, data.width, "static-content");
        document.body.appendChild(el);
    }

    public confirm(settings: ConfirmSettings) {
        const data = Object.assign(
            {
                title: "",
                message: "",
                confirm: "Submit",
                cancel: "Cancel",
                callbacks: {
                    cancel: noop,
                    confirm: noop,
                },
                width: 512,
            },
            settings
        );
        let el: HTMLElement;
        const view = html`
            <div class="block w-full py-1.5 px-2">
                <h2>${data.title}</h2>
                <p>${unsafeHTML(data.message)}</p>
            </div>
            <div class="w-full px-1 pb-1">
                <div class="w-full py-0.75 px-1 bg-grey-50 dark:bg-grey-950/60 radius-0.5" flex="row nowrap items-center justify-end">
                    <button-component
                        data-label="${data.cancel}"
                        data-type="button"
                        data-color="grey"
                        data-kind="solid"
                        @click=${() => {
                            if ("cancel" in data.callbacks && typeof data.callbacks.cancel === "function") {
                                data.callbacks.cancel();
                            }
                            el.remove();
                        }}
                        class="mr-0.5"
                    ></button-component>
                    <button-component
                        data-label="${data.confirm}"
                        data-type="button"
                        data-color="primary"
                        data-kind="solid"
                        @click=${() => {
                            if ("confirm" in data.callbacks && typeof data.callbacks.confirm === "function") {
                                data.callbacks.confirm();
                            }
                            el.remove();
                        }}
                    ></button-component>
                </div>
            </div>
        `;
        el = new ModalComponent(view, data.width, "static-content");
        document.body.appendChild(el);
    }

    public dangerous(settings: DangerousSettings) {
        const data = Object.assign(
            {
                title: "",
                message: "",
                confirm: "Delete",
                cancel: "Cancel",
                callbacks: {
                    cancel: noop,
                    confirm: noop,
                },
                width: 512,
            },
            settings
        );
        let el: HTMLElement;
        const view = html`
            <div class="block w-full py-1.5 px-2">
                <h2>${data.title}</h2>
                <p>${unsafeHTML(data.message)}</p>
            </div>
            <div class="w-full px-1 pb-1">
                <div class="w-full py-0.75 px-1 bg-grey-150 dark:bg-grey-950/60 radius-0.5" flex="row nowrap items-center justify-end">
                    <button-component
                        data-label="${data.cancel}"
                        data-type="button"
                        data-color="grey"
                        data-kind="solid"
                        @click=${() => {
                            if ("cancel" in data.callbacks && typeof data.callbacks.cancel === "function") {
                                data.callbacks.cancel();
                            }
                            el.remove();
                        }}
                        class="mr-0.5"
                    ></button-component>
                    <button-component
                        data-label="${data.confirm}"
                        data-type="button"
                        data-color="danger"
                        data-kind="solid"
                        @click=${() => {
                            if ("confirm" in data.callbacks && typeof data.callbacks.confirm === "function") {
                                data.callbacks.confirm();
                            }
                            el.remove();
                        }}
                    ></button-component>
                </div>
            </div>
        `;
        el = new ModalComponent(view, data.width, "static-content");
        document.body.appendChild(el);
    }
}
const modals = new ModalMaker();
export default modals;

class ModalComponent extends HTMLElement {
    private view: TemplateResult | HTMLElement;
    private width: number;

    constructor(view: TemplateResult | HTMLElement, width: number, className: string) {
        super();
        this.view = view;
        this.width = width;
        this.className = className;
        env.css(["modals", "button"]).then(() => this.render());
    }

    private render() {
        this.tabIndex = 0;
        this.focus();
        const view = html`
            <div class="backdrop"></div>
            <div class="modal" style="width:${this.width}px;">${this.view}</div>
        `;
        render(view, this);
    }
}
env.bind("modal-component", ModalComponent);
