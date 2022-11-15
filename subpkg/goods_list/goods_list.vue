<template>
	<view class="goods-list">
		<view v-for="(item,index) in goodsList" :key="index" @click="goDetail(item)">
			<my-goods :goods="item"></my-goods>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					cid: '',
					query: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				isLoading: false
			};
		},

		onLoad(option) {
			this.queryObj.query = option.query || ''
			this.queryObj.cid = option.cid || ''

			this.getGoodsList()
		},

		// 上拉触底事件
		onReachBottom() {
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
			if (this.isLoading) return
			this.queryObj.pagenum += 1
			this.getGoodsList()
		},

		// 下拉刷新事件
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.isLoading = false
			this.total = 0
			this.goodsList = []

			this.getGoodsList(() => uni.stopPullDownRefresh())
		},

		methods: {
			// 获取商品列表数据
			async getGoodsList(cb) {
				this.isLoading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				cb && cb()
				this.isLoading = false
				if (res.meta.status !== 200) return uni.$showMsg()
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
			},

			goDetail(item) {
				uni.navigateTo({
					url: `/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-list {
		background-color: white;
	}
</style>
