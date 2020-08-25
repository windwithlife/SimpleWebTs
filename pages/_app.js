import App, {Container} from 'next/app'
import React from 'react'
import { initializeStore } from './common/models/index'
import { Provider } from 'mobx-react'
import Layout from './common/pages/layout.js'
import AppTools from './common/tools/appTools.js'

class MyMobxApp extends App {
    static async getInitialProps(appContext) {
        // Get or Create the store with `undefined` as initialState
        // This allows you to set a custom default initialState
        const mobxStores = initializeStore()
        // Provide the store to getInitialProps of pages
        appContext.ctx.mobxGlobalStore = mobxStores
        const appTools = new AppTools(mobxStores);
    
        appContext.ctx.appTools = appTools;
        let appProps = await App.getInitialProps(appContext)

        return {
            ...appProps,
            aTools:appTools,
            initialMobxState: mobxStores
        };
    }

    constructor(props) {
        super(props)
        this.mobxGlobaleStore = initializeStore(props.initialMobxState)   
    }

    render() {

        const { Component, pageProps,aTools} = this.props
    
        //console.log("current PageComponent ClassName===>" + Component.name);    
        return (<Container>
            <Provider {...this.mobxGlobaleStore}>
                <Layout >
                    <Component {...pageProps}  {...this.mobxGlobaleStore} appTools={aTools}/>
                </Layout>
            </Provider>
        </Container>)


    }
}
export default MyMobxApp

