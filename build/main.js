(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _BaseTransform = __webpack_require__(2);

	var _BaseTransform2 = _interopRequireDefault(_BaseTransform);

	var _ItemRender = __webpack_require__(8);

	var _ItemRender2 = _interopRequireDefault(_ItemRender);

	var _ProgressRender = __webpack_require__(10);

	var _ProgressRender2 = _interopRequireDefault(_ProgressRender);

	var _CurrencyRender = __webpack_require__(11);

	var _CurrencyRender2 = _interopRequireDefault(_CurrencyRender);

	var _AnchorRender = __webpack_require__(12);

	var _AnchorRender2 = _interopRequireDefault(_AnchorRender);

	var _ItemParser = __webpack_require__(13);

	var _ItemParser2 = _interopRequireDefault(_ItemParser);

	var _StringParser = __webpack_require__(15);

	var _StringParser2 = _interopRequireDefault(_StringParser);

	var _SUMParser = __webpack_require__(16);

	var _SUMParser2 = _interopRequireDefault(_SUMParser);

	__webpack_require__(18);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    BaseTransform: _BaseTransform2.default,
	    ItemParser: _ItemParser2.default,
	    StringParser: _StringParser2.default,
	    SUMParser: _SUMParser2.default,
	    ItemRender: _ItemRender2.default,
	    AnchorRender: _AnchorRender2.default,
	    CurrencyRender: _CurrencyRender2.default,
	    ProgressRender: _ProgressRender2.default
	}; /**
	    * Created by vincent on 2016/5/10.
	    */

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	//import dt from 'datatables';
	//dt(window, $);


	var _config_default = __webpack_require__(3);

	var _config_default2 = _interopRequireDefault(_config_default);

	__webpack_require__(4);

	var _Util = __webpack_require__(5);

	var _Util2 = _interopRequireDefault(_Util);

	var _DisplayUtil = __webpack_require__(6);

	var _DisplayUtil2 = _interopRequireDefault(_DisplayUtil);

	var _Injector = __webpack_require__(7);

	var _Injector2 = _interopRequireDefault(_Injector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseTransform = function () {
		//the target table container to render

		function BaseTransform(targetdom, config) {
			_classCallCheck(this, BaseTransform);

			this.rendererInjector = new _Injector2.default();
			this.parserInjector = new _Injector2.default();
			this.multiParserInjector = new _Injector2.default();
			this.$eventCacheMap = {};

			this.targetdom = targetdom;
			if (config) {
				this.setConfig(config);
			}
		}

		_createClass(BaseTransform, [{
			key: "mapRenderer",
			value: function mapRenderer(rendererClass) {
				var type = arguments.length <= 1 || arguments[1] === undefined ? "default" : arguments[1];

				this.rendererInjector.inject(rendererClass, type);
			}
		}, {
			key: "mapParser",
			value: function mapParser(parserClass) {
				var type = arguments.length <= 1 || arguments[1] === undefined ? "default" : arguments[1];

				this.parserInjector.inject(parserClass, type);
			}
		}, {
			key: "mapMultiParser",
			value: function mapMultiParser(parserClass) {
				var type = arguments.length <= 1 || arguments[1] === undefined ? "default" : arguments[1];

				this.multiParserInjector.inject(parserClass, type);
			}
		}, {
			key: "renderValue",
			value: function renderValue(value, renderParams, dataBind) {
				var type = dataBind ? dataBind.render || dataBind.renderer : "default";
				var RendererClass = this.rendererInjector.retrieve(type) || this.rendererInjector.retrieve("default");
				var renderer = new RendererClass();
				renderer.data = value;
				renderer.params = renderParams;
				return renderer.element;
			}
		}, {
			key: "parseParams",
			value: function parseParams(context, paramsExpStr) {
				var _this = this;

				if (paramsExpStr) {
					var paramsExp = paramsExpStr.split(",");
					return paramsExp.map(function (expression) {
						if (expression != '') {
							return _this.parseValue(context, "string", expression);
						}
					});
				}
			}
		}, {
			key: "parseValue",
			value: function parseValue(context, type, expression) {
				var ParserClass = this.parserInjector.retrieve(type) || this.parserInjector.retrieve("default");
				var parser = new ParserClass();
				parser.addChild(expression);
				return parser.parse(context);
			}
		}, {
			key: "parseMultiValue",
			value: function parseMultiValue(context, type, expression, params) {
				var MultiParserClass = this.multiParserInjector.retrieve(type) || this.multiParserInjector.retrieve("default");
				if (!MultiParserClass) {
					console.error("没有找到可用的多列运算表达式！ type= ", type);
					return "";
				}

				var multiParser = new MultiParserClass();
				var ParserClass = this.parserInjector.retrieve("default");
				var parser = new ParserClass();
				parser.addChild(expression);
				multiParser.addChild(parser);
				console.log(context, type, expression, multiParser.parse(context));
				return multiParser.parse(context);
			}
		}, {
			key: "handleTabledata",
			value: function handleTabledata(tabledata) {
				var _this2 = this;

				var config = this.config;
				var arrGroup = config.data.groupby;
				var arrBind = config.table.header.data_bind;
				var arrSort = config.data.sortby;
				console.log("sort:", arrSort);
				//sort the data
				arrSort.map(function (sort) {
					var field = sort.field;
					tabledata.sort(function (a, b) {
						return a[field] - b[field];
					});
					if (sort.order !== "asc") {
						tabledata.reverse();
					}
				});

				var arrT = [];
				var length_group = arrGroup.length; //分组层数
				if (length_group === 1) {
					var obj_total = _Util2.default.groupBy(tabledata, arrGroup[0]);
					//console.log("rewrite", Object.keys(obj_total)); //to-do rewrite
					console.log(obj_total);
					for (var group in obj_total) {
						var obj_group = obj_total[group];
						var size_group = obj_group.length;
						var index_group = 0;
						for (var i = 0; i < size_group; i++) {
							var temparr = [];
							if (index_group === 0) {
								var bind = arrBind[0];
								var cell = obj_group[0];
								temparr.push({
									"value": this.parseValue(cell, bind.parser, bind.value),
									"rowspan": size_group
								});
							} else {
								temparr.push(null);
							}
							for (var _index_group = length_group; _index_group < arrBind.length; _index_group++) {
								var _cell = obj_group[i];
								var column = arrBind[_index_group];
								temparr.push({
									//"value": obj_group[i][arrBind[index_group]],
									"value": this.parseValue(_cell, column.parser, column.value),
									renderParams: this.parseParams(_cell, column.renderParams, column)
								});
							}
							index_group++;
							arrT.push(temparr);
						}
					}
				} else if (length_group === 2) {
					var _obj_total = _Util2.default.groupBy(tabledata, arrGroup[0]);
					for (var _group in _obj_total) {
						_obj_total[_group] = _Util2.default.groupBy(_obj_total[_group], arrGroup[1]);
					}
					for (var x in _obj_total) {
						var list_first = _obj_total[x];
						var size_second_total = 0;
						for (var second in list_first) {
							size_second_total += list_first[second].length;
						}
						var index_first = 0;
						for (var y in list_first) {
							var index_second = 0;
							var list_second = list_first[y];
							var size_second = list_second.length;
							for (var _i = 0; _i < size_second; _i++) {
								var _temparr = [];
								var row = list_second[_i];
								if (index_first === 0) {
									var _cell2 = {
										"value": x,
										"rowspan": size_second_total
									};
									_temparr.push(_cell2);
								} else {
									_temparr.push(null);
								}

								if (index_second === 0) {
									_temparr.push({
										"value": y,
										"rowspan": size_second
									});
								} else {
									_temparr.push(null);
								}
								for (var _index_group2 = arrGroup.length; _index_group2 < arrBind.length; _index_group2++) {
									/*temparr.push({
	        	"value": row[arrBind[index_group]]
	        });*/

									var _cell3 = row;
									var _column = arrBind[_index_group2];
									_temparr.push({
										//"value": obj_group[i][arrBind[index_group]],
										"value": this.parseValue(_cell3, _column.parser, _column.value),
										renderParams: this.parseParams(_cell3, _column.renderParams, _column)
									});
								}
								index_first++;
								index_second++;
								arrT.push(_temparr);
							}
						}
					}
				} else {
					//simple situation
					tabledata.map(function (row) {
						var arrList = [];
						arrBind.map(function (bind) {
							/*arrList.push({
	      	"value": row[bind]
	      });*/
							var cell = row;
							var column = bind;
							arrList.push({
								//"value": obj_group[i][arrBind[index_group]],
								"value": _this2.parseValue(cell, column.parser, column.value),
								"renderParams": _this2.parseParams(cell, column.renderParams, column)
							});
						});
						arrT.push(arrList);
					});
				}
				console.log(arrT);
				return arrT;
			}
		}, {
			key: "generateEle",
			value: function generateEle(name) {
				return document.createElement(name);
			}
		}, {
			key: "getVerticalTable",
			value: function getVerticalTable(headergrid, footgrid, arrTableData, table, tabledata, globaldata, dataBind) {
				var _this3 = this;

				var generateEle = this.generateEle;
				var head = generateEle("thead");
				var body = generateEle("tbody");
				var foot = generateEle("tfoot");

				var dataSheet = {}; //for export
				dataSheet.content = [];
				dataSheet.merge = [];
				//generate head
				headergrid.map(function (row, rowindex) {
					var tr = generateEle("tr");
					var datasheetrow = [];
					row.map(function (cell, colindex) {
						if (cell) {
							var th = generateEle("th");
							// th.innerHTML = cell.value;
							_DisplayUtil2.default.appendChild(th, _this3.parseValue(globaldata, "string", cell.title));
							var colspan = parseInt(cell.colspan || 1);
							var rowspan = parseInt(cell.rowspan || 1);
							th.colSpan = colspan;
							th.rowSpan = rowspan;
							th.className = "headcell";
							if (cell.sort) {
								var that = _this3;
								th.onclick = function () {
									console.log(this);
									var currentsort = "desc";
									if (that.config.data.sortby.length > 0) {
										currentsort = that.config.data.sortby[0].order;
									}
									if (currentsort == "desc") {
										currentsort = "asc";
									} else {
										currentsort = "desc";
									}
									if (currentsort == "desc") {
										that.sorticon.className = "anticon anticon-caret-down";
									} else {
										that.sorticon.className = "anticon anticon-caret-up";
									}
									that.config.data.sortby[0] = { "field": cell.sort, "order": currentsort };
									that.reDraw();
								};
								var sortdir = "desc";
								if (_this3.config.data.sortby.length > 0) {
									sortdir = _this3.config.data.sortby[0].order;
								}
								var icon = document.createElement("i");
								if (sortdir == "desc") {
									icon.className = "anticon anticon-caret-down";
								} else {
									icon.className = "anticon anticon-caret-up";
								}
								icon.style.marginLeft = "6px";
								icon.style.color = "#999";

								_this3.sorticon = icon;
								th.appendChild(icon);
							}

							tr.appendChild(th);

							datasheetrow.push(th.innerText);
							if (colspan > 1 || rowspan > 1) {
								var merge = {};
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
				var column = dataBind;
				//generate body
				arrTableData.map(function (row, rowindex) {
					var tr = generateEle("tr");
					var datasheetrow = [];
					row.map(function (cell, colindex) {
						if (cell) {
							var td = generateEle("td");
							var colspan = parseInt(cell.colspan || 1);
							var rowspan = parseInt(cell.rowspan || 1);
							td.colSpan = colspan;
							td.rowSpan = rowspan;
							td.className = "bodycell";
							var i = colindex;
							_DisplayUtil2.default.appendChild(td, _this3.renderValue(cell.value, cell.renderParams, column[i]));
							tr.appendChild(td);

							datasheetrow.push(td.innerText);
							if (colspan > 1 || rowspan > 1) {
								var merge = {};
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
				footgrid.map(function (row, rowindex) {
					var tr = generateEle("tr");
					var datasheetrow = [];
					row.map(function (cell, colindex) {
						if (cell) {
							var td = generateEle("td");
							if (cell.title) {
								_DisplayUtil2.default.appendChild(td, _this3.parseValue(globaldata, "string", cell.title));
							} else {
								_DisplayUtil2.default.appendChild(td, _this3.parseMultiValue(tabledata, cell.parser, cell.value, cell.params));
							}
							td.className = "footcell";
							var colspan = parseInt(cell.colspan || 1);
							var rowspan = parseInt(cell.rowspan || 1);
							td.colSpan = colspan;
							td.rowSpan = rowspan;
							tr.appendChild(td);

							datasheetrow.push(td.innerText);
							if (colspan > 1 || rowspan > 1) {
								var merge = {};
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

				console.log("sheet:", dataSheet);
				this.exportsheet = dataSheet;

				return table;
			}
		}, {
			key: "getHorizontalTable",
			value: function getHorizontalTable(headergrid, footgrid, arrTableData, table, tabledata, globaldata, dataBind) {
				var _this4 = this;

				var config = this.config;
				var headLength = config.data.groupby.length + 1; //表头高度
				var rowLength = config.table.header.data_bind.length; //列数即横向扩展行数
				var generateEle = this.generateEle;
				var head = generateEle("thead");
				var body = generateEle("tbody");
				var index_head = 0;

				var dataSheet = {}; //for export
				dataSheet.content = [];
				dataSheet.merge = [];

				var _loop = function _loop(i) {
					var tr = generateEle("tr");
					var datasheetrow = [];
					headergrid.map(function (node, colindex) {
						var cell = node[i];
						if (cell) {
							var td = generateEle("td");
							var colspan = parseInt(cell.rowspan || 1);
							var rowspan = parseInt(cell.colspan || 1);
							td.colSpan = colspan;
							td.rowSpan = rowspan;
							td.className = "headcell";
							_DisplayUtil2.default.appendChild(td, _this4.parseValue(globaldata, "string", cell.title));
							tr.appendChild(td);
							datasheetrow.push(td.innerText);
							if (colspan > 1 || rowspan > 1) {
								var merge = {};
								merge.start = parseInt(i + 1) + ":" + parseInt(colindex + 1);
								merge.end = parseInt(i + rowspan) + ":" + parseInt(colindex + colspan);
								dataSheet.merge.push(merge);
							}
						} else {
							datasheetrow.push("");
						}
					});

					var column = dataBind;
					arrTableData.map(function (node, colindex) {
						var cell = node[i];
						if (cell) {
							var td = generateEle("td");
							// td.innerHTML = cell.value;
							_DisplayUtil2.default.appendChild(td, _this4.renderValue(cell.value, cell.renderParams, column[i]));
							//DisplayUtil.appendChild(td, cell.value);
							var colspan = parseInt(cell.rowspan || 1);
							var rowspan = parseInt(cell.colspan || 1);
							td.colSpan = colspan;
							td.rowSpan = rowspan;
							td.className = "bodycell";
							tr.appendChild(td);

							datasheetrow.push(td.innerText);
							if (colspan > 1 || rowspan > 1) {
								var merge = {};
								merge.start = parseInt(i + 1) + ":" + parseInt(headergrid.length + colindex + 1);
								merge.end = parseInt(i + rowspan) + ":" + parseInt(headergrid.length + colindex + colspan);
								dataSheet.merge.push(merge);
							}
						} else {
							datasheetrow.push("");
						}
					});

					//transform foot
					footgrid.map(function (node, colindex) {
						var cell = node[i];
						if (cell) {
							var td = generateEle("td");
							var colspan = parseInt(cell.rowspan || 1);
							var rowspan = parseInt(cell.colspan || 1);
							td.colSpan = colspan;
							td.rowSpan = rowspan;
							td.className = "footcell";
							// td.innerHTML = cell.value || "";
							if (cell.title) {
								_DisplayUtil2.default.appendChild(td, _this4.parseValue(globaldata, "string", cell.title));
							} else {
								_DisplayUtil2.default.appendChild(td, _this4.parseMultiValue(tabledata, cell.parser, cell.value, cell.params));
							}
							//DisplayUtil.appendChild(td, cell.value || "");
							tr.appendChild(td);

							datasheetrow.push(td.innerText);
							if (colspan > 1 || rowspan > 1) {
								var merge = {};
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
				};

				for (var i = 0; i < rowLength; i++) {
					_loop(i);
				}
				table.appendChild(head);
				table.appendChild(body);
				console.log("sheet:", dataSheet);
				this.exportsheet = dataSheet;
				return table;
			}
		}, {
			key: "renderTable",
			value: function renderTable() {
				var config = this.config;
				var globaldata = config.data.response.global;
				this.globaldata = globaldata; // this.renderFreezeHeader

				var tabledata = config.data.response.data;
				var length_data = config.menus.pager.pager_length || 0; //页长为空或零则显示所有数据
				if (config.menus.pager.enable && length_data != 0) {
					var currentPage = config.menus.pager.current_page;
					var start = currentPage * length_data;
					var end = (currentPage + 1) * length_data;
					tabledata = tabledata.slice(start, end);
				}
				//format Data
				var arrTableData = this.handleTabledata(tabledata);

				var headergrid = config.table.header.grid;
				var footgrid = config.table.footer;
				var direction = config.style.direction;

				var data_bind = config.table.header.data_bind;
				var ele_table = this.generateEle("table");
				//direction = "x";
				ele_table = direction === "vertical" ? this.getVerticalTable(headergrid, footgrid, arrTableData, ele_table, tabledata, globaldata, data_bind) : this.getHorizontalTable(headergrid, footgrid, arrTableData, ele_table, tabledata, globaldata, data_bind);

				ele_table.setAttribute("dt-id", "table");
				ele_table.className = this.config.style.class_name;
				if (!this.dom.table) {
					this.dom.table = ele_table;
					this.targetdom.appendChild(this.dom.table);
				} else {
					this.dom.table = ele_table;
					var arrTargetDom = this.targetdom.childNodes;
					var arrTargetKeys = Object.keys(arrTargetDom);
					var targetTable = this.getTargetNodeById("table");

					this.targetdom.replaceChild(ele_table, targetTable);
				}
			}
		}, {
			key: "renderMenuBar",
			value: function renderMenuBar() {
				var _this5 = this;

				if (!this.dom.menubar) {
					(function () {
						var menuconfig = _this5.config.menus;
						var generateEle = _this5.generateEle;
						var menuContainer = generateEle("div");
						//choose list items
						if (menuconfig.pager.enable) {
							(function () {
								var pager = generateEle("label");

								var itemSelector = generateEle("select");

								var arrSelectValue = menuconfig.pager.pager_option[0];
								var arrSelectName = menuconfig.pager.pager_option[1];
								for (var i = 0; i < arrSelectName.length; i++) {
									var itemOption = generateEle("option");
									itemOption.value = arrSelectValue[i];
									itemOption.innerHTML = arrSelectName[i];
									itemSelector.appendChild(itemOption);
								}
								var pagerLength = _this5.config.menus.pager.pager_length;
								if (pagerLength) {
									itemSelector.value = pagerLength;
								}
								itemSelector.onchange = function (e) {
									this.config.menus.pager.pager_length = itemSelector.value;
									this.config.menus.pager.current_page = 0;
									this.reDraw();
								}.bind(_this5);
								var char_display = generateEle("span");
								char_display.innerHTML = "显示";
								var char_items = generateEle("span");
								char_items.innerHTML = "条";
								pager.appendChild(char_display);
								pager.appendChild(itemSelector);
								pager.appendChild(char_items);
								menuContainer.appendChild(pager);
							})();
						}

						if (menuconfig.export.enable) {
							var btn_export = generateEle("button");
							btn_export.innerHTML = menuconfig.export.buttonname;
							var filename = menuconfig.export.filename;
							btn_export.onclick = function () {
								//console.log(params);
								/*let params = {
	       	"dom": this.dom.table.innerHTML,
	       	"filename": filename
	       };*/
								var exporttable = {
									type: "table",
									data: this.exportsheet.content
								};
								if (this.exportsheet.merge.length > 0) {
									exporttable.merge = this.exportsheet.merge;
								}
								var params = {
									"filename": "test",
									"content": JSON.stringify([exporttable])
								};
								var form = generateEle("form");
								form.action = this.config.menus.export.export_url;
								form.method = "post";
								form.target = "_blank";

								for (var key in params) {
									var input = generateEle("input");
									input.type = "hidden";
									input.name = key;
									input.value = params[key];
									form.appendChild(input);
								}
								document.body.appendChild(form);
								form.submit();
								//生成下载连接后删除iframe节点
								setTimeout(function () {
									document.body.removeChild(form);
								}, 100);
							}.bind(_this5);
							menuContainer.appendChild(btn_export);
						}
						menuContainer.style.marginBottom = "10px";

						_this5.dom.menubar = menuContainer;
						_this5.targetdom.appendChild(_this5.dom.menubar);
					})();
				}
			}
		}, {
			key: "getTargetNodeById",
			value: function getTargetNodeById(dtid) {
				var target = void 0;
				var arrTargetDom = this.targetdom.childNodes;
				var arrTargetKeys = Object.keys(arrTargetDom);
				arrTargetKeys.map(function (key) {
					var node = arrTargetDom[key];
					if (node instanceof Element) {
						var dt_id = node.getAttribute("dt-id");
						if (dt_id && dt_id == dtid) {
							target = node;
						}
					}
				});
				return target;
			}
		}, {
			key: "renderPaginationBar",
			value: function renderPaginationBar() {
				var _this6 = this;

				var flag_pager = this.config.menus.pager.enable;
				var length_page = this.config.menus.pager.pager_length || 0;
				if (flag_pager && length_page != 0) {
					var generateEle = this.generateEle;
					var paginationBar = generateEle("div");
					paginationBar.setAttribute("dt-id", "paginationbar");
					var btn_pagination_left = generateEle("button");
					btn_pagination_left.innerHTML = "上一页";
					var btn_pagination_right = generateEle("button");
					btn_pagination_right.innerHTML = "下一页";
					btn_pagination_right.style.marginLeft = "8px";

					var msg_title = "当前页";
					var current_page = this.config.menus.pager.current_page + 1;
					var total_page = this.config.menus.pager.total_page; //Math.ceil(this.config.data.response.records_total / length_page);
					var span_pagehint = generateEle("span");
					span_pagehint.innerHTML = msg_title + "&nbsp;" + current_page + " / " + total_page;
					span_pagehint.style.marginLeft = "30px";

					btn_pagination_left.onclick = function (e) {
						if (_this6.config.menus.pager.current_page <= 0) {} else {
							_this6.config.menus.pager.current_page--;
							_this6.reDraw();
						}
					};

					btn_pagination_right.onclick = function (e) {
						if (_this6.config.menus.pager.current_page + 1 >= Math.ceil(_this6.config.data.response.records_total / length_page)) {} else {
							_this6.config.menus.pager.current_page++;
							_this6.reDraw();
						}
					};

					paginationBar.appendChild(btn_pagination_left);
					paginationBar.appendChild(btn_pagination_right);
					paginationBar.appendChild(span_pagehint);

					paginationBar.style.marginTop = "10px";

					var targetnode = this.getTargetNodeById("paginationbar");
					if (!this.dom.pagination || !targetnode) {
						this.dom.pagination = paginationBar;
						this.targetdom.appendChild(paginationBar);
					} else {
						this.targetdom.replaceChild(paginationBar, targetnode);
					}
				} else {
					var _targetnode = this.getTargetNodeById("paginationbar");
					if (_targetnode) {
						this.targetdom.removeChild(_targetnode);
					}
				}
			}
		}, {
			key: "renderFreezeHeader",
			value: function renderFreezeHeader() {
				var _this7 = this;

				/*if (document.getElementById("maskTable")) {
	   	document.body.removeChild(document.getElementById("maskTable"));
	   }*/
				if (this.config.menus.freezeheader.enable) {
					(function () {
						var arrWidth = [];
						var arrTargetDom = _this7.targetdom.childNodes;
						//let arrTargetKeys = Object.keys(arrTargetDom);
						var targetTable = _this7.getTargetNodeById("table");

						var tableWidth = targetTable.offsetWidth;
						var tableOffsetLeft = targetTable.offsetLeft + document.body.scrollLeft;
						var scrollHeight = targetTable.getBoundingClientRect().top;

						var arrHead = targetTable.firstChild.childNodes;
						var arrHeadKeys = Object.keys(arrHead);
						arrHeadKeys.map(function (key) {
							var arrHeadtr = arrHead[key].childNodes;
							var arrHeadtrKeys = Object.keys(arrHeadtr);
							var arrTempWidth = [];
							arrHeadtrKeys.map(function (trkey) {
								var cell = arrHeadtr[trkey];
								arrTempWidth.push(cell.clientWidth);
							});
							arrWidth.push(arrTempWidth); //获取表头每列的宽度
						});

						var generateEle = _this7.generateEle;
						var maskTable = generateEle("table");
						maskTable.className = _this7.config.style.class_name;
						var headergrid = _this7.config.table.header.grid;
						var head = generateEle("thead");
						headergrid.forEach(function (row, index, array) {
							var tr = generateEle("tr");
							var index_th = 0;
							row.forEach(function (cell, index_cell, array_cell) {
								if (cell) {
									//get cells in every head row
									var th = generateEle("th");
									_DisplayUtil2.default.appendChild(th, _this7.parseValue(_this7.globaldata, "string", cell.title));
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

						_this7.$bindEventListener("scroll", function () {
							var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

							//get HeaderHeight
							if (scrollTop > scrollHeight) {
								maskTable.style.display = "block";
							} else {
								maskTable.style.display = "none";
							}
						});
						_this7.$bindEventListener("resize", function () {
							return _this7.renderFreezeHeader();
						});

						maskTable.appendChild(head);
						maskTable.style.position = "fixed";
						maskTable.style.left = tableOffsetLeft + "px";
						maskTable.style.top = "0px";
						maskTable.style.zIndex = "10000";
						maskTable.style.backgroundColor = "white";
						maskTable.style.width = tableWidth + "px";
						//maskTable.id = "maskTable";
						maskTable.style.display = "none";
						//document.body.appendChild(maskTable);
						if (!_this7.maskTable) {
							_this7.maskTable = maskTable;
							document.body.appendChild(_this7.maskTable);
						} else {
							document.body.replaceChild(_this7.maskTable, maskTable);
							_this7.maskTable = maskTable;
						}
					})();
				}
			}
		}, {
			key: "getData",
			value: function getData(callback) {
				var _this8 = this;

				var datapath = this.config.data.request.url;
				var params = this.config.data.request.params;
				var pagerconfig = this.config.menus.pager;
				if (pagerconfig.enable && pagerconfig.server_side) {
					var params_pager = {
						"pager_length": pagerconfig.pager_length,
						"current_page": pagerconfig.current_page
					};
					params = _Util2.default.mergeObject(params, params_pager);
					fetch(datapath, {
						method: 'GET'
					}).then(function (response) {
						return response.json();
					}).then(function (responsedata) {
						_this8.config.data.response = responsedata;
						_this8.config.menus.pager.current_page = responsedata.current_page;
						_this8.config.menus.pager.total_page = Math.ceil(responsedata.records_total / pagerconfig.pager_length);
						callback();
					});
				} else if (!this.config.data.response.data) {
					fetch(datapath, {
						method: 'GET'
					}).then(function (response) {
						return response.json();
					}).then(function (responsedata) {
						_this8.config.data.response = responsedata;
						_this8.config.menus.pager.total_page = Math.ceil(responsedata.data.length / pagerconfig.pager_length);
						callback();
					});
				} else {
					callback();
				}
			}
		}, {
			key: "generateReport",
			value: function generateReport() {
				var _this9 = this;

				this.dom = this.dom || {};
				this.renderMenuBar(); //render Menus
				this.getData(function () {
					_this9.renderTable(); //renderTable
					_this9.renderPaginationBar(); //render pagination
					_this9.renderFreezeHeader(); //freeze header
				});
			}
		}, {
			key: "reDraw",
			value: function reDraw() {
				this.generateReport();
			}

			// events

		}, {
			key: "$bindEventListener",
			value: function $bindEventListener(type, handler) {
				if (this.$eventCacheMap[type] != undefined) {
					console.error("注册了重复的事件，请检查!", type);
					this.$unBindEventListener(type);
				}
				this.$eventCacheMap[type] = handler;
				window.addEventListener(type, handler);
			}
		}, {
			key: "$unBindEventListener",
			value: function $unBindEventListener(type) {
				if (this.$eventCacheMap[type] == undefined) {
					console.error("没有找到可以删除事件，请检查!", type);
					return;
				}
				window.removeEventListener(type, this.$eventCacheMap[type]);
				delete this.$eventCacheMap[type];
			}
		}, {
			key: "$unBindAllEventListeners",
			value: function $unBindAllEventListeners() {
				for (var type in this.$eventCacheMap) {
					this.$unBindEventListener(type);
				}
			}

			// api

		}, {
			key: "setConfig",
			value: function setConfig(value) {
				var default_config = JSON.parse(JSON.stringify(_config_default2.default));
				this.config = _Util2.default.mergeObject(default_config, value);
				console.log(this.config);
			}

			// clear cache & memory & event listeners

		}, {
			key: "dispose",
			value: function dispose() {
				this.$unBindAllEventListeners();
				_DisplayUtil2.default.removeChild(this.targetdom);
				this.targetdom = null;
				this.config = null;
			}
		}]);

		return BaseTransform;
	}();

	exports.default = BaseTransform;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
		"data": {
			"request": {
				"url": "",
				"params": {}
			},
			"response": {
				"data": null,
				"current_page": 0,
				"records_total": 0
			},
			"groupby": [],
			"sortby": []
		},
		"menus": {
			"pager": {
				"enable": false,
				"server_side": false,
				"pager_option": [
					[
						10,
						25,
						50,
						100
					],
					[
						10,
						25,
						50,
						100
					]
				],
				"pager_length": 10,
				"current_page": 0,
				"total_page": 0
			},
			"export": {
				"enable": true,
				"buttonname": "导出Excel",
				"filename": "export",
				"export_url": "http://10.82.12.10:808/exportexcel/Report.php"
			},
			"freezeheader": {
				"enable": false,
				"header": {}
			}
		},
		"style": {
			"direction": "vertical",
			"class_name": "dctable"
		},
		"table": {
			"header": {
				"grid": [],
				"data_bind": []
			},
			"body": [],
			"footer": []
		}
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  function Body() {
	    this.bodyUsed = false


	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        }
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }

	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return
	      }

	      xhr.onload = function() {
	        var status = (xhr.status === 1223) ? 204 : xhr.status
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'))
	          return
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by yuanw on 2016/4/26.
	 */

	var Util = function () {
	    function Util() {
	        _classCallCheck(this, Util);
	    }

	    _createClass(Util, null, [{
	        key: "mergeObject",
	        value: function mergeObject(obj1, obj2) {
	            for (var p in obj2) {
	                try {
	                    if (obj2[p].constructor == Object) {
	                        obj1[p] = Util.mergeObject(obj1[p], obj2[p]);
	                    } else {
	                        obj1[p] = obj2[p];
	                    }
	                } catch (e) {
	                    obj1[p] = obj2[p];
	                }
	            }
	            return obj1;
	        }

	        //recursive array

	    }, {
	        key: "permutationArray",
	        value: function permutationArray(array) {
	            var arrLength = array.length;
	            if (arrLength === 0) {
	                return [];
	            } else if (arrLength === 1) {
	                return array[0];
	            } else {
	                var result = [];
	                var arrFisrt = array[0];
	                var restcases = Util.permutationArray(array.slice(1));
	                for (var c in restcases) {
	                    for (var i = 0; i < arrFisrt.length; i++) {
	                        result.push(array[0][i] + ";" + restcases[c]);
	                    }
	                }
	                return result;
	            }
	        }
	    }, {
	        key: "groupBy",
	        value: function groupBy(targetArray, targetkey) {
	            var fun = function fun(result, value, key) {
	                if (result[key]) {
	                    result[key].push(value);
	                } else {
	                    result[key] = [value];
	                }
	            };
	            var result = {};
	            targetArray.map(function (value, index, array) {
	                var key = value[targetkey];
	                fun(result, value, key);
	            });
	            return result;
	        }
	    }]);

	    return Util;
	}();

	exports.default = Util;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by vincent on 2016/4/22.
	 */

	var DisplayUtil = function () {
	    function DisplayUtil() {
	        _classCallCheck(this, DisplayUtil);
	    }

	    _createClass(DisplayUtil, null, [{
	        key: 'appendChild',
	        value: function appendChild(parent, childOrChildren) {
	            if (parent == undefined || childOrChildren == undefined) return;
	            if (typeof childOrChildren == 'string' || typeof childOrChildren == 'number') {
	                parent.innerText = childOrChildren;
	            } else if (Array.isArray(childOrChildren)) {
	                childOrChildren.forEach(function (child) {
	                    child != undefined && parent.appendChild(child);
	                });
	            } else {
	                parent.appendChild(childOrChildren);
	            }
	        }
	    }, {
	        key: 'createElement',
	        value: function createElement(type, props, children) {
	            var element = document.createElement(type);
	            for (var i in props) {
	                if (props.hasOwnProperty(i) && props[i] != undefined) element.setAttribute(i, props[i]);
	            }
	            DisplayUtil.appendChild(element, children);
	            return element;
	        }
	    }, {
	        key: 'removeChild',
	        value: function removeChild(parent, childOrChildren) {
	            if (parent == undefined) return;
	            if (childOrChildren == undefined) {
	                // remove all
	                childOrChildren = parent.childNodes;
	            } else if (!Array.isArray(childOrChildren)) {
	                parent.removeChild(childOrChildren);
	                return;
	            }
	            for (var i = childOrChildren.length - 1; i >= 0; i--) {
	                parent.removeChild(childOrChildren[i]);
	            }
	        }
	    }]);

	    return DisplayUtil;
	}();

	exports.default = DisplayUtil;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by vincent on 2016/5/3.
	 */

	var Injector = function () {
	    function Injector() {
	        _classCallCheck(this, Injector);
	    }

	    _createClass(Injector, [{
	        key: "inject",
	        value: function inject(value, name) {
	            var key = Symbol.for(name);
	            if (this[key]) {
	                console.error("injectParser 名称不能重复:", name);
	                return;
	            }
	            this[key] = value;
	        }
	    }, {
	        key: "retrieve",
	        value: function retrieve(name) {
	            var key = Symbol.for(name);
	            return this[key];
	        }
	    }]);

	    return Injector;
	}();

	exports.default = Injector;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectUtil = __webpack_require__(9);

	var _ObjectUtil2 = _interopRequireDefault(_ObjectUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _class = function () {
	    function _class() {
	        _classCallCheck(this, _class);
	    }

	    _createClass(_class, [{
	        key: 'createElement',

	        /**
	         * 创建DOM操作 供子类覆盖
	         * @returns {Element}
	         */
	        value: function createElement() {
	            return this.data;
	        }

	        /**
	         * 对外提供获取DOM的接口
	         * @returns {*|Element}
	         */

	    }, {
	        key: 'render',


	        /**
	         * 如何渲染DOM 供子类覆盖
	         */
	        value: function render() {
	            this.element;
	        }
	    }, {
	        key: 'data',

	        //_element;
	        ///**
	        // * 数据
	        // */
	        //_data;
	        /**
	         * 设置数据 供子类覆盖 方便做一些设置数据时的操作
	         * @param v
	         */
	        set: function set(v) {
	            if (_ObjectUtil2.default.isEqual(this._data, v)) {
	                return;
	            }
	            this._data = v;
	            this.render();
	        }

	        /**
	         * 获取数据
	         * @returns {*}
	         */
	        ,
	        get: function get() {
	            return this._data;
	        }
	    }, {
	        key: 'params',
	        set: function set(v) {
	            if (_ObjectUtil2.default.isEqual(this._params, v)) {
	                return;
	            }
	            this._params = v;
	            this.render();
	        }

	        /**
	         * 获取数据
	         * @returns {*}
	         */
	        ,
	        get: function get() {
	            return this._params;
	        }
	    }, {
	        key: 'element',
	        get: function get() {
	            return this._element = this._element || this.createElement();
	        }
	    }]);

	    return _class;
	}();

	exports.default = _class;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Internal recursive comparison function for `isEqual`.

	var ObjectUtil = function () {
	    function ObjectUtil() {
	        _classCallCheck(this, ObjectUtil);
	    }

	    _createClass(ObjectUtil, null, [{
	        key: 'eq',
	        value: function eq(a, b, aStack, bStack) {
	            // Identical objects are equal. `0 === -0`, but they aren't identical.
	            // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	            if (a === b) return a !== 0 || 1 / a === 1 / b;
	            // A strict comparison is necessary because `null == undefined`.
	            if (a == null || b == null) return a === b;
	            // Compare `[[Class]]` names.
	            var className = toString.call(a);
	            if (className !== toString.call(b)) return false;
	            switch (className) {
	                // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	                case '[object RegExp]':
	                // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	                case '[object String]':
	                    // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	                    // equivalent to `new String("5")`.
	                    return '' + a === '' + b;
	                case '[object Number]':
	                    // `NaN`s are equivalent, but non-reflexive.
	                    // Object(NaN) is equivalent to NaN
	                    if (+a !== +a) return +b !== +b;
	                    // An `egal` comparison is performed for other numeric values.
	                    return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	                case '[object Date]':
	                case '[object Boolean]':
	                    // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	                    // millisecond representations. Note that invalid dates with millisecond representations
	                    // of `NaN` are not equivalent.
	                    return +a === +b;
	            }
	            if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') return false;
	            // Assume equality for cyclic structures. The algorithm for detecting cyclic
	            // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	            var length = aStack.length;
	            while (length--) {
	                // Linear search. Performance is inversely proportional to the number of
	                // unique nested structures.
	                if (aStack[length] === a) return bStack[length] === b;
	            }
	            // Objects with different constructors are not equivalent, but `Object`s
	            // from different frames are.
	            var aCtor = a.constructor,
	                bCtor = b.constructor;
	            if (aCtor !== bCtor &&
	            // Handle Object.create(x) cases
	            'constructor' in a && 'constructor' in b && !(typeof aCtor == 'function' && aCtor instanceof aCtor && typeof bCtor == 'function' && bCtor instanceof bCtor)) {
	                return false;
	            }
	            // Add the first object to the stack of traversed objects.
	            aStack.push(a);
	            bStack.push(b);
	            var size, result;
	            // Recursively compare objects and arrays.
	            if (className === '[object Array]') {
	                // Compare array lengths to determine if a deep comparison is necessary.
	                size = a.length;
	                result = size === b.length;
	                if (result) {
	                    // Deep compare the contents, ignoring non-numeric properties.
	                    while (size--) {
	                        if (!(result = ObjectUtil.eq(a[size], b[size], aStack, bStack))) break;
	                    }
	                }
	            } else {
	                // Deep compare objects.
	                var keys = Object.keys(a),
	                    key;
	                size = keys.length;
	                // Ensure that both objects contain the same number of properties before comparing deep equality.
	                result = Object.keys(b).length === size;
	                if (result) {
	                    while (size--) {
	                        // Deep compare each member
	                        key = keys[size];
	                        if (!(result = b.hasOwnProperty(key) && ObjectUtil.eq(a[key], b[key], aStack, bStack))) break;
	                    }
	                }
	            }
	            // Remove the first object from the stack of traversed objects.
	            aStack.pop();
	            bStack.pop();
	            return result;
	        }
	    }, {
	        key: 'isEqual',
	        value: function isEqual(a, b) {
	            return ObjectUtil.eq(a, b, [], []);
	        }
	    }]);

	    return ObjectUtil;
	}();

	exports.default = ObjectUtil;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _ItemRender2 = __webpack_require__(8);

	var _ItemRender3 = _interopRequireDefault(_ItemRender2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _class = function (_ItemRender) {
	    _inherits(_class, _ItemRender);

	    function _class() {
	        _classCallCheck(this, _class);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	    }

	    _createClass(_class, [{
	        key: "createElement",
	        value: function createElement() {
	            var container = document.createElement("div");
	            this.progress = document.createElement("div");
	            this.progress.style.background = "#f90";
	            container.style.width = "100%";
	            container.appendChild(this.progress);
	            return container;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            _get(Object.getPrototypeOf(_class.prototype), "render", this).call(this);
	            this.progress.innerText = this.data;
	            if (this.params) {
	                var value = this.data / this.params[0];
	                if (value > 1) value = 1;
	                this.progress.style.width = value * 100 + "%";
	            }
	        }
	    }]);

	    return _class;
	}(_ItemRender3.default);

	exports.default = _class;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ItemRender2 = __webpack_require__(8);

	var _ItemRender3 = _interopRequireDefault(_ItemRender2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 显示货币
	 */

	var _class = function (_ItemRender) {
	    _inherits(_class, _ItemRender);

	    function _class() {
	        _classCallCheck(this, _class);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	    }

	    _createClass(_class, [{
	        key: 'formatCurrency',
	        value: function formatCurrency() {
	            if (this.data) {
	                return this.data.replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,");
	            }
	            return '';
	        }
	    }, {
	        key: 'createElement',
	        value: function createElement() {
	            return this.formatCurrency();
	        }
	    }]);

	    return _class;
	}(_ItemRender3.default);

	exports.default = _class;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ItemRender2 = __webpack_require__(8);

	var _ItemRender3 = _interopRequireDefault(_ItemRender2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 链接 钻取
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var _class = function (_ItemRender) {
	    _inherits(_class, _ItemRender);

	    function _class() {
	        _classCallCheck(this, _class);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	    }

	    _createClass(_class, [{
	        key: "createElement",
	        value: function createElement() {
	            return document.createElement("a");
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            this.element.innerText = this.data;
	            if (this.params) {
	                this.element.href = this.params[0];
	            }
	        }
	    }]);

	    return _class;
	}(_ItemRender3.default);

	exports.default = _class;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _ParserObject2 = __webpack_require__(14);

	var _ParserObject3 = _interopRequireDefault(_ParserObject2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 根据单条数据和表达式计算结果
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var _class = function (_ParserObject) {
	    _inherits(_class, _ParserObject);

	    function _class() {
	        _classCallCheck(this, _class);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	    }

	    _createClass(_class, [{
	        key: 'parse',
	        value: function parse(context) {
	            _get(Object.getPrototypeOf(_class.prototype), 'parse', this).call(this, context);

	            var expression = this.expression;
	            if (/\$\{(\w+)\}/.test(expression)) {
	                expression = expression.replace(/\$\{(\w+)\}/g, function (m, p) {
	                    return context[p] || 0;
	                });
	                try {
	                    return eval(expression);
	                } catch (e) {
	                    console.error('表达式 ' + this.expression + ' 转换失败', context);
	                    return '';
	                }
	            } else if (context && context.hasOwnProperty(expression)) {
	                return context[expression];
	            }
	            return expression;
	        }
	    }]);

	    return _class;
	}(_ParserObject3.default);

	exports.default = _class;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * 根据单条数据和表达式计算结果
	 */

	var _class = function () {
	    function _class() {
	        _classCallCheck(this, _class);
	    }

	    _createClass(_class, [{
	        key: "parse",
	        value: function parse(context) {
	            if (this.expression === undefined) {
	                console.error("expression不能为空 context=", context);
	            }
	            if (context === undefined) {
	                console.warn("context不能为空 expression=", this.expression);
	            }
	        }
	    }, {
	        key: "addChild",
	        value: function addChild(expression) {
	            this.expression = expression;
	        }
	    }]);

	    return _class;
	}();

	exports.default = _class;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _ParserObject2 = __webpack_require__(14);

	var _ParserObject3 = _interopRequireDefault(_ParserObject2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 根据单条数据和表达式计算结果
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var _class = function (_ParserObject) {
	    _inherits(_class, _ParserObject);

	    function _class() {
	        _classCallCheck(this, _class);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	    }

	    _createClass(_class, [{
	        key: 'parse',
	        value: function parse(context) {
	            _get(Object.getPrototypeOf(_class.prototype), 'parse', this).call(this, context);

	            var expression = this.expression;
	            if (/\$\{(\w+)\}/.test(expression)) {
	                expression = expression.replace(/\$\{(\w+)\}/g, function (m, p) {
	                    return context[p] || 0;
	                });
	                return expression;
	            } else if (context && context.hasOwnProperty(expression)) {
	                return context[expression];
	            }
	            return expression;
	        }
	    }]);

	    return _class;
	}(_ParserObject3.default);

	exports.default = _class;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _ParserContainer2 = __webpack_require__(17);

	var _ParserContainer3 = _interopRequireDefault(_ParserContainer2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by vincent on 2016/4/19.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var _class = function (_ParserContainer) {
	    _inherits(_class, _ParserContainer);

	    function _class() {
	        _classCallCheck(this, _class);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	    }

	    _createClass(_class, [{
	        key: 'parse',
	        value: function parse(context) {
	            var _this2 = this;

	            _get(Object.getPrototypeOf(_class.prototype), 'parse', this).call(this, context);

	            var result = 0;
	            context.forEach(function (value) {
	                result += parseFloat(_this2.child.parse(value));
	            });
	            return result;
	        }
	    }]);

	    return _class;
	}(_ParserContainer3.default);

	exports.default = _class;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * 根据单条数据和表达式计算结果
	 */

	var _class = function () {
	    function _class() {
	        _classCallCheck(this, _class);
	    }

	    _createClass(_class, [{
	        key: "parse",
	        value: function parse(context) {
	            if (this.child === undefined) {
	                console.error("child不能为空 context=", context);
	            }
	            if (context === undefined) {
	                console.warn('context不能为空');
	            }
	        }
	    }, {
	        key: "addChild",
	        value: function addChild(child) {
	            this.child = child;
	        }
	    }]);

	    return _class;
	}();

	exports.default = _class;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(19);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(21)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(20)();
	// imports


	// module
	exports.push([module.id, ".dctable td, .dctable th{\r\n    /*border-left: 1px solid #e9e9e9;\r\n    border-top: 1px solid #e9e9e9;*/\r\n    word-break: break-all;\r\n    height: 50px;\r\n    text-align: center;\r\n    padding: 0 12px;\r\n    margin: 0;\r\n    border:1px solid #e9e9e9;\r\n}\r\n.dctable{\r\n    border-collapse: collapse;\r\n    border-spacing: 0;\r\n    /*border-right: 1px solid #e9e9e9;\r\n    border-bottom: 1px solid #e9e9e9;*/\r\n    width: 100%;\r\n    max-width: 100%;\r\n    /*border-radius: 6px 6px 0 0;*/\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    border:1px solid black;\r\n}\r\n.table-header, .group-header{\r\n    font-size: 16px;\r\n    text-align: center;\r\n}\r\n.table-header{\r\n    font-weight: bold;\r\n    background: #f4f4f4;\r\n}\r\n.group-header{\r\n\r\n}\r\n.headcell{\r\n    background: #f4f4f4;\r\n}", ""]);

	// exports


/***/ },
/* 20 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;