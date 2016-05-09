import DisplayUtil from '../utils/DisplayUtil';
import ItemRender from './ItemRender';
import ProgressRender from './ProgressRender';
import CurrencyRender from './CurrencyRender';
import AnchorRender from './AnchorRender';

import ItemParser from '../parsers/ItemParser';

export default class Table extends ItemRender {
    static GROUP_HEADER_CLASS_NAME = "group-header";
    static TABLE_HEADER_CLASS_NAME = "table-header";

    static rendererMap = {
        "ProgressRender": ProgressRender,
        "ItemRender": ItemRender,
        "AnchorRender": AnchorRender,
        "CurrencyRender": CurrencyRender
    }
    static parserMap = {
        "ItemParser": ItemParser
    }

    static getParser(parserType) {
        if (parserType != undefined) {
            return Table.parserMap[renderType];
        }
        return Table.defaultParser();
    }

    static defaultParser() {
        return ItemParser;
    }
    static getRender(renderType) {
        if (renderType != undefined) {
            return Table.rendererMap[renderType];
        }
        return Table.defaultRender();
    }

    static defaultRender() {
        return ItemRender;
    }

    createElement() {
        return DisplayUtil.createElement("table");
    }


    render() {
        DisplayUtil.removeChild(this.element);

        this.data.columns.forEach((item)=>{
            this.calcChildren(item);
        });
        this.calcRowspan();
        if (this.data.invert) {
            this.renderInvert();
        } else {
            this.renderNormal();
        }
    }

    calcChildren(c){
        var childrenDeep = Symbol.for("childrenDeep");
        c[childrenDeep] = c.children ?this.childrenRowLength(c.children, true):0;
        if(c.children && c.children.length>0){
            c.children.forEach((item)=>{
                this.calcChildren(item);
            });
        }
    }
    renderNormal() {
        var columns = this.data.columns.concat();
        var maxDeep = this.maxDeep(columns);

        var childrenDeep = Symbol.for("childrenDeep");

        var children = [];
        var i = 0;
        while (i <= maxDeep) {
            children.push(this.getChildrenRow(columns, i, i != maxDeep));
            i++;
        }

        var thead = DisplayUtil.createElement('thead', null,
            children.map((list, deep)=> {
                    var columns = list.map((col)=> {
                        var colSpan = col.children ? this.childrenColLength(col.children) : col.colSpan;
                        var rowSpan = col[childrenDeep] == 0 ?
                            (maxDeep - col[childrenDeep] - deep + 1) :
                            (1);
                        if (colSpan !== 0 && rowSpan !== 0) {
                            return DisplayUtil.createElement('th', {colSpan, rowSpan, "class":Table.TABLE_HEADER_CLASS_NAME}, col.title);
                        }
                    });
                    return DisplayUtil.createElement('tr', null, columns);
                }
            ));
        var columns = this.getColumns(true);
        var tbs = this.data.dataSource.map((record, index)=>this.getRow(record, index, columns));
        var tbody = DisplayUtil.createElement('tbody', null, tbs);
        DisplayUtil.appendChild(this.element, [
            thead,
            tbody
        ]);
    }

    renderInvert() {
        var columns = this.data.columns.concat();
        var trs = this.appendCols(this.createRows(columns, 0), this.data.dataSource, this.getColumns(true));
        DisplayUtil.appendChild(this.element, DisplayUtil.createElement('tbody', null, trs));
    }
    appendCols(trs, list, columns){
        let span = Symbol.for("span");
        for (var i in list) {
            var record = list[i];
            for (var i = 0; i < columns.length; i++) {
                var col = columns[i];

                var grouped = this.data.groupby.indexOf(col.field) != -1;
                if ( grouped && record[span] && record[span][col.field] == 0) {
                    continue;
                }

                var classNames = [];
                grouped && classNames.push(Table.GROUP_HEADER_CLASS_NAME);
                col.render && classNames.push(col.render);

                DisplayUtil.appendChild(trs[i], DisplayUtil.createElement('td', {
                    colSpan: grouped ? record[span][col.field] : undefined,
                    rowSpan:record.rowSpan,
                    "class": classNames.length?classNames.join(" "):undefined
                }, this.transform(col, record)));
            }
        }
        return trs;
    }
    createRows(children, startIndex, trs, deep=0) {
        if (!children)
            return trs;
        var maxDeep = this.maxDeep(this.data.columns);
        var childrenDeep = Symbol.for("childrenDeep");

        trs = trs || [];
        for (var i = 0; i < children.length; i++) {
            var index = startIndex + i;
            var c = children[i];
            if (!trs[index])
                trs[index] = DisplayUtil.createElement('tr');

            var rowSpan = c.children ? this.childrenColLength(c.children) : c.colSpan;
            // var colSpan = c.children && c.children.length>0 ? maxDeep - this.childrenRowLength(c.children, true) - deep + 1 : c.title != undefined ? maxDeep - deep + 1 : 0;
            var colSpan = c[childrenDeep] == 0 ?
                (maxDeep - c[childrenDeep] - deep + 1) :
                (1);
            if (colSpan !== 0 && rowSpan !== 0) {
                DisplayUtil.appendChild(trs[index], DisplayUtil.createElement('td', {
                    colSpan,
                    rowSpan,
                    "class":Table.TABLE_HEADER_CLASS_NAME,
                }, c.title));
            }
            if(c.children && c.children.length){
                startIndex += this.childrenColLength(c.children) -1;
            }
            this.createRows(c.children, index, trs, deep + 1);
        }
        return trs;
    }

