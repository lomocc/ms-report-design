/**
 * Created by vincent on 2016/4/22.
 */
export default class DisplayUtil {
    static appendChild(parent, childOrChildren) {
        if (parent == undefined || childOrChildren == undefined)
            return;
        if (typeof childOrChildren == 'string' || typeof childOrChildren == 'number') {
            parent.innerText = childOrChildren;
        } else if (Array.isArray(childOrChildren)) {
            childOrChildren.forEach((child)=> {
                (child != undefined) && parent.appendChild(child);
            })
        } else {
            parent.appendChild(childOrChildren);
        }
    }

    static createElement(type, props, children) {
        var element = document.createElement(type);
        for (var i in props) {
            if(props.hasOwnProperty(i) && props[i] != undefined)
                element.setAttribute(i, props[i]);
        }
        DisplayUtil.appendChild(element, children);
        return element;
    }

    static removeChild(parent, childOrChildren) {
        if (parent == undefined)
            return;
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
}