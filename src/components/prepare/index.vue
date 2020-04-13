<template>
	<div class="height">
		<el-row type="flex">
			<el-col :span="24" v-loading="loading1">
				<el-col :span="4" class="background-color-bai height pin">
					<el-col :span="24" class="el-aside-div xiahua">
						我的教材
						<el-button class="xiaobiao el-lan" size="mini" type="primary" icon="el-icon-plus" round @click="tian">添加</el-button>
						<span style="float: right;padding-top: .1rem;" class="el-lan cursor xiao-size" @click="dian">
							<i class="el-icon-sort" style="-moz-transform: rotate(90deg);-webkit-transform: rotate(90deg);"></i>
							切换教材
						</span>
					</el-col>
					<div class="div1" v-show="div">
						<div class="xiaos">请选择教材</div>
						<el-col :span="24" style="margin-top: .55rem;"></el-col>
						<el-col :span="24" v-for="(list,index) in dats" class="min cursor" :key="index">
							<el-col :span="20" class="el-sheng" :class='{ellan:list.bookId==isactive1}' @click.native="dianji1(list.bookId)">
								{{list.bookName}}
							</el-col>
							<el-col :span="4" class="tecs cursor" @click.native="shan(list.tbookId,list.bookName)"><i class="el-icon-delete color-huang"></i></el-col>
						</el-col>
					</div>
					<el-col :span="24" class="el-xiabu" v-show="none">您还有没添加教材</el-col>
					<el-col :span="24" v-show="none1">
						<el-col :span="24" class="pin5">{{books}}</el-col>
						<el-col :span="24">
							<el-tree default-expand-all highlight-current class="xiao-size" :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
						</el-col>
					</el-col>
				</el-col>
				<el-col :span="20" class="pin1">
					<el-col :span="24" class="background-color-bai height">
						<el-col :span="24" class="background-color-bai">
							<el-col :span="24" class="el-aside-div xiahua pin" style="padding-bottom: .4rem;">
								{{zhang}}<span class="xiaomsd xiao-size" v-show="shouci"><el-button size="mini" class="xiao-size cjski" type="primary" round style="margin-top: .2rem;" @click="tian">添加教材</el-button>
								初次使用备课功能指引： 第一步，添加教材；第二步，选择教材，开始备课。
								就这么简单，来试试吧
								
							</span>
							</el-col>
							<el-col :span="24" v-show="shouci1">
								<el-col :span="24" class="pin">
									<el-col :span='2' :class="{bei:isw==list.lessonId,mei:isw!==list.lessonId}" class="cursor center heiji xiao-size" v-for="(list,index) in ints" :key="index" @click.native="dianke(list.lessonId)">
										<span v-if="index!==ints.length-1" class="cursor center  xiao-size">第{{index+1}}节课</span>
										<span v-if="index==ints.length-1" class="cursor center  xiao-size">第{{index+1}}节课<i class="el-icon-close" style="position: relative;right: -20px;top: -5px;" @click="shanchu(list.lessonId)" v-if="index!==0"></i></span>
									</el-col>
									<el-col :span='2' class="center heiji xiao-size xu cursor" @click.native="zeng"><i class="el-icon-plus" style="margin-right: .3rem;"></i>添加课时</el-col>
								</el-col>
								<el-col :span="24">
									<el-col :span="24" class="pin color-huang xiao-size" style="margin-top: -.5rem;">提示：在左侧“我的教材”选择你要上传第章节和课时，然后在“我的资源”选择你要上传第资料类型，即可上传。</el-col>
								</el-col>
								<el-col :span="24" class="pin" v-loading="loading">
									<el-col :span='2' style="padding: .3rem 0 ;width: 2.8rem;min-width: 2.8rem;" class="center heiji1 xiao-size xu cursor" v-for="list in chuan" :key="list.restypeId">
										<el-popover placement="bottom" width="250" trigger="hover">
											<el-col :span="24" slot="reference">
												<img src="../../assets/images/jia.png" width="20%" />
												<el-col :span='24' class="xiao-size cor-hui">{{list.restypeName}}</el-col>
												<el-col :span='24' class="xiao-size color-huang" v-if="list.resCount==0">未上传</el-col>
												<el-col :span='24' class="xiao-size color-lv" v-if="list.resCount!==0"><i class="el-icon-check"></i>已上传（{{list.resCount}}）</el-col>
											</el-col>
											<el-col class="center">
												<el-button size="mini" @click.native="uploading(list.restypeId)"><i class="el-icon-upload"></i>上传</el-button>
												<el-button size="mini" @click.native="resource(list.resCount,list.restypeName,list.restypeId)"><i class="el-icon-s-order"></i>资源列表（{{list.resCount}}）</el-button>
											</el-col>
										</el-popover>
									</el-col>
								</el-col>
								<!--<el-col :span="24" class="pin">
									<el-col :span="24" class="pin xiao-size cor-hui">共有{{shuliang}}个资源</el-col>
									<el-col :span="24" class="huidi">
										<el-col :span="24" class="pin xiao-size cor-hui" v-for="(list,index) in zy" :key="index">
											<el-col :span="1" class="xiao-size cor-hui" v-if="list.resTitle.indexOf('微课')!=-1">
												<img src="../../assets/images/v.png" width="25px" />
											</el-col>
											<el-col :span="1" class="xiao-size cor-hui" v-if="list.resTitle.indexOf('课件')!=-1">
												<img src="../../assets/images/p.png" width="25px" />
											</el-col>
											<el-col :span="1" class="xiao-size cor-hui" v-if="list.resTitle.indexOf('课件')==-1&&list.resTitle.indexOf('微课')==-1">
												<img src="../../assets/images/w.png" width="25px" />
											</el-col>
											<el-col :span="14" class="xiao-size cor-hui links">
												{{list.resTitle}}
											</el-col>
											<el-col :span="6" class="xiao-size cor-hui links">
												{{list.createTime}}
											</el-col>
											<el-col :span="1" class="xiao-size links color-huang cursor" @click.native="zysh(list.resId)">
												删除
											</el-col>
											<el-col :span="1" class="xiao-size links el-lan cursor" @click.native="yulan(list.resId)">
												预览
											</el-col>
											<el-col :span="1" class="xiao-size links el-lan cursor" @click.native="xiazai(list.resId)">
												下载
											</el-col>
										</el-col>
									</el-col>
								</el-col>-->
							</el-col>
						</el-col>
						<el-col :span="24" style="background-color: #F4F8FE;height: .5rem;"></el-col>
						<el-col :span="24" class="background-color-bai" style="margin-bottom: 10rem;min-height: 13rem;">
							<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
								<el-menu-item index="1">总校资源 </el-menu-item>
								<el-menu-item index="2">本校资源</el-menu-item>
								<el-menu-item index="3">其他资源</el-menu-item>
							</el-menu>
							<el-col :span="24" class="el-xiabus" v-show="wu">
								<img src="../../assets/images/no.png" /><br />暂时还没有资源
							</el-col>
							<el-col :span="24" class="pin xiao-size cor-hui" v-for="(list,index) in dataList" :key="index">
								<el-col :span="1" class="xiao-size cor-hui" v-if="list.resTypeName=='微课'">
									<img src="../../assets/images/v.png" width="25px" />
								</el-col>
								<el-col :span="1" class="xiao-size cor-hui" v-if="list.resTypeName=='课件'">
									<img src="../../assets/images/p.png" width="25px" />
								</el-col>
								<el-col :span="1" class="xiao-size cor-hui" v-if="list.resTypeName!=='课件'&&list.resTypeName!=='微课'">
									<img src="../../assets/images/w.png" width="25px" />
								</el-col>
								<el-col :span="6" class="xiao-size cor-hui links el-sheng">
									{{list.resTitle}}
								</el-col>
								<el-col :span="5" class="xiao-size cor-hui links">
									{{list.schoolName}}
								</el-col>
								<el-col :span="5" class="xiao-size cor-hui links">
									{{list.userName}}
								</el-col>
								<el-col :span="5" class="xiao-size cor-hui links">
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
		<el-row class="tan background-color-bai" v-show="shanqu">
			<el-col class="xiahua">
				<el-col :span="24" class="pin">
					<el-col :span="12" class="cor">删除教材</el-col>
					<el-col :span="12" class="left">
						<img src="../../assets/images/shan.png" class="cursor" @click="open1" />
					</el-col>
				</el-col>
			</el-col>
			<el-col :span="24" class="pin el-xiabus lin-shan xiao-size xiahua cor">
				是否删除<span class="xiao-size el-lan pin2">{{jiao}}</span>教材？
			</el-col>
			<el-col :span="24" class="pin center an">
				<el-button type="info" round class="xiao-size" @click="open1">取消</el-button>
				<el-button type="primary" round class="xiao-size" @click="open2">确定</el-button>
			</el-col>
		</el-row>
		<el-add v-show="adds" @quxiao='qu' @queding='que' @value1='value1'></el-add>
		<input type="file" id="file" :value="vule" class="file" style="display: none" @change="file" />
		<a :href="sui" style="display: none" :download="download" id="a"></a>
		<el-dialog style="min-width: 48rem;" :title="title" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
			<el-col :span="24" class="pin">
				<!--<el-col :span="24" class="pin xiao-size cor-hui">共有{{shuliang}}个资源</el-col>-->
				<el-col :span="24" class="huidi">
					<el-col :span="24" class="pin xiao-size cor-hui" v-for="(list,index) in zy" v-if="list.restypeId==lies" :key="index">
						<el-col :span="2" class="xiao-size cor-hui" v-if="list.resTitle.indexOf('微课')!=-1">
							<img src="../../assets/images/v.png" width="25px" />
						</el-col>
						<el-col :span="2" class="xiao-size cor-hui" v-if="list.resTitle.indexOf('课件')!=-1">
							<img src="../../assets/images/p.png" width="25px" />
						</el-col>
						<el-col :span="2" class="xiao-size cor-hui" v-if="list.resTitle.indexOf('课件')==-1&&list.resTitle.indexOf('微课')==-1">
							<img src="../../assets/images/w.png" width="25px" />
						</el-col>
						<el-col :span="10" class="xiao-size cor-hui links">
							{{list.resTitle}}
						</el-col>
						<el-col :span="6" class="xiao-size cor-hui links">
							{{list.createTime}}
						</el-col>
						<el-col :span="2" class="xiao-size links color-huang cursor" @click.native="zysh(list.resId)">
							删除
						</el-col>
						<el-col :span="2" class="xiao-size links el-lan cursor" @click.native="yulan(list.resId)">
							预览
						</el-col>
						<el-col :span="2" class="xiao-size links el-lan cursor" @click.native="xiazai(list.resId)">
							下载
						</el-col>
					</el-col>
				</el-col>
			</el-col>
			<span slot="footer" class="dialog-footer">
    			<el-button  size="mini" type="primary" @click="dialogVisible = false">关 闭</el-button>
  			</span>
		</el-dialog>
	</div>
