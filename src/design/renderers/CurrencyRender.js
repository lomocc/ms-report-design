import ItemRender from './ItemRender'
/**
 * 显示货币
 */
export default class extends ItemRender {
    formatCurrency() {
        if (this.data) {
            return this.data.replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,");
        }
        return '';
    }
    createElement() {
        return this.formatCurrency();
    }
}