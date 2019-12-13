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
Vue.prototype.key = "qq=lee19465392"
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
