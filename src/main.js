// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.prototype.$http = axios;
Vue.prototype.$hosh = 'http://47.104.173.17:9002/evaluate';
import './assets/css/index.css'
import './assets/js/index.js'
Vue.use(ElementUI);
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面meta */
	/* 路由发生变化修改页面title */
	if(to.meta.title) {
		document.title = to.meta.title;
	}
	next()
});
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})