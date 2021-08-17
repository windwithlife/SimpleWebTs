
import {RouteInterface} from "./index";

const tenant_mange_module: RouteInterface = {
    "pathname": "tenant_manage",
    "pagePath": "/tenant/manage",
    "hasNavigitor": true,
    "title": "商户管理",
    "children": [{
        "pathname": "/tenant/manage",
        "pagePath": "/tenant/manage",
        "hasNavigitor": true,
        "title": "首页",
    },{
        "pathname": "/tenant/manage/module_config",
        "pagePath": "/tenant/manage/module_config",
        "title": "模块配置",
        "hasNavigitor": true
    }]
}

export default tenant_mange_module;