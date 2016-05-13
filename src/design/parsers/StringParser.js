/**
 * 根据单条数据和表达式计算结果
 */
import ParserObject from './ParserObject'
export default class extends ParserObject {
    parse(context) {
        super.parse(context);

        var expression = this.expression;
        if (/\$\{(\w+)\}/.test(expression)) {
            expression = expression.replace(/\$\{(\w+)\}/g, (m, p)=> context[p] || 0);
            return expression;
        } else if (context && context.hasOwnProperty(expression)) {
            return context[expression];
        }
        return expression;
    }
}