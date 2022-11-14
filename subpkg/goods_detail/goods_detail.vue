<template>
	<view class="good-container" v-if="goods_info.goods_name">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in goods_info.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>

		<!-- 商品信息区域 -->
		<view class="good-info">
			<view class="good-price">￥{{goods_info.goods_price}}</view>
			<view class="good-content">
				<view class="good-name">{{goods_info.goods_name}}</view>
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="good-yf">快递：免运费</view>
		</view>

		<!-- 商品详细信息 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>

		<view class="good-nav">
			<uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info: {},
				options: [{
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				customButtonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					}
				]
			};
		},
		onLoad(option) {
			this.getGoodsDetail(option.goods_id)
		},
		methods: {
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg()

				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;" ').replace(/webp/g, 'jpg')

				this.goods_info = res.message
			},

			// 轮播图预览
			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},

			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},

			buttonClick(e) {
				console.log(e);
			}
		}
	}
</script>

<style lang="scss">
	.good-container {
		background-color: white;
		padding-bottom: 50px;
	}

	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.good-info {
		padding: 10px;

		.good-price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.good-content {
			display: flex;

			.good-name {
				font-size: 13px;
				margin-right: 10px;
			}

			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		.good-yf {
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}
	}

	.good-nav {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}
</style>
