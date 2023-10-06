import mountElement from './mountElement.js';
export default function mountPrepend(component, uses = []) {
    const el = document.createElement('div');
    document.body.prepend(el);
    return mountElement(component, el, uses);
}
