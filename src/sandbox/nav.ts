import SuperComponent from "@codewithkyle/supercomponent";
import { message } from "@codewithkyle/messaging";
import { html, render } from "lit-html";

type Link = {
    name: string,
    children: Array<Link>,
    slug: string,
};
type Navigation = Array<Link>;
type NavData = {
    navigation: Navigation,
    active: string,
};
export default class Nav extends SuperComponent<NavData>{
    constructor(){
        super();
        this.state = "LOADING";
        this.stateMachine = {
            LOADING: {
                SUCCESS: "IDLING",
            },
        }
        this.model = {
            navigation: [],
            active: null,
        };
        this.render();
    }

    private async fetchNavigation(){
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

    private navigate:EventListener = (e:Event) => {
        const target = e.currentTarget as HTMLElement;
        const slug = target.dataset.slug;
        this.update({
            active: slug,
        });
        window.history.replaceState(null, null, `/${slug}`);
        message({
            recipient: "view",
            data: slug
        });
    }

    private toggleGroup:EventListener = (e:Event) => {
        const target = e.currentTarget as HTMLElement;
        target.classList.toggle("is-open");
    }

    private renderLink(link){
        return html`
            <button class="${link.slug === this.model.active ? "is-active" : ""}" @click=${ this.navigate } data-slug="${ link.slug }">
                <span>${ link.name.replace(/\-/g, " ") }</span>
            </button>
            `;
    }

    private renderLinkWithChildren(link){
        return html`
            <button @click=${ this.toggleGroup }>
                <span>${ link.name.replace(/\-/g, " ") }</span>
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" viewBox="0 0 192 512"><path fill="currentColor" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"/></svg>
                </i>
            </button>
            <nav-children-container>
                ${link.children.map(child => {
                    return child.children.length ? this.renderLinkWithChildren(child) : this.renderLink(child)
                })}
            </nav-children-container>
        `;
    }

    render(){
        let view;
        switch (this.state){
            case "LOADING":
                view = html`
                    ${Array.from(Array(8)).map(() => {
                        return html`
                            <nav-skel></nav-skel>
                        `;
                    })}
                `;
                break;
            default:
                view = html`
                    ${ this.model.navigation.map(link => {
                        return html`
                            ${link.children.length ? this.renderLinkWithChildren(link) : this.renderLink(link)}
                        `;
                    }) }
                `;
                break;
        }
        render(view, this);
    }

    connected(){
        this.fetchNavigation();
        const slug = location.pathname.replace(/^\//, "").trim();
        this.update({
            active: slug,
        });
    }
}