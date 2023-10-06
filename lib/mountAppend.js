import mountElement from './mountElement.js';
export default function mountAppend(component, uses = []) {
    const el = document.createElement('div');
    document.body.appendChild(el);
    return mountElement(component, el, uses);
}
