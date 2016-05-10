/**
 * Created by vincent on 2016/5/10.
 */
import BaseTransform from "./module/BaseTransform";

import ItemRender from './design/renderers/ItemRender';
import ProgressRender from './design/renderers/ProgressRender';
import CurrencyRender from './design/renderers/CurrencyRender';
import AnchorRender from './design/renderers/AnchorRender';
import ItemParser from './design/parsers/ItemParser';
import StringParser from './design/parsers/StringParser';
import SUMParser from './design/parsers/SUMParser';
import './design/styles/index.css';

export default {
    BaseTransform,
    ItemParser,
    StringParser,
    SUMParser,
    ItemRender,
    AnchorRender,
    CurrencyRender,
    ProgressRender
};