</template>

<script>
	import add from './add'
	import { Loading } from 'element-ui';
	import { ResK, PrepareLessonK, PrepareK, ResSetDown, ResList, PrepareList, Prepare, PrepareLesson, BookGetbooktree, PrepareLessonRestypeList, PrepareBookList, PrepareLessonList } from '@/api/home';
	export default {
		components: {
			'el-add': add
		},
		data() {
			return {
				isw: '',
				ints: 0,
				zhang: '暂无章节',
				isactive1: 0,
				none: true,
				none1: false,
				shouci: true,
				shouci1: false,
				activeIndex: '1',
				activeIndex2: '1',
				div: false,
				shanqu: false,
				jiao: '',
				adds: false,
				dats: [],
				data: [],
				defaultProps: {
					children: 'chapterList',
					label: 'chapterName'
				},
				books: '',
				jiao1: '',
				kb: '',
				chapterId: '',
				chuan: '',
				url: '',
				uplo: '',
				vule: '',
				shuliang: '  ',
				loading: false,
				loading1: false,
				suoyou: '',
				zy: '',
				dataList: '',
				leng: 0,
				wu: true,
				sui: '',
				download: '',
				resRange: 1,
				hosk: '',
				shijian: 0,
				title: '',
				dialogVisible: false,
				lies: ''
			};
		},
		watch: {
			zhang() {
				if(this.zhang == '暂无章节') {
					this.shouci = true
					this.shouci1 = false
				} else {
					this.shouci = false
					this.shouci1 = true
				}
			}
		},
		methods: {
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			handleSelect(key, keyPath) {
				if(key == 1) {
					this.resRange = 1
				}
				if(key == 2) {
					this.resRange = 2
				}
				if(key == 3) {
					this.resRange = 3
				}
				this.ziyuans()
			},
			dian() {
				if(this.div == true) {
					this.div = false
				} else {
					this.div = true
				}
			},
			shan(s, d) {
				let that = this
				this.shanqu = true
				this.jiao = d
				this.jiao1 = s
			},
			open1() {
				this.$message('取消删除！');
				this.shanqu = false
				return false;
			},
			open2() {
				let that = this
				this.$http.delete(that.$hosh + '/prepare/book/' + this.jiao1, {
					headers: {
						'token': localStorage.getItem("token")
					}
				}).then(function(res) {
					that.$message('删除成功！');
					that.shanqu = false
					that.list()
				}).catch(function(err) {

				})
			},
			value1(data) {
				if(data == true) {

				}
			},
			tian() {
				this.adds = true
			},
			qu(data) {
				if(data == false) {
					this.$message('取消添加教材！');
					this.adds = false
				}
			},
			que(data) {
				this.list()
				if(data.queding == true) {
					this.$message({
						message: '添加教材成功！',
						type: 'success'
					});
					this.adds = false
				}
				if(data.value1 == true) {
					this.kb = data.bookId
					this.zhangjie(this.kb)
				}
			},
			handleNodeClick(data) {
				this.loading = true
				if(data.chapterList == undefined) {
					this.hosk = data
					this.zhang = data.chapterName
					this.chapterId = data.chapterId
					this.keshi(data.chapterId)
					this.ziyuans(1)
					this.loading = false
				}
				this.loading = false
			},
			dianji1(s, index) {
				this.isactive1 = s;
				this.dian()
				this.kb = s
				this.zhangjie(s)
			},
			zhangjie(s) {
				let that = this
				let params = {
					'bookId': s
				}
				BookGetbooktree(params).then((res) => {
					that.data = res.data.data.chapterTreeVos
					that.books = res.data.data.bookName
				}).catch(() => {

				})
			},
			dianke(index) {
				this.isw = index
				let that = this
				let params = {
					'lessonId': index
				}
				PrepareLessonRestypeList(params).then((res) => {
					that.shijian = index
					that.chuan = res.data.data
					console.log(that.chuan)
					that.yuans()
				}).catch(() => {

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
			list() {
				let that = this
				that.loading1 = true
				PrepareBookList().then((res) => {
					that.dats = res.data.data
					that.loading1 = false
					if(res.data.data.length == 0) {
						that.none = true
						that.none1 = false
					} else {
						if(that.kb !== '') {
							that.zhangjie(that.kb)
						} else {
							that.kb = that.dats[0].bookId
							that.zhangjie(that.kb)
						}
						that.none = false
						that.none1 = true
					}
				}).catch((rer) => {
					console.log(rer)
					that.loading1 = false
				})
			},
			keshi(s) {
				let that = this
				let params = {
					"chapterId": s
				}
				PrepareLessonList(params).then((res) => {
					that.ints = res.data.data
					console.log(that.ints)
					if(that.ints.length == 0) {
						that.zeng()
					} else {
						that.dianke(res.data.data[0].lessonId)
					}
				}).catch(() => {

				})
			},
			zeng() {
				let that = this
				that.loading = true
				let lens = that.ints.length
				lens++
				let params = {
					"bookId": that.kb,
					"chapterId": that.chapterId,
					"lessonName": '第' + lens + '课时',
					"lessonSort": lens
				}
				PrepareLesson(params).then((res) => {
					that.keshi(that.chapterId)
					that.loading = false
				}).catch(() => {
					that.loading = false
				})
			},
			uploading(s) {
				this.uplo = s
				document.getElementById("file").value = ''
				document.getElementById("file").click();
			},
			file() {
				let fileFormData = new FormData();
				fileFormData.append('file', document.querySelector('input[type=file]').files[0]);
				let froms = document.getElementById('file').files[0]
				let fileName = froms.name; //获取文件名
				let filesise = froms.name; //获取文件名
				if(this.chuan[this.uplo - 1].restypeId == 1) {
					if(!/\.(doc|docx|DOC|DOCX)$/.test(fileName)) {
						this.$alert('教学设计上传文件格式为doc，docx，请确认格式后上传！', '教学设计', {
							confirmButtonText: '确定',
							callback: action => {}
						});
						return false;
					}
				}
				if(this.chuan[this.uplo - 1].restypeId == 2) {
					if(!/\.(doc|docx|DOC|DOCX|pdf|PDF)$/.test(fileName)) {
						this.$alert('导学案上传文件格式为doc，docx，pdf，请确认格式后上传！', '导学案', {
							confirmButtonText: '确定',
							callback: action => {}
						});
						return false;
					}
				}
				if(this.chuan[this.uplo - 1].restypeId == 3) {
					if(!/\.(ppt|pptx|PPT|PPTX)$/.test(fileName)) {
						this.$alert('课件上传文件格式为ppt，pptx，请确认格式后上传！', '课件', {
							confirmButtonText: '确定',
							callback: action => {}
						});
						return false;
					}
				}
				if(this.chuan[this.uplo - 1].restypeId == 4) {
					if(!/\.(PPT|PPTX|jpg|png|doc|docx|ppt|pptx|pdf|mp3|mp4|JGP|PNG|DOC|DOCX|PDF|MP3|MP4)$/.test(fileName)) {
						this.$alert('素材上传文件格式为jpg,png,doc,docx,ppt,pptx,pdf,mp3,mp4，请确认格式后上传！', '素材', {
							confirmButtonText: '确定',
							callback: action => {}
						});
						return false;
					}
				}
				if(this.chuan[this.uplo - 1].restypeId == 5) {
					if(!/\.(doc|docx|DOC|DOCX)$/.test(fileName)) {
						this.$alert('作业上传文件格式为doc，docx，请确认格式后上传！', '作业', {
							confirmButtonText: '确定',
							callback: action => {}
						});
						return false;
					}
				}
				if(this.chuan[this.uplo - 1].restypeId == 6) {
					if(!/\.(MP4|mp4|mov|MOV)$/.test(fileName)) {
						this.$alert('微课上传文件格式为mp4，mov，请确认格式后上传！', '微课', {
							confirmButtonText: '确定',
							callback: action => {}
						});
						return false;
					}
				}
				if(this.chuan[this.uplo - 1].restypeId == 7) {
					if(!/\.(MP4|mp4)$/.test(fileName)) {
						this.$alert('课堂实录上传文件格式为mp4，请确认格式后上传！', '课堂实录', {
							confirmButtonText: '确定',
							callback: action => {}
						});
						return false;
					}
				}
				if(this.chuan[this.uplo - 1].restypeId == 8) {
					if(!/\.(doc|docx|DOC|DOCX)$/.test(fileName)) {
						this.$alert('单元卷上传文件格式为doc，docx，请确认格式后上传！', '单元卷', {
							confirmButtonText: '确定',
							callback: action => {}
						});
						return false;
					}
				}
				let that = this
				that.loading = true
				let params = {
					"lessonId": that.isw
				}
				this.$http.post(that.$hosh + '/file/oss-upload', fileFormData, {
					headers: {
						'token': localStorage.getItem("token")
					},
					params: {
						"lessonId": that.isw
					}
				}).then(function(res) {
					setTimeout(() => {
						that.loading = false
					}, 1000);
					that.url = res.data.data[0]
					that.chj()
				}).catch(function(err) {

				})
			},
			chj() {
				let that = this
				let params = {
					"lessonId": that.isw,
					"resPubVo": {
						"fileUrl": that.url.fileName,
						"md5": that.url.md5,
						"fileName": that.url.fileName,
						"originalFilename": that.url.originalFilename,
						"fileNameSuffix": that.url.fileNameSuffix,
						"size": that.url.size,
						"resTypeName": that.chuan[that.uplo - 1].restypeName,
						"restypeId": that.chuan[that.uplo - 1].restypeId,
					}
				}
				this.$http.post(that.$hosh + '/prepare', params, {
					headers: {
						'token': localStorage.getItem("token")
					}
				}).then(function(res) {

					that.dianke(that.isw)
				}).catch(function(err) {

				})
			},
			yuans() {
				let that = this
				let params = {
					"lessonId": that.isw
				}
				PrepareList(params).then((res) => {
					that.shuliang = res.data.data.length
					that.zy = res.data.data
				}).catch(() => {

				})
			},
			ziyuans(s) {
				let that = this
				if(s == undefined || s == '') {
					s = 1
				}
				let params = {
					"bookId": that.hosk.bookId,
					"chapterId": that.hosk.chapterId,
					"curPage": s,
					"pageSize": 10,
					"resRange": that.resRange,
					"restypeId": '',
				}
				ResList(params).then((res) => {
					that.dataList = res.data.data.dataList
					that.leng = that.dataList.length
					if(that.leng == 0) {
						that.wu = true
					} else {
						that.wu = false
					}
				}).catch(() => {

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
			zysh(s) {
				this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let that = this
					PrepareK(s).then((res) => {
						that.yuans()
						that.dianke(that.isw)
						that.$message({
							type: 'success',
							message: '删除成功!'
						});
					}).catch(() => {

					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
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
			shanchu(s) {
				this.$confirm('此操作将删除该课时, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let that = this
					PrepareLessonK(s).then(function(res) {
						if(res.data.code == "10113") {
							that.$confirm('该课时下有资源, 请先删除资源后重试', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {})
						} else {
							that.keshi(that.chapterId)
							that.$message({
								type: 'success',
								message: '删除成功!'
							});
						}
					}).catch(function(err) {

					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			resource(s, k, w) {
				if(s == 0) {
					this.$message({
						type: 'info',
						message: k + '暂无资源'
					});
				} else {
					this.dialogVisible = true
					this.title = k + '列表'
					this.lies = w
				}
			}
		},
		mounted() {
			setTimeout(() => {
				this.list()
			}, 500)
		}
	}
</script>

<style>
	.cjski span {
		font-size: .35rem;
	}
</style>