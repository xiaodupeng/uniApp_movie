<template>
	<view class="">
		<view class="content" v-for="(item, index) in student" :key="index">
			<text :class="[isred?'red':'blue']">{{item.name}}</text>
		</view>
	</view>

</template>

<script>

	export default {
		data() {
			return {
				title:"about",
				student:[
					{name:"hh",age:18},
					{name:"dd",age:19},
				],
				test:true,
				isred:false
			}
		},
		onLoad () {
			console.log("created")
		},//vue 的 created
		onReady () {
			console.log("onReady")
		},//vue 的 mounted
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.content{
		// background: firebrick;
		// .title{
		// 	color: red
		// }
	}
	.red{
		color: red
	}
	.blue{
		color: blue
	}


</style>
