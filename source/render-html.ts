import { Options } from "./options";
import { pretty } from "./pretty";

export function renderHtmlToString(options:Options) {
    return pretty(
        `<html>
        <head></head>
        <body>
            <x-${options.name}></x-${options.name}>
            <script src="./${options.name}.cmp.mjs" type="module"></script>
        </body>
        </html>`)
}