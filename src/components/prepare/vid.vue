<template>
	<div>
		<el-container>
			<el-header class="fix">
				<el-row>
					<el-col :span='5'></el-col>
					<el-col :span='14'>
						{{dats.resTitle}}
						<span class="cor-hui huidi xiao-size pin7">{{dats.bookName}}</span>
					</el-col>
					<el-col :span='5'></el-col>
				</el-row>
			</el-header>
			<el-container>
				<el-main style="margin-top: 2.5rem; padding: .3rem;">
					<el-row>
						<el-col :span='5'></el-col>
						<el-col :span='14'>
							<el-col :span='24' class="background-color-bai pin xiahua" style="line-height: 1rem;">
								<el-col :span='6' class="xiao-size cor-hui">{{dats.schoolName}}</el-col>
								<el-col :span='3' class="xiao-size cor-hui">资源作者：{{dats.userName}}</el-col>
								<el-col :span='6' class="xiao-size cor-hui">上传时间：{{dats.createTime}}</el-col>
								<el-col :span='3' class="xiao-size cor-hui">浏览量：</el-col>
								<el-col :span='3' class="xiao-size cor-hui">下载量：{{dats.resDown}}</el-col>
								<el-col :span='3' style="text-align: right;">
									<el-button size="mini" type="primary">下载</el-button>
								</el-col>
							</el-col>
							<el-col :span='24' class="background-color-bai">
								<video-player ref="videoPlayer" class="video-player vjs-custom-skin" :playsinline="true" :options="playerOptions" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" />
							</el-col>
						</el-col>
						<el-col :span='5'></el-col>
					</el-row>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
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
						src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm' // url地址
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
				dats:''
			}
		},
		methods: {
			list(s){
				let that = this
				this.$http.get(that.$hosh + '/res/'+s, {
					headers: {
						'token': localStorage.getItem("token")
					}
				}).then(function(res) {
					that.dats=res.data.data
				}).catch(function(err) {
				})
			}
		},
		mounted() {
			let id = this.$route.query.id;
			this.list(id)
		},
	}
</script>

<style>

</style>