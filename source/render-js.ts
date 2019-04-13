import { Options } from "./options";
import { pretty } from "./pretty";

export function renderJS(options: Options) {
    return pretty(`
        const template = document.createElement('template')
        template.innerHTML = ${options.innerHTML}

        class X${casing(options.name)} extends HTMLElement {
            constructor() {
                super()
                this.root = this.attachShadow({ mode: 'open'})
                this.root.appendChild(template.content.cloneNode(true))
            }
        }
        
        customElements.define('x-${options.name}', X${casing(options.name)})`
    )
}

export function casing(toChange: string) {
    return toChange.trim().charAt(0).toUpperCase() + toChange.slice(1)
}