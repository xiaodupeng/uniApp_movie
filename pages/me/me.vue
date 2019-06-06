<template>
	<view class="page">
		<view class="header_content">
			<view style="display: flex;align-items: center;">
				<image class="header_img" :src="header" mode=""></image>
				
				
				<view v-if="show">
					<view class="username">
						{{userInfo.username}}
					</view>
					<view class="nickname">
						账号:{{userInfo.nickname}}
					</view>
				</view>
				
				<navigator v-else="" url="../registLogin/registLogin"><text class="login">登录/注册</text></navigator>
			</view>
			
			<view v-if="show">
				<navigator url="../meInfo/meInfo"><image class="settings" src="../../static/icos/settings.png" mode=""></image></navigator>
			</view>
		</view>
	</view>

</template>

<script>

	export default {
		data() {
			return {
				show:false,
				userInfo:{},
				header:"http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_-5-AFyVyAABLIH8xBTw233.png"
			}
		},
		onLoad () {
			
		},//vue 的 created
		onShow () {
			 var user = this.getGlobalUser('globalUser')
			 console.log(user)
			 if(user!=null){
				 this.userInfo = user
				 this.header = user.faceImage
				 this.show = true;
			 }else{
				this.userInfo = {};
				this.header = 'http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_-5-AFyVyAABLIH8xBTw233.png'
				this.show = false;
			 }
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.header_content{
		padding: 150upx 50upx 50upx 50upx;
		background-color: #ffd655;
		background: url(http://122.152.205.72:88/group1/M00/00/03/CpoxxFwu_1OAYFAIAAAzO_Q1tPg693.png) repeat;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.header_img{
			width: 120upx;
			height: 120upx;
			border-radius: 50%;
			margin-right: 60upx;
		}
		.settings{
			width: 40upx;
			height: 40upx;
		}
		.login{
			color: #6a5018;
			font-size: 18px;
			font-weight: 700;
		}
		.username{
			color: #6a5018;
			font-size: 18px;
			font-weight: 700;
		}
		.nickname{
			color: #a38e62;
			font-size: 14px;
			margin-top: 10upx;
		}
	}


</style>
