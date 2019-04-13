import fs from 'fs'
import { resolve } from 'path'
import { Options } from './options';
import { renderJS } from './render-js';
import { renderHtmlToString } from './render-html';

export function generateComponent(name:string, innerHTML:string) {
    const dir = resolve(process.cwd(), `./${name}`)
    
    if (fs.existsSync(dir)) {
        console.log('Already generated.')
        return
    }
    const options:Options = {
        name,
        innerHTML,
        dir,
        htmlPath: `./${name}/index.html`,
        jsPath: resolve(process.cwd(), `./${name}/${name}.cmp.mjs`),
    }
    const html = renderHtmlToString(options)
    const js = renderJS(options)
    
    fs.mkdirSync(options.dir)
    fs.writeFileSync(options.htmlPath, html)
    fs.writeFileSync(options.jsPath, js)
}