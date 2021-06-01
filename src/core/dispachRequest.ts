import { transformRequest,transformResponse } from "../helpers/data";
import { processHeaders } from "../helpers/headers";
import { buildUrl } from "../helpers/url";
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "../types";
import xhr from './xhr'

export function dispachRequest(config: AxiosRequestConfig): AxiosPromise {
    processConfig(config)
    return xhr(config).then((res)=>{
        return transformResponseData(res)
    })
}

function processConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config)
    config.headers = transformHeaders(config)
    config.data = transformRequestData(config)   
}

function transformUrl(config: AxiosRequestConfig): string {
    return buildUrl(config.url as string, config.params)
}

function transformRequestData(config: AxiosRequestConfig): any {
    return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
    const { headers = {}, data } = config
    return processHeaders(headers, data)
}

function transformResponseData(res:AxiosResponse): AxiosResponse {
    res.data = transformResponse(res.data)
    return res
}