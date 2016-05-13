/**
 * 根据单条数据和表达式计算结果
 */
export default class {
    parse(context) {
        if (this.child === undefined) {
            console.error("child不能为空 context=", context);
        }
        if (context === undefined) {
            console.warn('context不能为空');
        }
    }

    addChild(child) {
        this.child = child;
    }
}