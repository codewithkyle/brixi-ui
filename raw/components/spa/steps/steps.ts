import { html, render } from "lit-html";
import Component from "~brixi/component";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import { calcPercent } from "~brixi/utils/numpy";

env.css(["steps", "steps-vertical", "steps-horizontal"]);

export interface Step {
    label: string;
    description?: string;
    name: string;
}
export interface ISteps {
    steps: Array<Step>;
    activeStep: number;
    step: string;
    layout: "horizontal" | "vertical";
}
export default class Steps extends Component<ISteps> {
    constructor() {
        super();
        this.model = {
            steps: [],
            activeStep: 0,
            step: null,
            layout: "vertical",
        };
    }

    static get observedAttributes() {
        return ["data-steps", "data-step", "data-layout"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        for (let i = 0; i < settings.steps.length; i++) {
            if (settings.steps[i].name === settings?.step ?? null) {
                settings.activeStep = i;
                break;
            }
        }
        this.set(settings);
    }

    private handleClick: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const index = parseInt(target.dataset.index);
        if (index < this.model.activeStep) {
            this.set({
                activeStep: index,
            });
            this.dispatchEvent(
                new CustomEvent("step", {
                    detail: {
                        step: this.model.steps[index].name,
                    },
                    bubbles: true,
                    cancelable: true,
                })
            );
        }
    };

    private renderVerticalStep(step: Step, index: number) {
        let state: string;
        if (this.model.activeStep === index) {
            state = "active";
        } else if (this.model.activeStep > index) {
            state = "completed";
        } else {
            state = "pending";
        }
        return html`
            <button sfx="${state === "completed" ? "button" : ""}" state="${state}" @click=${this.handleClick} data-name="${step?.name}" data-index="${index}">
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </i>
                <div class="copy">
                    <h3>${step.label}</h3>
                    ${step?.description ? html`<p>${step.description}</p>` : ""}
                </div>
            </button>
        `;
    }

    private renderHorizontalStep(step: Step, index: number) {
        let state: string;
        if (this.model.activeStep === index) {
            state = "active";
        } else if (this.model.activeStep > index) {
            state = "completed";
        } else {
            state = "pending";
        }
        return html`
            <button sfx="${state === "completed" ? "button" : ""}" state="${state}" @click=${this.handleClick} data-name="${step?.name}" data-index="${index}">
                <h4>Step ${index + 1}</h4>
                <h3>${step.label}</h3>
                ${step?.description ? html`<p>${step.description}</p>` : ""}
            </button>
        `;
    }

    override render() {
        const view = html`
            ${this.model.steps.map((step, index) => {
                switch (this.model.layout) {
                    case "horizontal":
                        return this.renderHorizontalStep(step, index);
                    case "vertical":
                        return this.renderVerticalStep(step, index);
                    default:
                        return "";
                }
            })}
        `;
        this.classList.add(this.model.layout);
        if (this.model.layout === "horizontal") {
            this.style.gridTemplateColumns = `repeat(${this.model.steps.length}, minmax(300px, ${Math.floor(calcPercent(1, this.model.steps.length))}%))`;
        }
        render(view, this);
    }
}
env.bind("steps-component", Steps);
