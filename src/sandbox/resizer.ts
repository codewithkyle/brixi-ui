export default class Resizer extends HTMLElement {
    private width: number;
    private _resizeElement: HTMLElement;
    private x: number;
    private dragging:boolean;
    private maxWidth: number;
    private container:HTMLElement;

    constructor() {
        super();
        this._resizeElement = this.querySelector("resize-bar");
        this.dragging = false;
    }

    private initDrag = (e: MouseEvent) => {
        this.x = e.clientX;
        this.dragging = true;
        this.setAttribute("dragging", "true");
    }

    private doDrag = (e: MouseEvent): void => {
        if (this.dragging){
            const x = e.clientX;
            const diff = x - this.x;
            let newWidth = this.width + diff;
            if (newWidth > this.maxWidth){
                newWidth = this.maxWidth;
            } else if (newWidth < 300){
                newWidth = 300;
            }
            this.container.style.width = `${newWidth}px`;
            this.width = newWidth;
            this.x = x;
        }
    }

    private stopDrag = (e: MouseEvent): void => {
        this.dragging = false;
        this.setAttribute("dragging", "false");
    }

    private resize:EventListener = () => {
        this.maxWidth = this.getBoundingClientRect().width;
    }

    connectedCallback() {
        this.container = this.querySelector("resize-container");
        this.width = this.getBoundingClientRect().width;
        this.maxWidth = this.width;
        this._resizeElement.addEventListener('mousedown', this.initDrag);
        document.addEventListener('mousemove', this.doDrag);
        document.addEventListener('mouseup', this.stopDrag);
        window.addEventListener("resize", this.resize);
    }
}