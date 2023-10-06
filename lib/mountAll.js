import mountElement from './mountElement.js';
export default function mountAll(component, selector, uses = []) {
    var apps = [];
    if (typeof document.querySelectorAll(selector)[0] !== 'undefined') {
        const els = Array.prototype.slice.call(document.querySelectorAll(selector));
        for (var i in els) {
            apps.push(mountElement(component, els[i], uses));
        }
    }
    return apps;
}
