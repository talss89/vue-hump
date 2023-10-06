import { createApp } from 'vue'
import type { Component, Plugin } from 'vue'

interface DatasetAttributes {
    [key: string]: any;
}

export default function mountElement(component: Component, el: HTMLElement, uses: Plugin[] | Plugin = []): Component {
  var atts: DatasetAttributes = {  ...el.dataset }

  Object.keys(atts).forEach((name) => {
    
    if(name.indexOf(':json') !== -1) {
      atts[name] = JSON.parse(atts[name]);
      atts[name.replace(':json', '')] = atts[name];
      delete atts[name];
    }
  });

  const innerHtml = el.innerHTML
  delete(atts.vApp)

  if(typeof atts.inner === 'undefined') {
    atts.inner = innerHtml
  }

  const app = createApp(component, atts)

  if(!Array.isArray(uses)) {
    uses = [uses];
  }

  uses.forEach((plugin: Plugin | [Plugin, any]) => {
    if(Array.isArray(plugin) && plugin.length === 2) {
      app.use(plugin[0], plugin[1])
    } else {
      app.use(plugin)
    }
  })

  return app.mount(el)
}