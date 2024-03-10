export default class DownloadButtonComponente extends HTMLElement {
    constructor(){
        super();
        this.downloading = false;
    }
    connectedCallback(){
        this.iconEl = this.querySelector("svg, img");
        this.spanEl = this.querySelector("span");
        this.ogText = this.spanEl?.innerHTML;

        this.addEventListener("click", this.onClick);
    }

    onClick = () => {
        if (this.downloading) return;
        this.downloading = true;
        if (this.iconEl != null){
            this.iconEl.style.display = "none";
        }
        this.spanEl.innerHTML = "Downloading...";
    }
}
