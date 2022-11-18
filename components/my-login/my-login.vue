<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" class="btn-login">一键登录</button>
		<view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-login",
		computed: {
			...mapState('user', ['redirectInfo'])
		},
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),

			getUserInfo(e) {
				if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('用户登录授权失败！')

				this.updateUserInfo(e.detail.userInfo)

				this.getToken(e.detail)
			},

			async getToken(info) {
				const [err, res] = await uni.login().catch(err => err)

				if (res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！')

				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}

				// const {
				// 	data: loginResult
				// } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				// if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
				// this.updateToken(loginResult.message.token)
				this.updateToken('token')

				this.navigateBack()
			},

			navigateBack() {
				if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					uni.switchTab({
						url: this.redirectInfo.from,
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}

		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
