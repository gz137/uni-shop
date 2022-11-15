export default {
	namespaced: true,

	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),

	mutations: {
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},

		updateAddress(state, address) {
			state.address = address
			this.commit('user/saveAddressToStorage')
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
