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
            try{
                return eval(expression);
            }catch (e){
                console.error(`表达式 ${this.expression} 转换失败`, context);
                return '';
            }
        }else if(context && context.hasOwnProperty(expression)){
            return context[expression];
        }
        return expression;
    }
}