<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}">
		<view class="my-search-box" :style="{'border-radius':radius+'px'}" @click="searchHandler">
			<uni-icons type="search" size="18"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			bgcolor:{
				type:String,
				default:'#c00000'
			},
			radius:{
				type:Number,
				default:15
			}
		},
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			searchHandler(){
				this.$emit('searchClick')
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	height: 50px;
	padding: 0 10px;
	
	.my-search-box{
		background-color: #fff;
		height: 36px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>