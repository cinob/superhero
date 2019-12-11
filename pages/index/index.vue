<template>
	<view class="page">
    <swiper :indicator-dots="true" :autoplay="true" class="carousel">
      <swiper-item v-for="item in carouseList" :key="item.id">
        <image :src="item.image" class="carousel"></image>
      </swiper-item>
    </swiper>
    
    <view class="page-block super-hot">
      <view class="hot-title-wapper">
        <image src="../../static/icos/hot.png" class="hot-ico"></image>
        <view class="hot-title">
          热门超英
        </view>
      </view>
    </view>
    
    <scroll-view scroll-x="true" class="page-block hot">
      <view v-for="item in hotList" :key="item.id" class="single-poster">
        <view class="poster-wapper">
          <image :src="item.cover" class="poster"></image>
          <view class="movie-name">
            {{item.name}}
          </view>
          <trailerStars :innerScore="item.score" :showNum="1"></trailerStars>
        </view>
      </view>
    </scroll-view>
    
    <view class="page-block super-hot">
      <view class="hot-title-wapper">
        <image src="../../static/icos/interest.png" class="hot-ico"></image>
        <view class="hot-title">
          热门预告
        </view>
      </view>
    </view>
    
    <view class="hot-movies page-block">
      <video
        v-for="item in trailerList"
        :key="item.id"
        :src="item.trailer"
        :poster="item.poster"
        class="hot-movie-single"
        controls
      ></video>
    </view>
    
    <view class="page-block super-hot">
      <view class="hot-title-wapper">
        <image src="../../static/icos/guess-u-like.png" class="hot-ico"></image>
        <view class="hot-title">
          猜你喜欢
        </view>
      </view>
    </view>
    
    <view class="page-block guess-u-like">
      <view v-for="(item,gIndex) in guessULikeList" :key="item.id" class="single-like-movie">
        <image :src="item.poster" class="poster"></image>
        <view class="movie-desc">
          <view class="movie-title">
            {{item.name}}
          </view>
          <trailerStars :innerScore="9.1" :showNum="0"></trailerStars>
          <view class="movie-info">
            {{item.basicInfo}}
          </view>
          <view class="movie-info">
            {{item.releaseDate}}
          </view>
        </view>
        <view class="movie-oper" :data-gIndex="gIndex" @click="praiseMe">
          <image src="../../static/icos/praise.png" class="praise-ico"></image>
          <view class="praise-me">点赞</view>
          <view :animation="animationDataArr[gIndex]" class="praise-me animation-opacity">+1</view>
        </view>
      </view>
    </view>
    
	</view>
</template>

<script>
import trailerStars from "../../components/trailerStars.vue"
export default {
  components: {
    trailerStars
  },
  data() {
    return {
      carouseList: [],
      hotList: [],
      trailerList: [],
      guessULikeList: [],
      animationData: {},
      animationDataArr: []
    }
  },
  onUnload() {
    this.animationData = {}
  },
  onLoad() {
    this.getCarouselList()
    this.getHotList()
    this.getTrailerList()
    this.getGuessULikeList()
    
    // #ifdef APP-PLUS || MP-WEIXIN
    this.animation = uni.createAnimation({
      duration: 400,
      timingFunction: "ease-out"
    })
    // #endif
  },
  methods: {
    praiseMe(e) {
      // #ifdef APP-PLUS || MP-WEIXIN
      const gIndex = e.currentTarget.dataset.gindex
      this.animation.translateY(-60).opacity(1).step()
      this.animationData = this.animation
      this.animationDataArr[gIndex] = this.animationData.export()
      
      setTimeout(function() {
        this.animation.translateY(0).opacity(0).step({
          duration: 0,
        })
        this.animationData = this.animation
        this.animationDataArr[gIndex] = this.animationData.export()
      }.bind(this), 500);
      // #endif
    },
    getGuessULikeList (callback) {
      uni.request({
        url: this.serverUrl + '/index/guessULike?qq=lee81280562',
        method: "POST",
        success: (res) => {
          if (res.data.status === 200) {
            this.guessULikeList = res.data.data
          }
          if (callback) {
            callback()
          }
        }
      });
    },
    getCarouselList () {
      uni.request({
        url: this.serverUrl + '/index/carousel/list?qq=lee81280562',
        method: "POST",
        success: (res) => {
          if (res.data.status === 200) {
            this.carouseList = res.data.data
          }
        }
      });
    },
    getHotList () {
      uni.request({
        url: this.serverUrl + '/index/movie/hot?qq=lee81280562&type=superhero',
        method: "POST",
        success: (res) => {
          if (res.data.status === 200) {
            this.hotList = res.data.data
          }
        }
      });
    },
    getTrailerList () {
      uni.request({
        url: this.serverUrl + '/index/movie/hot?qq=lee81280562&type=trailer',
        method: "POST",
        success: (res) => {
          if (res.data.status === 200) {
            this.trailerList = res.data.data
          }
        }
      });
    },
    refreshCallback() {
      uni.stopPullDownRefresh()
      uni.hideLoading()
      uni.hideNavigationBarLoading()
    }
  },
  onPullDownRefresh() {
    uni.showNavigationBarLoading()
    uni.showLoading({
      mask: true
    })
    this.getGuessULikeList(this.refreshCallback)
  }
}
</script>

<style lang="stylus">
@import '/../../common/globle.styl'

.carousel
  width: 100%
  height: 440rpx
.super-hot
  margin-top: 12rpx
  padding: 20rpx
  .hot-title-wapper
    flex(row)
    .hot-ico
      width: 30rpx
      height: 30rpx
      margin-top: 15rpx
    .hot-title
      font-size: 20px
      margin-left: 20rpx
      font-weight: blod
.hot
  width: 100%
  white-space: nowrap
  .single-poster
    display: inline-block
    margin-left: 20rpx
    .poster-wapper
      flex(column)
      .poster
        width: 200rpx
        height: 270rpx
      .movie-name
        width: 200rpx
        margin-top 11rpx
        font-size 14px
        font-weight bold
        ellipsis()
.hot-movies
  flex(row)
  flex-wrap wrap
  justify-content space-between
  padding 0 20rpx 20rpx
  .hot-movie-single
    width: 350rpx
    height 220rpx
    margin-top 10rpx
.guess-u-like
  flex(column)
  .single-like-movie
    flex(row)
    justify-content space-between
    padding 20rpx
    .poster
      width 180rpx
      height 240rpx
      border-radius 3%
    .movie-desc
      width 340rpx
      flex(column)
      .movie-title
        ellipsis()
      .movie-info
        color #808080
        font-size 14px
    .movie-oper
      width 140rpx
      flex(column)
      justify-content center
      border-left dashed 2px #dbdbda
      .praise-ico
        width 40rpx
        height 40rpx
        align-self center
      .praise-me
        color #feab2a
        font-size 14px
        align-self center
      .animation-opacity
        font-weight bold
        opacity 0
</style>
