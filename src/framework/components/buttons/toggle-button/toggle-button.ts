import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import Button, { ButtonSettings } from "~brixi/components/buttons/button/button";
import { parseDataset } from "~brixi/utils/general";

export interface IToggleButton {
    state: string;
    states: Array<string>;
    buttons: {
        [state: string]: ButtonSettings;
    };
    instructions: string;
    class: string;
    css: string;
    attributes: {
        [name: string]: string | number;
    };
    index: number;
}
export interface ToggleButtonSettings {
    state: string;
    states: Array<string>;
    buttons: {
        [state: string]: ButtonSettings;
    };
    instructions?: string;
    class?: string;
    css?: string;
    attributes?: {
        [name: string]: string | number;
    };
    index?: number;
}
export default class ToggleButton extends SuperComponent<IToggleButton> {
    constructor(settings: IToggleButton) {
        super();
        this.model = {
            state: null,
            states: [],
            buttons: {},
            instructions: "",
            css: "",
            class: "",
            attributes: {},
            index: 0,
        };
        this.model = parseDataset<IToggleButton>(this.dataset, this.model);
        env.css(["toggle-button", "button"]).then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    private handleClick: EventListener = (e: Event) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.model.buttons[this.model.states[this.model.index]].callback();
        const updated = this.get();
        updated.index++;
        if (updated.index >= updated.states.length) {
            updated.index = 0;
        }
        updated.state = updated.states[updated.index];
        this.set(updated);
    };

    override connected() {
        this.addEventListener("click", this.handleClick, { passive: false, capture: true });
    }

    private renderButton() {
        return new Button(this.model.buttons[this.model.state]);
    }

    private renderInstructions() {
        let out;
        if (this.model.instructions.length) {
            out = html` <p>${this.model.instructions}</p> `;
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
        const view = html` ${this.renderInstructions()} ${this.renderButton()} `;
        render(view, this);
    }
}
env.bind("toggle-button", ToggleButton);
