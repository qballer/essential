import { Options } from "./options";
import {format} from 'prettier'

export function renderHtmlToString(options:Options) {
    return format(
        `<html>
        <head></head>
        <body>
            <x-${options.name}></x-${options.name}>
            <script src="./${options.name}.cmp.mjs" type="module"></script>
        </body>
        </html>`, {semi:false, parser:'html'})
}