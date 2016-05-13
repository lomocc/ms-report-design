/**
 * Created by vincent on 2016/5/3.
 */
export default class Injector {
    inject(value, name) {
        var key = Symbol.for(name);
        if (this[key]) {
            console.error("injectParser 名称不能重复:", name);
            return;
        }
        this[key] = value;
    }

    retrieve(name) {
        var key = Symbol.for(name);
        return this[key];
    }
}
