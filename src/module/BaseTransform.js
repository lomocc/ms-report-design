import config_default from "../config/config_default.json";
//import dt from 'datatables';
//dt(window, $);
// import 'whatwg-fetch';
//import axios from 'axios';

import util from "./Util";
import ObjectUtil from '../design/utils/ObjectUtil'
import DisplayUtil from '../design/utils/DisplayUtil'
import Injector from './Injector'

export default class BaseTransform {
    //the target table container to render
    constructor(targetdom, config) {
        this.targetdom = targetdom;
        if (config) {
            this.setConfig(config);
        }
    }

    rendererInjector = new Injector();

    parserInjector = new Injector();

    multiParserInjector = new Injector();

    mapRenderer(rendererClass, type = "default") {
        this.rendererInjector.inject(rendererClass, type);
    }

    mapParser(parserClass, type = "default") {
        this.parserInjector.inject(parserClass, type);
    }

    mapMultiParser(parserClass, type = "default") {
        this.multiParserInjector.inject(parserClass, type);
    }

    renderValue(value, renderParams, dataBind) {
        var type = dataBind ? dataBind.render || dataBind.renderer : "default";
        const RendererClass = this.rendererInjector.retrieve(type) || this.rendererInjector.retrieve("default");
        const renderer = new RendererClass();
        renderer.data = value;
        renderer.params = renderParams;
        return renderer.element;
    }

    parseParams(context, paramsExpStr) {
        if (paramsExpStr) {
            var paramsExp = paramsExpStr.split(",");
            return paramsExp.map((expression)=> {
                if (expression != '') {
                    return this.parseValue(context, "string", expression);
                }
            });
        }
    }

    parseValue(context, type, expression) {
        let ParserClass = this.parserInjector.retrieve(type) || this.parserInjector.retrieve("default");
        let parser = new ParserClass();
        parser.addChild(expression);
        return parser.parse(context);
    }

    parseMultiValue(context, type, expression, params) {
        let MultiParserClass = this.multiParserInjector.retrieve(type) || this.multiParserInjector.retrieve("default");
        if (!MultiParserClass) {
            console.error("没有找到可用的多列运算表达式！ type= ", type);
            return "";
        }

        let multiParser = new MultiParserClass();
        let ParserClass = this.parserInjector.retrieve("default");
        let parser = new ParserClass();
        parser.addChild(expression);
        multiParser.addChild(parser);
        console.log(context, type, expression, multiParser.parse(context))
        return multiParser.parse(context);
    }


    handleTabledata(tabledata) {
        let config = this.config;
        let arrGroup = config.data.groupby;
        let arrBind = config.table.header.data_bind;
        let arrSort = config.data.sortby;
        //sort the data
        arrSort.map((sort) => {
            let field = sort.field;
            tabledata.sort((a, b) => {
                return a[field] - b[field];
            });
            if (sort.order !== "asc") {
                tabledata.reverse();
            }
        });


        let arrT = [];
        let length_group = arrGroup.length; //分组层数
        if (length_group === 1) {
            let obj_total = util.groupBy(tabledata, arrGroup[0]);
            for (let group in obj_total) {
                let obj_group = obj_total[group];
                let size_group = obj_group.length;
                let index_group = 0;
                for (let i = 0; i < size_group; i++) {
                    let temparr = [];
                    if (index_group === 0) {
                        let bind = arrBind[0];
                        let cell = obj_group[0];
                        temparr.push({
                            "value": this.parseValue(cell, bind.parser, bind.value),
                            "rowspan": size_group
                        });
                    } else {
                        temparr.push(null);
                    }
                    for (let index_group = length_group; index_group < arrBind.length; index_group++) {
                        let cell = obj_group[i];
                        let column = arrBind[index_group];
                        temparr.push({
                            //"value": obj_group[i][arrBind[index_group]],
                            "value": this.parseValue(cell, column.parser, column.value),
                            renderParams: this.parseParams(cell, column.renderParams, column)
                        });

                    }
                    index_group++;
                    arrT.push(temparr);
                }

            }
        } else if (length_group === 2) {
            let obj_total = util.groupBy(tabledata, arrGroup[0]);
            for (let group in obj_total) {
                obj_total[group] = util.groupBy(obj_total[group], arrGroup[1]);
            }
            for (let x in obj_total) {
                let list_first = obj_total[x];
                let size_second_total = 0;
                for (let second in list_first) {
                    size_second_total += list_first[second].length;
                }
                let index_first = 0;
                for (let y in list_first) {
                    let index_second = 0;
                    let list_second = list_first[y];
                    let size_second = list_second.length;
                    for (let i = 0; i < size_second; i++) {
                        let temparr = [];
                        let row = list_second[i];
                        if (index_first === 0) {
                            let cell = {
                                "value": x,
                                "rowspan": size_second_total
                            };
                            temparr.push(cell);
                        } else {
                            temparr.push(null);
                        }

                        if (index_second === 0) {
                            temparr.push({
                                "value": y,
                                "rowspan": size_second
                            });
                        } else {
                            temparr.push(null);
                        }
                        for (let index_group = arrGroup.length; index_group < arrBind.length; index_group++) {
                            /*temparr.push({
                             "value": row[arrBind[index_group]]
                             });*/

                            let cell = row;
                            let column = arrBind[index_group];
                            temparr.push({
                                //"value": obj_group[i][arrBind[index_group]],
                                "value": this.parseValue(cell, column.parser, column.value),
                                renderParams: this.parseParams(cell, column.renderParams, column)
                            });
                        }
                        index_first++;
                        index_second++;
                        arrT.push(temparr);
                    }

                }
            }
        } else {
            //simple situation
            tabledata.map((row) => {
                let arrList = [];
                arrBind.map((bind) => {
                    /*arrList.push({
                     "value": row[bind]
                     });*/
                    let cell = row;
                    let column = bind;
                    arrList.push({
                        //"value": obj_group[i][arrBind[index_group]],
                        "value": this.parseValue(cell, column.parser, column.value),
                        "renderParams": this.parseParams(cell, column.renderParams, column)
                    });
                });
                arrT.push(arrList);
            });
        }
        return arrT;
    }

