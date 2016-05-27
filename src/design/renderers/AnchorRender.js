/**
 * 链接 钻取
 */
import ItemRender from './ItemRender'
export default class extends ItemRender {
    createElement() {
        return document.createElement("a");
    }
    render() {
        this.element.innerText = this.data;
        if (this.params) {
            this.element.href = this.params[0];
        }
    }
}