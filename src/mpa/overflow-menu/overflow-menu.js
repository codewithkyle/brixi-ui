export default class OverflowMenu extends HTMLElement {
    constructor(){
        super();
    }

    positionToElement(target, topOffset = 0) {
        const elBounds = this.getBoundingClientRect();
        const targetBounds = target.getBoundingClientRect();
        let top = targetBounds.top + targetBounds.height + topOffset;
        if (top + elBounds.height >= window.innerHeight) {
            top = targetBounds.top - elBounds.height - topOffset;
        }
        let left = targetBounds.right - elBounds.width;
        if (left + elBounds.width >= window.innerWidth) {
            left = window.innerWidth - elBounds.width;
        } else if (left < 0) {
            left = 0;
        }
        this.style.transform = `translate(${left}px, ${top}px)`;
    }
}
