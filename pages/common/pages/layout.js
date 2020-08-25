import Head from 'next/head'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import router from 'next/router';
import { inject, observer } from 'mobx-react'
import '../styles/styles.less'
import XLayout from './layout_base';
import PLayout from './layout_project';

@inject('appStore') @observer
export default class MyLayout extends React.Component{
    render(){

        let layoutName = this.props.appStore.layoutName;
        console.log("In Layout Render function with layout name===>" + layoutName);
        let LayoutComponent =  XLayout;
        if (layoutName == 'default'){
            LayoutComponent = XLayout;
        }else{
            LayoutComponent = PLayout;
        }
        return( <LayoutComponent app={this.props.appStore}>{this.props.children}</LayoutComponent>);
    }
}

MyLayout.getInitialProps = async function(context){
    return {query:context.query};
}
