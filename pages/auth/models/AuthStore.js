import { observable, action } from "mobx";
import BaseStore from '../../common/models/BaseStore.js'
class AuthStore extends BaseStore{
  appStore;
  @observable userId =  '123' //sessionStorage.getItem("userId");
  @observable username = 'joe' //sessionStorage.getItem("username") || "jack";
  @observable password = "123456";
  @observable nickname = "nick"

  constructor(appStore) {
    super('user')
    this.appStore = appStore;
    console.log('initialize mobxstore')
  }

  @action setUsername(username) {
    this.username = username;
  }

  @action setPassword(password) {
    this.password = password;
  }

   register(cb) {
    let that = this;
    let params = {};
    params.username = this.username;
    params.password = this.password;
    params.nickname = this.nickname;
    //console.log(params)
    that.appStore.startRequest();
    this.model.postRaw('user/register',params, function(response) {
      console.log(response)
      that.appStore.finishRequest();
      if (response && (response.data.code==0)) {
          console.log(response.data);
          cb();
      }else{
        that.setPageStatus(response.data.msg);
        console.log(response.data.msg)
      }
  })
  }
  @action login(callback) {
    let that = this;
    this.appStore.increaseRequest();
    const params = { username: this.username, password: this.password }; 
    that.appStore.startRequest();
    this.model.postRaw('user/login',params, action(function(response) {
      that.appStore.finishRequest();
      if (!response){
         that.setPageStatus("network has exception!");
      }
      if (response.data.code==0) {
          console.log(response.data);
          that.setPageStatus(response.data.data);
          sessionStorage.setItem("token", response.data.data);
          sessionStorage.setItem("username", that.username);
          callback();
        
      }else{
        that.setPageStatus(response.data.msg);   
      }
    }))
  }

  //@action.bound logout() {
  @action logout() {
    this.userId = undefined;
    this.username = 'jack';
    this.password = '123456';
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
  }
  
}

export default AuthStore;