    generateEle(name) {
        return document.createElement(name);
    }

    getVerticalTable(headergrid, footgrid, arrTableData, table, tabledata, globaldata, dataBind) {
        let generateEle = this.generateEle;
        let head = generateEle("thead");
        let body = generateEle("tbody");
        let foot = generateEle("tfoot");

        var dataSheet = {};//for export
        dataSheet.content = [];
        dataSheet.merge = [];
        //generate head
        headergrid.map((row, rowindex) => {
            let tr = generateEle("tr");
            let datasheetrow = [];
            row.map((cell, colindex) => {
                if (cell) {
                    let th = generateEle("th");
                    // th.innerHTML = cell.value;
                    DisplayUtil.appendChild(th, this.parseValue(globaldata, "string", cell.title));
                    let colspan = parseInt(cell.colspan || 1);
                    let rowspan = parseInt(cell.rowspan || 1);
                    th.colSpan = colspan;
                    th.rowSpan = rowspan;
                    th.className = "headcell";
                    if (cell.sort) {
                        //增加排序字段，支持单个
                        var that = this;
                        th.onclick = function () {
                            let currentsort = "desc";
                            if (that.config.data.sortby.length > 0) {
                                currentsort = that.config.data.sortby[0].order;
                            }
                            if (currentsort == "desc") {
                                currentsort = "asc";
                            } else {
                                currentsort = "desc"
                            }
                            if (currentsort == "desc") {
                                that.sorticon.className = "anticon anticon-caret-down";
                            } else {
                                that.sorticon.className = "anticon anticon-caret-up";
                            }
                            that.config.data.sortby[0] = {"field": cell.sort, "order": currentsort};
                            that.reDraw();
                        }
                        let sortdir = "desc";
                        if (this.config.data.sortby.length > 0) {
                            sortdir = this.config.data.sortby[0].order;
                        }
                        var icon = document.createElement("i");
                        if (sortdir == "desc") {
                            icon.className = "anticon anticon-caret-down";
                        } else {
                            icon.className = "anticon anticon-caret-up";
                        }
                        icon.style.marginLeft = "6px";
                        icon.style.color = "#999"

                        this.sorticon = icon;
                        th.appendChild(icon);
                    }

                    tr.appendChild(th);

                    datasheetrow.push(th.innerText);
                    if (colspan > 1 || rowspan > 1) {
                        let merge = {};
                        merge.start = parseInt(rowindex + 1) + ":" + parseInt(colindex + 1);
                        merge.end = parseInt(rowindex + rowspan) + ":" + parseInt(colindex + colspan);
                        dataSheet.merge.push(merge);
                    }
                } else {
                    datasheetrow.push("");
                }
            });
            dataSheet.content.push(datasheetrow);
            head.appendChild(tr);
        });
        const column = dataBind;
        //generate body
        arrTableData.map((row, rowindex) => {
            let tr = generateEle("tr");
            let datasheetrow = [];
            row.map((cell, colindex) => {
                if (cell) {
                    let td = generateEle("td");
                    let colspan = parseInt(cell.colspan || 1);
                    let rowspan = parseInt(cell.rowspan || 1);
                    td.colSpan = colspan;
                    td.rowSpan = rowspan;
                    td.className = "bodycell";
                    var i = colindex;
                    DisplayUtil.appendChild(td,
                        this.renderValue(cell.value, cell.renderParams, column[i])
                    );
                    tr.appendChild(td);

                    datasheetrow.push(td.innerText);
                    if (colspan > 1 || rowspan > 1) {
                        let merge = {};
                        merge.start = parseInt(headergrid.length + rowindex + 1) + ":" + parseInt(colindex + 1);
                        merge.end = parseInt(headergrid.length + rowindex + rowspan) + ":" + parseInt(colindex + colspan);
                        dataSheet.merge.push(merge);
                    }
                } else {
                    datasheetrow.push("");
                }
            });
            dataSheet.content.push(datasheetrow);
            body.appendChild(tr);
        });
        //generate foot
        footgrid.map((row, rowindex) => {
            let tr = generateEle("tr");
            let datasheetrow = [];
            row.map((cell, colindex) => {
                if (cell) {
                    let td = generateEle("td");
                    if (cell.title) {
                        DisplayUtil.appendChild(td, this.parseValue(globaldata, "string", cell.title));
                    } else {
                        DisplayUtil.appendChild(td, this.parseMultiValue(tabledata, cell.parser, cell.value, cell.params));
                    }
                    td.className = "footcell";
                    let colspan = parseInt(cell.colspan || 1);
                    let rowspan = parseInt(cell.rowspan || 1);
                    td.colSpan = colspan;
                    td.rowSpan = rowspan;
                    tr.appendChild(td);

                    datasheetrow.push(td.innerText);
                    if (colspan > 1 || rowspan > 1) {
                        let merge = {};
                        merge.start = parseInt(headergrid.length + arrTableData.length + rowindex + 1) + ":" + parseInt(colindex + 1);
                        merge.end = parseInt(headergrid.length + arrTableData.length + rowindex + rowspan) + ":" + parseInt(colindex + colspan);
                        dataSheet.merge.push(merge);
                    }
                } else {
                    datasheetrow.push("");
                }

            });
            dataSheet.content.push(datasheetrow);
            foot.appendChild(tr);
        });
        table.appendChild(head);
        table.appendChild(body);
        table.appendChild(foot);

        this.exportsheet = dataSheet;

        return table;
    }

