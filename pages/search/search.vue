<template>
	<view class="page">
		<view class="search_content">
			<view class="search_wapper">
				<image src="../../static/icos/search.png" class="search_img"></image>
				<input type="text" placeholder="找预告" maxlength="10" placeholder-style="font-size: 14px;" class="search_inp"/>				
			</view>
		</view>
		
		<view class="page_block conten_list">
			<view class="" v-for="(item,index) in searchItem" :key="index">
				<image :src="item.cover" class="search_imgs"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {search} from '../../api/http.js'
	export default {
		data() {
			return {
				searchItem:[]
			}
		},
		onLoad(){
			this.getSearchList()
		},
		onPullDownRefresh() {
			this.getSearchList()
		},
		methods: {
			random (lower, upper) {
				return Math.floor(Math.random() * (upper - lower)) + lower;
			},
			//随机获取列表1-6页内容
			getSearchList(){
				// console.log(this.random(1,6))
				let num = this.random(1,6)
				search(num).then(res=>{
					this.searchItem = res.data.rows
					console.log(res)
				})				
			}
		}
	}
</script>

<style lang="scss">
.search_content{
	position: fixed;
	// top:200;
	z-index: 9;
	background: #F8F8F8;
	.search_wapper{
		background: #eaeaea;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin:0 20upx 20upx;
		border-radius: 5upx;
		.search_img{
			width: 40upx;
			height: 40upx;
			margin: 0 10upx;
		}	
		.search_inp{
			width: 650upx;
			height: 25px;
			padding: 10upx 0;
		}			
	}
}

.conten_list{
	display: flex;
	padding: 0 30upx;
	justify-content: space-between;
	flex-wrap: wrap;
	padding-top:130upx;
	.search_imgs{
		width: 200upx;
		height: 260upx;
	}
}

</style>
