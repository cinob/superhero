import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.serverUrl = "https://www.imovietrailer.com/superhero"
Vue.prototype.getStorage = function (key) {
  const userInfo = uni.getStorageSync(key)
  if (userInfo != null && userInfo != '' && userInfo != undefined) {
    return userInfo
  } else {
    return
  }
}

uni.request({
  url: 'http://api.cinob.cn?m=getKey',
  method: 'GET',
  success: (res) => {
    Vue.prototype.key = "qq="+res.data.key
    App.mpType = 'app'
    
    const app = new Vue({
        ...App
    })
    app.$mount()
  }
})

