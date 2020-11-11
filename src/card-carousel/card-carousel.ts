export default class CardCarousel extends HTMLElement {
    private nextButton: HTMLElement;
    private backButton: HTMLElement;
    private container: HTMLElement;
    private cardWidth: number;

    constructor() {
        super();
        this.nextButton = this.querySelector(".js-next");
        this.backButton = this.querySelector(".js-back");
        this.container = this.querySelector(".js-container");
        this.cardWidth = 320;
    }

    private handleNextClick: EventListener = () => {
        this.container.scrollBy({
            top: 0,
            left: this.cardWidth,
            behavior: "smooth",
        });
    };

    private handleBackClick: EventListener = () => {
        this.container.scrollBy({
            top: 0,
            left: -this.cardWidth,
            behavior: "smooth",
        });
    };

    connectedCallback() {
        this.nextButton.addEventListener("click", this.handleNextClick);
        this.backButton.addEventListener("click", this.handleBackClick);
    }
}
