import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

interface ILink {
    label?: string;
    icon?: string | HTMLElement;
    ariaLabel?: string;
    callback: Function;
}
export interface IBreadcrumbTrail {
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    links: Array<ILink>;
}
export interface BreadcrumbTrailSettings {
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    links: Array<ILink>;
}
export default class BreadcrumbTrail extends SuperComponent<IBreadcrumbTrail> {
    constructor(settings: BreadcrumbTrailSettings) {
        super();
        this.model = {
            css: "",
            class: "",
            attributes: {},
            links: [],
        };
        this.model = parseDataset<IBreadcrumbTrail>(this.dataset, this.model);
        env.css(["breadcrumb-trail"]).then(() => {
            this.set(settings, true);
            this.render();
        });
    }

    private handleClick = (e) => {
        const target = e.currentTarget;
        const index = parseInt(target.dataset.index);
        this.model.links[index].callback();
    };

    private renderIcon(icon: string | HTMLElement) {
        let out;
        if (icon instanceof HTMLElement) {
            out = html` <i class="icon">${icon}</i> `;
        } else if (typeof icon === "string" && icon.length) {
            out = html` <i class="icon">${unsafeHTML(icon)}</i> `;
        } else {
            out = "";
        }
        return out;
    }

    private renderLink(link: ILink, i: number, renderArrowIcon: boolean = false) {
        if (!link?.label && !link?.icon) {
            return "";
        }
        return html`
            <button type="button" @click=${this.handleClick} data-index="${i}" aria-label="${link?.ariaLabel ?? ""}">
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
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        let view;
        if (this.model.links.length <= 3) {
            view = html`
                ${this.model.links.map((link, i) => {
                    let renderArrowIcon = true;
                    if (i === this.model.links.length - 1) {
                        renderArrowIcon = false;
                    }
                    return this.renderLink(link, i, renderArrowIcon);
                })}
            `;
        } else {
            view = html`
                ${this.renderLink(this.model.links[0], 0, true)}
                <breadcrumb-overflow-menu>
                    <button aria-label="Open hidden link menu">
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
                                return this.renderLink(link, i);
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
                ${this.renderLink(this.model.links[this.model.links.length - 1], this.model.links.length - 1)}
            `;
        }
        render(view, this);
    }
}
env.bind("breadcrumb-trail", BreadcrumbTrail);