    getHorizontalTable(headergrid, footgrid, arrTableData, table, tabledata, globaldata, dataBind) {
        let config = this.config;
        let headLength = config.data.groupby.length + 1; //表头高度
        let rowLength = config.table.header.data_bind.length; //列数即横向扩展行数
        let generateEle = this.generateEle;
        let head = generateEle("thead");
        let body = generateEle("tbody");
        let index_head = 0;

        var dataSheet = {};//for export
        dataSheet.content = [];
        dataSheet.merge = [];

        for (let i = 0; i < rowLength; i++) {
            let tr = generateEle("tr");
            let datasheetrow = [];
            headergrid.map((node, colindex) => {
                let cell = node[i];
                if (cell) {
                    var td = generateEle("td");
                    let colspan = parseInt(cell.rowspan || 1);
                    let rowspan = parseInt(cell.colspan || 1);
                    td.colSpan = colspan;
                    td.rowSpan = rowspan;
                    td.className = "headcell";
                    DisplayUtil.appendChild(td, this.parseValue(globaldata, "string", cell.title));
                    tr.appendChild(td);
                    datasheetrow.push(td.innerText);
                    if (colspan > 1 || rowspan > 1) {
                        let merge = {};
                        merge.start = parseInt(i + 1) + ":" + parseInt(colindex + 1);
                        merge.end = parseInt(i + rowspan) + ":" + parseInt(colindex + colspan);
                        dataSheet.merge.push(merge);
                    }
                } else {
                    datasheetrow.push("");
                }
            });

            const column = dataBind;
            arrTableData.map((node, colindex) => {
                let cell = node[i];
                if (cell) {
                    let td = generateEle("td");
                    // td.innerHTML = cell.value;
                    DisplayUtil.appendChild(td,
                        this.renderValue(cell.value, cell.renderParams, column[i])
                    );
                    //DisplayUtil.appendChild(td, cell.value);
                    let colspan = parseInt(cell.rowspan || 1);
                    let rowspan = parseInt(cell.colspan || 1);
                    td.colSpan = colspan;
                    td.rowSpan = rowspan;
                    td.className = "bodycell";
                    tr.appendChild(td);

                    datasheetrow.push(td.innerText);
                    if (colspan > 1 || rowspan > 1) {
                        let merge = {};
                        merge.start = parseInt(i + 1) + ":" + parseInt(headergrid.length + colindex + 1);
                        merge.end = parseInt(i + rowspan) + ":" + parseInt(headergrid.length + colindex + colspan);
                        dataSheet.merge.push(merge);
                    }
                } else {
                    datasheetrow.push("");
                }
            });

            //transform foot
            footgrid.map((node, colindex) => {
                let cell = node[i];
                if (cell) {
                    let td = generateEle("td");
                    let colspan = parseInt(cell.rowspan || 1);
                    let rowspan = parseInt(cell.colspan || 1);
                    td.colSpan = colspan;
                    td.rowSpan = rowspan;
                    td.className = "footcell";
                    // td.innerHTML = cell.value || "";
                    if (cell.title) {
                        DisplayUtil.appendChild(td, this.parseValue(globaldata, "string", cell.title));
                    } else {
                        DisplayUtil.appendChild(td, this.parseMultiValue(tabledata, cell.parser, cell.value, cell.params));
                    }
                    //DisplayUtil.appendChild(td, cell.value || "");
                    tr.appendChild(td);

                    datasheetrow.push(td.innerText);
                    if (colspan > 1 || rowspan > 1) {
                        let merge = {};
                        merge.start = parseInt(i + 1) + ":" + parseInt(headergrid.length + arrTableData.length + colindex + 1);
                        merge.end = parseInt(i + rowspan) + ":" + parseInt(headergrid.length + arrTableData + colindex + colspan);
                        dataSheet.merge.push(merge);
                    }
                } else {
                    datasheetrow.push("");
                }
            });

            if (index_head < headLength) {
                head.appendChild(tr);
                index_head++;
            } else {
                body.appendChild(tr);
            }

            dataSheet.content.push(datasheetrow);
        }
        table.appendChild(head);
        table.appendChild(body);
        this.exportsheet = dataSheet;
        return table;
    }

