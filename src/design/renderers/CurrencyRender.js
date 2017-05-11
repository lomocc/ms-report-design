import ItemRender from './ItemRender'
/**
 * 显示货币
 */
export default class extends ItemRender {
    formatCurrency() {
		var num = parseFloat(this.data);
		if(isNaN(num)) return "";
        return num.toFixed(2).replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,");
    }
    createElement() {
        return this.formatCurrency();
    }
}