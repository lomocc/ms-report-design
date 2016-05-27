import ObjectUtil from '../utils/ObjectUtil'

export default class {
    //_element;
    ///**
    // * 数据
    // */
    //_data;
    /**
     * 设置数据 供子类覆盖 方便做一些设置数据时的操作
     * @param v
     */
    set data(v) {
        if (ObjectUtil.isEqual(this._data, v)) {
            return;
        }
        this._data = v;
        this.render();
    }

    /**
     * 获取数据
     * @returns {*}
     */
    get data() {
        return this._data;
    }
    set params(v) {
        if (ObjectUtil.isEqual(this._params, v)) {
            return;
        }
        this._params = v;
        this.render();
    }

    /**
     * 获取数据
     * @returns {*}
     */
    get params() {
        return this._params;
    }
    /**
     * 创建DOM操作 供子类覆盖
     * @returns {Element}
     */
    createElement() {
        return this.data;
    }

    /**
     * 对外提供获取DOM的接口
     * @returns {*|Element}
     */
    get element() {
        return this._element = this._element || this.createElement();
    }

    /**
     * 如何渲染DOM 供子类覆盖
     */
    render() {
        this.element;
    }
}