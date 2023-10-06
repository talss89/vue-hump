import loadMock from '../test/helpers/loadMock.js';

describe('mountElement', () => {
    beforeEach(async () => {
      await loadMock(page, 'basic.html');
    });
  
    it('page should be titled "Document"', async () => {
      await expect(page.title()).resolves.toMatch('Document');
    });

    it('should mount to single element', async () => {

      await page.evaluate(() => {
        const app = {
          props: ['foo'],
          data() {
            return {}
          },
          render() {
            return window.vue.h('div', 'foo');
          }
        };

        window.hump.mountElement(app, document.getElementById('app-1'));

      });

      await expect(page).toMatchElement("#app-1", { text: "foo" });

    });

    it('should mount and pass prop to single element', async () => {

      await page.evaluate(() => {
        const app = {
          props: ['foo'],
          data() {
            return {}
          },
          render() {
            return window.vue.h('div', this.$props.foo);
          }
        };

        window.hump.mountElement(app, document.getElementById('app-1'));

      });

      await expect(page).toMatchElement("#app-1", { text: "bar 1" });

    });

    it('should mount and pass a kebab-case attribute as a camel-case prop to single element', async () => {

      await page.evaluate(() => {
        const app = {
          props: ['camelCase'],
          data() {
            return {}
          },
          render() {
            return window.vue.h('div', this.$props.camelCase);
          }
        };

        window.hump.mountElement(app, document.getElementById('app-1'));

      });

      await expect(page).toMatchElement("#app-1", { text: "camel 1" });

    });

    it('should mount and pass JSON object prop to single element', async () => {

      await page.evaluate(() => {
        const app = {
          props: ['obj'],
          data() {
            return {}
          },
          render() {
            return window.vue.h('div', this.$props.obj.bar);
          }
        };

        window.hump.mountElement(app, document.getElementById('app-1'));

      });

      await expect(page).toMatchElement("#app-1", { text: "baz 1" });

    });

    it('should provide the innerHtml as a prop', async () => {

      await page.evaluate(() => {
        const app = {
          props: ['inner'],
          data() {
            return {}
          },
          render() {
            return window.vue.h('div', this.$props.inner);
          }
        };

        window.hump.mountElement(app, document.getElementById('app-1'));

      });

      await expect(page).toMatchElement("#app-1", { text: "App 1" });

    });

    it('should load Vue plugins', async () => {

      await page.evaluate(() => {
        const app = {
          inject: ['testStore'],
          data() {
            return {}
          },
          render() {
            return window.vue.h('div', this.testStore);
          }
        };

        window.hump.mountElement(app, document.getElementById('app-1'), window.testStore);

      });

      await expect(page).toMatchElement("#app-1", { text: "Hello" });

    });

    it('should load an array of Vue plugins', async () => {

      await page.evaluate(() => {
        const app = {
          inject: ['testStore', 'anotherTestStore'],
          data() {
            return {}
          },
          render() {
            return window.vue.h('div', this.testStore + this.anotherTestStore);
          }
        };

        window.hump.mountElement(app, document.getElementById('app-1'), [window.testStore, window.anotherTestStore]);

      });

      await expect(page).toMatchElement("#app-1", { text: "HelloAnother" });

    });

    it('should load an array of Vue plugins with their options', async () => {

      await page.evaluate(() => {
        const app = {
          inject: ['testStore', 'anotherTestStore'],
          data() {
            return {}
          },
          render() {
            return window.vue.h('div', this.testStore + this.anotherTestStore);
          }
        };

        window.hump.mountElement(app, document.getElementById('app-1'), [[window.testStore, {msg: 'foo'}], [window.anotherTestStore, {msg: 'bar'}]]);

      });

      await expect(page).toMatchElement("#app-1", { text: "foobar" });

    });

  });

