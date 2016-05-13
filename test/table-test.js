/**
 * Created by vincent on 2016/4/20.
 */
import data_response from "../src/config/data_response.json";
import config_report from "../src/config/config_report.json";
import config_default from "../src/config/config_default.json";

import TableRender from "../src/design/renderers/TableRender";

describe("Table 行列数量", ()=> {
    it("行数", ()=> {
        var table = new TableRender();
        table.data = {data_response, config_report, config_default, dir:'horizontal'};

        document.body.appendChild(table.element);
        var rowCount = table.element.getElementsByTagName("tbody")[0].children.length;
        expect(rowCount).toBe(6);

    });

    it("列数", ()=> {
        var table = new TableRender();
        table.data = {data_response, config_report, config_default, dir:'vertical'};

        document.body.appendChild(table.element);
        var rowCount = table.element.getElementsByTagName("tbody")[0].children[11].children.length;
        expect(rowCount).toBe(9);
    });
});