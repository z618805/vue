<template>
	<div class="add">
		<el-row class="add-row">
			<el-col class="xiahua">
				<el-col :span="24" class="pin">
					<el-col :span="12" class="cor">添加教材</el-col>
					<el-col :span="12" class="left">
						<img src="../../assets/images/shan.png" class="cursor" @click="qu" />
					</el-col>
				</el-col>
			</el-col>
			<el-col :span="24" class="pin4">
				<el-col :span="24" class="pin">
					<el-col :span="4" class="cor xiao-size">学科：</el-col>
					<el-col :span="20" class="cor xiao-size">
						<el-col :class='{ellan:index===isactive}' v-for="(list,index) in arr" :key="index" :span="8" class="cor xiao-size cursor pin3" @click.native="dianji(index)">{{list.name}}</el-col>
					</el-col>
				</el-col>
				<el-col :span="24" class="pin" v-show="yin" style="margin-top: -.4rem;">
					<el-col :span="4" class="cor xiao-size">版本：</el-col>
					<el-col :span="8" :class='{ellan:index===isactive2}' v-for="(list,index) in arr2" :key="index" class="cor xiao-size cursor" @click.native="dianji2(index)">{{list.verName}}</el-col>
				</el-col>
				<el-col :span="24" class="pin" v-show="yin1">
					<el-col :span="4" class="cor xiao-size">年级：</el-col>
					<el-col :span="20">
						<el-col :class='{ellan:index===isactive1}' v-for="(list,index) in arr1" :key="index" :span="10" class="cor xiao-size cursor pin3" @click.native="dianji1(index)">{{list.volumeName}}</el-col>
					</el-col>
				</el-col>
				<el-col :span="24" class="pin xiahua" style="margin-top: -.5rem;" v-show="yin1">
					<el-col :span="4" class="cor xiao-size">设置：</el-col>
					<el-col :span="20">
						<el-switch v-model="value1"></el-switch>
						<span class="cor xiao-size" style="margin-left: .3rem;">设置为当前教材</span>
					</el-col>
				</el-col>
				<el-col :span="24" class="pin center an" v-show="yin1">
					<el-button type="info" round class="xiao-size" @click="qu">取消</el-button>
					<el-button type="primary" round class="xiao-size" @click="que">确定</el-button>
				</el-col>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { BookGetChaptertreeVo, PrepareBook, CourSesubjectList, CourVersionList, CourVolumeList } from '@/api/home';
	export default {
		data() {
			return {
				isactive: '',
				isactive1: '',
				isactive2: '',
				value1: true,
				yin: false,
				yin1: false,
				arr: [],
				arr2: [],
				arr1: [],
				id: '',
				subjectId: '',
				versionId: '',
				gradeId: '',
				verId: '',
				hosk: '',
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
				this.yin1 = false
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
			qu() {
				this.$emit('quxiao', false)
			},
			que() {
				let that = this
				let params = {
					'bookId': that.hosk.bookId,
					"bookName": that.hosk.bookName,
					"gradeId": that.hosk.gradeId,
					"subjectId": that.hosk.subjectId,
					"verId": that.hosk.verId,
					"volumeId": that.hosk.volumeId,
				}
				PrepareBook(params).then((res) => {
					console.log(res)
					if(res.data.code == "10114") {
						that.$message('请勿重复选择教材！');
						return false;
					} else {
						let data = {
							"queding": true,
							"value1": that.value1,
							"bookId": that.hosk.bookId
						}
						that.$emit('queding', data)
					}
				}).catch(() => {

				})
			},
			index() {
				let that = this
				CourSesubjectList().then((res) => {
					that.arr = res.data.data
				}).catch(() => {

				})
			},
			list() {
				let that = this
				let params = {
					'subjectId': that.subjectId
				}
				CourVersionList(params).then((res) => {
					that.arr2 = res.data.data
				}).catch(() => {

				})
			},
			book() {
				let that = this
				let params = {
					'token': localStorage.getItem("token"),
					'subjectId': that.subjectId,
					"versionId": that.verId
				}
				CourVolumeList(params).then((res) => {
					that.arr1 = res.data.data
				}).catch(() => {

				})
			},
			be() {
				let that = this
				let params = {
					'gradeId': that.gradeId,
					"subjectId": that.subjectId,
					"volumeId": that.versionId,
					"verId": that.verId
				}
				BookGetChaptertreeVo(params).then((res) => {
					that.hosk = res.data.data
				}).catch(() => {

				})
			},
		},
		mounted() {
			this.index()
		}
	}
</script>

<style>

</style>