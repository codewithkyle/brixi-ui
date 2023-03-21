import SuperComponent from "@codewithkyle/supercomponent";
import { html, render, TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import env from "~brixi/controllers/env";
import soundscape from "~brixi/controllers/soundscape";
import { noop, parseDataset } from "~brixi/utils/general";

export type LightswitchColor = "primary" | "success" | "warning" | "danger" | "info";
export interface ILightswitch {
    label: string;
    instructions: string;
    enabledLabel: string | HTMLElement;
    disabledLabel: string | HTMLElement;
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
    value: string | number;
}
export interface LightswitchSettings {
    name?: string;
    label?: string;
    instructions?: string;
    enabledLabel?: string | HTMLElement;
    disabledLabel?: string | HTMLElement;
    enabled?: boolean;
    disabled?: boolean;
    callback?: Function;
    color?: LightswitchColor;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    value: string | number;
}
export default class Lightswitch extends SuperComponent<ILightswitch> {
    constructor(settings: LightswitchSettings) {
        super();
        this.model = {
            name: "",
            label: "",
            instructions: "",
            enabledLabel: null,
            disabledLabel: null,
            enabled: false,
            disabled: false,
            callback: noop,
            color: "success",
            css: "",
            class: "",
            attributes: {},
            value: null,
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
        this.set({
            enabled: target.checked,
        });
        this.model.callback(target.checked);
        if (target.checked) {
            soundscape.play("activate");
        } else {
            soundscape.play("deactivate");
        }
    };

    private handleKeyup: EventListener = (e: KeyboardEvent) => {
        if (e.key === " ") {
            const input = this.querySelector("input") as HTMLInputElement;
            input.checked = !input.checked;
            this.classList.remove("is-active");
            this.set({ enabled: input.checked });
            this.model.callback(input.checked);
            if (input.checked) {
                soundscape.play("activate");
            } else {
                soundscape.play("deactivate");
            }
        }
    };

    private handleKeydown: EventListener = (e: KeyboardEvent) => {
        if (e.key === " ") {
            this.classList.add("is-active");
        }
    };

    private resize() {
        const label: HTMLElement = this.querySelector("light-switch");
        const span1: HTMLElement = label.querySelector("span:first-of-type");
        const span2: HTMLElement = label.querySelector("span:last-of-type");
        const i = this.querySelector("i");
        if (this.model.enabled) {
            label.style.width = `${span1.scrollWidth + 32}px`;
            span1.style.transform = `translateX(6px)`;
            span2.style.transform = `translateX(6px)`;
            i.style.transform = `translate(6px, 2px)`;
        } else {
            label.style.width = `${span2.scrollWidth + 32}px`;
            span1.style.transform = `translateX(-${span1.scrollWidth}px)`;
            span2.style.transform = `translateX(-${span1.scrollWidth}px)`;
            i.style.transform = `translate(-${span1.scrollWidth}px, 2px)`;
        }
    }

    override render() {
        this.setAttribute("color", this.model.color);
        this.setAttribute("form-input", "");
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const id = `${this.model.name}-${this.model.label.replace(/\s+/g, "-").trim()}`;
        const view = html`
            <input
                @change=${this.handleChange}
                type="checkbox"
                name="${this.model.name}"
                id="${id}"
                ?disabled=${this.model.disabled}
                .checked=${this.model.enabled}
                .value=${this.model.value ?? ""}
            />
            <label for="${id}">
                <light-switch tabindex="0" @keyup=${this.handleKeyup} @keydown=${this.handleKeydown} aria-label="${this.model.enabled ? "enabled" : "disabled"}">
                    <span>${this.model.enabledLabel instanceof HTMLElement ? this.model.enabledLabel : unsafeHTML(this.model.enabledLabel)}</span>
                    <i></i>
                    <span>${this.model.disabledLabel instanceof HTMLElement ? this.model.disabledLabel : unsafeHTML(this.model.disabledLabel)}</span>
                </light-switch>
                <div class="ml-0.75" flex="column wrap">
                    <span class="block line-snug font-sm font-medium font-grey-700">${this.model.label}</span>
                    <span class="block line-snug font-xs font-grey-500">${this.model.instructions}</span>
                </div>
            </label>
        `;
        render(view, this);
        setTimeout(this.resize.bind(this), 80);
    }
}
env.bind("lightswitch-component", Lightswitch);
