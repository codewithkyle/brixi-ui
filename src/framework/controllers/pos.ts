import { debounce } from "~brixi/utils/general";

class Positions {
    public window: {
        innerWidth: number;
        innerHeight: number;
        outterWidth: number;
        outterHeight: number;
    };

    constructor() {
        this.window = {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            outterWidth: window.outerWidth,
            outterHeight: window.outerHeight,
        };

        window.addEventListener(
            "resize",
            () => {
                debounce(this.doResize.bind(this), 300);
            },
            { capture: true, passive: true }
        );
    }

    private doResize = () => {
        this.window = {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            outterWidth: window.outerWidth,
            outterHeight: window.outerHeight,
        };
    };

    public positionElement(el: HTMLElement, x: number, y: number): void {
        const bounds = el.getBoundingClientRect();
        if (x + bounds.width > this.window.innerWidth) {
            x = this.window.innerWidth - bounds.width;
        } else if (x < 0) {
            x = 0;
        }
        if (y + bounds.height > this.window.innerHeight) {
            y = this.window.innerHeight - bounds.height;
        } else if (y < 0) {
            y = 0;
        }
        el.style.transform = `translate(${x}px, ${y}px)`;
    }

    public positionElementToElement(el: HTMLElement, target: HTMLElement): void {
        const elBounds = el.getBoundingClientRect();
        const targetBounds = target.getBoundingClientRect();
        let top = targetBounds.top + targetBounds.height;
        if (top + elBounds.height >= this.window.innerHeight) {
            top = targetBounds.top - elBounds.height;
        }
        let left = targetBounds.left;
        if (left + elBounds.width >= this.window.innerWidth) {
            left = this.window.innerWidth - elBounds.width;
        }
        el.style.transform = `translate(${left}px, ${top}px)`;
    }
}
const pos = new Positions();
export default pos;
