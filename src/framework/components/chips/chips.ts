import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export interface Chip {
    label: string;
    name: string;
    icon?: string;
}
export interface IChips {
    callback: Function;
    type: "static" | "dynamic";
    chips: Array<Chip>;
    chipStates: {
        [name: string]: boolean;
    };
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    kind: "outline";
}
export interface ChipsSettings {
    chips: Array<Chip>;
    callback: Function;
    type?: "static" | "dynamic";
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    kind?: "outline" | "text";
}

export default class Chips extends SuperComponent<IChips> {
    constructor(settings: ChipsSettings) {
        super();
        this.model = {
            type: "static",
            callback: noop,
            chips: [],
            chipStates: {},
            class: "",
            css: "",
            attributes: {},
            kind: "outline",
        };
        this.model = parseDataset<IChips>(this.dataset, this.model);
        for (const chip of settings?.chips) {
            this.model.chipStates[chip.name] = false;
        }
        env.css(["chips"]).then(() => {
            // @ts-ignore
            this.set(settings, true);
            this.render();
        });
    }

    private renderIcon(icon) {
        return html` <i> ${unsafeHTML(icon)} </i> `;
    }

    private renderCloseIcon() {
        let out;
        if (this.model.type === "dynamic") {
            out = html`
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </i>
            `;
        } else {
            out = "";
        }
        return out;
    }

    private handleClick: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const chipName = target.dataset.name;
        const index = parseInt(target.dataset.index);
        const updated = { ...this.model };
        if (this.model.type === "static") {
            if (this.model.chipStates[chipName]) {
                updated.chipStates[chipName] = false;
            } else {
                updated.chipStates[chipName] = true;
            }
            this.model.callback(chipName, updated.chipStates[chipName]);
        } else {
            updated.chips.splice(index, 1);
            this.model.callback(chipName);
        }
        this.set(updated);
    };

    /**
     * Manually add a chip.
     */
    public addChip(chip: Chip): void {
        const updated = { ...this.model };
        updated.chips.push(chip);
        this.set(updated);
    }

    /**
     * Manually remove a chip.
     */
    public removeChip(index: number): void {
        const updated = { ...this.model };
        updated.chips.splice(index, 1);
        this.set(updated);
    }

    override render() {
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const view = html`
            ${this.model.chips.map((chip, index) => {
                let kind: string = this.model.kind;
                if (this.model.chipStates[chip.name]) {
                    kind = "solid";
                }
                return html`
                    <button
                        sfx="button"
                        kind="${kind}"
                        @click=${this.handleClick}
                        data-name="${chip.name}"
                        data-index="${index}"
                        class="chip"
                        kind="outline"
                        ?icon=${chip?.icon}
                        ?closeable=${this.model.type === "dynamic"}
                    >
                        ${this.renderIcon(chip?.icon ?? "")} ${chip.label} ${this.renderCloseIcon()}
                    </button>
                `;
            })}
        `;
        render(view, this);
    }
}
env.mount("chips-component", Chips);
