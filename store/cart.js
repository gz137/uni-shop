export default {
	namespaced: true,

	state: () => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),

	mutations: {
		saveToStorageSync(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},

		addToCart(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}

			this.commit('cart/saveToStorageSync')
		},

		updateGoodsState(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

			if (findResult) {
				findResult.goods_state = goods.goods_state
				this.commit('cart/saveToStorageSync')
			}
		},

		updateGoodsCount(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

			if (findResult) {
				findResult.goods_count = goods.goods_count
				this.commit('cart/saveToStorageSync')
			}
		},

		deleteGoods(state, goods) {
			state.cart = state.cart.filter(x => x.goods_id !== goods.goods_id)
			this.commit('cart/saveToStorageSync')
		},

		updateAllGoodsState(state, newState) {
			state.cart.forEach(x => x.goods_state = newState)
			this.commit('cart/saveToStorageSync')
		}
	},

	getters: {
		total(state) {
			return state.cart.reduce((previousValue, currentValue) => previousValue + currentValue.goods_count, 0)
		},
		checkedCount(state) {
			return state.cart.filter(x => x.goods_state)
				.reduce((previousValue, currentValue) => previousValue + currentValue.goods_count, 0)
		},
		checkedGoodAmount(state) {
			return state.cart.filter(x => x.goods_state)
				.reduce((previousValue, currentValue) => previousValue + currentValue.goods_count * currentValue
					.goods_price, 0)
				.toFixed(2)
		}
	}
}
