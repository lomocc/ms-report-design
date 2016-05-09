import DisplayUtil from '../utils/DisplayUtil';
import ItemRender from './ItemRender';
import ProgressRender from './ProgressRender';
import CurrencyRender from './CurrencyRender';
import AnchorRender from './AnchorRender';
export default class TableRender extends ItemRender {
    static rendererMap = {
        "ProgressRender": ProgressRender,
        "ItemRender": ItemRender,
        "AnchorRender": AnchorRender,
        "CurrencyRender": CurrencyRender
    }

    static getRender(renderType) {
        if (renderType != undefined) {
            return TableRender.rendererMap[renderType];
        }
        return TableRender.defaultRender();
    }

    static defaultRender() {
        return ItemRender;
    }

    createElement() {
        return DisplayUtil.createElement("table");
    }

    get direction() {
        return this._direction;
    }

    set direction(value) {
        if (this._direction != value)
            this._direction = value;

        this.render();
    }

    render() {
        DisplayUtil.removeChild(this.element);
        // if (this.data.invert) {
        //     this.renderInvert();
        // } else {
        //     this.renderNormal();
        // }

        let config = {};
        $.extend(true, config, this.data.config_default, this.data.config_report);
        let tabledata = this.data.data_response;
        //get original data
        let arrGroup = config.data.groupby;
        let arrDataBind = config.table.header.data_bind;
        //format Data
        let arrTableData = this.handleTabledata(tabledata, arrDataBind, arrGroup);

        let headergrid = config.table.header.grid;
        console.log(config, arrTableData, headergrid);

        let footgrid = config.table.footer;
        let direction = this.data.dir; //config.style.direction;
        if (direction === "vertical") {
            //垂直扩展
            DisplayUtil.appendChild(this.element,
                this.getVerticalTable(headergrid, footgrid, arrTableData)
            );
        } else if (direction = "horizontal") {
            //水平扩展
            let length_head = config.data.groupby.length + 1; //表头高度
            let length_bind = arrDataBind.length;
            DisplayUtil.appendChild(this.element,
                this.getHorizontalTable(headergrid, footgrid, arrTableData, length_head, length_bind)
            );
        }
    }

    //to-do添加数据属性
    handleTabledata(tabledata, arrBind, arrGroup) {
        let arrTableData = [];
        let groupMap = new Map();

        let arrMiddleData = [];
        let obj_group = {};
        var arrGroupStage = [];
        for (let i = 0, groupLength = arrGroup.length; i < groupLength; i++) {
            let group = arrGroup[i];
            let previousKey;
            for (let j = 0; j < tabledata.length; j++) {
                let row = tabledata[j];
                let key = row[group];

                if (i == 0) {
                    if (!(previousKey && previousKey != key)) {
                        arrGroupStage.push({
                            "key": null
                        });
                    }
                } else {

                }
                previousKey = row[group];
                /*if (i == 0) {
                 if (groupLength == 1) {
                 if (obj_group[key]) {
                 obj_group[key].push(row);
                 //groupMap.get(key).push(row);
                 } else {
                 obj_group[key] = [row];
                 //groupMap.set(key, [row]);
                 }
                 } else {
                 let lattergroup = arrGroup[i + 1];
                 let secondkey = row[lattergroup];
                 if (groupMap.has(key)) {
                 if (groupMap.get(key).has(secondkey)) {
                 groupMap.get(key).set(secondkey, groupMap.get(key).get(secondkey).);
                 } else {
                 groupMap.get(key).set(secondkey, row);
                 }
                 } else {
                 groupMap.set(key, (new Map()).set(secondkey, row));
                 }
                 }

                 } else if (i == arrGroup.length - 1) {

                 } else if (i > 0 && i < arrGroup.length - 1) {

                 }*/

            }
        }


        tabledata.map((data) => {
            let arrTemp = [];
            arrBind.map((e) => {
                arrTemp.push(data[e]);
            });
            arrTableData.push(arrTemp);
        });
        return arrTableData;
    }

    getHorizontalTable(headergrid, footgrid, arrTableData, headLength, rowLength) {
        let generateEle = DisplayUtil.createElement;
        let head = generateEle("thead");
        let body = generateEle("tbody");
        let index_head = 0;
        for (let i = 0; i < rowLength; i++) {
            let tr = generateEle("tr", null,
                [].concat(
                    headergrid.map((node) => {
                        let cell = node[i];
                        if (cell) {
                            return generateEle("td", {
                                rowSpan: cell.colspan || "1",
                                colSpan: cell.rowspan || "1"
                            }, this.handleData(cell.value));
                        }
                    }),
                    arrTableData.map((node) => generateEle("td", null, this.handleData(node[i]))),
                    footgrid.map((node) => {
                        let cell = node[i];
                        if (cell) {
                            return generateEle("td", {
                                rowSpan: cell.colspan || "1",
                                colSpan: cell.rowspan || "1"
                            }, this.handleData(cell.value));
                        }
                    })
                )
            );

            if (index_head < headLength) {
                DisplayUtil.appendChild(head, tr);
                index_head++;
            } else {
                DisplayUtil.appendChild(body, tr);
            }
        }
        return [head, body];
    }

    handleData(data, type) {
        var RenderClass = ItemRender;//TableRender.getRender(col.render);
        //console.log(col.render, text, RenderClass);
        var renderer = new RenderClass();
        renderer.data = data+"$";
        return renderer.element;
    }

    getVerticalTable(headergrid, footgrid, arrTableData) {
        let generateEle = DisplayUtil.createElement;
        let head = generateEle("thead");
        let body = generateEle("tbody");
        let foot = generateEle("tfoot");
        //generate head
        DisplayUtil.appendChild(head,
            headergrid.map((row) =>
                generateEle("tr", null,
                    row.map((cell) => {
                        if (cell) {
                            return generateEle("th", {
                                colSpan: cell.colspan || "1",
                                rowSpan: cell.rowspan || "1"
                            }, this.handleData(cell.value));
                        }
                    })
                )
            )
        );
        //generate body
        DisplayUtil.appendChild(body,
            arrTableData.map((row) => generateEle("tr", null,
                row.map((cell) => generateEle("td", null, this.handleData(cell)))
            )));
        //genarate foot
        DisplayUtil.appendChild(foot,
            footgrid.map((row) => generateEle("tr", null,
                row.map((cell) => {
                    if (cell) {
                        return generateEle("td", {
                            colSpan: cell.colspan || "1",
                            rowSpan: cell.rowspan || "1"
                        }, this.handleData(cell.value));
                    }

                }))
            ));
        return [head, body, foot];
    }
}