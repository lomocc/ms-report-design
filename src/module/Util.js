/**
 * Created by yuanw on 2016/4/26.
 */
export default class Util{
    static mergeObject(obj1, obj2) {
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
    static permutationArray(array) {
        let arrLength = array.length;
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
    
    static groupBy(targetArray, targetkey){
        var fun = function(result, value, key) {
            if (result[key]) {
                result[key].push(value);
            } else {
                result[key] = [value];
            }
        };
        var result = {};
        targetArray.map((value, index, array) => {
            var key = value[targetkey]
            fun(result, value, key);
        });
        return result;
    }
}