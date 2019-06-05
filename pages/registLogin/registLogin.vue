<template>
	<view>
		<view class="body">
			<form @submit="formSubmit">
				<view>
					<image class="img" src="../../static/icos/default-face.png" mode=""></image>
				</view>
				
				<view class="info-wapper">
					<text class="words-lbl">账号</text>
					<input name="username" type="text" value="" class="input" placeholder="请输入用户名" placeholder-class="graywords"/>
				</view>
				<view class="info-wapper">
					<text class="words-lbl">密码</text>
					<input name="password" type="text" value="" password="true" class="input" placeholder="请输入密码" placeholder-class="graywords"/>
				</view>
				<button type="primary" form-type="submit" style="margin-top: 60upx;width: 90%;">注册/登录</button>
			</form>
		</view> 
	</view>
</template>

<script>
	import {registLogin} from '../../api/http.js'
	export default {
		data() {
			return {
			};
		},
		methods:{
			formSubmit(e){
				console.log(e)
				var username = e.detail.value.username;
				var password = e.detail.value.password;
				registLogin(username,password).then(res=>{
					console.log(res)
					if (res.status == 200) {
						var userInfo = res.data;
						uni.setStorageSync("globalUser", userInfo);
						// 切换页面跳转，使用tab切换的api
						uni.switchTab({
							url: "../me/me"
						});
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.body{
		border-top: 1px solid #cccccc;
		padding: 0 40upx;
		.img{
			display: block;
			width: 180upx;
			height: 180upx;
			margin: 150upx auto;
		}
		.info-wapper{
			display: flex;
			border-bottom: solid 1px #dbdbda;
			padding-bottom: 15upx;
			justify-content: space-around;
			margin: 40upx 0;
			.words-lbl{
				color: grey;
			}
			.input{
				width: 480upx;
			}
		}
	}
</style>
