/**
 * 根据单条数据和表达式计算结果
 */
export default class {
    parse(context) {
        if (this.expression === undefined) {
            console.error("expression不能为空 context=", context);
        }
        if (context === undefined) {
            console.warn("context不能为空 expression=", this.expression);
        }
    }
    addChild(expression) {
        this.expression = expression;
    }
}