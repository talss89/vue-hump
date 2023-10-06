import loadMock from '../test/helpers/loadMock.js';

describe('mountPrepend', () => {
    beforeEach(async () => {
      await loadMock(page, 'basic.html');
    });
  
    it('page should be titled "Document"', async () => {
      await expect(page.title()).resolves.toMatch('Document');
    });

    it('should mount and prepend to the document body', async () => {

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

        window.hump.mountPrepend(app);

      });

      await expect(page).toMatchElement("body > :first-child", { text: "foo" });

    });

});