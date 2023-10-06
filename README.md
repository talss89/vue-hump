# vue-hump

Tiny utility to mount Vue 3 apps into existing markup. Supports passing props via HTML attributes, without using the template compiler.

This is useful when using Vue to augment a traditional server-side application, like WordPress.


## Getting Started

Simply install via NPM, or your favourite package manager:

`npm i vue-hump`

Then import the ES module:

`import { mountAll } from 'vue-hump';`

## Examples

### Simple Example

We can mount a fictional component `LikeCounter` to all `.like-counter` elements:

```html
<div class="like-counter"></div>
```

```js
import { mountAll } from 'vue-hump';
import LikeCounter from 'LikeCounter.vue';

mountAll(LikeCounter, '.like-counter');
```

### Passing Props via `data-*`

We could pass an ID or any number of other properties to our fictional `LikeCounter`. All we need to do is set a `data-*` attribute on the element, and the prop will be available to Vue:

```html
<div class='like-counter' data-content-id='500'></div>
```

`contentId` is now available as a prop in the component. 

### Passing JSON objects as props via `data-*:json`

We can also pass a JSON object as a `data-*` prop, by using the special syntax `:json`:

```html
<div class='like-counter' data-my-object:json='{"foo": "bar"}'></div>
```

`myObject` is now available as a prop in the component, and is an object.

### Accessing inner HTML content

Inner html content is automatically exposed as the `inner` property.

```html
<div class="like-counter">This text will be available as a string on the `inner` prop!</div>
```

### Loading Vue plugins

You can pass an array of plugins as an optional last parameter to any of the `mount` functions:

```js
import { mountAll } from 'vue-hump';
import MyPlugin from 'my-plugin';
import LikeCounter from 'LikeCounter.vue';

mountAll(LikeCounter, '.like-counter', MyPlugin);
```

... Or pass plugin options via a nested array:

```js
import { mountAll } from 'vue-hump';
import MyPlugin from 'my-plugin';
import LikeCounter from 'LikeCounter.vue';

mountAll(LikeCounter, '.like-counter', [[MyPlugin, {myOption: true, otherOption: false}]);
```

... Or multiple plugins (with or without options!)

```js
import { mountAll } from 'vue-hump';
import MyPlugin from 'my-plugin';
import MyOtherPlugin from 'my-other-plugin';
import LikeCounter from 'LikeCounter.vue';

mountAll(LikeCounter, '.like-counter', [MyOtherPlugin, [MyPlugin, {myOption: true, otherOption: false}]);
```

## API

### mountAll

**Mounts a Vue component to all elements matching a selector.**

```ts
function mountAll(component: Component, selector: string, uses: Plugin[] | Plugin = []): Component[]
```

> #### **`component: Component`**
> Your Vue component object.

> #### **`selector: string`**
> A DOM selector string to target elements. If more than one match is found, a new instance will be created for each.

> #### **`uses: Plugin[] | Plugin = []`**
> A single Vue plugin, or array of Vue plugin objects. If you need to pass options to the plugins, you can use a nested array. For example: `[[MyPlugin, {myOption: true, otherOption: false}], MyOtherPlugin, ...]`

### mountElement

**Mounts a Vue component to a single HTML element.**

```ts
function mountElement(component: Component, el: HTMLElement, uses: Plugin[] | Plugin = []): Component
```

> #### **`component: Component`**
> Your Vue component object.

> #### **`el: HTMLElement`**
> Your `HTMLElement` to mount the component to.

> #### **`uses: Plugin[] | Plugin = []`**
> A single Vue plugin, or array of Vue plugin objects. If you need to pass options to the plugins, you can use a nested array. For example: `[[MyPlugin, {myOption: true, otherOption: false}], MyOtherPlugin, ...]`