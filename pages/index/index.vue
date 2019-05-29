<template>
	<view class="page">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" :circular="true" class="swiper-img">
			<swiper-item v-for="(item,index) in swiperItem" :key="index">
				<image :src="item.image" mode="widthFix" class="img"></image>
			</swiper-item>
		</swiper>
		
		<view class="page_block hot">
			<image src="../../static/icos/hot.png" class="hot_img"></image>
			<text class="hot_title">热门超英</text>
			<view>
				<scroll-view scroll-x="true" class="hot_scroll">
					<view class="hot_content">
						<view class="hotList" v-for="(item,index) in hotItem" :key="index">
							<image :src="item.cover" class="img"></image>
							<view class="name">{{item.name}}</view>
							<stars :score="item.score" :showScore="true"></stars>
						</view>						
					</view>
				</scroll-view>
			</view>
		</view>
		
		<view class="page_block hot">
			<image src="../../static/icos/interest.png" class="hot_img"></image>
			<text class="hot_title">热门预告</text>
			
			<view class="hot_movies">
				<video 
				:id="item.id"
				class="movie"
				v-for="(item,index) in noticeItem" 
				:key="index" 
				:src="item.trailer" 
				:poster="item.poster"
				:danmu-list="danmuList"
				enable-danmu
				@play="playmove"
				controls>
				</video>
			</view>
		</view>

		<view class="page_block hot">
			<image src="../../static/icos/guess-u-like.png" class="hot_img"></image>
			<text class="hot_title">猜你喜欢</text>
			<view class="like_movies" v-for="(item,index) in likeItem" :key="index">
				<image :src="item.cover" class="img_poster"></image>
				<view class="details">
					<view class="name">
						{{item.name}}
					</view>
					<view class="">
						<stars :score="item.score" :showScore="false"></stars>
					</view>
					<view class="">
						{{item.basicInfo}}
					</view>
					<view class="">
						{{item.releaseDate}}
					</view>
				</view>
				<view class="zan">
					<image src="../../static/icos/praise.png" class="praise" @click="dianzan(index)"></image>
					<view class="">
						赞一下
					</view>
					<view :animation="animationDataArr[index]" class="animation-opacity">
						+1
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import stars from '../../components/stars.vue'
	import {swiper,hot,notice,like} from '../../api/http.js'
	export default {
		data() {
			return {
				title:"hello",
				swiperItem:[],
				hotItem:[],
				noticeItem:[],
				likeItem:[],
				animationData:{},
				animationDataArr:[],
				danmuList: [{
						text: '真精彩',
						color: '#ff0000',
						time: 1
					},
					{
						text: '233333',
						color: '#ffcccc',
						time: 2
					},
					{
						text: '66666',
						color: '#ff00ff',
						time: 3
					}
				],				
			}
		},
		components: {
			stars
		},
		onLoad() {
			// #ifdef APP-PLUS || MP-WEIXIN
			// 在页面创建的时候，创建一个临时动画对象
			this.animation = uni.createAnimation();
			// #endif
			swiper().then(res=>{
				// console.log(res)
				this.swiperItem = res.data
			})
			
			hot().then(res=>{
				// console.log(res)
				this.hotItem = res.data
			})
			
			notice().then(res=>{
				// console.log(res)
				this.noticeItem = res.data
			})
			
			this.getLikeData()
		},
		onPullDownRefresh() {
			this.getLikeData()
		},
		methods: {
			gotest(){
				uni.navigateTo({
					url:"../test/test"
				})
			},
			
			getLikeData(){
				uni.showLoading({
					mask:true
				})
				uni.showNavigationBarLoading()
				like().then(res=>{
					if(res.status == 200){
						this.likeItem = res.data
					}
				})
			},
			
			// 播放一个视频的时候，需要暂停其他正在播放的视频
			playmove(e){
				var	trailerId = e.currentTarget.id;
				this.videoContext = uni.createVideoContext(trailerId)
				for(var i=0;i<this.noticeItem.length;i++){
					if(this.noticeItem[i].id != trailerId){
						uni.createVideoContext(this.noticeItem[i].id).pause()
					}
				}
			},
			
			dianzan(index){
				// #ifdef APP-PLUS || MP-WEIXIN
				this.animation.translateY(-60).opacity(1).step({
					duration: 400
				});
				this.animationData = this.animation;
				this.animationDataArr[index] = this.animationData.export();
				
				setTimeout(()=>{
					this.animation.translateY(0).opacity(0).step({
						duration: 0
					});
					this.animationData = this.animation;
					this.animationDataArr[index] = this.animationData.export();
				},500)					
				// #endif
			}
			
		}
	}
</script>

<style lang="scss">
.swiper-img{
	width: 100%;
	height: 440upx;
	.img{
		width: 100%;
		height: 100%;
	}
}
.hot{
	margin-top: 12upx;
	padding: 0 15upx;
	.hot_img{
		width: 36upx;
		height: 36upx;
	}
	.hot_title{
		font-size: 46upx;
		font-weight: bold;
		margin-left: 20upx
	}
	.hot_scroll{
		white-space: nowrap;
		margin-top: 20upx;
		.hot_content{
			display: flex;
			justify-content: space-between;
		}
		.hotList{
			width: 240upx;
			margin-right: 15upx;
			.img{
				width: 240upx;
				height: 320upx;
			}
			.name{
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
	}
}
.hot_movies{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.movie{
		width: 350upx;
		height: 240upx;
		margin-top: 15upx;
	}
}

.like_movies{
	display: flex;
	justify-content: space-between;
	margin-top:30upx;
	.img_poster{
		width: 220upx;
		height: 290upx;
		border-radius: 15upx
	}
	.details{
		width: 280upx;
		color: grey;
		font-size: 14px;
		.name{
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			color: black;
			font-size: 18px;
		}
	}
	.zan{
		width: 150upx;
		font-size: 14px;
		color: #feab2a;
		border-left: dashed 2px #cccccc;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.praise{
			width: 40upx;
			height: 40upx;
		}
		.animation-opacity {
			font-weight: bold;
			opacity: 0;
		}
	}

}



</style>
