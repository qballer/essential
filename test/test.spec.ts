import puppeteer from "puppeteer";
import {generateComponent} from '../source/generate-component'
import {pathToFileURL } from 'url'

(async function testRender() {
    console.log('yo')
    const name = 'temp'
    console.log('dir', __dirname)
    generateComponent( name, '<div id="test">hello world</div>')
    const width = 1920;
    const height = 1080;

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: [`--window-size=${width},${height}`]
    });
    const url = pathToFileURL(`./temp/index.html`);
    console.log('url', url.toString())
    const page = await browser.newPage()
    await page.setViewport({ width, height })
    
    try {
        await page.goto(url.toString())
        await page.waitForSelector('#test')
    }catch(e) {
        console.log(e)
        browser.close()
        process.exit(1)
    }
    browser.close()
})()

