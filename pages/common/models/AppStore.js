import { observable, computed, action } from "mobx";
import BaseStore from './BaseStore.js'
class AppStore extends BaseStore{
  @observable requestQuantity = 0
  @observable error = 'testerror'
  @observable layoutName = 'default'
  @observable isLoading = false
  @observable headTitle = '标题'

  constructor () {
    super('app')
  }

  // 当前进行的请求数量加1
  @action setLayout(name) {
    if (name){
       this.layoutName =name;
    }  
  }
  @action setHeadTitle(title) {
    if (title){
       this.headTitle =title;
    }  
  }
  // 当前进行的请求数量加1
  @action increaseRequest() {
    this.requestQuantity ++;
  }

  // 当前进行的请求数量减1
  @action decreaseRequest() {
    if(this.requestQuantity > 0)
      this.requestQuantity --;
  }
  // 当前进行的请求数量加1
  @action startRequest() {
    this.isLoading = true;
  }
  @action finishRequest() {
    this.isLoading = false;
  }
  

  // 设置错误信息
  @action setError(error) {
    this.error = error;
  }

  @action removeError() {
    this.error = '';
  }
  
} 

export default AppStore;

