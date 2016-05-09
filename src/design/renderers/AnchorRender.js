/**
 * 链接 钻取
 */
import ItemRender from './ItemRender'
export default class extends ItemRender {
    createElement(){
        return document.createElement("a");
    }
    render() {
        this.element.innerText = this.data;
        this.element.href = location.href + "#" + this.data;
    }
}