    renderTable() {
        let config = this.config;
        let globaldata = config.data.response.global;
        this.globaldata = globaldata;// this.renderFreezeHeader

        let tabledata = config.data.response.data;
        let length_data = config.menus.pager.pager_length || 0; //页长为空或零则显示所有数据
        if (config.menus.pager.enable && length_data != 0) {
            let currentPage = config.menus.pager.current_page;
            let start = currentPage * length_data;
            let end = (currentPage + 1) * length_data;
            tabledata = tabledata.slice(start, end);
        }
        //format Data
        let arrTableData = this.handleTabledata(tabledata);

        let headergrid = config.table.header.grid;
        let footgrid = config.table.footer;
        let direction = config.style.direction;

        let data_bind = config.table.header.data_bind;
        let ele_table = this.generateEle("table");
        //direction = "x";
        ele_table = direction === "vertical" ? this.getVerticalTable(headergrid, footgrid, arrTableData, ele_table, tabledata, globaldata, data_bind) : this.getHorizontalTable(headergrid, footgrid, arrTableData, ele_table, tabledata, globaldata, data_bind);

        ele_table.className = this.config.style.class_name;
        let tableDiv = document.createElement("div");
        tableDiv.appendChild(ele_table);
        tableDiv.setAttribute("dt-id", "tableDiv");
        //tableDiv.style.overflowX = "scroll";
        tableDiv.style.overflowX = "auto";
        /*if (tableDiv.offsetWidth < ele_table.offsetWidth) {
            tableDiv.style.overflowX = "scroll";
        }*/
        /*tableDiv.onmouseover = function () {
            if (this.offsetWidth < ele_table.offsetWidth) {
                this.style.overflowX = "scroll";
            }
        }
        tableDiv.onmouseout = function () {
            this.style.overflowX = "hidden";
        }*/
        if (!this.dom.tableDiv) {//已存在table则append，否则替换
            this.dom.tableDiv = tableDiv;
            this.targetdom.appendChild(tableDiv);
        } else {
            this.dom.tableDiv = tableDiv;
            // let arrTargetDom = this.targetdom.childNodes;
            //let arrTargetKeys = Object.keys(arrTargetDom);
            let targetTableDiv = this.getTargetNodeById("tableDiv");
            this.targetdom.replaceChild(tableDiv, targetTableDiv);
        }
    }

