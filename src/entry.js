import BaseTransform from "./module/BaseTransform";
import 'whatwg-fetch';

import ItemRender from './design/renderers/ItemRender';
import ProgressRender from './design/renderers/ProgressRender';
import CurrencyRender from './design/renderers/CurrencyRender';
import AnchorRender from './design/renderers/AnchorRender';
import ItemParser from './design/parsers/ItemParser';
import SUMParser from './design/parsers/SUMParser';
import './design/styles/index.css';
import userdetailconfig from "./config/config_userdetail.json";
const initBaseTransform = ()=> {
    let baseUrl = "http://10.82.12.10:4000/";
    //baseUrl = "/";
    //fetch(baseUrl + 'getconfig/double')
        //.then((response)=>response.json()).then((data)=> {
        let bf = new BaseTransform(document.getElementById("tableContainer"), userdetailconfig);
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
        console.log(bf);
    //})
};

initBaseTransform();


