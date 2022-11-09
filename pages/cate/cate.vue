<template>
	<view>
		<!-- 内容主体区域 -->
		<view id="scroll-container" :style="{height: wh + 'px'}">
			<!-- 一级分类区域 -->
			<scroll-view scroll-y="true" id="left-scroll">
				<view :class="['left-scroll-item',i === active ? 'active' : '']" v-for="(item,i) in cateList" :key="i" @click="activeHandler(i)">{{item.cat_name}}</view>
			</scroll-view>
			
			<!-- 二级分类区域 -->
			<scroll-view scroll-y="true" id="right-scroll" :scroll-top="scrollTop">
				<view class="right-scroll-item" v-for="(item,i) in level2List" :key="i">
					<view class="right-scroll-item-title">
						/ {{item.cat_name}} /
					</view>
					
					<!-- 三级分类区域 -->
					<view class="right-scroll-item-container">
						<view v-for="(item2,i2) in item.children" :key="i2" @click="goGoodsList(item2)">
							<image :src="item2.cat_icon.replace('dev','web')" mode="widthFix"></image>
							<text>{{item2.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh:0,	// 当前设备可使用高度
				cateList:[],		//列表
				active:0,
				level2List:[],		// 二级分类菜单列表
				scrollTop:0		// 右侧滚动条距离顶部的距离
			};
		},
		onLoad() {
			this.getSysInfo()
			this.getCateList()
		},
		methods:{
			// 获取当前设备信息
			getSysInfo(){
				const sysInfo = uni.getSystemInfoSync()
				this.wh = sysInfo.windowHeight
			},
			
			async getCateList(){
				const {data:res} = await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status !== 200) return uni.showMsg()
				this.cateList = res.message
				this.level2List = this.cateList[this.active].children
			},
			
			activeHandler(i){
				this.active = i
				this.level2List = this.cateList[this.active].children
				this.scrollTop = Math.random()
			},
			
			// 跳转商品列表页
			goGoodsList(data){
				uni.navigateTo({
					url:`/subpkg/goods_list/goods_list?cid=${data.cat_id}`
				})
			}
		}
	}
</script>

<style lang="scss">
#scroll-container{
	display: flex;
	
	#left-scroll{
		width: 240rpx;
		
		.left-scroll-item{
			background-color: #F7F7F7;
			line-height: 60px;
			font-size: 12px;
			text-align: center;
			
			&.active{
				background-color: #ffffff;
				position: relative;
				
				&::before{
					content: '';
					display: block;
					width: 3px;
					height: 30px;
					background-color: red;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
					position: absolute;
				}
			}
		}
	}
	
	#right-scroll{
		width: 510rpx;
		background-color: white;
		
		.right-scroll-item{
			.right-scroll-item-title{
				font-size: 12px;
				font-weight: bold;
				padding: 15rpx 0;
				text-align: center;
			}
			
			.right-scroll-item-container{
				display: flex;
				flex-wrap: wrap;
				font-size: 12px;
				
				& view{
					width: 33.3%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin-bottom: 10px;
					
					image{
						width: 120rpx;
						height: 120rpx;
					}
				}
			}
		}
	}
}
</style>