    renderMenuBar() {
        if (!this.dom.menubar) {
            let menuconfig = this.config.menus;
            let generateEle = this.generateEle;
            let menuContainer = generateEle("div");
            //choose list items
            if (menuconfig.pager.enable) {
                let pager = generateEle("label");

                let itemSelector = generateEle("select");

                let arrSelectValue = menuconfig.pager.pager_option[0];
                let arrSelectName = menuconfig.pager.pager_option[1];
                for (let i = 0; i < arrSelectName.length; i++) {
                    let itemOption = generateEle("option");
                    itemOption.value = arrSelectValue[i];
                    itemOption.innerHTML = arrSelectName[i];
                    itemSelector.appendChild(itemOption);
                }
                let pagerLength = this.config.menus.pager.pager_length;
                if (pagerLength) {
                    itemSelector.value = pagerLength;
                }
                itemSelector.onchange = (function (e) {
                    this.config.menus.pager.pager_length = itemSelector.value;
                    this.config.menus.pager.current_page = 0;
                    this.reDraw();
                }).bind(this);
                let char_display = generateEle("span");
                char_display.innerHTML = "显示";
                let char_items = generateEle("span");
                char_items.innerHTML = "条";
                pager.appendChild(char_display);
                pager.appendChild(itemSelector);
                pager.appendChild(char_items);
                menuContainer.appendChild(pager);
            }

            if (menuconfig.export.enable) {
                let btn_export = generateEle("button");
                btn_export.innerHTML = menuconfig.export.buttonname;
                let filename = menuconfig.export.filename;
                btn_export.onclick = (function () {
                    var exporttable = {
                        type: "table",
                        data: this.exportsheet.content
                    };
                    if (this.exportsheet.merge.length > 0) {
                        exporttable.merge = this.exportsheet.merge;
                    }
                    var params = {
                        "filename": filename,
                        "content": JSON.stringify([exporttable])
                    };
                    let form = generateEle("form");
                    form.action = this.config.menus.export.export_url;
                    form.method = "post";
                    form.target = "_blank";

                    for (let key in params) {
                        let input = generateEle("input");
                        input.type = "hidden";
                        input.name = key;
                        input.value = params[key];
                        form.appendChild(input);
                    }
                    document.body.appendChild(form);
                    form.submit();
                    //生成下载连接后删除iframe节点
                    setTimeout(() => {
                        document.body.removeChild(form);
                    }, 100);
                }).bind(this);
                menuContainer.appendChild(btn_export);
            }
            menuContainer.style.marginBottom = "10px";

            this.dom.menubar = menuContainer;
            this.targetdom.appendChild(this.dom.menubar);
        }
    }

    getTargetNodeById(dtid) {
        let target;
        let arrTargetDom = this.targetdom.childNodes;
        let arrTargetKeys = Object.keys(arrTargetDom);
        arrTargetKeys.map((key) => {
            let node = arrTargetDom[key];
            if (node instanceof Element) {
                let dt_id = node.getAttribute("dt-id");
                if (dt_id && dt_id == dtid) {
                    target = node;
                }
            }
        });
        return target;
    }

