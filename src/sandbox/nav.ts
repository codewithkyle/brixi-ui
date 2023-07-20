import SuperComponent from "@codewithkyle/supercomponent";
import { message } from "@codewithkyle/messaging";
import { html, render } from "lit-html";

type Link = {
    name: string;
    children: Array<Link>;
    slug: string;
};
type Navigation = Array<Link>;
type NavData = {
    navigation: Navigation;
    active: string;
};
export default class Nav extends SuperComponent<NavData> {
    constructor() {
        super();
        this.state = "LOADING";
        this.stateMachine = {
            LOADING: {
                SUCCESS: "IDLING",
            },
        };
        this.model = {
            navigation: [],
            active: null,
        };
        this.render();
    }

    private async fetchNavigation() {
        const request = await fetch("/navigation.json", {
            method: "GET",
            headers: new Headers({
                Accept: "application/json",
            }),
        });
        const response = await request.json();
        this.set({
            navigation: response,
        });
        this.trigger("SUCCESS");
    }

    private navigate: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const slug = target.dataset.slug;
        this.set({
            active: slug,
        });
        window.history.replaceState(null, null, `/${slug}`);
        message({
            recipient: "view",
            data: slug,
        });
    };

    private toggleGroup: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        target.classList.toggle("is-open");
    };

    private handleMenuClick: EventListener = (e: Event) => {
        document.body.classList.toggle("is-open");
    };

    private renderLink(link) {
        return html`
            <button sfx="button" class="${link.slug === this.model.active ? "is-active" : ""}" @click=${this.navigate} data-slug="${link.slug}">
                <span>${link.name.replace(/\-/g, " ")}</span>
            </button>
        `;
    }

    private renderLinkWithChildren(link) {
        return html`
            <button sfx="button" @click=${this.toggleGroup}>
                <span>${link.name.replace(/\-/g, " ")}</span>
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 192 512">
                        <path
                            fill="currentColor"
                            d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
                        />
                    </svg>
                </i>
            </button>
            <nav-children-container>
                ${link.children.map((child) => {
                    return child.children.length ? this.renderLinkWithChildren(child) : this.renderLink(child);
                })}
            </nav-children-container>
        `;
    }

    render() {
        let view;
        switch (this.state) {
            case "LOADING":
                view = html`
                    ${Array.from(Array(8)).map(() => {
                        return html` <nav-skel></nav-skel> `;
                    })}
                `;
                break;
            default:
                view = html`
                    <div flex="row nowrap items-center" class="mb-1">
                        <a sfx="button" href="/" class="mr-0.5" flex="row nowrap items-center">
                            <img src="/static/logo.png" width="32" class="mr-0.25" />
                            <h1 class="font-xl font-bold font-grey-800">Brixi UI</h1>
                        </a>
                        <a
                            sfx="button"
                            target="_blank"
                            rel="noopener"
                            tooltip="Github"
                            href="https://github.com/codewithkyle/brixi-components"
                            class="bttn"
                            shape="round"
                            kind="text"
                            color="grey"
                            icon="center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-brand-github"
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
                                <path
                                    d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
                                ></path>
                            </svg>
                        </a>
                        <a
                            sfx="button"
                            target="_blank"
                            rel="noopener"
                            tooltip="Project board"
                            href="https://github.com/users/codewithkyle/projects/4"
                            class="bttn"
                            shape="round"
                            kind="text"
                            color="grey"
                            icon="center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-brand-trello"
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
                                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                                <path d="M7 7h3v10h-3z"></path>
                                <path d="M14 7h3v6h-3z"></path>
                            </svg>
                        </a>
                        <a
                            sfx="button"
                            target="_blank"
                            rel="noopener"
                            tooltip="Download"
                            href="/static/brixi-ui.zip"
                            class="bttn"
                            shape="round"
                            kind="text"
                            color="grey"
                            icon="center"
                            download="brixi-ui.zip"
                        >
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
                                <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4"></path>
                                <line x1="12" y1="13" x2="12" y2="22"></line>
                                <polyline points="9 19 12 22 15 19"></polyline>
                            </svg>
                        </a>
                    </div>
                    ${this.model.navigation.map((link) => {
                        return html` ${link.children.length ? this.renderLinkWithChildren(link) : this.renderLink(link)} `;
                    })}
                    <button @click=${this.handleMenuClick} style="position:fixed;top:1rem;left:275px;" class="bttn menu" kind="outline" color="grey" icon="center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="open" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="close" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                `;
                break;
        }
        render(view, this);
    }

    connected() {
        this.fetchNavigation();
        const slug = location.pathname.replace(/^\//, "").trim();
        this.set({
            active: slug,
        });
    }
}
