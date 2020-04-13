<template>
	<div>
		<el-row type="flex">
			<el-col :span="4"></el-col>
			<el-col :span="16">
				<el-col :span="24" class="pin background-color-bai">
					<el-col :span="24" class="pin">
						<el-col :span="1" class="cor xiao-size">学科：</el-col>
						<el-col :span="20" class="cor xiao-size">
							<div v-for="(list,index) in arr" :key="index" :span="2" class="cor xiao-size cursor pin3 center floj" @click.native="dianji(index)"><span class="xiao-size" :class='{ellan1:index===isactive}' @click="dianji(index)">{{list.name}}</span></div>
						</el-col>
					</el-col>
					<el-col :span="24" class="pin">
						<el-col :span="1" class="cor xiao-size">版本：</el-col>
						<div v-for="(list,index) in arr2" :key="index" class="cor xiao-size cursor center floj pin3" @click.native="dianji2(index)"><span class="xiao-size" :class='{ellan1:index===isactive2}' @click="dianji2(index)">{{list.verName}}</span></div>
					</el-col>
					<el-col :span="24" class="pin">
						<el-col :span="1" class="cor xiao-size">年级：</el-col>
						<el-col :span="20">
							<div v-for="(list,index) in arr1" :key="index" :span="2" class="cor xiao-size cursor pin3 center floj" @click.native="dianji1(index)"><span class="xiao-size" :class='{ellan1:index===isactive1}' @click="dianji1(index)">{{list.volumeName}}</span></div>
						</el-col>
					</el-col>
				</el-col>
			</el-col>
			<el-col :span="4"></el-col>
		</el-row>
		<el-row type="flex">
			<el-col :span="4"></el-col>
			<el-col :span="16" style="margin-top: .5rem;">
				<el-col :span="4" class="background-color-bai height pin">
					<el-col :span="24">
						<el-col :span="24" class="pin5 xiahua"><i class="el-icon-s-claim xiaolan"></i>课程目录</el-col>
						<el-col :span="24">
							<el-tree highlight-current class="xiao-size" :data="data" @node-click="handleNodeClick" :props="defaultProps"></el-tree>
						</el-col>
					</el-col>
				</el-col>
				<el-col :span="20" class="pin1">
					<el-col :span="24" class="background-color-bai height">
						<el-col :span="24" class="pin">
							<div style="padding: .3rem .5rem;" :class="{xuanfsa:quan==leixing}" class="floj1 cursor pin center bodekd" @click="xuanzes(-1)">全部</div>
							<div style="padding: .3rem .5rem;" v-for="(list,index) in lei" :class="{xuanfsa:index==leixing}" class="floj1 cursor pin center bodekd" @click="xuanzes(index)">{{list.restypeName}}</div>
						</el-col>
						<el-col :span="24" class="pin" style="min-height: 11.3rem;" v-loading="loading">
							<el-col :span="24" class="el-xiabus" style="margin-bottom: 2rem;" v-show="wu">
								<img src="../../assets/images/no.png" /><br />暂时还没有资源
							</el-col>
							<el-col :span="24" class="pin xiao-size cor-hui" v-for="(list,index) in dataList" :key="index">
								<el-col :span="1" class="xiao-size cor-hui">
									<img src="../../assets/images/w.png" width="25px" />
								</el-col>
								<el-col :span="14" class="xiao-size cor-hui links">
									{{list.resTitle}}
								</el-col>
								<el-col :span="6" class="xiao-size cor-hui links">
									{{list.createTime}}
								</el-col>
								<el-col :span="1" class="xiao-size links el-lan cursor" @click.native="yulan(list.resId)">
									预览
								</el-col>
								<el-col :span="1" class="xiao-size links el-lan cursor" @click.native="xiazai(list.resId)">
									下载
								</el-col>
							</el-col>
							<el-col :span="24">
								<el-pagination @prev-click="shang" @next-click="xia" @current-change="change" background layout="prev, pager, next" :total="leng" :hide-on-single-page="true"></el-pagination>
							</el-col>
						</el-col>
					</el-col>
				</el-col>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isactive: '',
				isactive1: '',
				isactive2: '',
				value1: true,
				yin: false,
				yin1: false,
				loading:false,
				arr: [],
				arr2: [],
				arr1: [],
				id: '',
				subjectId: '',
				versionId: '',
				gradeId: '',
				verId: '',
				hosk: '',
				data: [],
				defaultProps: {
					children: 'chapterList',
					label: 'chapterName'
				},
				lei: [{
					text: '请选择',
				}],
				leixing: -1,
				wu: true,
				dataList: [],
				leng: 0,
				quan:-1,
			}
		},
		methods: {
			dianji(index) {
				this.isactive = index;
				this.isactive1 = ''
				this.isactive2 = ''
				this.subjectId = this.arr[index].id
				this.list()
				this.yin = true
				this.yin1 = true
			},
			dianji1(index) {
				this.isactive1 = index;
				this.gradeId = this.arr1[index].gradeId
				this.versionId = this.arr1[index].volumeId
				this.be()
			},
			dianji2(index) {
				this.yin1 = true
				this.isactive2 = index;
				this.verId = this.arr2[index].verId
				this.book()
			},
			index() {
				let that = this
				this.$http.get(that.$hosh + '/course/subject/list', {
					params: {
						'token': localStorage.getItem("token"),
					}
				}).then(function(res) {

					that.arr = res.data.data
					that.dianji(0)
				}).catch(function(err) {
				})
			},
			list() {
				let that = this
				this.$http.get(that.$hosh + '/course/version/list', {
					params: {
						'token': localStorage.getItem("token"),
						'subjectId': that.subjectId
					}
				}).then(function(res) {

					that.arr2 = res.data.data
					that.dianji2(0)
				}).catch(function(err) {
				})
			},
			book() {
				let that = this
				this.$http.get(that.$hosh + '/course/volume/list', {
					params: {
						'token': localStorage.getItem("token"),
						'subjectId': that.subjectId,
						"versionId": that.verId
					}
				}).then(function(res) {

					that.arr1 = res.data.data
					that.dianji1(0)
				}).catch(function(err) {
				})
			},
			be() {
				let that = this
				this.$http.get(that.$hosh + '/book/get-chaptertree-vo', {
					params: {
						'token': localStorage.getItem("token"),
						'gradeId': that.gradeId,
						"subjectId": that.subjectId,
						"volumeId": that.versionId,
						"verId": that.verId
					}
				}).then(function(res) {

					that.hosk = res.data.data
					that.zhangjie(that.hosk.bookId)
				}).catch(function(err) {
				})
			},
			zhangjie(s) {
				let that = this
				this.$http.get(that.$hosh + '/book/getbooktree', {
					params: {
						'bookId': s
					},
					headers: {
						'token': localStorage.getItem("token")
					}
				}).then(function(res) {

					that.data = res.data.data.chapterTreeVos
					that.books = res.data.data.bookName
				}).catch(function(err) {

				})
			},
			handleNodeClick(data) {
				if(data.chapterList == undefined) {
					this.hosk=data
					this.ziyuans(1,'')
				}
			},
			xuanzes(s) {
				this.leixing = s
				this.ziyuans(1, s + 1)
			},
			ziyuans(s, k) {
				let that = this
				if(s == undefined) {
					s = 1
				}
				that.loading=true
				this.$http.get(that.$hosh + '/res/list', {
					headers: {
						'token': localStorage.getItem("token")
					},
					params: {
						"bookId": that.hosk.bookId,
						"chapterId": that.hosk.chapterId,
						"curPage": s,
						"pageSize": 10,
						"resRange": 1,
						"restypeId": k
					}
				}).then(function(res) {
					that.dataList = res.data.data.dataList
					that.leng = that.dataList.length
					if(that.leng == 0) {
						that.wu = true
					} else {
						that.wu = false
					}
					that.loading=false
				}).catch(function(err) {

				})
			},
			change(s) {
				this.ziyuans(s)
			},
			shang(s) {
				this.ziyuans(s)
			},
			xia(s) {
				this.ziyuans(s)
			},
			leix() {
				let that = this
				this.$http.get(that.$hosh + '/usercenter/get-info', {
					headers: {
						'token': localStorage.getItem("token")
					},
				}).then(function(res) {
					that.xings(res.data.data.teacher.schoolId)
				}).catch(function(err) {

				})
			},
			xings(s) {
				let that = this
				this.$http.get(that.$hosh + '/res/types/list', {
					headers: {
						'token': localStorage.getItem("token")
					},
					params: {
						"schoolId": s,
					}
				}).then(function(res) {
					that.lei=res.data.data
				}).catch(function(err) {

				})
			},
			yulan(s) {
				let routeData = this.$router.resolve({
					path: '/prepare_pdf',
					query: {
						id: s
					}
				});
				window.open(routeData.href, '_blank');
			},
			xiazai(s){
				let that = this
				this.$http.get(that.$hosh + '/res/' + s, {
					headers: {
						'token': localStorage.getItem("token")
					}
				}).then(function(res) {
					let dats = res.data.data
					that.sui=dats.serverHttp + dats.fileName
//					that.download=dats.fileName
//					document.getElementById("a").click();
					window.open(that.sui)
				}).catch(function(err) {
					
				})
			}
		},
		mounted() {
			this.index();
			this.leix()
		}
	}
</script>

<style>

</style>