    renderPaginationBar() {

        let flag_pager = this.config.menus.pager.enable;
        let length_page = this.config.menus.pager.pager_length || 0;
        if (flag_pager && length_page != 0) {
            let generateEle = this.generateEle;
            let paginationBar = generateEle("div");
            paginationBar.setAttribute("dt-id", "paginationbar");
            let btn_pagination_left = generateEle("button");
            btn_pagination_left.innerHTML = "上一页";
            let btn_pagination_right = generateEle("button");
            btn_pagination_right.innerHTML = "下一页";
            btn_pagination_right.style.marginLeft = "8px";

            let msg_title = "当前页";
            let current_page = this.config.menus.pager.current_page + 1;
            let total_page = 0;
            let pagerconfig = this.config.menus.pager;
            //服务端分页则根据返回字段计算页数，否则根据实际返回数据量计算
            if (pagerconfig.enable && pagerconfig.server_side) {
                total_page = Math.ceil(this.config.data.response.records_total / length_page);
            } else {
                total_page = Math.ceil(this.config.data.response.data.length / length_page);
            }
            this.config.menus.pager.total_page = total_page;
            //let total_page = this.config.menus.pager.total_page; //Math.ceil(this.config.data.response.records_total / length_page);
            let span_pagehint = generateEle("span");
            span_pagehint.innerHTML = msg_title + "&nbsp;" + current_page + " / " + total_page;
            span_pagehint.style.marginLeft = "30px";

            btn_pagination_left.onclick = (e) => {
                if (this.config.menus.pager.current_page <= 0) {
                } else {
                    this.config.menus.pager.current_page--;
                    this.reDraw();
                }
            };

            btn_pagination_right.onclick = (e) => {
                if (this.config.menus.pager.current_page + 1 >= Math.ceil(this.config.data.response.records_total / length_page)) {
                } else {
                    this.config.menus.pager.current_page++;
                    this.reDraw();
                }
            };

            paginationBar.appendChild(btn_pagination_left);
            paginationBar.appendChild(btn_pagination_right);
            paginationBar.appendChild(span_pagehint);

            paginationBar.style.marginTop = "10px";

            let targetnode = this.getTargetNodeById("paginationbar");
            if (!this.dom.pagination || !targetnode) {
                this.dom.pagination = paginationBar;
                this.targetdom.appendChild(paginationBar);
            } else {
                this.targetdom.replaceChild(paginationBar, targetnode);
            }

        } else {
            let targetnode = this.getTargetNodeById("paginationbar");
            if (targetnode) {
                this.targetdom.removeChild(targetnode);
            }

        }
    }


    renderFreezeHeader() {
        if (this.config.menus.freezeheader.enable) {
            let arrWidth = [];
            let arrTargetDom = this.targetdom.childNodes;
            //let arrTargetKeys = Object.keys(arrTargetDom);
            let targetTable = this.getTargetNodeById("table");

            let tableWidth = targetTable.offsetWidth;
            let tableOffsetLeft = targetTable.offsetLeft + document.body.scrollLeft;
            let scrollHeight = targetTable.getBoundingClientRect().top;

            let arrHead = targetTable.firstChild.childNodes;
            let arrHeadKeys = Object.keys(arrHead);
            arrHeadKeys.map((key) => {
                let arrHeadtr = arrHead[key].childNodes;
                let arrHeadtrKeys = Object.keys(arrHeadtr);
                let arrTempWidth = [];
                arrHeadtrKeys.map((trkey) => {
                    let cell = arrHeadtr[trkey];
                    arrTempWidth.push(cell.clientWidth);
                });
                arrWidth.push(arrTempWidth); //获取表头每列的宽度
            });

            let generateEle = this.generateEle;
            let maskTable = generateEle("table");
            maskTable.className = this.config.style.class_name;
            let headergrid = this.config.table.header.grid;
            let head = generateEle("thead");
            headergrid.forEach((row, index, array) => {
                let tr = generateEle("tr");
                let index_th = 0;
                row.forEach((cell, index_cell, array_cell) => {
                    if (cell) {
                        //get cells in every head row
                        let th = generateEle("th");
                        DisplayUtil.appendChild(th, this.parseValue(this.globaldata, "string", cell.title));
                        th.className = "headcell";
                        th.colSpan = cell.colspan || "1";
                        th.rowSpan = cell.rowspan || "1";
                        th.style.width = arrWidth[index][index_th] + "px";
                        index_th++;
                        tr.appendChild(th);
                    }
                });
                head.appendChild(tr);
            });

            this.$bindEventListener("scroll", function () {
                let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

                //get HeaderHeight
                if (scrollTop > scrollHeight) {
                    maskTable.style.display = "block";
                } else {
                    maskTable.style.display = "none";
                }
            });
            this.$bindEventListener("resize", ()=>this.renderFreezeHeader());

            maskTable.appendChild(head);
            maskTable.style.position = "fixed";
            maskTable.style.left = tableOffsetLeft + "px";
            maskTable.style.top = "0px";
            maskTable.style.zIndex = "10000";
            maskTable.style.backgroundColor = "white";
            maskTable.style.width = tableWidth + "px";
            maskTable.style.display = "none";
            if (!this.maskTable) {
                this.maskTable = maskTable;
                document.body.appendChild(this.maskTable);
            } else {
                document.body.replaceChild(this.maskTable, maskTable);
                this.maskTable = maskTable;
            }

        }
    }

