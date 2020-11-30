export default class GithubDownloadComponent extends HTMLElement {
    private handleClick: EventListener = () => {
        const fileName = location.pathname
            .replace(/(https:\/\/components.codewithkyle.com\/)|[\/]$/g, "")
            .toLowerCase()
            .trim();
        const link = document.createElement("a");
        link.target = "_blank";
        link.href = `${location.origin}/downloads/${fileName}.zip`;
        link.download = fileName;
        link.click();
    };

    connectedCallback() {
        this.addEventListener("click", this.handleClick);
    }
}
