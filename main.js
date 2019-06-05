import Vue from 'vue'
import App from './App'
// import './assets/font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false

Vue.prototype.getGlobalUser = (key)=>{
	 let userInfo = uni.getStorageSync('globalUser');
	 if (userInfo != null && userInfo != "" && userInfo != undefined) {
	 	return userInfo;
	 } else {
	 	return null;
	 }
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
