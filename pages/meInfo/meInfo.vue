<template>
	<view class="page page-fill">
		<view class="infoList">
			<view class="header common" @click="operator">
				<text>头像</text>
				<view class="common_right">
					<image class="header_img" :src="userInfo.faceImage" mode=""></image>
					<image class="right" src="../../static/icos/left-gray-arrow.png" mode=""></image>
				</view>
			</view>
			<view class="name common">
				<text>昵称</text>
				<view class="common_right">
					<text class="gray-fields">{{userInfo.username}}</text>
					<image class="right" src="../../static/icos/left-gray-arrow.png" mode=""></image>
				</view>
			</view>
			<view class="day common">
				<text>生日</text>
				<view class="common_right">
					<text class="gray-fields">{{userInfo.birthday}}</text>
					<image class="right" src="../../static/icos/left-gray-arrow.png" mode=""></image>
				</view>
			</view>
			<view class="sex common">
				<text>性别</text>
				<view class="common_right">
					<text class="gray-fields">请选择</text>
					<image class="right" src="../../static/icos/left-gray-arrow.png" mode=""></image>
				</view>
			</view>
		</view>
		
		<view class="bottom">
			<view class="footer-words" @click="cleanStorage">
				清理缓存
			</view>
			<view class="footer-words" @click="logoutUser">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	import {logout} from '../../api/http.js'
 	export default {
		data() {
			return {
				userInfo:{},
			}
		},
		methods: {
			cleanStorage() {
				uni.clearStorageSync();
				uni.showToast({
					title: "清理缓存成功",
					mask: false,
					duration: 1500
				})
			},	
			operator(){
				var globalUser = this.getGlobalUser("globalUser");
				uni.showActionSheet({
					itemList: ["查看我的头像", "从相册选择上传"],
					success(res) {
						console.log(res)
						var index = res.tapIndex;
						if (index == 0) {
							// 预览头像
							var faceArr = [];
							faceArr.push(globalUser.faceImage);
							uni.previewImage({
								urls: faceArr,
								current: faceArr[0]
							})
						}else if(index == 1){
							uni.chooseImage({
								count:1,
								sizeType: ["compressed"],
								sourceType: ["album"],
								success(res) {
									console.log(res)
									var tempFilePath = res.tempFilePaths[0];
									uni.navigateTo({
										url: "../faceCrop/faceCrop?tempFilePath=" + tempFilePath
									})
								}
							})
						}
					}
				})
			},
			logoutUser(){
				logout(this.userInfo.id).then(res=>{
					if (res.status == 200) {
						// 如果服务器返回200，代表用户在服务端退出登录成功
						uni.removeStorageSync("globalUser");
						uni.switchTab({
							url: "../me/me"
						})
					}
				})
			}
		},
		onShow() {
			var user = this.getGlobalUser('globalUser')
			if(user!=null){
				 this.userInfo = user
			 }			
		}
	}
</script>

<style lang="scss">
	.page-fill{
		width: 100%;
		height: 100%;
		position: absolute;
	}
	.infoList{
		background: white;
		margin-top: 20upx;
		padding: 0 30upx;
		.common{
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #cccccc;
			padding: 25upx 0;
			.gray-fields{
				font-size: 14px;
				color: #a9a9a9;
			}
			.common_right{
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.header_img{
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
			}
			.right{
				width: 35upx;
				height: 30upx;
				margin-left: 10upx;
			}
		}	
		.sex{
			border-bottom: none;
		}
	}
	.bottom{
		position: fixed;
		bottom: 0;
		width: 100%;
		.footer-words{
			text-align: center;
			height: 80upx;
			line-height: 80upx;
			background: white;
			margin-top: 20upx;
		}
	}

</style>
