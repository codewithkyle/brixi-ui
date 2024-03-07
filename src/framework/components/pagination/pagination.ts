import { html, render } from "lit-html";
import env from "~brixi/controllers/env";
import "~brixi/components/buttons/button/button";
import Component from "~brixi/component";
import { parseDataset } from "~brixi/utils/general";

env.css(["pagination", "button"]);

export interface IPagination {
    totalPages: number;
    activePage: number;
}
export default class Pagination extends Component<IPagination> {
    constructor() {
        super();
        this.model = {
            totalPages: 0,
            activePage: 1,
        };
    }

    static get observedAttributes() {
        return ["data-total-pages", "data-active-page"];
    }

    override async connected() {
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
    }

    public back(): void {
        this.processPageChange(this.model.activePage - 1);
    }
    public forward(): void {
        this.processPageChange(this.model.activePage + 1);
    }
    public jumpToPage(pageNumber: number): void {
        this.processPageChange(pageNumber);
    }

    private handleBack: EventListener = () => {
        this.back();
    };
    private handleForward: EventListener = () => {
        this.forward();
    };

    private processPageChange(nextPageNumber: number): void {
        const updated = this.get();
        updated.activePage = nextPageNumber;
        if (updated.activePage < 1) {
            updated.activePage = 1;
        } else if (updated.activePage > updated.totalPages) {
            updated.activePage = updated.totalPages;
        }
        this.set(updated);
        this.dispatchEvent(
            new CustomEvent("change", {
                detail: {
                    page: updated.activePage,
                },
                bubbles: true,
                cancelable: true,
            })
        );
    }

    private calcVisiblePageNumbers(): number[] {
        let out = [];
        if (this.model.totalPages <= 5) {
            for (let i = 1; i <= this.model.totalPages; i++) {
                out.push(i);
            }
        } else if (this.model.activePage <= 2) {
            out = [1, 2, 3, 4, 5];
        } else if (this.model.activePage >= this.model.totalPages - 2) {
            out = [this.model.totalPages - 4, this.model.totalPages - 3, this.model.totalPages - 2, this.model.totalPages - 1, this.model.totalPages];
        } else {
            out = [this.model.activePage - 2, this.model.activePage - 1, this.model.activePage, this.model.activePage + 1, this.model.activePage + 2];
        }
        return out;
    }

    override render() {
        const visiblePageNumbers: number[] = this.calcVisiblePageNumbers();
        const view = html`
            <button-component
                data-kind="text"
                data-color="grey"
                data-size="slim"
                tooltip="Back"
                data-icon-position="center"
                data-icon='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="15 6 9 12 15 18"></polyline></svg>'
                @click=${this.handleBack}
                data-disabled="${this.model.activePage === 1}"
            ></button-component>
            ${visiblePageNumbers.map((pageNumber) => {
                return html`
                    <button-component
                        data-kind="text"
                        data-color="grey"
                        data-icon-position="center"
                        data-label="${pageNumber}"
                        class="${pageNumber === this.model.activePage ? "is-active" : ""}"
                        style="min-width: 36px;"
                        @click=${this.jumpToPage.bind(this, pageNumber)}
                    ></button-component>
                `;
            })}
            <button-component
                data-kind="text"
                data-color="grey"
                data-size="slim"
                tooltip="Next"
                data-icon-position="center"
                data-icon='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="9 6 15 12 9 18"></polyline></svg>'
                data-disabled="${this.model.activePage === this.model.totalPages}"
                @click=${this.handleForward}
            ></button-component>
        `;
        render(view, this);
    }
}
env.bind("pagination-component", Pagination);
