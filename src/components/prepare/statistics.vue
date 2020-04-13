<template>
	<div class="background-color-bai pin">
		<el-row>
			<el-col class="pin" :span="24">
				<img src="../../assets/images/ju.png" width="10px" style="margin-right: .5rem;" />总况统计
			</el-col>
			<el-col class="pin9 background-color-huang xiao-size margin-bottom" :span="24">
				本校共有教师 {{zongshu}} 位，资源总数 {{jiaoshi}} 条
			</el-col>
			<el-col class="pin" :span="24">
				<img src="../../assets/images/ju.png" width="10px" style="margin-right: .5rem;" />按学科统计
			</el-col>
			<el-col class="pin margin-bottom" :span="24">
				<el-table :header-cell-style="{background:'#F6F6F6'}" :data="tableData" size="medium " border stripe style="width: 100%;text-align: center;">
					<el-table-column prop="subjectName" label="学科" align="center">
					</el-table-column>
					<el-table-column prop="resCount" label="资源总数" align="center">
					</el-table-column>
					<el-table-column prop="unReviewCount" label="未审核" align="center">
					</el-table-column>
				</el-table>
			</el-col>
			<el-col class="pin" :span="24">
				<img src="../../assets/images/ju.png" width="10px" style="margin-right: .5rem;" />按年级统计
			</el-col>
			<el-col class="pin margin-bottom" :span="24">
				<el-table :header-cell-style="{background:'#F6F6F6'}" :data="tableData1" size="medium " border stripe style="width: 100%;">
					<el-table-column prop="gradeName" label="年级" align="center">
					</el-table-column>
					<el-table-column prop="resCount" label="资源总数" align="center">
					</el-table-column>
					<el-table-column prop="unReviewCount" label="未审核" align="center">
					</el-table-column>
				</el-table>
			</el-col>
			<el-col class="pin" :span="24">
				<img src="../../assets/images/ju.png" width="10px" style="margin-right: .5rem;" />按教师统计
			</el-col>
			<el-col class="pin" :span="24">
				<el-table v-loading="loading" :header-cell-style="{background:'#F6F6F6'}" :data="tableData2" size="medium " border stripe style="width: 100%;">
					<el-table-column type="index" width="50" label="名次" align="center"></el-table-column>
					<el-table-column prop="userName" label="姓名" align="center"></el-table-column>
					<el-table-column v-if="shuj>=0" prop="cos1" label="教学设计" align="center"></el-table-column>
					<el-table-column v-if="shuj>=1" prop="cos2" label="导学案" align="center"></el-table-column>
					<el-table-column v-if="shuj>=2" prop="cos3" label="课件" align="center"></el-table-column>
					<el-table-column v-if="shuj>=3" prop="cos4" label="素材" align="center"></el-table-column>
					<el-table-column v-if="shuj>=4" prop="cos5" label="作业" align="center"></el-table-column>
					<el-table-column v-if="shuj>=5" prop="cos6" label="微课" align="center"></el-table-column>
					<el-table-column v-if="shuj>=6" prop="cos7" label="课堂实录" align="center"></el-table-column>
					<el-table-column v-if="shuj>=7" prop="cos8" label="单元卷" align="center"></el-table-column>
					<el-table-column prop="resCount" label="总资源" align="center"></el-table-column>
					<el-table-column prop="unReviewCount" label="未审核" align="center"></el-table-column>
				</el-table>
			</el-col>
			<el-col class="pin margin-bottom" :span="24" style="margin-bottom: 5rem;">
				<el-pagination background @prev-click="shang" @next-click="xia" @current-change="change" layout="prev, pager, next" :total="total" style="float: right;">
				</el-pagination>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { ResStatSlist,ResStatTlist} from '@/api/home';
	export default {
		data() {
			return {
				tableData: [],
				tableData1: [],
				tableData2: [],
				skuo: [],
				jiaoshi: '',
				zongshu: '',
				total: 0,
				loading: true,
				shuj: 0
			}
		},
		methods: {
			list() {
				let that = this
				let params = {
					"schoolId": localStorage.getItem("schoolId"),
				}
				ResStatSlist(params).then((res) => {
					that.tableData = res.data.data.subjectStatVos
					that.tableData1 = res.data.data.gradeStatVos
					that.jiaoshi = res.data.data.resCount
					that.zongshu = res.data.data.teacherCount
				}).catch(() => {

				})
			},
			list1(s) {
				let that = this
				if(s == undefined || s == '') {
					s = 1
				}
				let params = {
					"schoolId": localStorage.getItem("schoolId"),
					"curPage": s,
					"pageSize": 10,
				}
				that.loading = true
				ResStatTlist(params).then((res) => {
					that.total = res.data.data.totalCount
					that.loading = false
					for(let i = 0; i < res.data.data.dataList.length; i++) {
						for(let k = 0; k < res.data.data.dataList[i].restypeVoList.length; k++) {
							if(k == 0) {
								that.shuj = k
								res.data.data.dataList[i].cos1 = res.data.data.dataList[i].restypeVoList[k].resCount
							}
							if(k == 1) {
								that.shuj = k
								res.data.data.dataList[i].cos2 = res.data.data.dataList[i].restypeVoList[k].resCount
							}
							if(k == 2) {
								that.shuj = k
								res.data.data.dataList[i].cos3 = res.data.data.dataList[i].restypeVoList[k].resCount
							}
							if(k == 3) {
								that.shuj = k
								res.data.data.dataList[i].cos4 = res.data.data.dataList[i].restypeVoList[k].resCount
							}
							if(k == 4) {
								that.shuj = k
								res.data.data.dataList[i].cos5 = res.data.data.dataList[i].restypeVoList[k].resCount
							}
							if(k == 5) {
								that.shuj = k
								res.data.data.dataList[i].cos6 = res.data.data.dataList[i].restypeVoList[k].resCount
							}
							if(k == 6) {
								that.shuj = k
								res.data.data.dataList[i].cos7 = res.data.data.dataList[i].restypeVoList[k].resCount
							}
							if(k == 7) {
								that.shuj = k
								res.data.data.dataList[i].cos8 = res.data.data.dataList[i].restypeVoList[k].resCount
							}
						}
					}
					that.tableData2 = res.data.data.dataList
				}).catch(() => {

				})
			},
			change(s) {
				this.list1(s)
			},
			shang(s) {
				this.list1(s)
			},
			xia(s) {
				this.list1(s)
			},
		},
		mounted() {
			setTimeout(() => {
				this.list()
				this.list1()
			}, 500)
		}
	}
</script>

<style>

</style>