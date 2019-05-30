<template>
	<view class="page">
		<view class="search_content">
			<view class="search_wapper">
				<image src="../../static/icos/search.png" class="search_img"></image>
				<input type="text" confirm-type="search" @confirm="sure" placeholder="找预告" maxlength="10" placeholder-style="font-size: 14px;" class="search_inp"/>				
			</view>
		</view>
		
		<view class="page_block conten_list">
			<view class="" v-for="(item,index) in searchItem" :key="index">
				<image :src="item.cover" class="search_imgs"></image>
			</view>
			<view class="add_more" v-if="showMore">
				{{more}}
			</view>
		</view>
	</view>
</template>

<script>
	import {search} from '../../api/http.js'
	export default {
		data() {
			return {
				page:1,
				keywords:"",
				showMore:false,
				more:"加载更多...",
				searchItem:[]
			}
		},
		onLoad(){
			this.getSearchList()
		},
		onPullDownRefresh() {
			this.getSearchList()
			this.showMore = false
		},
		onReachBottom() {
			var page = ++this.page
			if(this.more == '我是有底线的'){
				return
			}
				
			search(this.keywords,page,15).then(res=>{
					this.showMore = true
				if(res.data.rows.length == 0){
					this.more = '我是有底线的'
				}else{
					this.more = '加载更多...'
					this.searchItem = this.searchItem.concat(res.data.rows)
				}
			})
			
		},
		methods: {
			random (lower, upper) {
				return Math.floor(Math.random() * (upper - lower)) + lower;
			},
			//随机获取列表1-6页内容
			getSearchList(){
				uni.showLoading({
					mask: true,
					title: "请稍后..."
				});
				let keywords = ""
				let num = this.random(1,6)
				let pageSize = ""
				search(keywords,num,pageSize).then(res=>{
					this.searchItem = res.data.rows
				})				
			},
			sure(e){
				this.page = 1
				this.more = ''
				this.keywords = e.detail.value;
				search(this.keywords,1,15).then(res=>{
					if(res.data.rows.length == 0){
						this.searchItem = []
						this.showMore = true
						this.more = '暂无数据'
					}else{
						this.searchItem = res.data.rows
					}
				})
			},
			
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
	padding: 0 20upx;
	justify-content: flex-start;
	flex-wrap: wrap;
	padding-top:130upx;
	.search_imgs{
		padding: 0 18upx;
		width: 200upx;
		height: 260upx;
		margin-top: 20upx;
	}
	.add_more{
		width: 100%;
		text-align: center;
	}
}


</style>
