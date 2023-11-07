import { html, render, TemplateResult } from "lit-html";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import Component from "~brixi/component";

env.css(["breadcrumb-trail"]);

interface ILink {
    label?: string;
    icon?: string;
    ariaLabel?: string;
    id: string;
}
export interface IBreadcrumbTrail {
    links: Array<ILink>;
}
export default class BreadcrumbTrail extends Component<IBreadcrumbTrail> {
    constructor() {
        super();
        this.model = {
            links: [],
        };
    }

    static get observedAttributes() {
        return ["data-links"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
    }

    private handleClick = (e: Event) => {
        const event = new CustomEvent("navigate", {
            detail: {
                // @ts-ignore
                id: e.currentTarget.dataset.id,
            },
            bubbles: true,
            cancelable: true,
        });
        this.dispatchEvent(event);
    };

    private renderIcon(icon: string) {
        let out: TemplateResult | string = "";
        if (icon.length) {
            out = html` <i class="icon">${unsafeHTML(decodeURI(icon))}</i> `;
        } else {
            out = "";
        }
        return out;
    }

    private renderLink(link: ILink, renderArrowIcon: boolean = false) {
        if (!link?.label && !link?.icon) {
            return "";
        }
        return html`
            <button sfx="button" type="button" @click=${this.handleClick} data-id="${link.id}" aria-label="${link?.ariaLabel ?? ""}">
                ${this.renderIcon(link?.icon ?? "")} ${link?.label?.length ? html` <span>${link.label}</span> ` : ""}
            </button>
            ${renderArrowIcon
                ? html`
                      <svg
                          class="arrow"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                      >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <polyline points="9 6 15 12 9 18"></polyline>
                      </svg>
                  `
                : ""}
        `;
    }

    override render() {
        let view: TemplateResult;
        if (this.model.links.length <= 3) {
            view = html`
                ${this.model.links.map((link, i) => {
                    let renderArrowIcon = true;
                    if (i === this.model.links.length - 1) {
                        renderArrowIcon = false;
                    }
                    return this.renderLink(link, renderArrowIcon);
                })}
            `;
        } else {
            view = html`
                ${this.renderLink(this.model.links[0], true)}
                <breadcrumb-overflow-menu>
                    <button aria-label="Open hidden link menu" sfx="button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <circle cx="5" cy="12" r="1"></circle>
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                        </svg>
                    </button>
                    <breadcrumb-menu>
                        ${this.model.links.map((link, i) => {
                            if (i !== 0 && i !== this.model.links.length - 1) {
                                return this.renderLink(link);
                            }
                        })}
                    </breadcrumb-menu>
                </breadcrumb-overflow-menu>
                <svg
                    class="arrow"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <polyline points="9 6 15 12 9 18"></polyline>
                </svg>
                ${this.renderLink(this.model.links[this.model.links.length - 1])}
            `;
        }
        render(view, this);
    }
}
env.bind("breadcrumb-trail", BreadcrumbTrail);
