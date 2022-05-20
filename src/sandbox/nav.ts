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
        this.update({
            navigation: response,
        });
        this.trigger("SUCCESS");
    }

    private navigate: EventListener = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const slug = target.dataset.slug;
        this.update({
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
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="github-alt"
                                class="svg-inline--fa fa-github-alt fa-w-15"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 480 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z"
                                ></path>
                            </svg>
                        </a>
                        <a
                            sfx="button"
                            target="_blank"
                            rel="noopener"
                            tooltip="Report issues"
                            href="https://github.com/codewithkyle/brixi-components/issues"
                            class="bttn"
                            shape="round"
                            kind="text"
                            color="grey"
                            icon="center"
                        >
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="bug"
                                class="svg-inline--fa fa-bug fa-w-16"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M511.988 288.9c-.478 17.43-15.217 31.1-32.653 31.1H424v16c0 21.864-4.882 42.584-13.6 61.145l60.228 60.228c12.496 12.497 12.496 32.758 0 45.255-12.498 12.497-32.759 12.496-45.256 0l-54.736-54.736C345.886 467.965 314.351 480 280 480V236c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v244c-34.351 0-65.886-12.035-90.636-32.108l-54.736 54.736c-12.498 12.497-32.759 12.496-45.256 0-12.496-12.497-12.496-32.758 0-45.255l60.228-60.228C92.882 378.584 88 357.864 88 336v-16H32.666C15.23 320 .491 306.33.013 288.9-.484 270.816 14.028 256 32 256h56v-58.745l-46.628-46.628c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0L141.255 160h229.489l54.627-54.627c12.498-12.497 32.758-12.497 45.256 0 12.496 12.497 12.496 32.758 0 45.255L424 197.255V256h56c17.972 0 32.484 14.816 31.988 32.9zM257 0c-61.856 0-112 50.144-112 112h224C369 50.144 318.856 0 257 0z"
                                ></path>
                            </svg>
                        </a>
                        <a
                            sfx="button"
                            target="_blank"
                            rel="noopener"
                            tooltip="Project board"
                            href="https://github.com/codewithkyle/brixi-components/projects/1"
                            class="bttn"
                            shape="round"
                            kind="text"
                            color="grey"
                            icon="center"
                        >
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="columns"
                                class="svg-inline--fa fa-columns fa-w-16"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64V160h160v256zm224 0H288V160h160v256z"
                                ></path>
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
        this.update({
            active: slug,
        });
    }
}
