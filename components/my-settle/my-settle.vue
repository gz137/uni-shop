<template>
	<view class="settle-container">
		<label class="radio" @click="changeAllState">
			<radio color="#c00000" :checked="isFullChecked" /><text>全选</text>
		</label>

		<view class="amount-box">
			合计：<text class="amount">￥{{checkedGoodAmount}}</text>
		</view>

		<view class="btn-settle" @click="settleClick">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'

	export default {
		name: "my-settle",
		computed: {
			...mapState('user', ['token']),
			...mapGetters('cart', ['total', 'checkedCount', 'checkedGoodAmount']),
			...mapGetters('user', ['fullAddress']),

			isFullChecked() {
				return this.total === this.checkedCount
			}
		},
		data() {
			return {
				seconds: 3,
				timer: null
			};
		},
		methods: {
			...mapMutations('cart', ['updateAllGoodsState']),
			...mapMutations('user', ['updateRedirectInfo']),

			changeAllState() {
				this.updateAllGoodsState(!this.isFullChecked)
			},

			settleClick() {
				if (!this.token) return this.delayNavigate()

				if (!this.fullAddress) return uni.$showMsg('请选择收货地址！')

				if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
			},

			delayNavigate() {
				this.seconds = 3
				this.showTips(this.seconds)

				this.timer = setInterval(() => {
					this.seconds--

					if (this.seconds <= 0) {
						clearInterval(this.timer)

						uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								this.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})

						return
					}

					this.showTips(this.seconds)
				}, 1000)
			},

			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: `请登录后再结算！${n}秒之后自动跳转到登录页`
				})
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
