<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-search-bar @input="input" :focus="true" v-model="searchValue" radius="30" cancelButton="none"></uni-search-bar>
		</view>
		
		<!-- 搜索建议 -->
		<view class="suggest-list" v-if="searchValue !== ''">
			<view v-for="(item,index) in suggestList" :key="index" class="suggest-item" @click="goDetail(item)">
				<text>{{item.goods_name}}</text>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box" v-else-if="historyList.length > 0">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="18" @click="cleanHistory"></uni-icons>
			</view>
			
			<view class="history-list">
				<uni-tag customStyle="background-color:white;border:0;color:black" :text="item" v-for="(item,index) in histories" :key="index" @click="goGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
import { set } from 'lodash';
	export default {
		data() {
			return {
				searchValue:'',		// 搜索关键字
				suggestList:[],		// 搜索建议
				historyList:[]		// 搜索历史
			};
		},
		computed:{
			histories(){
				return [...this.historyList].reverse()
			}
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('searchHistory') || '[]')
		},
		methods:{
			input(){
				this.getSuggestList()
			},
			
			// 获取搜索建议
			getSuggestList:uni.$_.debounce(async function(){
				if(this.searchValue === '') return this.suggestList = []
				const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.searchValue})
				if(res.meta.status !== 200) return uni.$showMsg()
				this.suggestList = res.message
				this.saveHistory()
			},500),
			
			// 保存历史记录
			saveHistory(){
				const set = new Set(this.historyList)
				set.delete(this.searchValue)
				set.add(this.searchValue)
				this.historyList = Array.from(set)
				uni.setStorageSync('searchHistory',JSON.stringify(this.historyList))
			},
			
			// 清除历史记录
			cleanHistory(){
				uni.removeStorageSync('searchHistory')
				this.historyList = []
			},
			
			goDetail(item){
				uni.navigateTo({
					url:`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`
				})
			},
			
			goGoodsList(item){
				uni.navigateTo({
					url:`/subpkg/goods_list/goods_list?query=${item}`
				})
			}
		}
	}
</script>

<style lang="scss">
.search-box{
	background-color: #c00000;
	position: sticky;
	top: 0;
	z-index: 999;
}

.suggest-list{
	padding: 0 5px;
	
	.suggest-item{
		font-size: 12px;
		padding: 13px 0;
		border-bottom: 1px solid #efefef;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		text{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 3px;
		}
	}
}

.history-box{
	padding: 0 5px;
	
	.history-title{
		display: flex;
		height: 40px;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		font-weight: bold;
		border-bottom: 1px solid gray;
	}
	
	.history-list{
		display: flex;
		flex-wrap: wrap;
		
		uni-tag{
			margin: 5px 5px 0 0;
		}
	}
}
</style>
