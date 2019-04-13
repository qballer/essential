import {format} from 'prettier'

export function pretty(source: string) {
    return format(source, { semi:false, parser: 'babel' })
}