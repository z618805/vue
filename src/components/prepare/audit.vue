<template>
	<div class="pin background-color-bai ckji">
		<el-row>
			<el-col :span="24">
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
					<el-menu-item index="1">未审核 </el-menu-item>
					<el-menu-item index="2">已审核</el-menu-item>
					<el-menu-item index="3">不通过</el-menu-item>
				</el-menu>
				<el-col class="pin" :span="24" v-loading="loading">
					<el-table empty-text="暂时没有数据" :row-class-name="tableRowClassName" :data="tableData1" size="medium " style="width: 100%;">
						<el-table-column type="index" label="序号" align="center">
						</el-table-column>
						<el-table-column prop="resTitle" :show-overflow-tooltip="true" label="资源名称" align="center">
						</el-table-column>
						<el-table-column prop="userName" label="教师" align="center">
						</el-table-column>
						<el-table-column prop="subjectName" label="学科" align="center">
						</el-table-column>
						<el-table-column prop="createTime" label="上传时间" align="center">
						</el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<el-col :span="12" class="xiao-size links el-lan cursor" @click.native="yulan(scope.row.resId)" v-if="ku==3||ku==2">
									预览
								</el-col>
								<el-col :span="12" class="xiao-size links el-lan cursor" @click.native="tong(scope.row.resId,10)" v-if="ku==3">
									通过
								</el-col>
								<el-col :span="8" class="xiao-size links el-lan cursor" @click.native="yulan(scope.row.resId)" v-if="ku==1">
									预览
								</el-col>
								<el-col :span="8" class="xiao-size links el-lan cursor" @click.native="tong(scope.row.resId,10)" v-if="ku==1">
									通过
								</el-col>
								<el-col :span="8" class="xiao-size links el-lan cursor" @click.native="tong(scope.row.resId,2)" v-if="ku==1">
									不通过
								</el-col>
								<el-col :span="12" class="xiao-size links el-lan cursor" @click.native="xiazai(scope.row.resId)" v-if="ku==2">
									下载
								</el-col>
							</template>
						</el-table-column>
					</el-table>
					<el-col class="pin margin-bottom" :span="24">
						<el-pagination :page-size="10" @prev-click="shang" @next-click="xia" @current-change="change" background layout="prev, pager, next" :total="lens" :hide-on-single-page="true"></el-pagination>
					</el-col>
				</el-col>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { ResList,ResBatchReview,ResK,ResSetDown} from '@/api/home';
	export default {
		data() {
			return {
				activeName: 'first',
				tableData1: [],
				lens: 0,
				loading: true,
				activeIndex: '1',
				ku:1
			};
		},
		methods: {
			handleSelect(key, keyPath) {
//				this.ziyuans(key)
				this.activeIndex=key
				if(key==2){
					this.ku=2
					this.list(1,10)
				}
				if(key==1){
					this.ku=1
					this.list(1,5)
				}
				if(key==3){
					this.ku=3
					this.list(1,2)
				}
			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				return 'warning-row';
			},
			list(s,k) {
				let that = this
				if(s == undefined) {
					s = 1
				}
				that.loading=true
				let params={
						"curPage": s,
						"pageSize": 10,
						"resStatus": k,
						"resRange":2
					}
				ResList(params).then((res) => {
					that.tableData1 = res.data.data.dataList;
					that.lens = res.data.data.totalCount;
					that.loading = false
				}).catch(() => {
					that.loading = false
				})
			},
			change(s) {
				if(this.activeIndex==1){
					this.list(s,5)
				}
				if(this.activeIndex==2){
					this.list(s,10)
				}
			},
			shang(s) {
				if(this.activeIndex==1){
					this.list(s,5)
				}
				if(this.activeIndex==2){
					this.list(s,10)
				}
			},
			xia(s) {
				if(this.activeIndex==1){
					this.list(s,5)
				}
				if(this.activeIndex==2){
					this.list(s,10)
				}
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
			tong(s,k) {
				let that = this
				let lies = [s]
				let params = {
					"resStatus": k,
					"resIds": lies,
				}
				ResBatchReview(params).then((res) => {
					if(that.ku==1){
						that.list(1,5)
					}else if(that.ku==2){
						this.list(1,10)
					}else{
						this.list(1,2)
					}
				}).catch(() => {

				})
			},
			xiazai(s) {
				let that = this
				ResK(s).then((res) => {
					let dats = res.data.data
					that.sui = dats.serverHttp + dats.fileName
					that.xiazais(s)
				}).catch(() => {

				})
			},
			xiazais(s) {
				let that = this
				let params = {
					"resId": s,
				}
				ResSetDown(params).then((res) => {
					window.open(that.sui)
				}).catch(() => {

				})
			},
		},
		mounted() {
			this.list(1,5)
		}
	};
</script>

<style>
	.el-table .warning-row {
		background: #F8F8F9;
	}
	
	.ckji .el-table__body tr:hover>td {
		background-color: #FFFFFF !important;
	}
</style>