import puppeteer from "puppeteer"
import {generateComponent} from '../source/generate-component'
import execa from 'execa'

(async function testRender() {
    const server = execa.shell('python -m SimpleHTTPServer 8000', {})
    const width = 1920
    const name = 'temp'
    const height = 1080    
    generateComponent( name, '<div id="test">hello world</div>')

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: [`--window-size=${width},${height}`, '--allow-file-access-from-files']
    })
    const url = `http://localhost:8000/${name}/`
    console.log('url', url)
    const page = await browser.newPage()
    await page.setViewport({ width, height })
    
    try {
        await page.goto(url.toString(), {})
        await page.waitForSelector('x-temp', { visible: true})
        const result = await page.evaluateHandle(`document.querySelector("body > x-temp").shadowRoot.querySelector("#test").innerHTML`)
        const text = await result.jsonValue()
        if (text !== 'hello world') {
            throw 'test fails'
        }
        console.log('test pass!')
    } catch(e) {
        console.log(e)
        browser.close()
        server.kill()
        process.exit(1)
    }
    server.kill()
    browser.close()
})()

