<template>
	<div>
		<el-container>
			<el-header class="fix">
				<el-row>
					<el-col :span='5'></el-col>
					<el-col :span='14' class="el-sheng">
						{{dats.resTitle}}
						<span class="cor-hui huidi xiao-size pin7">{{dats.bookName}}</span>
					</el-col>
					<el-col :span='5'></el-col>
				</el-row>
			</el-header>
			<el-container>
				<el-main style="margin-top: 2.5rem; padding: .3rem;margin-bottom: 2rem;">
					<el-row>
						<el-col :span='5'></el-col>
						<el-col :span='14'>
							<el-col :span='24' class="background-color-bai pin xiahua" style="line-height: 1rem;">
								<el-col :span='5' class="xiao-size cor-hui">{{dats.schoolName}}</el-col>
								<el-col :span='4' class="xiao-size cor-hui">资源作者：{{dats.userName}}</el-col>
								<el-col :span='6' class="xiao-size cor-hui">上传时间：{{dats.createTime}}</el-col>
								<el-col :span='3' class="xiao-size cor-hui">浏览量：{{dats.resView}}</el-col>
								<el-col :span='3' class="xiao-size cor-hui">下载量：{{dats.resDown}}</el-col>
								<el-col :span='3' style="text-align: right;">
									<el-button size="mini" type="primary" @click="xia(dats.resId)">下载</el-button>
								</el-col>
							</el-col>
							<iframe v-show="ifra" :src='src' width='100%' height='600px' frameborder='1'></iframe>
							<iframe v-show="pdfs" :src='urls' width='100%' height='600px' frameborder='1'></iframe>
							<img v-show="imgs" :src="url" width="100%" />
							<el-col :span='24' class="background-color-bai" v-show="mp4">
								<video-player v-show="mp4" ref="videoPlayer" class="video-player vjs-custom-skin" :playsinline="true" :options="playerOptions" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" />
							</el-col>
						</el-col>
						<el-col :span='5'></el-col>
					</el-row>
				</el-main>
			</el-container>
		</el-container>
		<a :href="sui" style="display: none" :download="download" id="a"></a>
	</div>
</template>

<script>
	import pdf from 'vue-pdf'
	import qs from 'qs'
	import 'video.js/dist/video-js.css'
	import 'vue-video-player/src/custom-theme.css'
	import { videoPlayer } from 'vue-video-player'
	import {ResSetDown ,ResSetView,ResK} from '@/api/home'
	export default {
		data() {
			return {
				currentPage: 0, // pdf文件页码
				pageCount: 0, // pdf文件总页数
				fileType: 'pdf', // 文件类型
				src: '', // pdf文件地址
				dats: '',
				url: '',
				urls: '',
				ifra: false,
				imgs: false,
				pdfs: false,
				mp4: false,
				sui: '',
				download: '',
				playerOptions: {
					// playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
					autoplay: false, // 如果true,浏览器准备好时开始回放。
					muted: false, // 默认情况下将会消除任何音频。
					loop: false, // 导致视频一结束就重新开始。
					preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
					language: 'zh-CN',
					aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
					fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
					sources: [{
						type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
						src: '' // url地址
					}],
					hls: true,
					poster: '', // 你的封面地址
					width: document.documentElement.clientWidth, // 播放器宽度
					notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
					controlBar: {
						timeDivider: true,
						durationDisplay: true,
						remainingTimeDisplay: false,
						fullscreenToggle: true // 全屏按钮
					}
				},
			}
		},
		components: {
			pdf,
			videoPlayer
		},
		methods: {
			xia() {

			},
			changePdfPage(val) {
				if(val === 0 && this.currentPage > 1) {
					this.currentPage--
				}
				if(val === 1 && this.currentPage < this.pageCount) {
					this.currentPage++
				}
			},

			// pdf加载时
			loadPdfHandler(e) {
				this.currentPage = 1 // 加载的时候先加载第一页
			},
			list(s) {
				let that = this
				ResK(s).then((res) => {
					that.dats = res.data.data
					that.download = that.dats.fileName
					if(/\.(png|PNG|jpeg|bmp|jpg|webp)$/.test(that.dats.fileName)) {
						that.url = that.dats.serverHttp + that.dats.fileName
						that.imgs = true
						that.ifra = false
						that.pdfs = false
						that.mp4 = false
						that.sui = that.url
					} else if(/\.(pdf|PDF)$/.test(that.dats.fileName)) {
						that.urls = that.dats.serverHttp + that.dats.fileName
						that.imgs = false
						that.ifra = false
						that.pdfs = true
						that.mp4 = false
						that.sui = that.urls
					} else if(/\.(mp4|mov)$/.test(that.dats.fileName)) {
						that.playerOptions.sources[0].src = that.dats.serverHttp + that.dats.fileName
						that.imgs = false
						that.ifra = false
						that.pdfs = false
						that.mp4 = true
						that.sui = that.playerOptions.sources[0].src
					} else {
						that.src = 'https://view.officeapps.live.com/op/view.aspx?src=' + that.dats.serverHttp + that.dats.fileName
						that.ifra = true
						that.imgs = false
						that.pdfs = false
						that.mp4 = false
						that.sui = that.dats.serverHttp + that.dats.fileName
					}
				}).catch(() => {

				})
			},
			xia(s) {
				let that = this
				let params = {
					"resId": s,
				}
				ResSetDown(params).then((res) => {
					that.dats.resDown++
					window.open(that.sui)
				}).catch(() => {

				})
			},
			liu(s) {
				let that = this
				let params = {
					"resId": s,
				}
				ResSetView(params).then((res) => {
					that.list(s)
				}).catch(() => {

				})
			},
			onPlayerPlay(player) {
				//				alert("play");
			},
			onPlayerPause(player) {
				//				alert("pause");
			},

		},
		computed: {
//			player() {
//				return this.$refs.videoPlayer.player
//			}
		},
		mounted() {
			let id = this.$route.query.id;
			this.liu(id)
		},
	}
</script>

<style>
	.video-js .vjs-big-play-button {
		height: 2em;
		width: 2em;
		line-height: 2em;
		border-radius: 1em;
	}
	.video-js .vjs-modal-dialog {
		border: 1px solid #545454;
	}
	.vjs-custom-skin > .video-js .vjs-big-play-button{
		left: 53%;
	}
	.video-js .vjs-big-play-button {
		border: none;
		background: #dd6058;
	}
	.video-js .vjs-big-play-button .vjs-icon-placeholder:before {
		font-size: 1.5rem;
	}
</style>