import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~brixi/controllers/env";
import { noop, parseDataset } from "~brixi/utils/general";
import Button from "../buttons/button/button";

export interface IPagination {
    css: string;
    class: string;
    attributes: {
        [name: string]: string | number;
    };
    totalPages: number;
    callback: (pageOffset: number) => void;
    activePage: number;
}
export interface PaginationSettings {
    css?: string;
    class?: string;
    attributes?: {
        [name: string]: string | number;
    };
    totalPages: number;
    callback: (pageOffset: number) => void;
    activePage?: number;
}
export default class Pagination extends SuperComponent<IPagination> {
    constructor(settings: PaginationSettings) {
        super();
        this.model = {
            css: "",
            class: "",
            attributes: {},
            totalPages: 0,
            callback: noop,
            activePage: 1,
        };
        this.model = parseDataset<IPagination>(this.dataset, this.model);
        env.css(["pagination", "button"]).then(() => {
            this.set(settings, true);
            this.render();
        });
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

    private processPageChange(nextPageNumber: number): void {
        const updated = this.get();
        updated.activePage = nextPageNumber;
        if (updated.activePage < 0) {
            updated.activePage = 0;
        } else if (updated.activePage > updated.totalPages) {
            updated.activePage = updated.totalPages;
        }
        this.set(updated);
        this.model.callback(updated.activePage);
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
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map((key) => {
            this.setAttribute(key, `${this.model.attributes[key]}`);
        });
        const visiblePageNumbers: number[] = this.calcVisiblePageNumbers();
        const view = html`
            ${new Button({
                callback: this.back.bind(this),
                disabled: this.model.activePage === 1,
                kind: "text",
                color: "grey",
                size: "slim",
                tooltip: "Back",
                iconPosition: "center",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="15 6 9 12 15 18"></polyline></svg>`,
            })}
            ${visiblePageNumbers.map((pageNumber) => {
                return html`
                    ${new Button({
                        callback: () => {
                            this.jumpToPage(pageNumber);
                        },
                        kind: "text",
                        color: "grey",
                        css: "min-width: 36px;",
                        class: pageNumber === this.model.activePage ? "is-active" : "",
                        label: pageNumber.toString(),
                    })}
                `;
            })}
            ${new Button({
                callback: this.forward.bind(this),
                disabled: this.model.activePage === this.model.totalPages,
                kind: "text",
                color: "grey",
                size: "slim",
                tooltip: "Next",
                iconPosition: "center",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="9 6 15 12 9 18"></polyline></svg>`,
            })}
        `;
        render(view, this);
    }
}
env.bind("pagination-component", Pagination);
