<template>
	<div id="app">
		<el-container>
			<el-header v-show="!(path==='/prepare_vid'||path==='/prepare_pdf'||path==='/resource_index'||path==='/resource_sum'||path==='/login')">
				<el-row>
					<el-col :span="12" class="el-header-top">
						<div><img src="./assets/images/logo.png" class="el-header-img" /></div>
						<div><img src="./assets/images/bei.png" class="el-header-img1" /></div>
						<div class="el-header-xian"></div>
						<div :class="{ellan:dianji==index}" class="cursor" @click="wode(list.html,index)" v-for="(list,index) in html" :key="index" style="margin-left: 1rem;">{{list.name}}</div>
					</el-col>
					<el-col :span="12" class="el-header-top1">
						<div class="cursor cor-hui xiao-size">
							<el-popover placement="bottom" title="" width="" trigger="click">
								<el-button @click="tui">退出登录</el-button>
								<span slot="reference">{{mingzi}}</span>
							</el-popover>
						</div>
						<div class="zhin">
							<el-avatar :src="imgsd" style="margin-top: .3rem;"></el-avatar>
						</div>
					</el-col>
				</el-row>
			</el-header>
			<el-container>
				<el-main :class="{xiang:iku==true}">
					<keep-alive v-if="$route.meta.keepAlive">
						<router-view></router-view>
					</keep-alive>

					<router-view v-if="!$route.meta.keepAlive"></router-view>
				</el-main>
			</el-container>
			<el-footer v-show="!(path==='/login')">技术支持：米学基教（北京）科技有限公司</el-footer>
		</el-container>
	</div>
</template>

<script>
	import { UsercenterGetInfo, MenuTreeByUser, UserLogout } from '@/api/home'
	export default {
		data() {
			return {
				div1: false,
				path: '',
				iku: true,
				dianji: '',
				mingzi: '',
				imgsd: '',
				firstPlayFlag: true,
				prepare_audit: false,
				prepare_statistics: false,
				prepare_index: false,
				html: []
			}
		},
		watch: {
			$route(to, form) {
				this.path = to.path
				if(this.path == '/prepare_vid' || this.path == '/prepare_pdf' || this.path == '/login') {
					this.iku = false
				} else {
					this.iku = true
				}
			}
		},
		methods: {
			wode(s, k) {
				this.dianji = k;
				this.$router.push({
					path: s,
				})
			},
			leix() {
				let that = this
				UsercenterGetInfo().then((res) => {
					if(res.data.data.roleType == 'teacher') {
						that.mingzi = res.data.data.teacher.name
						that.imgsd = res.data.data.teacher.headPhotoUrl
					} else {
						that.mingzi = res.data.data.school.name
						that.imgsd = ''
					}
					localStorage.setItem("schoolId", res.data.data.schoolId)
				}).catch(() => {

				})
			},
			quanxian() {
				let that = this
				let params = {
					'appCode': 'YUNBAK',
					"parentId": 0
				}
				if(localStorage.getItem('YUNBAK') == undefined && localStorage.getItem('YUNBAK') == null) {
					MenuTreeByUser(params).then((res) => {
						that.html = res.data.data
						localStorage.setItem("YUNBAK", JSON.stringify(res.data.data))
						if(window.location.href.indexOf('resource_details') == -1) {
							that.dianji = 0;
							that.$router.push({
								path: res.data.data[0].html,
							})
						}
					}).catch(() => {

					})
				} else {
					that.html = JSON.parse(localStorage.getItem('YUNBAK'))
					if(window.location.href.indexOf('/prepare_pdf') == -1) {
						that.dianji = 0;
						that.$router.push({
							path: that.html[0].html
						})
					}
				}
			},
			tui() {
				let that = this
				UserLogout().then((res) => {
					localStorage.clear();
					window.location.href = "http://eva.51xueming.com/#/login";
				}).catch(() => {

				})
			},
		},
		components: {
			// 声明子组件名字  
		},
		created() {

		},
		mounted() {
			let that = this
			if(that.$route.query.token !== undefined && that.$route.query.token !== '') {
				let token = that.$route.query.token;
				localStorage.setItem("token", token)
			}
			that.path = that.$route.path
			if(that.path == '/prepare_pdf') {
				that.iku = false
			} else {
				that.iku = true
			}
			setTimeout(() => {
				that.leix()
				that.quanxian()
			}, 500);
		}
	}
</script>

<style>

</style>