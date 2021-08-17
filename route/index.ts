/**
 * pathname:页面客户端path.  一定要确保pathname的唯一性 否则会bug
 * pagePath:页面在pages目录下的路径
 * hasNavigitor:是否展示导航栏 默认是展示的; 该参数只有一级路由生效。
 * title:""
 * children：对应的子项
 */

import module_mange from "./module_mange";
import tenant_mange from "./tenant_mange";

export interface RouteInterface {
    pathname: string,
    pagePath?: string,
    hasNavigitor?: boolean,
    "title"?: string,
    children?: Array<RouteInterface>;
}



export const routers: Array<RouteInterface> = [
    module_mange,
    tenant_mange
]



