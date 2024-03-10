import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import "~brixi/components/progress/spinner/spinner";
import Component from "~brixi/component";
import type { ButtonSize } from "../button/button";

env.css(["submit-button", "button"]);

export interface ISubmitButton {
    label: string;
    icon: string;
    size: ButtonSize;
    disabled: boolean;
    submittingLabel: string;
}

export default class SubmitButton extends Component<ISubmitButton> {
    constructor() {
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
            label: "Submit",
            submittingLabel: "",
            size: "default",
            icon: "",
            disabled: false,
        };
    }

    static get observedAttributes() {
        return ["data-label", "data-size", "data-icon", "data-disabled"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
    }

    private handleClick = () => {
        if (this.state !== "SUBMITTING") {
            this.dispatchEvent(
                new CustomEvent("submit", {
                    bubbles: true,
                    cancelable: true,
                })
            );
        }
    };

    private renderIcon(): string | TemplateResult {
        let icon: string | TemplateResult = "";
        if (this.state === "SUBMITTING") {
            icon = html` <spinner-component data-size="16" class="mr-0.5"></spinner-component> `;
        } else if (this.model.icon?.length) {
            icon = html`${unsafeHTML(this.model.icon)}`;
        } else {
            icon = "";
        }
        return icon;
    }

    private renderLabel(): string | TemplateResult {
        let label: string | TemplateResult = "";
        if (this.state === "SUBMITTING" && this.model.submittingLabel?.length) {
            label = html`<span>${this.model.submittingLabel}</span>`;
        } else if (this.model.label?.length) {
            label = html`<span>${this.model.label}</span>`;
        } else {
            label = "";
        }
        return label;
    }

    override render() {
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
