import React, { ReactChild, ReactDOM } from "react";
import { Layout } from 'antd';
import style from "./index.module.scss"
import { Menu } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;
import { useEffect, useState } from "react";
import Link from 'next/link'
import { RouteInterface, routers } from "/route/index";

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';



interface propsTypes {
    pathname: string
}

function Side(props: propsTypes) {

    // const [openKeysState, setOpenKeysState] = useState(openKeys);
    // const [selectedKeysState, setSelectedKeys] = useState(selectedKeys);
    const [hasNavigitor,setHasNavigitor] = useState(hasNavigitorFun(routers,props.pathname));

    function hasNavigitorFun(routers: Array<RouteInterface>,pathname:string):boolean{
        if(!routers || !routers.length) return true;
        for(let i=0;i<routers.length;i++){
            const currentRoute = routers[i];
            const currentRoutePathName = currentRoute.pathname;
            if(currentRoutePathName == pathname) return currentRoute.hasNavigitor;
            return hasNavigitorFun(currentRoute.children,pathname);
        }
        return true;
    }


    function getDefaultOpenKeys(routers:Array<RouteInterface>,pathname:string):string{
        if(!routers || !routers.length) return '';
        for(let i=0;i<routers.length;i++){
            const currentRoute = routers[i];
            const currentRoutePathName = currentRoute.pathname;
            if(currentRoutePathName == pathname) return currentRoutePathName;
            if(!!getDefaultOpenKeys(currentRoute.children,pathname))  return currentRoutePathName;
        }
        return '';
    }

    const handleClick = e => {
        console.log('click ', e);
    };

    function generateMenuByRouters(routes: Array<RouteInterface>): any {
        if (!routes || !routes.length) return null;

        return routes.map((route: RouteInterface) => {
            return (
                <SubMenu key={route.pathname} title={route.title}>
                {
                    !route.children ? null : (
                            route.children.map((subRoute:RouteInterface)=>{
                                return (
                                    <>
                                        <Menu.Item key={subRoute.pathname}>
                                            <Link href={subRoute.pagePath}>{subRoute.title}</Link>
                                        </Menu.Item>
                                        {
                                            generateMenuByRouters(subRoute.children)  //递归生成子菜单
                                        }
                                    </>
                                )
                            })
                        )

                }
                </SubMenu>
            )

        })
    }

    if(!hasNavigitor) return null;

    return (
        <>
            <style global jsx>{`
            .ant-layout-sider{
                background-color: #fff !important;
                height: calc(100vh - 64px)
            }
      `}</style>
            <div className={style.sider_container}>
                <Sider>
                    <Menu mode="inline"  defaultSelectedKeys={[props.pathname]} defaultOpenKeys={[getDefaultOpenKeys(routers,props.pathname)]} >
                        {
                            generateMenuByRouters(routers)
                        }
                    </Menu>
                    {/* <Menu onClick={handleClick}
                        defaultSelectedKeys={['2']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                            <Menu.ItemGroup key="g1" title="Item 1">
                                <Menu.Item key="1">Option 1</Menu.Item>
                                <Menu.Item key="2">Option 2</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="g2" title="Item 2">
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </Menu> */}
                </Sider>
            </div>
        </>
    );
}

export default Side;