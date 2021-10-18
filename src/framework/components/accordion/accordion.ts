import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";

export interface AccordionSection {
    label: string,
    content: string,
}
export interface IAccordion {
    sections: Array<AccordionSection>,
}
export interface AccordionSettings {
    sections: Array<AccordionSection>,
}
export default class Accordion extends SuperComponent<IAccordion>{
    constructor(settings:AccordionSettings){
        super();
        this.model = {
            sections: [],
        };
        env.css(["accordion"]).then(()=>{
            this.update(settings);
        });
    }

    private renderSection(section:AccordionSection){
        const name = section.label.toLowerCase().trim().replace(/\s+/g, "-");
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
                <p class="content">${section.content}</p>
            </div>
        `;
    }

    override render(){
        const view = html`
            ${this.model.sections.map(this.renderSection)}
        `;
        render(view, this);
    }
}
env.mount("accordion-component", Accordion);
