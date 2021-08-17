## 开发指南

### 自定义主题
目前项目是基于antd的库做开发的。项目的主题色定制分为两部分。

1、修改antd的主题色

2、业务开发时自定义的一些颜色。
为了实现主题色的定制，我们将所有的主题相关的颜色设置为less变量，配置在next.config.js中。
业务开发中凡是涉及到颜色相关的都务必使用该文件下定义的主题色变量。这是自定义主题的关键。

### ts
由于js的无约束行，所以希望开发时尽可能是使用ts

### 统一的代码规范
为了使团队达成统一的规范，我们使用 'EditorConfig for VS Code' 这个插件对代码进行统一的风格管理。
具体的配置信息可以查看 .editorconfig

### 统一路由管理

具体信息可参考route/index.ts文件 进行页面路由配置。
主要用于web端菜单的展示与否，用于控制菜单逻辑。
所有的前端路由都必须走此处进行配置，否则会有展示问题。

### node 端日志管理

由于目前的框架是基于nextjs的，所以需要做一些服务端日志管理的问题。
目前我们是基于winston做服务端日志开发存储。业务开发时直接引入logger.ts文件即可。

日志级别分为以下几类
```
// logger.error('error');
// logger.warn('warn.');
// logger.info('info.');
// logger.http('http.');
// logger.verbose('verbose');
// logger.debug('debug.');
// logger.silly('silly');

/**
 * 针对使用console打出来的日志，我们一般都认为是系统日志，默认的我们会写入到pm2这个目录下
 * 针对使用logger打印的日志，我们认为是自定义日志，默认的我们会打印到winston这个目录下
 */

/**
 * 针对development环境下，使用logger下的各种方法只会把日志打印到console
 * 针对production,test环境下，使用looger下的error方法会把日志打印到error_log_file_path文件中，使用error warn info等方法会把日志打印到info_log_file_path中。其余不做处理
 * 针对node process unexception打印日志到exception_log_file_path
 * 针对promise Rejections打印日志到rejection_log_file_path
 * 日志记录以天为单位进行分割
 *
 * test环境是用来模拟生产环境的一个本地环境
 * 1、test环境下的日志打印地址和生产不同
 * 2、test环境下不做auth check
 */
```

### 前后端接口约定


http_request_head: http 通用请求头

request:客户端请求时payload参数对象

http_response_head: http 通用响应头

response:服务端返回参数对象。

```
{
    "http_request_head":{
        "token":"xxxx"
    },
    "request":{
        "head":{
            "vid":"generate a unique string by a javascript library",
            "version":"",
            "system_code":"which kind of application. h5、web、miniprogram、ios、android",
            "device_type":"which kind of devive. iphone、xiaomi、huawei ..."
        },
        "params":{}
    },
    "http_response_head":{
        "token":"xxxx",
        "cookie":"xxxx"
    },
    "response":{
        "status":{
            "code":200,
            "message":"success",
            "trace_id":"12345678765432"
        },
        "data":{}
    }
}
```

## Install and use
```
npm i
npm run dev
```

## deploy

Creating an optimized production build

`npm run build`

start custom server for production.

`npm start`

## nextjs’s ecology library

`@next/bundle-analyzer`
``




