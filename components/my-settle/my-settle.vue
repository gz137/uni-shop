<template>
	<view class="settle-container">
		<label class="radio" @click="changeAllState">
			<radio color="#c00000" :checked="isFullChecked" /><text>全选</text>
		</label>

		<view class="amount-box">
			合计：<text class="amount">￥{{checkedGoodAmount}}</text>
		</view>

		<view class="btn-settle">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'

	export default {
		name: "my-settle",
		computed: {
			...mapGetters('cart', ['total', 'checkedCount', 'checkedGoodAmount']),

			isFullChecked() {
				return this.total === this.checkedCount
			}
		},
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('cart', ['updateAllGoodsState']),

			changeAllState() {
				this.updateAllGoodsState(!this.isFullChecked)
			}
		}
	}
</script>

<style lang="scss">
	.settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			.amount {
				color: #c00000;
				font-weight: bold;
			}
		}

		.btn-settle {
			background-color: #c00000;
			height: 50px;
			color: white;
			line-height: 50px;
			min-width: 100px;
			text-align: center;
		}
	}
</style>
