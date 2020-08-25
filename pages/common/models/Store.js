import { action, observable } from 'mobx'



class Store {
  @observable lastUpdate = 0
  @observable light = false
  @observable statusInfo = 'test'

  constructor () {
    //this.lastUpdate = initialData.lastUpdate != null ? initialData.lastUpdate : Date.now()
    this.light = !this.light
  }

  @action start = () => {
      var that = this;
      console.log("test");
      this.timer = setInterval(() => {
      that.lastUpdate = Date.now();
      console.log(that.lastUpdate);
    }, 1000)
    
  }

  updateHeader = (message) => {
      console.log(message);
      this.statusInfo = message;
  }
  stop = () => clearInterval(this.timer)
}

export default Store;
