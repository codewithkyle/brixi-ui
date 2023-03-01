import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";
import Spinner from "~brixi/components/progress/spinner/spinner";

type ButtonSize = "default" | "slim" | "large";

export interface ISubmitButton {
    label: string;
    icon: string;
    size: ButtonSize;
    callback: Function;
    tooltip: string;
    disabled: boolean;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
}
export interface SubmitButtonSettings {
    label?: string;
    callback?: Function;
    size?: ButtonSize;
    icon?: string;
    tooltip?: string;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
}

export default class SubmitButton extends SuperComponent<ISubmitButton> {
    constructor(settings: SubmitButtonSettings) {
        super();
        this.state = "IDLING";
        this.stateMachine = {
            IDLING: {
                START: "SUBMITTING",
            },
            SUBMITTING: {
                START: "SUBMITTING",
                STOP: "IDLING",
            },
        };
        this.model = {
            label: "",
            size: "default",
            icon: "",
            callback: noop,
            tooltip: null,
            css: "",
            class: "",
            attributes: {},
            disabled: false,
        };
        this.model = parseDataset<ISubmitButton>(this.dataset, this.model);
        env.css(["submit-button", "button"]).then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    private handleClick = () => {
        this.trigger("START");
        this.model.callback();
    };

    private renderIcon(): string | TemplateResult | HTMLElement {
        let icon: string | TemplateResult | HTMLElement = "";
        if (this.state === "SUBMITTING") {
            icon = new Spinner({
                size: 16,
                class: "mr-0.5",
            });
        } else if (this.model.icon.length) {
            icon = html`${unsafeHTML(this.model.icon)}`;
        } else {
            icon = "";
        }
        return icon;
    }

    private renderLabel(): string | TemplateResult {
        let label: string | TemplateResult = "";
        if (this.model.label.length) {
            label = html`<span>${this.model.label}</span>`;
        } else {
            label = "";
        }
        return label;
    }

    override render() {
        this.style.cssText = this.model.css;
        this.className = this.model.class;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        this.setAttribute("state", this.state);
        const view = html`
            <button
                @click=${this.handleClick}
                class="bttn"
                color="primary"
                size="${this.model.size}"
                kind="solid"
                type="submit"
                icon=${this.model.icon || this.state === "SUBMITTING" ? "left" : ""}
                ?tooltip=${this.model.tooltip}
                sfx="button"
                ?disabled=${this.model.disabled || this.state === "SUBMITTING"}
            >
                ${this.renderIcon()} ${this.renderLabel()}
            </button>
        `;
        render(view, this);
    }
}
env.bind("submit-button", SubmitButton);
