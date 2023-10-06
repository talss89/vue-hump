
import fs from 'fs';
import path from 'path';

export default async function loadMock(page, name) {
    const html = fs.readFileSync(path.join('mock/', name), 'utf-8');

    await page.setContent(html);
    await page.addScriptTag({
        path: 'test/bundle/build/js/runtime.js'
    });
    await page.addScriptTag({
        path: 'test/bundle/build/js/shim.js'
    });

}