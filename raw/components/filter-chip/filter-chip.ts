import { html, render } from "lit-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import Component from "~brixi/component";
import { UUID } from "@codewithkyle/uuid";

env.css(["filter-chip"]);

export interface IFilterChip {
    label: string;
    value: string | number;
    checked: boolean;
}
export default class FilterChip extends Component<IFilterChip> {
    constructor() {
        super();
        this.id = UUID();
        this.model = {
            label: "",
            value: null,
            checked: false,
        };
    }

    static get observedAttributes() {
        return ["data-label", "data-value", "data-checked"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
    }

    private handleClick = () => {
        const isChecked = !this.model.checked;
        this.set({ checked: isChecked });
        this.dispatchEvent(
            new CustomEvent("change", {
                detail: {
                    checked: isChecked,
                    value: this.model.value,
                },
            })
        );
    };

    private handleKeydown = (e: KeyboardEvent) => {
        if (e.key === " ") {
            this.classList.add("is-active");
        }
    };

    private handleKeyup = (e: KeyboardEvent) => {
        if (e.key === " ") {
            this.classList.remove("is-active");
            this.click();
        }
    };

    override render() {
        this.setAttribute("role", "button");
        this.setAttribute("sfx", "button");
        const view = html`
            <input type="checkbox" ?checked="${this.model.checked}" .value=${this.model.value || ""} id="${this.id}" />
            <label for="${this.id}" tabindex="0" @click=${this.handleClick} @keyup=${this.handleKeyup} @keydown=${this.handleKeydown}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span>${this.model.label}</span>
            </label>
        `;
        render(view, this);
    }
}
env.bind("filter-chip", FilterChip);
