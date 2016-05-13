/**
 * Created by vincent on 2016/4/26.
 */
import Table from "../src/design/renderers/Table";
import ItemRender from '../src/design/renderers/ItemRender';
import ProgressRender from '../src/design/renderers/ProgressRender';
import CurrencyRender from '../src/design/renderers/CurrencyRender';
import AnchorRender from '../src/design/renderers/AnchorRender';
import ItemParser from '../src/design/parsers/ItemParser';
import SUMParser from '../src/design/parsers/SUMParser';
import BaseTransform from "../src/module/BaseTransform";
import config from "../src/config/operationMonthly-config.json";

describe("报表", ()=> {
    it("核心运营表", ()=> {
        var dom = document.createElement("div");
        document.body.appendChild(dom);
        let bf = new BaseTransform(dom, config);
        // parser
        bf.mapParser(ItemParser);// default
        // multi parser
        bf.mapMultiParser(SUMParser);// default
        // renderer
        bf.mapRenderer(ItemRender);// default
        bf.mapRenderer(AnchorRender, "anchor");
        bf.mapRenderer(CurrencyRender, "currency");
        bf.mapRenderer(ProgressRender, "progress");

        bf.generateReport();
        // var table = new Table();
        // table.data = {dataSource, columns, groupby, invert};
        // document.body.appendChild(table.element);
        expect(1).toBe(1);
    });
    it("个人绩效表", ()=> {
        var columns = [
            {
                title: '项目信息',
                children: [
                    {
                        title: '业务经办人',
                        field: "agent_name",
                    },
                    {
                        title: '项目名称',
                        field: "project_name"
                    },
                    {
                        title: '分属',
                        field: "platform"
                    },
                    {
                        title: '项目规模',
                        format: "currency",
                        field: "project_size"
                    }
                ]
            }, {
                title: '绩效',
                children: [
                    {
                        title: '项目创利',
                        format: "currency",
                        field: "project_profit"
                    },
                    {
                        title: '个人权重',
                        field: "person_weight",
                    },
                    {
                        title: '承揽承做权重',
                        field: "undertake_weight",
                    },
                    {
                        title: '个人绩效规模',//个人绩效规模 = 项目规模*个人权重
                        format: "currency",
                        field: "${project_size}*${person_weight}"//"${project_size}*${person_weight}"//"${project_size}*${person_weight}",
                    },
                    {
                        title: '个人绩效创利',
                        format: "currency",
                        field: "${project_profit}*${person_weight}*${undertake_weight}"//"${project_profit}*${person_weight}*${undertake_weight}"//"${project_profit}*${person_weight}*${undertake_weight}"
                    },
                    {
                        title: '季度创利',
                        children: [
                            {
                                title: '1季度',
                                format: "currency",
                                field: "first_quarter_profit"
                            },
                            {
                                title: '2季度',
                                format: "currency",
                                field: "second_quarter_profit"
                            },
                            {
                                title: '3季度',
                                format: "currency",
                                field: "third_quarter_profit"
                            },
                            {
                                title: '4季度',
                                format: "currency",
                                field: "fourth_quarter_profit"
                            }
                        ]
                    },
                    {
                        title: '本年小计',
                        format: "currency",
                        field: "year_total_profit"
                    },
                    {
                        title: '待结转创利',
                        format: "currency",
                        field: "wait_forward_profit"
                    }
                ]
            }, {
                title: '费用',
                children: [
                    {
                        title: '团队费用池',
                        format: "currency",
                        field: "team_cost_pool"
                    },
                    {
                        title: '个人费用额度',
                        format: "currency",
                        field: "person_cost_lines"
                    },
                    {
                        title: '匡算费用额度',
                        children: [
                            {
                                title: '1季度',
                                format: "currency",
                                field: "first_quarter_density"
                            },
                            {
                                title: '2季度',
                                format: "currency",
                                field: "second_quarter_density"
                            },
                            {
                                title: '3季度',
                                format: "currency",
                                field: "third_quarter_density"
                            },
                            {
                                title: '4季度',
                                format: "currency",
                                field: "fourth_quarter_density"
                            }
                        ]
                    },
                    {
                        title: '截止本季度平台服务费回款',
                        children: [
                            {
                                title: '1季度',
                                format: "currency",
                                field: "${first_quarter_service}*(1-${team_for})*${person_weight}*${undertake_weight}"//"${first_quarter_service}*(1-${team_for})*${person_weight}*${undertake_weight}"//截止1季度的实际回款*（1-团队费用占比）*个人权重*承揽承做比率
                            },
                            {
                                title: '2季度',
                                format: "currency",
                                field: "${second_quarter_service}*(1-${team_for})*${person_weight}*${undertake_weight}"//"${second_quarter_service}*(1-${team_for})*${person_weight}*${undertake_weight}"
                            },
                            {
                                title: '3季度',
                                format: "currency",
                                field: "${third_quarter_service}*(1-${team_for})*${person_weight}*${undertake_weight}"//"${third_quarter_service}*(1-${team_for})*${person_weight}*${undertake_weight}"
                            },
                            {
                                title: '4季度',
                                format: "currency",
                                field: "${fourth_quarter_service}*(1-${team_for})*${person_weight}*${undertake_weight}"//"${fourth_quarter_service}*(1-${team_for})*${person_weight}*${undertake_weight}"
                            }
                        ]
                    },
                    {
                        title: '最终可使用费用额度',
                        children: [
                            {
                                title: '1季度',
                                format: "currency",
                                field: "Math.min(${first_quarter_density}, ${first_quarter_service_result})"//"Math.min(${first_quarter_use}, ${first_quarter_service})"
                            },
                            {
                                title: '2季度',
                                format: "currency",
                                field: "Math.min(${second_quarter_density}, ${second_quarter_service_result})"//"Math.min(${second_quarter_use}, ${second_quarter_service})"
                            },
                            {
                                title: '3季度',
                                format: "currency",
                                field: "Math.min(${third_quarter_density}, ${third_quarter_service_result})"// "Math.min(${third_quarter_use}, ${third_quarter_service})"
                            },
                            {
                                title: '4季度',
                                format: "currency",
                                field: "Math.min(${fourth_quarter_density}, ${fourth_quarter_service_result})"//"Math.min(${fourth_quarter_use}, ${fourth_quarter_service})"
                            }
                        ]
                    },
                    {
                        title: '小计',
                        format: "currency",
                        field: "${first_quarter_min}+${second_quarter_min}+${third_quarter_min}+${fourth_quarter_min}"//"use_subtotal"
                    },
                    {
                        title: '本年已报销金额',
                        format: "currency",
                        field: "refund_total"
                    },
                    {
                        title: '本年未使用额度',
                        format: "currency",
                        field: "remain_total"
                    }
                ]
            }];
        var invert = false;
        var groupby = ["agent_name"];
        var dataSource = [{
            "agent_name": "吴迪",
            "project_name": "xxxxxxxxxxxxxxxx",
            "assetsId": "ZC_20151223_100717",
            "manNo": "01276",
            "platformId": 1,
            "platform": "易贷",
            "sort": 0,
            "project_size": "9038000.00",
            "project_profit": "51479.94",
            "person_weight": "1",
            "undertake_weight": "90",
            "${project_size}*${person_weight}": "9038000",
            "${project_profit}*${person_weight}*${undertake_weight}": "4633194.6",
            "first_quarter_profit": "0.00",
            "second_quarter_profit": "0.00",
            "third_quarter_profit": "0.00",
            "fourth_quarter_profit": "-19833.59",
            "year_total_profit": "-19833.59",
            "wait_forward_profit": "71313.53",
            "team_cost_pool": "277991.68",
            "person_cost_lines": "555983.35",
            "first_quarter_density": "0",
            "second_quarter_density": "0",
            "third_quarter_density": "0",
            "fourth_quarter_density": "-2142.03",
            "first_quarter_service": "0",
            "second_quarter_service": "0",
            "third_quarter_service": "0",
            "fourth_quarter_service": "0",
            "first_quarter_use": "0",
            "second_quarter_use": "0",
            "third_quarter_use": "0",
            "fourth_quarter_use": "-2142.03",
            "use_subtotal": "-2142.03",
            "refund_total": "72383.7",
            "remain_total": "-74525.73",
            "first_quarter_actual": "0.00",
            "second_quarter_actual": "0.00",
            "third_quarter_actual": "0.00",
            "fourth_quarter_actual": "0.00",
            "team_for": 0.1
        }, {
            "agent_name": "吴迪",
            "project_name": "xxxxxxxxxxxxxxxx",
            "assetsId": "ZC_20151225_135027",
            "manNo": "01276",
            "platformId": 1,
            "platform": "易贷",
            "sort": 0,
            "project_size": "11636200.00",
            "project_profit": "43322.00",
            "person_weight": "1",
            "undertake_weight": "90",
            "${project_size}*${person_weight}": "11636200",
            "${project_profit}*${person_weight}*${undertake_weight}": "3898980",
            "first_quarter_profit": "0.00",
            "second_quarter_profit": "0.00",
            "third_quarter_profit": "0.00",
            "fourth_quarter_profit": "-15171.15",
            "year_total_profit": "-15171.15",
            "wait_forward_profit": "58493.15",
            "team_cost_pool": "233938.8",
            "person_cost_lines": "467877.6",
            "first_quarter_density": "0",
            "second_quarter_density": "0",
            "third_quarter_density": "0",
            "fourth_quarter_density": "467877.6",
            "first_quarter_service": "0",
            "second_quarter_service": "0",
            "third_quarter_service": "0",
            "fourth_quarter_service": "0",
            "first_quarter_use": "0",
            "second_quarter_use": "0",
            "third_quarter_use": "0",
            "fourth_quarter_use": "0",
            "use_subtotal": "0",
            "refund_total": "72383.7",
            "remain_total": "-72383.7",
            "first_quarter_actual": "0.00",
            "second_quarter_actual": "0.00",
            "third_quarter_actual": "0.00",
            "fourth_quarter_actual": "0.00",
            "team_for": 0.1
        }, {
            "agent_name": "吴迪",
            "project_name": "吴迪个人小计",
            "assetsId": "",
            "manNo": "01276",
            "platformId": 1,
            "platform": "易贷",
            "sort": 1,
            "project_size": "20674200",
            "project_profit": "94801.94",
            "person_weight": "",
            "undertake_weight": "90",
            "${project_size}*${person_weight}": "20674200",
            "${project_profit}*${person_weight}*${undertake_weight}": "8532174.6",
            "first_quarter_profit": "0",
            "second_quarter_profit": "0",
            "third_quarter_profit": "0",
            "fourth_quarter_profit": "-35004.74",
            "year_total_profit": "-35004.74",
            "wait_forward_profit": "71313.53",
            "team_cost_pool": "511930.48",
            "person_cost_lines": "1023860.95",
            "first_quarter_density": "0",
            "second_quarter_density": "0",
            "third_quarter_density": "0",
            "fourth_quarter_density": "465735.57",
            "first_quarter_service": "0",
            "second_quarter_service": "0",
            "third_quarter_service": "0",
            "fourth_quarter_service": "0",
            "first_quarter_use": "0",
            "second_quarter_use": "0",
            "third_quarter_use": "0",
            "fourth_quarter_use": "-2142.03",
            "use_subtotal": "-2142.03",
            "refund_total": "72383.7",
            "remain_total": "-74525.73",
            "first_quarter_actual": "0",
            "second_quarter_actual": "0",
            "third_quarter_actual": "0",
            "fourth_quarter_actual": "0",
            "team_for": 0.1
        }, {
            "agent_name": "崔雪楠",
            "project_name": "xxxxxxxxxxxxxxxx",
            "assetsId": "ZC_20151223_142940",
            "manNo": "02737",
            "platformId": 1,
            "platform": "易贷",
            "sort": 0,
            "project_size": "54317000.00",
            "project_profit": "572276.33",
            "person_weight": "1",
            "undertake_weight": "90",
            "${project_size}*${person_weight}": "54317000",
            "${project_profit}*${person_weight}*${undertake_weight}": "51504869.7",
            "first_quarter_profit": "0.00",
            "second_quarter_profit": "0.00",
            "third_quarter_profit": "0.00",
            "fourth_quarter_profit": "46824.29",
            "year_total_profit": "46824.29",
            "wait_forward_profit": "525452.04",
            "team_cost_pool": "3090292.18",
            "person_cost_lines": "6180584.36",
            "first_quarter_density": "0",
            "second_quarter_density": "0",
            "third_quarter_density": "0",
            "fourth_quarter_density": "5057.02",
            "first_quarter_service": "0",
            "second_quarter_service": "0",
            "third_quarter_service": "0",
            "fourth_quarter_service": "0",
            "first_quarter_use": "0",
            "second_quarter_use": "0",
            "third_quarter_use": "0",
            "fourth_quarter_use": "0",
            "use_subtotal": "0",
            "refund_total": "1844",
            "remain_total": "-1844",
            "first_quarter_actual": "0.00",
            "second_quarter_actual": "0.00",
            "third_quarter_actual": "0.00",
            "fourth_quarter_actual": "0.00",
            "team_for": 0.1
        }, {
            "agent_name": "崔雪楠",
            "project_name": "崔雪楠个人小计",
            "assetsId": "",
            "manNo": "02737",
            "platformId": 1,
            "platform": "易贷",
            "sort": 1,
            "project_size": "54317000",
            "project_profit": "572276.33",
            "person_weight": "",
            "undertake_weight": "90",
            "${project_size}*${person_weight}": "54317000",
            "${project_profit}*${person_weight}*${undertake_weight}": "51504869.7",
            "first_quarter_profit": "0",
            "second_quarter_profit": "0",
            "third_quarter_profit": "0",
            "fourth_quarter_profit": "46824.29",
            "year_total_profit": "46824.29",
            "wait_forward_profit": "525452.04",
            "team_cost_pool": "3090292.18",
            "person_cost_lines": "6180584.36",
            "first_quarter_density": "0",
            "second_quarter_density": "0",
            "third_quarter_density": "0",
            "fourth_quarter_density": "5057.02",
            "first_quarter_service": "0",
            "second_quarter_service": "0",
            "third_quarter_service": "0",
            "fourth_quarter_service": "0",
            "first_quarter_use": "0",
            "second_quarter_use": "0",
            "third_quarter_use": "0",
            "fourth_quarter_use": "0",
            "use_subtotal": "0",
            "refund_total": "1844",
            "remain_total": "-1844",
            "first_quarter_actual": "0",
            "second_quarter_actual": "0",
            "third_quarter_actual": "0",
            "fourth_quarter_actual": "0",
            "team_for": 0.1
        }, {
            "agent_name": "周维",
            "project_name": "xxxxxxxxxxxxxxxx",
            "assetsId": "ZC_20151223_115141",
            "manNo": "02944",
            "platformId": 1,
            "platform": "易贷",
            "sort": 0,
            "project_size": "2366000.00",
            "project_profit": "79925.43",
            "person_weight": "1",
            "undertake_weight": "90",
            "${project_size}*${person_weight}": "2366000",
            "${project_profit}*${person_weight}*${undertake_weight}": "7193288.7",
            "first_quarter_profit": "0.00",
            "second_quarter_profit": "0.00",
            "third_quarter_profit": "0.00",
            "fourth_quarter_profit": "-133209.04",
            "year_total_profit": "-133209.04",
            "wait_forward_profit": "213134.47",
            "team_cost_pool": "431597.32",
            "person_cost_lines": "863194.64",
            "first_quarter_density": "0",
            "second_quarter_density": "0",
            "third_quarter_density": "0",
            "fourth_quarter_density": "-14386.58",
            "first_quarter_service": "0",
            "second_quarter_service": "0",
            "third_quarter_service": "0",
            "fourth_quarter_service": "0",
            "first_quarter_use": "0",
            "second_quarter_use": "0",
            "third_quarter_use": "0",
            "fourth_quarter_use": "-14386.58",
            "use_subtotal": "-14386.58",
            "refund_total": "34556.5",
            "remain_total": "-48943.08",
            "first_quarter_actual": "0.00",
            "second_quarter_actual": "0.00",
            "third_quarter_actual": "0.00",
            "fourth_quarter_actual": "0.00",
            "team_for": 0.1
        }, {
            "agent_name": "周维",
            "project_name": "周维个人小计",
            "assetsId": "",
            "manNo": "02944",
            "platformId": 1,
            "platform": "易贷",
            "sort": 1,
            "project_size": "2366000",
            "project_profit": "79925.43",
            "person_weight": "",
            "undertake_weight": "90",
            "${project_size}*${person_weight}": "2366000",
            "${project_profit}*${person_weight}*${undertake_weight}": "7193288.7",
            "first_quarter_profit": "0",
            "second_quarter_profit": "0",
            "third_quarter_profit": "0",
            "fourth_quarter_profit": "-133209.04",
            "year_total_profit": "-133209.04",
            "wait_forward_profit": "213134.47",
            "team_cost_pool": "431597.32",
            "person_cost_lines": "863194.64",
            "first_quarter_density": "0",
            "second_quarter_density": "0",
            "third_quarter_density": "0",
            "fourth_quarter_density": "-14386.58",
            "first_quarter_service": "0",
            "second_quarter_service": "0",
            "third_quarter_service": "0",
            "fourth_quarter_service": "0",
            "first_quarter_use": "0",
            "second_quarter_use": "0",
            "third_quarter_use": "0",
            "fourth_quarter_use": "-14386.58",
            "use_subtotal": "-14386.58",
            "refund_total": "34556.5",
            "remain_total": "-48943.08",
            "first_quarter_actual": "0",
            "second_quarter_actual": "0",
            "third_quarter_actual": "0",
            "fourth_quarter_actual": "0",
            "team_for": 0.1
        }];
        var table = new Table();
        table.data = {dataSource, columns, groupby, invert};
        document.body.appendChild(table.element);
        var rowCount = table.element.getElementsByTagName("tbody")[0].children.length;
        expect(rowCount).toBe(7);
    });
});