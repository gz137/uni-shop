<template>
	<view>
		<!-- 顶部搜索区域 -->
		<view class="search-box">
			<my-search @searchClick="goSearch"></my-search>
		</view>

		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!-- 分类导航区域 -->
		<view id="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>

		<view id="floor-list">
			<view v-for="(item,index) in floorList" :key="index" class="floor-item">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-img-box">
					<navigator :url="item.product_list[0].url" class="left">
						<image :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="right">
						<navigator :url="item2.url" v-for="(item2,index2) of item.product_list.slice(1)" :key="index2">
							<image :src="item2.image_src" :style="{width:item2.image_width + 'rpx'}" mode="widthFix">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'

	export default {
		mixins: [badgeMix],
		data() {
			return {
				swiperList: [], //轮播图数据
				navList: [], // 分类导航数据
				floorList: [] // 数据
			};
		},
		// 页面加载
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			// 获取数据
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message
			},

			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},

			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.floorList = res.message
				this.floorList.forEach(floor => {
					floor.product_list.forEach(item => {
						item.url = `/subpkg/goods_list/goods_list?${item.navigator_url.split('?')[1]}`
					})
				})
			},

			// 分类导航点击事件
			navClickHandler(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},

			// 跳转搜索页
			goSearch() {
				uni.navigateTo({
					url: `/subpkg/search/search`
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
		}
	}

	#nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-item {
			image {
				width: 128rpx;
				height: 140rpx;
			}
		}
	}

	#floor-list {
		.floor-item {
			.floor-title {
				width: 100%;
				height: 60rpx;
				display: flex;
			}

			.floor-img-box {
				display: flex;

				.left {
					padding-left: 10rpx;
				}

				.right {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
				}
			}
		}
	}
</style>
