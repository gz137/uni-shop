<template>
	<view>
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="choossAddress">请选择收货地址+</button>
		</view>

		<view class="address-info-box" v-else @click="choossAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="name">收货人：{{address.userName}}</view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：{{address.telNumber}}</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="address">收货地址：{{fullAddress}}</view>
			</view>
		</view>

		<image src="/static/cart-border.png" class="address-border"></image>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'

	export default {
		name: "my-address",
		computed: {
			...mapState('user', ['address']),
			...mapGetters('user', ['fullAddress'])
		},
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('user', ['updateAddress']),

			async choossAddress() {
				const [err, succ] = await uni.chooseAddress().catch(err => err)
				if (err === null && succ.errMsg === 'chooseAddress:ok') {
					this.updateAddress(succ)
				}
			}
		}
	}
</script>

<style lang="scss">
	.address-choose-box {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-right {
				display: flex;
				justify-content: space-between;
			}
		}

		.row2 {
			margin-top: 10px;
		}
	}

	.address-border {
		display: block;
		height: 5px;
		width: 100%;
	}
</style>
