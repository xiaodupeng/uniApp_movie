<template>
	<view class="star_content">
		<view class="">
			<image v-for="yellow in yellowStar" :key="yellow" src="/static/icos/star-yellow.png" class="star_xing"></image>
		</view>
		
		<view class="">
			<image v-for="ban in banStar" :key="ban" src="/static/icos/star_ban.png" class="star_xing"></image>
		</view>
		
		<view class="">
			<image v-for="gray in grayStar" :key="gray" src="/static/icos/star-gray.png" class="star_xing"></image>
		</view>
		
		<text v-if="showScore">{{score}}</text>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				yellowStar:0,
				banStar:0,
				grayStar:0
			}
		
		},
		
		props:{
			score:0,
			showScore:""
		},
		created(){
			var Star = this.score / 2
			this.yellowStar = parseInt(this.score / 2)
			
			if(Star - this.yellowStar>=0.5){
				this.banStar = 1
			}
			
			this.grayStar = 5 - this.yellowStar - this.banStar
		}
	}
</script>

<style>
	.star_content{
		display: flex;
		justify-content: flex-start;
	}
	.star_xing{
		width: 24upx;
		height: 24upx;
	}
</style>