    /**
     * 提供一个方法来设置内部使用什么ajax方法
     * @param ajaxFun ajaxFun(url:String, params:Object):Promise
     */
    static injectAjax(ajaxFun){
        BaseTransform.$ajaxInject = ajaxFun;
    }
    static $ajaxInject = null;
    /**
     * 内部的ajax 使用 fetch
     * @param url
     * @param params
     * @returns {Promise.<TResult>|*}
     */
    static $ajaxInternal(url, params){
        return fetch(url, {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: JSON.stringify(params)
        }).then((response) => {
            return response.json();
        });
    }
    $doAjax(url, params){
        var ajaxFun = BaseTransform.$ajaxInject?BaseTransform.$ajaxInject:BaseTransform.$ajaxInternal;
        return ajaxFun(url, params);
    }
    getData(callback) {
        let datapath = this.config.data.request.url;
        let params = ObjectUtil.deepCopy(this.config.data.request.params);

        let pagerconfig = this.config.menus.pager;
        var flag_server_pager = pagerconfig.enable && pagerconfig.server_side;
        //开启服务端分页则增加分页参数。
        if (flag_server_pager) {
            let params_pager = {
                "pager_length": pagerconfig.pager_length,
                "current_page": pagerconfig.current_page
            };
            params = util.mergeObject(params, params_pager);
        }
        //判断请求参数是否变化，如未变化则使用缓存数据，否则生成新的请求。
        if (!this.config.data.response || !this.config.data.response.data || !ObjectUtil.isEqual(this.oldParams, params)) {
            this.$doAjax(datapath, params).then((responsedata) => {
                this.config.data.response = responsedata;
                this.config.menus.pager.total_page = Math.ceil(responsedata.data.length / pagerconfig.pager_length);
                if (flag_server_pager) {
                    this.config.menus.pager.current_page = responsedata.current_page;
                    this.config.menus.pager.total_page = Math.ceil(responsedata.records_total / pagerconfig.pager_length);
                }
                callback();
            });
        } else {
            callback();
        }
        this.oldParams = params;
    }

    generateReport() {
        this.dom = this.dom || {};
        this.renderMenuBar(); //render Menus
        this.getData(() => {
            this.renderTable(); //renderTable
            this.renderPaginationBar(); //render pagination
            this.renderFreezeHeader(); //freeze header
        });
    };

    reDraw() {
        this.generateReport();
    }

    // events
    $eventCacheMap = {};

    $bindEventListener(type, handler) {
        if (this.$eventCacheMap[type] != undefined) {
            console.error("注册了重复的事件，请检查!", type);
            this.$unBindEventListener(type);
        }
        this.$eventCacheMap[type] = handler;
        window.addEventListener(type, handler);
    }

    $unBindEventListener(type) {
        if (this.$eventCacheMap[type] == undefined) {
            console.error("没有找到可以删除事件，请检查!", type);
            return;
        }
        window.removeEventListener(type, this.$eventCacheMap[type]);
        delete this.$eventCacheMap[type];
    }

    $unBindAllEventListeners() {
        for (var type in this.$eventCacheMap)this.$unBindEventListener(type);
    }

    $config;
    // api
    setConfig(value) {
        // 防止重复setConfig
        if(ObjectUtil.isEqual(this.$config, value))
            return;
        this.$config = value;
        let default_config = ObjectUtil.deepCopy(config_default);
        this.config = util.mergeObject(default_config, this.$config);
    }

    updateConfig(value){
        let current_config = JSON.parse(JSON.stringify(this.config));
        this.config = util.mergeObject(current_config, value);
    }

    // clear cache & memory & event listeners
    dispose() {
        this.$unBindAllEventListeners();
        DisplayUtil.removeChild(this.targetdom);
        this.targetdom = null;
        this.config = null;
    }
}