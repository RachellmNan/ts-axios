import {isDate, isPlainObject} from './utils'

export function encode(params: string): string {
    return encodeURIComponent(params)
            .replace(/%40/g,'@')
            .replace(/%3A/g,':')
            .replace(/%24/g,'$')
            .replace(/%2C/g,',')
            .replace(/%20/g,'+')
            .replace(/%5B/g,'[')
            .replace(/%5D/g,']')            
}

export function buildUrl(url: string, params?: any): string {
    if(!params){
        return url
    }
    const parts: Array<string> = []
    Object.keys(params).forEach(key=>{
        let value = params[key]
        if(!value){
            return 
        }
        if(isDate(value)){
            value = value.toISOString()
        }else if(isPlainObject(value)){
            value = JSON.stringify(value)
        }else if(Array.isArray(value)){
            key += '[]'
            value.forEach(v=>{
                parts.push(`${encode(key)}=${encode(v)}`)
            })
            return 
        }
        parts.push(`${encode(key)}=${encode(value)}`)
    })
    if(url.indexOf('#')){
        url = url.slice(0,url.indexOf('#')) 
    }
    return url.indexOf('?')===-1?url+'?'+parts.join('&'):url+parts.join('&')
}
// let a = buildUrl('/get/base?#bb', { bar: 'baz' ,foo:'[',dat:new Date(),p:['w','d'],pp:null,gg:undefined,as$:'v',sss:{name:12}});
// console.log(a)