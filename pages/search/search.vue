<template>
  <view class="page">
    <view class="search-block">
      <view class="search-ico-wapper">
        <image src="../../static/icos/search.png" class="search-ico"></image>
      </view>
      <input type="text" placeholder="搜索预告" maxlength="10" class="search-text" confirm-type="search" @confirm="searchMe"/>
    </view>
    
    <view class="movie-list page-block">
      <view v-for="item in searchList" :key="item.id" class="movie-wapper">
        <image :src="item.cover" :data-movieId="item.id" @click="showMovieDetail" class="poster"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchList: [],
      keywords: '',
      page: 1,
      pageSize: 15,
      totalPages: 0
    }
  },
  methods: {
    showMovieDetail (e) {
      uni.navigateTo({
        url: "../movie/movie?movieId=" + e.target.dataset.movieid
      })
    },
    getSearchList () {
      uni.showNavigationBarLoading()
      uni.showLoading({
        mask: true,
        title: '请稍后...'
      })
      uni.request({
        url: this.serverUrl + '/search/list?'+this.key+'&keywords='+this.keywords+'&page='+this.page+'&pageSize='+this.pageSize,
        method: "POST",
        success: (res) => {
          if (res.data.status === 200) {
            if (this.searchList.length > 0) {
              this.searchList = this.searchList.concat(res.data.data.rows)
            } else {
              this.searchList = res.data.data.rows
            }
            this.totalPages = res.data.data.total
            this.page = res.data.data.page
          }
        },
        complete: () => {
          uni.hideLoading()
          uni.hideNavigationBarLoading()
        }
      })
    },
    searchMe (e) {
      this.keywords = e.detail.value
      this.searchList = []
      this.page = 1
      this.getSearchList ()
    }
  },
  onLoad() {
    this.getSearchList()
  },
  onReachBottom() {
    const p = this.page + 1
    if (p > this.totalPages) {
      return ;
    }
    this.page = p
    this.getSearchList()
  }
}
</script>

<style lang="stylus">
@import '/../../common/globle.styl'

.search-block
  flex(row)
  padding 0 20rpx 20rpx
  position fixed
  top: 100
  z-index 2000
  background-color #F8F8F8
  .search-ico-wapper
    flex(column)
    justify-content center
    padding 0 10rpx
    background-color #eaeaea
    .search-ico
      height 40rpx
      width 40rpx
  .search-text
    font-size 14px
    background-color #eaeaea
    height 60rpx
    width 650rpx
.movie-list
  flex(row)
  flex-wrap wrap
  padding 100rpx 10rpx 0
  .movie-wapper
    padding 10rpx 20rpx
    .poster
      width 200rpx
      height 270rpx
      
</style>
