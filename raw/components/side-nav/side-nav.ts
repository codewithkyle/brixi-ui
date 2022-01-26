import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { subscribe } from "@codewithkyle/pubsub";
import Badge from "~brixi/components/badges/badge/badge";
import { parseDataset } from "~brixi/utils/general";

export interface SubNavLink {
    icon: string;
    label: string;
    url: string;
    badge?: boolean;
}
export interface NavLink {
    icon: string;
    label: string;
    url?: string;
    target?: "blank" | "self";
    subnav?: Array<SubNavLink>;
    badge?: boolean;
}
export interface ISideNav {
    nav: Array<NavLink>;
    isOpen: boolean;
    name: string;
    role: string;
    avatar: string;
    currentPage: string;
    logo: string;
    title: string;
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
}
export interface SideNavSettings {
    nav: Array<NavLink>;
    name: string;
    role?: string;
    avatar?: string;
    logo?: string;
    title: string;
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
}
export default class SideNav extends SuperComponent<ISideNav> {
    constructor(settings: SideNavSettings) {
        super();
        let isOpen = localStorage.getItem("side-nav-state") === "false" ? false : true;
        if (window.innerWidth <= 350) {
            isOpen = false;
        }
        this.model = {
            nav: [],
            isOpen: isOpen,
            name: "",
            role: "",
            avatar: "",
            currentPage: location.pathname.replace(/^\//, "").toLowerCase(),
            logo: "",
            title: "",
            css: "",
            class: "",
            attributes: {},
        };
        this.model = parseDataset<ISideNav>(this.dataset, this.model);
        env.css(["side-nav"]).then(() => {
            this.set(settings, true);
            this.render();
        });
        subscribe("navigation", this.inbox.bind(this));
    }

    private inbox(path: string) {
        this.update({
            currentPage: path.replace(/^\//, "").toLowerCase(),
        });
    }

    override connected() {
        window.addEventListener(
            "resize",
            this.debounce(() => {
                let isOpen = localStorage.getItem("side-nav-state") === "false" ? false : true;
                if (window.innerWidth <= 350) {
                    isOpen = false;
                }
                this.update({
                    isOpen: isOpen,
                });
            }, 300),
            { passive: true }
        );
    }

    private handleMenuClick: EventListener = (e: Event) => {
        const open = this.model.isOpen ? false : true;
        localStorage.setItem("side-nav-state", `${open}`);
        this.update({
            isOpen: open,
        });
    };

    private renderIcon(link: NavLink) {
        let out;
        if (link?.icon?.length) {
            out = html`
                <i>
                    ${unsafeHTML(link.icon)}
                    ${link?.badge
                        ? html`${new Badge({
                              offsetX: -3,
                              offsetY: 3,
                          })}`
                        : ""}
                </i>
            `;
        } else {
            out = "";
        }
        return out;
    }

    private renderMenuIcon() {
        let out;
        if (this.model.isOpen) {
            out = html`
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            `;
        } else {
            out = html`
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            `;
        }
        return out;
    }

    private renderLink(link: NavLink) {
        let out;
        const name = link.label.toLocaleLowerCase().replace(/\s+/g, "-");
        let childContainsCurrentLink = false;
        if (link?.subnav?.length) {
            for (let i = 0; i < link.subnav.length; i++) {
                if (this.model.currentPage === link.subnav[i].url.replace(/^\//, "".trim().toLowerCase())) {
                    childContainsCurrentLink = true;
                    break;
                }
            }
            if (!link?.badge) {
                let childHasBadge = false;
                for (let i = 0; i < link.subnav.length; i++) {
                    if (link.subnav[i]?.badge) {
                        childHasBadge = true;
                        break;
                    }
                }
                link.badge = childHasBadge;
            }
        }
        if (this.model.isOpen) {
            if (!link?.url?.length && link?.subnav?.length) {
                out = html`
                    <div class="link">
                        <label sfx="button" for="${name}">
                            ${this.renderIcon(link)}
                            <span>${link.label}</span>
                        </label>
                        <input ?checked=${childContainsCurrentLink} type="checkbox" name="${name}" id="${name}" />
                        <div class="sub">${link.subnav.map((link) => this.renderLink(link))}</div>
                    </div>
                `;
            } else {
                out = html`
                    <a
                        sfx="button"
                        class="${this.model.currentPage === link.url.replace(/^\//, "".trim()) ? "is-active" : ""}"
                        href="${link.url}"
                        target="_${link?.target?.length ? link.target : "self"}"
                    >
                        ${this.renderIcon(link)}
                        <span>${link.label}</span>
                    </a>
                `;
            }
        } else {
            if (!link?.url?.length && link?.subnav?.length) {
                out = html`
                    <div class="link">
                        <label sfx="button" for="${name}" tooltip="${link.label}">
                            ${this.renderIcon(link)}
                            <span>${link.label}</span>
                        </label>
                        <input ?checked=${childContainsCurrentLink} type="checkbox" name="${name}" id="${name}" />
                        <div class="sub">${link.subnav.map((link) => this.renderLink(link))}</div>
                    </div>
                `;
            } else {
                out = html`
                    <a
                        sfx="button"
                        class="${this.model.currentPage === link.url.replace(/^\//, "".trim()) ? "is-active" : ""}"
                        tooltip="${link.label}"
                        href="${link.url}"
                        target="_${link?.target?.length ? link.target : "self"}"
                    >
                        ${this.renderIcon(link)}
                        <span>${link.label}</span>
                    </a>
                `;
            }
        }
        return out;
    }

    override render() {
        this.style.cssText = this.model.css;
        this.className = this.model.class;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        this.setAttribute("state", this.model.isOpen ? "open" : "closed");
        const initals = this.model.name
            .split(" ")
            .map((n) => n[0])
            .join("");
        const view = html`
            <div class="container">
                <header>
                    <div flex="row nowrap items-center">
                        ${this.model.logo?.length ? html`<img src="${this.model.logo}" />` : ""}
                        <h1>${this.model.title}</h1>
                    </div>
                    <button sfx="button" @click=${this.handleMenuClick} tooltip="${this.model.isOpen ? "Collapse menu" : "Open menu"}" class="menu">
                        ${this.renderMenuIcon()}
                    </button>
                </header>
                <nav>
                    ${this.model.nav.map((link) => {
                        return this.renderLink(link);
                    })}
                </nav>
                <footer>
                    <div flex="row nowrap items-center">
                        <div class="avatar">
                            ${this.model.avatar?.length
                                ? html`<img src="${this.model.avatar}" alt="profile photo of ${this.model.name}" title="Profile photo of ${this.model.name}" />`
                                : ""}
                            <span>${initals}</span>
                        </div>
                        <div class="details">
                            <h3 title="${this.model.name}">${this.model.name}</h3>
                            ${this.model.role?.length ? html`<h4 title="${this.model.role}">${this.model.role}</h4>` : ""}
                        </div>
                    </div>
                    <button sfx="button" class="logout" tooltip="Logout">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                    </button>
                </footer>
            </div>
        `;
        render(view, this);
    }
}
env.mount("side-nav", SideNav);