import { Options } from "./options";
import {format } from "prettier";

export function renderJS(options: Options) {
    return format(`
        const template = document.createElement('template')
        template.innerHTML = '${options.innerHTML}'

        class X${casing(options.name)} extends HTMLElement {
            constructor() {
                super()
                this.root = this.attachShadow({ mode: 'open'})
                this.root.appendChild(template.content.cloneNode(true))
            }
        }
        
        customElements.define('x-${options.name}', X${casing(options.name)})`,
        {semi:false, parser: 'babel'}
    )
}

export function casing(toChange: string) {
    return toChange.trim().charAt(0).toUpperCase() + toChange.slice(1)
}