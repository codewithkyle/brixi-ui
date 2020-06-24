class DataTable extends HTMLElement {
    private foot: HTMLElement;
    private body: HTMLElement;
    private nextButton: HTMLButtonElement;
    private backButton: HTMLButtonElement;
    private emptyMessage: HTMLElement;
    private pageCount: HTMLElement;

    private page: number;
    private totalPages: number;

    constructor() {
        super();
        this.foot = this.querySelector("tfoot");
        this.body = this.querySelector("tbody");
        this.nextButton = this.querySelector(".js-next");
        this.backButton = this.querySelector(".js-back");
        this.pageCount = this.querySelector(".js-page-count");
        this.emptyMessage = this.querySelector("empty-message");

        this.page = 0;
        this.totalPages = 4;
    }

    private render() {
        // TODO: render content

        // if (contentArray.length === 0) {
        //     this.body.style.display = "none";
        //     this.foot.style.display = "none";
        //     this.emptyMessage.style.display = "block";
        // } else {
        //     this.body.style.display = "block";
        //     this.foot.style.display = "block";
        //     this.emptyMessage.style.display = "none";
        // }

        // Updates tfoot text
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
    }

    private handleNext: EventListener = () => {
        this.page++;
        if (this.page > this.totalPages - 1) {
            this.page = this.totalPages - 1;
        }
        this.render();
    };

    private handleBack: EventListener = () => {
        this.page--;
        if (this.page < 0) {
            this.page = 0;
        }
        this.render();
    };

    connectedCallback() {
        this.nextButton.addEventListener("click", this.handleNext);
        this.backButton.addEventListener("click", this.handleBack);
    }
}
customElements.define("data-table", DataTable);
