import { env } from "djinnjs/env";

type RowData = {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
};

export default class DataTable extends HTMLElement {
    private foot: HTMLElement;
    private body: HTMLElement;
    private nextButton: HTMLButtonElement;
    private backButton: HTMLButtonElement;
    private emptyMessage: HTMLElement;
    private pageCount: HTMLElement;

    private page: number;
    private totalPages: number;
    private data: Array<RowData>;

    private rowsPerPage: number;

    constructor() {
        super();
        this.foot = this.querySelector("tfoot");
        this.body = this.querySelector("tbody");
        this.nextButton = this.querySelector(".js-next");
        this.backButton = this.querySelector(".js-back");
        this.pageCount = this.querySelector(".js-page-count");
        this.emptyMessage = this.querySelector("empty-message");

        this.page = 0;
        this.totalPages = 0;
        this.data = [];

        // Config
        this.rowsPerPage = 3;
    }

    private render(rows: Array<RowData>) {
        // Reset views
        this.body.innerHTML = "";
        if (rows.length === 0) {
            this.body.style.display = "none";
            this.foot.style.display = "none";
            this.emptyMessage.style.display = "block";
        } else {
            this.body.style.display = "block";
            this.foot.style.display = "block";
            this.emptyMessage.style.display = "none";
        }

        // Render tbody data
        for (let i = 0; i < rows.length; i++) {
            const row = document.createElement("tr");

            const cell1 = document.createElement("td");
            cell1.innerText = rows[i].col1;
            row.appendChild(cell1);

            const cell2 = document.createElement("td");
            cell2.innerText = rows[i].col2;
            row.appendChild(cell2);

            const cell3 = document.createElement("td");
            cell3.innerText = rows[i].col3;
            row.appendChild(cell3);

            const cell4 = document.createElement("td");
            cell4.innerText = rows[i].col4;
            row.appendChild(cell4);

            const cell5 = document.createElement("td");
            cell5.innerText = rows[i].col5;
            row.appendChild(cell5);

            this.body.appendChild(row);
        }

        // Updates tfoot data
        if (this.totalPages > 1) {
            this.foot.style.display = "block";
            this.pageCount.innerText = `Page ${this.page + 1} of ${this.totalPages}`;
            if (this.page === 0) {
                this.backButton.disabled = true;
            } else {
                this.backButton.disabled = false;
            }
            if (this.page === this.totalPages - 1) {
                this.nextButton.disabled = true;
            } else {
                this.nextButton.disabled = false;
            }
        } else {
            this.foot.style.display = "block";
        }
    }

    private filter() {
        const filteredData = [...this.data];

        // filter data

        const rows = filteredData.slice(this.page * this.rowsPerPage, this.page * this.rowsPerPage + this.rowsPerPage);
        this.totalPages = Math.ceil(filteredData.length / this.rowsPerPage);
        this.render(rows);
    }

    private async fetchData() {
        const ticket = env.startLoading();
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
                this.data = response.data;
                this.filter();
            } else {
                const error = response?.message || response?.error || "Something went wrong loading table data.";
                console.error(error);
            }
        } else {
            console.error(`Server error occured -- ${reqeust.status}: ${reqeust.statusText}`);
        }
        env.stopLoading(ticket);
    }

    private handleNext: EventListener = () => {
        this.page++;
        if (this.page > this.totalPages - 1) {
            this.page = this.totalPages - 1;
        }
        this.filter();
    };

    private handleBack: EventListener = () => {
        this.page--;
        if (this.page < 0) {
            this.page = 0;
        }
        this.filter();
    };

    connectedCallback() {
        this.nextButton.addEventListener("click", this.handleNext);
        this.backButton.addEventListener("click", this.handleBack);
        this.fetchData();
    }
}
