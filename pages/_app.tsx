import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import "antd/dist/antd.less"
import { Layout } from 'antd';
const { Content } = Layout;

import Header from "layouts/Header/index"
import Sider from "/layouts/Sider/index"

Router.events.on("routeChangeStart", (url) => {
    console.log(`Loading: ${url}`);
    document.body.classList.add("body-page-transition");
    ReactDOM.render(
        <div>loading...</div>,
        document.getElementById("page-transition")
    );
});
Router.events.on("routeChangeComplete", () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
    document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
    document.body.classList.remove("body-page-transition");
});

interface MyProps {
    Component: {
        layout: any;
    };
    pageProps:any,
    pathname:any
}

interface MyState {}


export default class MyApp extends App<MyProps, MyState> {

    static async getInitialProps({ Component, router, ctx }) {
        const { pathname } = ctx;

        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return {
            pageProps,
            pathname,
        };
    }
    render() {
        const { Component, pathname, pageProps } = this.props;

        return (
            <React.Fragment>

                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    <title>CMS管理平台</title>
                </Head>

                <>
                    <Header></Header>
                    <Layout>
                        <Sider pathname={pathname}></Sider>
                        <Content style={{ padding: "20px" }}>
                            <Component {...pageProps} />
                        </Content>
                    </Layout>
                </>

            </React.Fragment>
        );
    }
}
