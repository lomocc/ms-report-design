import ItemRender from './ItemRender'
export default class extends ItemRender {

    createElement() {
        var container = document.createElement("div");
        this.progress = document.createElement("div");
        this.progress.style.background = "#f90";
        container.appendChild(this.progress);
        return container;
    }
    render() {
        this.element.style.width = "100%";
        var value = this.data / 10;
        this.progress.innerText = this.data;
        this.progress.style.width = value * 100 + "%";
    }
}