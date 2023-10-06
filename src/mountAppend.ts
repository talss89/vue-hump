import type { Component, Plugin } from 'vue'

import mountElement from './mountElement.js'

export default function mountAppend(component: Component, uses: Plugin[] = []): Component {
    const el = document.createElement('div')
    document.body.appendChild(el)
    return mountElement(component, el, uses)
  }
