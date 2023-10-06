import type { Component, Plugin } from 'vue'

import mountElement from './mountElement.js'

export default function mountPrepend(component: Component, uses: Plugin[] = []): Component {
    const el = document.createElement('div')
    document.body.prepend(el)
    return mountElement(component, el, uses)
  }