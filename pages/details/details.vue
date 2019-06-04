<template>
	<view class="page">
		<video :src="Details.trailer" id="myTrailer" :poster="Details.poster" controls class="video_title"></video>
		
		<view class="movie_body">
			<view class="img_box">
				<image :src="Details.cover" class="image_left"></image>
			</view>
			
			<view class="right">
				<view class="name">
					{{Details.name}}
				</view>
				<view class="basic-info">
					{{Details.basicInfo}}
				</view>
				<view class="basic-info">
					{{Details.originalName}}
				</view>
				<view class="basic-info">
					{{Details.totalTime}}
				</view>		
				<view class="basic-info">
					{{Details.releaseDate}}
				</view>	
													
                 <view class="score-block">
					 <view>
						<view class="socre-words">
							综合评分：
						</view>
						<view class="movie-score">
							{{Details.score}}
						</view>					 	
					 </view>
					<view class="socre-stars">
						<stars :score="Details.score" :showScore="false"></stars>
						<view class="prise-counts">
							{{Details.prisedCounts}}人点赞
						</view>
					</view>
                 </view>													
			</view>
		</view>
		
		<view class="line-wapper"></view>
		
		<view class="plots-block">
			<view class="plots-words">
				剧情介绍
			</view>
			<view class="plots-desc">
				{{Details.plotDesc}}
			</view>
		</view>
		
		<view class="actor-block">
			<view class="plots-words">
				演职人员
			</view>
			<scroll-view scroll-x class="scroll-list">
				<view class="actor-wapper" v-for="(director,staffIndex) in DirectorActor" :key="staffIndex">
					<image 
						:src="director.photo"
						class="single-actor"
						mode="aspectFill"
						@click="lookstaff(DirectorActor,staffIndex)"
					></image>
					<view class="actor-name">{{director.name}}</view>
					<view class="actor-role">{{director.actName}}</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="scroll-block">
			<view class="plots-words">剧照</view>
			<scroll-view scroll-x class="scroll-list">
				<image 
					v-for="(img, imgIndex) in plotPicsArr"
					:src="img"
					@click="lookMe(imgIndex)"
					:key="imgIndex"
					class="plot-image"
					mode="aspectFill"
				></image>
			</scroll-view>
		</view>		
	
	
	</view>
</template>

<script>
	import stars from '../../components/stars.vue'
	import {details,directorActor} from '../../api/http.js'
	export default {
		data() {
			return {
				Details:{},
				plotPicsArr:[],
				director:[],
				Actor:[],
				DirectorActor:[]
			}
		},
		components: {
			stars
		},		
		onLoad(options) {
			// 通过api修改导航栏的属性
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#000000"
			});
			this.getDetails(options.id)
			this.getDirectorActor(options.id)
		},
		// 页面初次渲染完成，获得视频上下文对象
		onReady() {
			this.videoContext = uni.createVideoContext('myTrailer');
		},
		onHide() {
			// 页面被隐藏的时候，暂停播放
			this.videoContext.pause();
		},
		methods: {
			async getDetails(id){
				 await details(id).then(res=>{
					this.Details = res.data	
					this.plotPicsArr = JSON.parse(res.data.plotPics)	
				})
			},
			
			//获取导演和演员
			async getDirectorActor(id){
				await directorActor(id,1).then(res=>{
					this.director = res.data
				})
				await directorActor(id,2).then(res=>{
					this.Actor = res.data
				})
				this.DirectorActor = this.director.concat(this.Actor)
			},
			
			lookstaff(DirectorActor,index){
				var urls = [];
				DirectorActor.forEach((item)=>{
					urls.push(item.photo)
				})
				uni.previewImage({
					current:urls[index],
					urls:urls
				})
			},
			lookMe(index) {
				uni.previewImage({
					current: this.plotPicsArr[index],
					urls: this.plotPicsArr
				})
			},			
		}
	}
</script>

<style lang="scss">
	.video_title{
		width: 100%;
		height: 440upx
	}
	.plots-words{
		color: #a9a9a9;
		font-size: 14px;
	}
	.movie_body{
		padding: 30upx 20upx;
		display: flex;
		justify-content: flex-start;
		.img_box{
			.image_left{
				width: 280upx;
				height: 400upx
			}
		}
	
		.right{
			margin-left: 20upx;
			.name{
				font-size: 25px;
			}
			.basic-info{
				width: 400upx;
				color: #a9a9a9;
				font-size: 13px;
				line-height: 15px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis
			}
			.score-block{
				background-color: #fff;
				margin-top: 8px;
				width: 380upx;
				height: 110upx;
				padding: 18upx;
				display: flex;
				justify-content: space-around;
				.socre-words{
					font-size: 12px;
					color: grey;
				}
				.movie-score{
					font-size: 26px;
					font-weight: 700;
					margin-left: 3px;
					color: #feab2a;
					line-height: 34px;
				}
				.prise-counts{
					font-size: 12px;
					color: grey;
					line-height: 18px;
				}
			}
		}
	}
	.line-wapper{
		margin: 0 20upx;
		height: 1px;
		background-color: #dbdbda;
	}
	.plots-block{
		padding: 20upx 30upx;
		.plots-desc{
			margin-top: 4px;
			font-size: 16px;
		}
	}
	.actor-block{
		padding: 10upx 30upx;
	}
	.scroll-list{
		width: 100%;
		white-space: nowrap;
		margin-top: 20upx;
		.actor-wapper{
			display: inline-block;
		}
		.single-actor{
			width: 170upx;
			height: 240upx;
			margin-right: 10upx;
		}
		.actor-name{
			width: 170upx;
			text-align: center;
			font-size: 15px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.actor-role {
			width: 170upx;
			text-align: center;
			font-size: 13px;
			color: #A9A9A9;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	
	.scroll-block{
		padding: 20upx 30upx;
		.plot-image{
			width: 220upx;
			height: 320upx;
			margin-right: 10upx;
		}
	}


</style>
