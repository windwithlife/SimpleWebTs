import {RouteInterface} from "./index";

const module_mange_module: RouteInterface = {
    "pathname": "module_manage",
    "pagePath": "/module/manage",
    "hasNavigitor": true,
    "title": "模块管理",
    "children": [{
        "pathname": "/module/manage",
        "pagePath": "/module/manage",
        "hasNavigitor": false,
        "title": "首页",
    },{
        "pathname": "/module/manage/menu_power_set",
        "pagePath": "/module/manage/menu_power_set",
        "title": "菜单权限设置",
        "hasNavigitor": true,
    }, {
        "pathname": "/module/manage/operate_power_set",
        "pagePath": "/module/manage/operate_power_set",
        "title": "操作权限设置",
        "hasNavigitor": true,
        "children":[{
            "pathname": "three_level",
            "pagePath": "/module/manage/operate_power_set",
            "title": "三级菜单标题",
            "hasNavigitor": true,
            children:[{
                "pathname": "three_level_sub",
                "pagePath": "/module/manage/operate_power_set",
                "title": "三级菜单",
                "hasNavigitor": true,
            }]
        }]
    }]
}

export default module_mange_module;