    calcRowspan() {
        var data = this.data.dataSource;
        var groupBy = this.data.groupby;
        if (!groupBy || groupBy.length == 0) {
            return;
        }
        var span = Symbol.for("span");
        // var groupBy = "id1";
        var lastHead = [];
        data.forEach((item)=> {
            // item.render = {};
            item[span] = {};
            for (var i = 0; i < groupBy.length; i++) {
                var key = groupBy[i];
                item[span][key] = 0;
                if (!lastHead[i]) {
                    lastHead[i] = item;
                }
            }
            for (var i = 0; i < groupBy.length; i++) {
                var key = groupBy[i];
                if (!lastHead[i]) {
                    lastHead[i] = item;
                } else if (item[key] != lastHead[i][key]) {
                    lastHead[i] = item;
                    lastHead.length = i + 1;//删除后边的
                }
            }
            for (var i = 0; i < groupBy.length; i++) {
                var key = groupBy[i];
                if (lastHead[i]) {
                    lastHead[i][span][key]++;
                }
            }
        });
    }

    getColumns(includeSelf) {
        var columns = this.data.columns;
        var deep = this.maxDeep(columns);
        var children = [];
        columns.forEach((c)=> {
            children.push.apply(children, this.getChildren(c, deep, false, includeSelf));
        });
        return children;
    }

    getRow(record, index, columns) {
        //var columns = this.getColumns();
        var cells = [];
        let span = Symbol.for("span");

        for (var i = 0; i < columns.length; i++) {
            var col = columns[i];

            var grouped = this.data.groupby.indexOf(col.field) != -1;
            if (grouped && record[span] && record[span][col.field] == 0) {
                continue;
            }

            var classNames = [];
            grouped && classNames.push(Table.GROUP_HEADER_CLASS_NAME);
            col.render && classNames.push(col.render);
            cells.push(DisplayUtil.createElement('td', {
                rowSpan: grouped ? record[span][col.field] : undefined,
                colSpan: record.colSpan,
                "class": classNames.length?classNames.join(" "):undefined
            }, this.transform(col, record)));

        }
        return DisplayUtil.createElement('tr', null, cells);
    }

    // 转换数据到显示
    transform(col, record){
        //数据解析
        var ParserClass = Table.getParser(col.parser);
        var parser = new ParserClass();
        parser.addChild(col.field);
        var text = parser.parse(record);
        //渲染
        var RenderClass = Table.getRender(col.render);
        var render = new RenderClass();
        render.data = text;
        return render.element;
    }
    maxDeep(children) {
        var maxDeep = 0;
        children.forEach((c)=> {
            if (c.children) {
                var childDeep = 1 + this.maxDeep(c.children);
                if (childDeep > maxDeep) {
                    maxDeep = childDeep;
                }
            }
        });
        return maxDeep;
    }

    childrenRowLength(children, titleRequired) {
        var hasTitle = false;

        var length = 0;
        children.forEach((c)=> {
            if (c.title != undefined) {
                hasTitle = true;
            }
            if (c.children) {
                length = Math.max(length, this.childrenRowLength(c.children));
            }
        });
        if (!titleRequired || hasTitle)
            length++;
        return length;
    }

    childrenColLength(children) {
        var length = 0;
        if(children && children.length > 0)
        {
            children.forEach((c)=> {
                if (c.children && c.children.length > 0) {
                    length += this.childrenColLength(c.children);
                } else {
                    length++;
                }
            });
        }else{
            length++;
        }
        return length;
    }
    getChildrenRow(ths, deep, titleRequired, includeSelf) {
        var children = [];
        ths.forEach((c)=> {
            children.push.apply(children, this.getChildren(c, deep, titleRequired, includeSelf));
        });
        return children;
    }

    getChildren(parent, deep, titleRequired, includeSelf) {
        if (deep > 0) {
            if (parent.children && parent.children.length > 0) {
                var children = [];
                parent.children.forEach((child)=> {
                    children.push.apply(children, this.getChildren(child, deep - 1, titleRequired, includeSelf));
                });
                return children;
            } else {
                return includeSelf && (!titleRequired || parent.title != undefined) ? [parent] : [];
            }
        } else {
            return (!titleRequired || parent.title != undefined) ? [parent] : [];
        }
    }
}