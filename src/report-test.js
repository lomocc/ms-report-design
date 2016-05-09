import ItemRender from './design/renderers/ItemRender';
import ProgressRender from './design/renderers/ProgressRender';
import CurrencyRender from './design/renderers/CurrencyRender';
import AnchorRender from './design/renderers/AnchorRender';
import ItemParser from './design/parsers/ItemParser';
import StringParser from './design/parsers/StringParser';
import SUMParser from './design/parsers/SUMParser';
import BaseTransform from "./module/BaseTransform";
import operationMonthlyReport from "./config/operationMonthlyReport-config.json";
import operationWeeklyReport from "./config/operationWeeklyReport-config.json";
import individualPerformanceReport from "./config/individualPerformanceReport-config.json";
import './design/styles/index.less';
const containerMap = {};
const generateReport = (name, config)=> {
    if (!containerMap[name]) {
        var title = document.createElement("h1");
        title.innerText = name;
        var dom = document.createElement("div");
        dom.appendChild(title);
        document.body.appendChild(dom);
        containerMap[name] = dom;
    }
    console.log("data_bind", config.table.header.data_bind.length);
    let bf = new BaseTransform(containerMap[name], config);
    // parser
    bf.mapParser(ItemParser);// default
    bf.mapParser(StringParser, "string");// default
    // multi parser
    bf.mapMultiParser(SUMParser);// default
    // renderer
    bf.mapRenderer(ItemRender);// default
    bf.mapRenderer(AnchorRender, "anchor");
    bf.mapRenderer(CurrencyRender, "currency");
    bf.mapRenderer(ProgressRender, "progress");

    bf.generateReport();
};

generateReport("运营报表-月报", operationMonthlyReport);
generateReport("运营报表-周报", operationWeeklyReport);
generateReport("个人绩效表", individualPerformanceReport);