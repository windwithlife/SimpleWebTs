/**
 * 项目对应所有接口
 * （根据业务域来分类）
 *  对应的接口，请放在对应的业务域中。对应的业务域中，可以在划分子域
 */

import { AxiosRequestConfig } from 'axios';
import Sample from "./sample";
const baseURLConfig = {
    production:"http://rap2api.taobao.org",
    development:"http://rap2api.taobao.org",
}

class Api {
    public sample: Sample;

    public constructor(config?: AxiosRequestConfig) {
        this.sample = new Sample(config);
    }
}


export default new Api({
    baseURL:baseURLConfig[process.env.NODE_ENV],
    timeout: 2000,
});
