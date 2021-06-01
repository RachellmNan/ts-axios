import { isPlainObject } from "./utils";

export function normalizeHeaderName(headers: any, normalizeName: string): void {
    if(!headers){
        return 
    }
    Object.keys(headers).forEach(name=>{
        if(name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()){
            headers[normalizeName] = headers[name]
            delete headers[name]
        }
    })
}

export function processHeaders(headers: any, data: any): any {
    // 使Content-Type为统一写法
    normalizeHeaderName(headers,'Content-Type') 
    if(isPlainObject(data)){
        if(headers && !headers['Content-Type']){
            headers['Content-Type'] = 'application/json;charset=utf-8'
        }
    }
    return headers
}

export function parseHeaders(headers: string): any {
    let parse = Object.create(null)
    if(!headers){
        return
    }
    headers.split('\r\n').forEach(line=>{
        let [key, val] = line.split(':')
        if(!key){
            return
        }
        key=key.trim().toLowerCase()
        if(val){
            val= val.trim().toLowerCase()
        }
        parse[key] = val
    })
    return parse    
}