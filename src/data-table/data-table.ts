// @ts-expect-error
import { html, render } from "https://unpkg.com/lit-html?module";
import { Component } from "djinnjs/component";

type RowData = {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
};

type DataTableState = {
    rows: Array<RowData>;
    page: number;
    totalPages: number;
    rowsPerPage: number;
};

export default class DataTable extends Component<DataTableState> {
    private foot: HTMLElement;
    private body: HTMLElement;
    private emptyMessage: HTMLElement;

    constructor() {
        super();
        this.foot = this.querySelector("tfoot");
        this.body = this.querySelector("tbody");
        this.emptyMessage = this.querySelector("empty-message");

        this.state = {
            rowsPerPage: 3,
            page: 0,
            totalPages: 0,
            rows: [],
        };
    }

    private async fetchData() {
        const reqeust = await fetch(`${location.origin}/api/v1/data-table.json`, {
            method: "GET",
            credentials: "include",
            headers: new Headers({
                Accept: "application/json",
            }),
        });
        if (reqeust.ok) {
            const response = await reqeust.json();
            if (response.success) {
                this.setState({
                    rows: response.data,
                    totalPages: Math.ceil(response.data.length / this.state.rowsPerPage),
                });
            } else {
                const error = response?.message || response?.error || "Something went wrong loading table data.";
                console.error(error);
            }
        } else {
            console.error(`Server error occured - ${reqeust.status}: ${reqeust.statusText}`);
        }
    }

    public next() {
        const updatedState = { ...this.state };
        updatedState.page++;
        if (updatedState.page > this.state.totalPages - 1) {
            updatedState.page = this.state.totalPages - 1;
        }
        this.setState(updatedState);
    }

    public back() {
        const updatedState = { ...this.state };
        updatedState.page--;
        if (updatedState.page < 0) {
            updatedState.page = 0;
        }
        this.setState(updatedState);
    }

    connected() {
        this.fetchData();
    }

    render() {
        if (!this.state.rows.length) {
            this.foot.style.display = "none";
            this.body.style.display = "none";
            this.emptyMessage.innerText = "Failed to load. Try refreshing the page.";
            this.emptyMessage.style.display = "block";
        } else {
            this.body.style.display = "block";
            this.emptyMessage.style.display = "none";

            const rows: Array<RowData> = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage);
            const body = html`
                ${rows.map((row) => {
                    return html`
                        <tr>
                            ${Object.values(row).map((value) => {
                                return html`<td>${value}</td>`;
                            })}
                        </tr>
                    `;
                })}
            `;
            render(body, this.body);

            if (this.state.totalPages > 1) {
                this.foot.style.display = "block";

                const foot = html`
                    <tr>
                        <td>Page ${this.state.page + 1} of ${this.state.totalPages}</td>
                        <td>
                            <button @click=${(e) => this.back()} ?disabled=${this.state.page === 0}>
                                <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <path
                                        fill="currentColor"
                                        d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
                                    ></path>
                                </svg>
                            </button>
                        </td>
                        <td>
                            <button @click=${(e) => this.next()} ?disabled=${this.state.page === this.state.totalPages - 1}>
                                <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <path
                                        fill="currentColor"
                                        d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                                    ></path>
                                </svg>
                            </button>
                        </td>
                    </tr>
                `;
                render(foot, this.foot);
            }
        }
    }
}
