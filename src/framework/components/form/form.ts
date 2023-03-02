import { html, render, TemplateResult } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";

export interface IForm {
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    view: HTMLElement | TemplateResult;
    onSubmit: Function;
    onReset: Function;
}
export interface FormSettings {
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    view: HTMLElement | TemplateResult;
    onSubmit: Function;
    onReset?: Function;
}
export default class Form extends SuperComponent<IForm> {
    constructor(settings: FormSettings) {
        super();
        this.model = {
            css: "",
            class: "",
            attributes: {},
            view: null,
            onSubmit: noop,
            onReset: noop,
        };
        this.model = parseDataset<IForm>(this.dataset, this.model);
        env.css(["form"]).then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    public start() {
        const el = this.querySelector("submit-button");
        if (el) {
            // @ts-ignore
            el.trigger("START");
        }
    }

    public stop() {
        const el = this.querySelector('submit-button[state="SUBMITTING"]');
        if (el) {
            // @ts-ignore
            el.trigger("STOP");
        }
    }

    public reset() {
        this.querySelectorAll("[form-input]").forEach((el) => {
            // @ts-ignore
            el.reset();
        });
    }

    public serialize() {
        this.start();
        const data = {};
        let allValid = true;
        this.querySelectorAll("[form-input]").forEach((el) => {
            // @ts-ignore
            if (el.validate()) {
                // @ts-ignore
                const name = el.getName();
                if (name == null || name === "") {
                    console.error("Form input is missing a name attribute.", el);
                } else {
                    // @ts-ignore
                    data[name] = el.getValue();
                }
            } else {
                allValid = false;
            }
        });
        return data;
    }

    public checkValidity(): boolean {
        let allValid = true;
        this.querySelectorAll("[form-input]").forEach((el) => {
            // @ts-ignore
            if (!el.validate()) {
                allValid = false;
            }
        });
        return allValid;
    }

    public fail(errors: { [name: string]: string }) {
        const inputs = {};
        this.querySelectorAll("[form-input]").forEach((el) => {
            // @ts-ignore
            inputs[el.getName()] = el;
        });
        for (const name in errors) {
            inputs?.[name]?.setError(errors[name]);
        }
        this.stop();
    }

    private handleSubmit = (e: Event) => {
        e.preventDefault();
        this.model.onSubmit(this);
    };

    private handleReset = (e: Event) => {
        e.preventDefault();
        this.reset();
        this.model.onReset();
    };

    override render() {
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html` <form @submit=${this.handleSubmit} @reset=${this.handleReset}>${this.model.view}</form> `;
        render(view, this);
    }
}
env.bind("form-component", Form);
