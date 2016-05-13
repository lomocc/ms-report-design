/**
 * Created by vincent on 2016/4/19.
 */
import ParserContainer from './ParserContainer'
export default class extends ParserContainer {
    parse(context) {
        super.parse(context);

        var result = 0;
        context.forEach(value=> {
            result += parseFloat(this.child.parse(value));
        });
        return result;
    }
}