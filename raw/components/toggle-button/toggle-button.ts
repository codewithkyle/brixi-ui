import { html, render, TemplateResult } from "lit-html";
import env from "~brixi/controllers/env";
import "~brixi/components/buttons/button/button";
import { parseDataset } from "~brixi/utils/general";
import type { IButton } from "~brixi/components/buttons/button/button";
import Component from "~brixi/component";

env.css(["toggle-button", "button"]);

interface Button extends IButton {
    id: string;
}
export interface IToggleButton {
    state: string;
    states: Array<string>;
    buttons: {
        [state: string]: Button;
    };
    instructions: string;
    index: number;
}
export default class ToggleButton extends Component<IToggleButton> {
    constructor() {
        super();
        this.model = {
            state: null,
            states: [],
            buttons: {},
            instructions: "",
            index: 0,
        };
    }

    static get observedAttributes() {
        return ["data-state", "data-states", "data-buttons", "data-instructions", "data-index"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
    }

    private handleAction: EventListener = (e: CustomEvent) => {
        e.stopImmediatePropagation();
    };

    private handleClick: EventListener = () => {
        this.dispatchEvent(
            new CustomEvent("action", {
                detail: {
                    id: this.model.buttons[this.model.states[this.model.index]].id,
                },
                bubbles: true,
                cancelable: true,
            })
        );
        const updated = this.get();
        updated.index++;
        if (updated.index >= updated.states.length) {
            updated.index = 0;
        }
        updated.state = updated.states[updated.index];
        this.set(updated);
    };

    private renderButton() {
        const button = this.model.buttons[this.model.state];
        return html`
            <button-component
                data-label="${button?.label ?? ""}"
                data-icon="${button?.icon ?? ""}"
                data-color="${button?.color ?? "grey"}"
                data-size="${button?.size ?? "default"}"
                data-shape="${button?.shape ?? "default"}"
                data-kind="${button?.kind ?? "solid"}"
                data-icon-position="${button?.iconPosition ?? "left"}"
                @click="${this.handleClick}"
                @action=${this.handleAction}
            ></button-component>
        `;
    }

    private renderInstructions() {
        let out: string | TemplateResult;
        if (this.model.instructions.length) {
            out = html` <p>${this.model.instructions}</p> `;
        } else {
            out = "";
        }
        return out;
    }

    override render() {
        const view = html` ${this.renderInstructions()} ${this.renderButton()} `;
        render(view, this);
    }
}
env.bind("toggle-button", ToggleButton);
