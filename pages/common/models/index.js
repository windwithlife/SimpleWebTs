import { useStaticRendering } from 'mobx-react';
import Store from './Store';
import AppStore from "./AppStore";
import ObjectTools from "../tools/objectTools"

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)
class ModelX{
    y=33
}
class Test{
    constructor(){
        this.model = new ModelX();
    }
}
let stores = null;
function composeStores(initialData){
    let store = new Store()
    let appStore = new AppStore();
    //let tablesStore = new TableStore();
    //let userStore = new UserStore(appStore);
    //let test = new Test();
    //userStore = ObjectTools.deepMerge(new UserStore(appStore),test);
    //console.log(userStore);
    //let authStore = new AuthStore(appStore);
    if (initialData){
        store = ObjectTools.deepMerge(new Store(),initialData.store);
        appStore = ObjectTools.deepMerge(new AppStore(),initialData.appStore);
        //tablesStore = ObjectTools.deepMerge(new TableStore(),initialData.tablesStore);
        //console.log(userStore);
        //console.log(initialData.userStore)
        //userStore = Object.assign(new UserStore(appStore),{},initialData.userStore);
        //userStore = ObjectTools.deepMerge(new UserStore(appStore),initialData.userStore);
        //authStore = ObjectTools.deepMerge(new AuthStore(appStore),initialData.userStore);
        //console.log(userStore);
       
    }
    stores = {
        store,
        appStore
        //tablesStore,
        //userStore
        
    }

    return stores;
   
   /*  const authStore = new AuthStore(authApi, appStore);
    const postsStore = new PostsStore(postApi, appStore, authStore);
    const commentsStore = new CommentsStore(commentApi, appStore, authStore);
    const uiStore = new UIStore();*/ 

    
}



export function initializeStore (initialData) {
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        return composeStores(initialData);
    }else{
        if (stores === null) {
           stores = composeStores(initialData)
           console.log("initialize stores!!!")
        }
        return stores;
    }
}


