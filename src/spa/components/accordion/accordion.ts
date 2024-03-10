import { UUID } from "@codewithkyle/uuid";
import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import Component from "~brixi/component";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";

env.css(["accordion"]);

export interface AccordionSection {
    label: string;
    content: string;
}
export interface IAccordion {
    sections: Array<AccordionSection>;
}
export default class Accordion extends Component<IAccordion> {
    constructor() {
        super();
        this.model = {
            sections: [],
        };
    }

    static get observedAttributes() {
        return ["data-sections"];
    }

    override connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
    }

    private renderSection(section: AccordionSection) {
        const name = UUID();
        return html`
            <div class="section">
                <input type="checkbox" name="${name}" id="${name}" />
                <label sfx="button" role="button" tabindex="0" for="${name}">
                    <span>${section.label}</span>
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </i>
                </label>
                <div class="content">${unsafeHTML(decodeURI(section.content))}</div>
            </div>
        `;
    }

    override render() {
        const view = html` ${this.model.sections.map(this.renderSection)} `;
        render(view, this);
    }
}
env.bind("accordion-component", Accordion);
