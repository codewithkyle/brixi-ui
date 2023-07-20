import { html, render } from "lit-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import Component from "~brixi/component";

env.css(["input-chip"]);

export interface IInputChip {
    label: string;
    value: string | number;
}
export default class InputChip extends Component<IInputChip> {
    constructor() {
        super();
        this.model = {
            label: "",
            value: null,
        };
    }

    static get observedAttributes() {
        return ["data-label", "data-value"];
    }

    override connected(): void {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
        this.addEventListener("click", this.handleClick);
        this.addEventListener("keyup", this.handleKeyup);
        this.addEventListener("keydown", this.handleKeydown);
    }

    private handleClick = () => {
        this.dispatchEvent(
            new CustomEvent("remove", {
                detail: {
                    value: this.model.value,
                },
                bubbles: true,
                cancelable: true,
            })
        );
        this.remove();
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
        this.tabIndex = 0;
        this.setAttribute("role", "button");
        this.setAttribute("sfx", "button");
        const view = html`
            <span>${this.model.label}</span>
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
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
            </svg>
        `;
        render(view, this);
    }
}
env.bind("input-chip", InputChip);
