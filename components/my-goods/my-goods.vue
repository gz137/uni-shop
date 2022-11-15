<template>
	<view class="goods-item">
		<view class="left">
			<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClick" />
			<image :src="goods.goods_small_logo"></image>
		</view>
		<view class="right">
			<text class="goods-name">{{goods.goods_name}}</text>
			<view class="goods-info">
				<text class="goods-price">￥{{goods.goods_price | tofixed}}</text>
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNumberBox" @change="countChange">
				</uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNumberBox: {
				type: Boolean,
				default: false
			}
		},

		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},

		data() {
			return {

			};
		},

		methods: {
			radioClick() {
				this.$emit('radioChange', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},

			countChange(val) {
				this.$emit('countChange', {
					goods_id: this.goods.goods_id,
					goods_count: +val
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		padding: 10px 5px;
		display: flex;

		.left {
			margin-left: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				width: 100px;
				height: 100px;
			}
		}

		.right {
			flex: 1;
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.goods-info {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.goods-price {
					font-size: 16px;
					color: #c00000;
				}
			}
		}
	}
</style>
