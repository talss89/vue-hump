import { createApp, h } from 'vue';
import { mountAll, mountElement, mountAppend, mountPrepend } from '../../../lib/index.js';

window.vue = { createApp, h };
window.hump = { mountAll, mountElement, mountAppend, mountPrepend };

window.testStore = {
    install(app, options) {
        app.provide('testStore', options?.msg ?? 'Hello');
    }
  }

window.anotherTestStore = {
    install(app, options) {
        app.provide('anotherTestStore', options?.msg ?? 'Another');
    }
  }