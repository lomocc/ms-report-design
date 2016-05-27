import ItemRender from './ItemRender'
export default class extends ItemRender {

    createElement() {
        var container = document.createElement("div");
        this.progress = document.createElement("div");
        this.progress.style.background = "#f90";
        container.style.width = "100%";
        container.appendChild(this.progress);
        return container;
    }
    render() {
        super.render();
        this.progress.innerText = this.data;
        if (this.params) {
            var value = this.data / this.params[0];
            if(value > 1)
                value = 1;
            this.progress.style.width = value * 100 + "%";
        }
    }
}