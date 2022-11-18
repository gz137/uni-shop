export default {
	namespaced: true,

	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		redirectInfo: null
	}),

	mutations: {
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},

		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},

		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		},

		updateAddress(state, address) {
			state.address = address
			this.commit('user/saveAddressToStorage')
		},

		updateUserInfo(state, userinfo) {
			state.userinfo = userinfo
			this.commit('user/saveUserInfoToStorage')
		},

		updateToken(state, token) {
			state.token = token
			this.commit('user/saveTokenToStorage')
		},

		updateRedirectInfo(state, redirectInfo) {
			state.redirectInfo = redirectInfo
		}
	},

	getters: {
		fullAddress(state) {
			if (!state.address.provinceName) return ''

			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		}
	}
}
