import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { getVid, h5OrWeb, judgeBrand } from "/utils/index"


export interface IServiceResponse<T> extends AxiosResponse<T> {
    $status: {
        code: number;
        message: string;
        trace_id: string;
    };
    $data: T;
}

/**
 * 接口返回类型
 */
export declare type IServicePromise<T = any> = Promise<IServiceResponse<T>>;

export default class ApiService {
    protected request: AxiosInstance;
    constructor(config?: AxiosRequestConfig) {
        this.request = axios.create(config);

        this.request.interceptors.request.use(function (config) {
            if (config.method == 'post') {
                config.data.header = {
                    vid: getVid(),
                    version: "2021-08-16",
                    system_code: h5OrWeb(),
                    device_type: judgeBrand()
                }
                return config;
            } else return config;
        }, function (error) {
            return Promise.reject(error);  // Do something with request error
        });

        this.request.interceptors.response.use(function (response) {
            console.log('response: ', response);
            return response;
        }, function (error) {
            // Do something with response error
            return Promise.reject(error);
        });
    }
    get<T = any>(url: string, config?: AxiosRequestConfig) {
        const promise = this.request.get(url, config) as any;
        return promise as IServicePromise<T>;
    }
    post<T = any>(url: string, data: any, config?: AxiosRequestConfig) {
        const promise = this.request.post(url, data, config) as any;
        return promise as IServicePromise<T>;
    }
}