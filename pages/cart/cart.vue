<template>
	<view class="cart-container" :style="{height: wh + 'px'}" v-if="cart.length > 0">
		<my-address></my-address>

		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>

		<view class="cart-list">
			<uni-swipe-action>
				<view v-for="(item,index) in cart" :key="index" class="cart-item">
					<uni-swipe-action-item :right-options="options" @click="swipeActionClick(item)">
						<my-goods :goods="item" :showRadio="true" :showNumberBox="true" @radioChange="radioChange"
							@countChange="countChange"></my-goods>
					</uni-swipe-action-item>
				</view>
			</uni-swipe-action>
		</view>

		<my-settle></my-settle>
	</view>

	<view class="cart-empty" :style="{height: wh + 'px'}" v-else>
		<image src="@/static/cart-empty.png" class="empty-img"></image>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		mixins: [badgeMix],
		data() {
			return {
				wh: 0,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}]
			};
		},
		computed: {
			...mapState('cart', ['cart'])
		},
		onLoad() {
			this.getSysInfo()
		},
		methods: {
			...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount', 'deleteGoods']),

			// 获取当前设备信息
			getSysInfo() {
				const sysInfo = uni.getSystemInfoSync()
				this.wh = sysInfo.windowHeight - 50
			},

			radioChange(e) {
				this.updateGoodsState(e)
			},

			countChange(e) {
				this.updateGoodsCount(e)
			},

			swipeActionClick(item) {
				this.deleteGoods(item)
			}
		}
	}
</script>

<style lang="scss">
	.cart-container {
		background-color: white;
		padding-bottom: 50px;

		.cart-title {
			height: 40px;
			display: flex;
			align-items: center;
			font-size: 14px;
			padding-left: 5px;
			border-bottom: 1px solid #efefef;

			.cart-title-text {
				margin-left: 10px;
			}
		}
	}

	.cart-empty {
		background-color: white;
		padding-bottom: 50px;

		.empty-img {
			height: 100%;
			width: 100%;
		}
	}
</style>
