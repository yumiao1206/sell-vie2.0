// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import GoodsPage from './components/goods/goods'
import RatingsPage from './components/ratings/ratings'
import SellerPage from './components/seller/seller'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.productionTip = false

let router = new VueRouter({
	mode:'history',
	linkActiveClass:'active',
	routes:[
	{
		path: '/',
		component: App,
		redirect: 'goods',
	},
	{
		path: '/goods',
		component: GoodsPage
	},
	{
		path: '/ratings',
		component: RatingsPage
	},
	{
		path: '/seller',
		component: SellerPage
	}
	]
})
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})
