import type { Component, Plugin } from 'vue'

import mountElement from './mountElement.js'

export default function mountAll(component: Component, selector: string, uses: Plugin[] | Plugin = []): Component[] {
  
    var apps: Component[] = []
  
    if (typeof document.querySelectorAll(selector)[0] !== 'undefined') {
      const els = Array.prototype.slice.call(document.querySelectorAll(selector));
      
      for (var i in els) {
        apps.push(mountElement(component, els[i], uses))
      }
    }
  
    return apps
  }