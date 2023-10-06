import loadMock from '../test/helpers/loadMock.js';

describe('mountAll', () => {
    beforeEach(async () => {
      await loadMock(page, 'basic.html');
    });
  
    it('page should be titled "Document"', async () => {
      await expect(page.title()).resolves.toMatch('Document');
    });

    it('should mount to all selected elements', async () => {

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

        window.hump.mountAll(app, '.app');

      });

      await expect(page).toMatchElement("#app-1", { text: "foo" });
      await expect(page).toMatchElement("#app-2", { text: "foo" });
      await expect(page).toMatchElement("#app-3", { text: "foo" });

    });

    it('should mount to all selected elements and provide a data prop', async () => {

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
  
          window.hump.mountAll(app, '.app');
  
        });
  
        await expect(page).toMatchElement("#app-1", { text: "bar 1" });
        await expect(page).toMatchElement("#app-2", { text: "bar 2" });
        await expect(page).toMatchElement("#app-3", { text: "bar 3" });
  
      });

      it('should mount to all selected elements and provide a JSON data prop', async () => {

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
  
          window.hump.mountAll(app, '.app');
  
        });
  
        await expect(page).toMatchElement("#app-1", { text: "baz 1" });
        await expect(page).toMatchElement("#app-2", { text: "baz 2" });
        await expect(page).toMatchElement("#app-3", { text: "baz 3" });
  
      });

    it('should mount to all selected elements and provide innerHtml as a prop', async () => {

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
  
          window.hump.mountAll(app, '.app');
  
        });
  
        await expect(page).toMatchElement("#app-1", { text: "App 1" });
        await expect(page).toMatchElement("#app-2", { text: "App 2" });
        await expect(page).toMatchElement("#app-3", { text: "App 3" });
  
      });

});