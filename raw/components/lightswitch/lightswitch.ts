import SuperComponent from "@codewithkyle/supercomponent";
import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import soundscape from "~brixi/controllers/soundscape";
import { noop, parseDataset } from "~brixi/utils/general";

export type LightswitchColor = "primary" | "success" | "warning" | "danger" | "black" | "grey" | "info";
export interface ILightswitch {
    label: string;
    labelIcon: string;
    altLabel: string;
    altLabelIcon: string;
    enabled: boolean;
    name: string;
    disabled: boolean;
    callback: Function;
    color: LightswitchColor;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
}
export interface LightswitchSettings {
    name?: string;
    label?: string;
    labelIcon?: string;
    altLabel?: string;
    altLabelIcon?: string;
    enabled?: boolean;
    disabled?: boolean;
    callback?: Function;
    color?: LightswitchColor;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
}
export default class Lightswitch extends SuperComponent<ILightswitch> {
    constructor(settings: LightswitchSettings) {
        super();
        this.model = {
            name: "",
            label: "",
            labelIcon: "",
            altLabel: "",
            altLabelIcon: "",
            enabled: false,
            disabled: false,
            callback: noop,
            color: "primary",
            css: "",
            class: "",
            attributes: {},
        };
        this.model = parseDataset<ILightswitch>(this.dataset, this.model);
        env.css("lightswitch").then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    public getName() {
        return this.model.name;
    }

    public getValue() {
        return this.model.enabled;
    }

    private handleChange: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement;
        this.update({
            enabled: target.checked,
        });
        this.model.callback(target.checked);
        if (target.checked) {
            soundscape.activate();
        } else {
            soundscape.deactivate();
        }
    };

    private renderText(text: string) {
        let out;
        if (text.length) {
            out = html` <div>${this.model.altLabel}</div> `;
        } else {
            out = "";
        }
        return out;
    }

    override render() {
        this.setAttribute("color", this.model.color);
        const id = `${this.model.altLabel.replace(/\s+/g, "-").trim()}-${this.model.name}-${this.model.label.replace(/\s+/g, "-").trim()}`;
        const view = html`
            <input @change=${this.handleChange} type="checkbox" name="${this.model.name}" id="${id}" ?disabled=${this.model.disabled} .checked=${this.model.enabled} />
            <label for="${id}">
                <span> ${unsafeHTML(this.model.altLabelIcon)} ${this.renderText(this.model.altLabel)} </span>
                <i></i>
                <span> ${unsafeHTML(this.model.labelIcon)} ${this.renderText(this.model.label)} </span>
            </label>
        `;
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        render(view, this);
    }

    override updated() {
        setTimeout(() => {
            const label: HTMLElement = this.querySelector("label");
            const span1: HTMLElement = label.querySelector("span:first-of-type");
            const span2: HTMLElement = label.querySelector("span:last-of-type");
            const i = this.querySelector("i");
            if (this.model.enabled) {
                label.style.width = `${span1.scrollWidth + 23 + 16}px`;
                span1.style.transform = `translateX(0)`;
                span2.style.transform = `translateX(0)`;
                i.style.transform = `translateX(0)`;
            } else {
                label.style.width = `${span2.scrollWidth + 23 + 18}px`;
                span1.style.transform = `translateX(-${span1.scrollWidth + 8}px)`;
                span2.style.transform = `translateX(-${span1.scrollWidth + 8}px)`;
                i.style.transform = `translateX(-${span1.scrollWidth + 8}px)`;
            }
        }, 60);
    }
}
env.mount("lightswitch-component", Lightswitch);