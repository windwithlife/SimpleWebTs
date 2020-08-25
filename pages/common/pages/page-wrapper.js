import React, { Component } from 'react'
import { Provider, inject } from 'mobx-react'
import ObjectTools from '../tools/objectTools'
import PageRouter from './page-router'


export default (WrappedComponent, Store) => {

  console.log('Now is loading Page===>' + WrappedComponent.name)
  class NewComponent extends Component {
    constructor(props) {
      super(props)
      //console.log(this.props.initialMobxState)

      if (this.props.isSSR){
        this.mobxStore = ObjectTools.deepMerge(new Store(), this.props.initialMobxState);
        this.mobxStore.appStore = this.props.appStore;
      }else{
        this.mobxStore = this.props.initialMobxState
      }
      if (this.props.isSSR){console.log('First Screen is SSR......')}else{console.log('First Screeen is CSR......')}


      this.pageRouter = new PageRouter();
    }
    componentWillMount() {
      //let username = localStorage.getItem('username');
    }

    render() {
      //const {pageProps} = this.props
      return (
        <Provider mobxStore={this.mobxStore}>
          <WrappedComponent pageRouter={this.pageRouter} />
        </Provider>
      )
    }
    /**************************************************** */
    ///init getInitialProps
    static async getInitialProps(appContext) {
      //console.log('wrapped page appContext')
      const mobxStore = new Store();
      console.log('initialize mobxStore with ClassName===>' + WrappedComponent.name)
      mobxStore.appStore = appContext.mobxGlobalStore.appStore;
      appContext.mobxStore = mobxStore;
      WrappedComponent.getInitialProps(appContext);
      const isServer = typeof window === 'undefined'
      return {
        isSSR : isServer,
        initialMobxState: mobxStore
      };
    }
  }
  return NewComponent
}