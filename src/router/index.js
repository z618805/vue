import Vue from 'vue'
import Router from 'vue-router'
//备课首页
import prepare_index from '@/components/prepare/index'
//添加教材
import add from '@/components/prepare/add'
//播放微课
import prepare_vid from '@/components/prepare/vid'
//播放pdf
import prepare_pdf from '@/components/prepare/pdf'
//备课统计
import prepare_statistics from '@/components/prepare/statistics'
//资源审核
import prepare_audit from '@/components/prepare/audit'
////本校资源
//import resource_index from '@/components/resource/index'
////总校资源
//import resource_sum from '@/components/resource/sum'
//登录
import login from '@/components/pages/login'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/prepare_index',
			name: 'prepare_index',
			component: prepare_index,
			meta: {
				keepAlive: true,
				isBack: false,
				title: '云备课-首页',
			}
		},
		{
			path: '/prepare_pdf',
			name: 'prepare_pdf',
			component: prepare_pdf,
			meta: {
				keepAlive: true,
				isBack: false,
				title: '云备课-预览资源',
			}
		},
		{
			path: '/prepare_statistics',
			name: 'prepare_statistics',
			component: prepare_statistics,
			meta: {
				keepAlive: true,
				isBack: false,
				title: '云备课-备课统计',
			}
		},
		{
			path: '/prepare_audit',
			name: 'prepare_audit',
			component: prepare_audit,
			meta: {
				keepAlive: true,
				isBack: false,
				title: '云备课-资源审核',
			}
		},
//		{
//			path: '/resource_index',
//			name: 'resource_index',
//			component: resource_index,
//			meta: {
//				keepAlive: true,
//				isBack: false,
//				title: '资源库-本校资源',
//			}
//		},
//		{
//			path: '/resource_sum',
//			name: 'resource_sum',
//			component: resource_sum,
//			meta: {
//				keepAlive: true,
//				isBack: false,
//				title: '资源库-总校资源',
//			}
//		},
		{
			path: '/login',
			name: 'login',
			component: login,
			meta: {
				keepAlive: true,
				isBack: false,
				title: '登录',
			}
		}
	],
	scrollBehavior(to, from, savedPosition) {
		if(savedPosition) {
			return savedPosition
		} else {
			if(from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop
			}
			return {
				x: 0,
				y: to.meta.savedPosition || 0
			}
		}
	},
})