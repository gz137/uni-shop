<template>
	<view>
		<my-login v-if="!token"></my-login>

		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState
	} from 'vuex'

	export default {
		mixins: [badgeMix],
		computed: {
			...mapState('user', ['token'])
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">

</style>
