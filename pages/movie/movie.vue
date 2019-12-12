<template>
	<view class="page">
		<view class="player">
      <video id="myMovie" :src="movieInfo.trailer" :poster="movieInfo.poster" class="movie" controls></video>
    </view>
    
    <view class="movie-info">
      <navigator :url="'../cover/cover?cover='+movieInfo.cover">
        <image :src="movieInfo.cover" class="cover"></image>
      </navigator>
      <view class="movie-desc">
        <view class="title">{{movieInfo.name}}</view>
        <view class="basic-info">{{movieInfo.basicInfo}}</view>
        <view class="basic-info">{{movieInfo.originalName}}</view>
        <view class="basic-info">{{movieInfo.totalTime}}</view>
        <view class="basic-info">{{movieInfo.releaseDate}}</view>
        <view class="score-block">
          <view class="big-score">
            <view class="score-words">综合评分：</view>
            <view class="movie-score">{{movieInfo.score}}</view>
          </view>
          <view class="score-stars">
            <block v-if="movieInfo.score >= 0">
              <trailerStars :innerScore="movieInfo.score" showNum="0"></trailerStars>
            </block>
            <view class="prise-counts">
              {{movieInfo.prisedCounts}} 人点赞
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <breakLine></breakLine>
    
    <view class="plots-block">
      <view class="plots-title">剧情介绍</view>
      <view class="plots-desc">{{movieInfo.plotDesc}}</view>
    </view>
    
    <view class="scroll-block">
      <view class="plots-title">演职人员</view>
      <scroll-view scroll-x="true" class="scroll-list">
        <view class="actor-wapper" v-for="item in directorArr">
          <image :src="item.photo" class="single-actor" mode="aspectFill"></image>
          <view class="actor-name">{{item.name}}</view>
          <view class="actor-role">{{item.actName}}</view>
        </view>
        <view class="actor-wapper" v-for="item in actorArr">
          <image :src="item.photo" class="single-actor" mode="aspectFill"></image>
          <view class="actor-name">{{item.name}}</view>
          <view class="actor-role">{{item.actName}}</view>
        </view>
      </scroll-view>
    </view>
    
    <view class="scroll-block">
      <view class="plots-title">剧照</view>
      <scroll-view scroll-x="true" class="scroll-list">
        <image v-for="(item,index) in plotPicsArr" :key="index" :src="item" class="plot-image" mode="aspectFill" @click="lookMe" :data-imgIndex="index"></image>
      </scroll-view>
    </view>
    
	</view>
</template>

<script>
import trailerStars from "./../../components/trailerStars.vue"
import breakLine from "./../../components/breakLine.vue"
export default {
  components: {
    trailerStars,
    breakLine
  },
  data () {
    return {
      movieId: '',
      movieInfo: {},
      plotPicsArr: [],
      directorArr: [],
      actorArr: []
    }
  },
  methods: {
    lookMe (e) {
      uni.previewImage({
        urls: this.plotPicsArr,
        current: e.currentTarget.dataset.imgindex-0
      })
    },
    getActors (method) {
      uni.request({
        url: this.serverUrl + '	/search/staff/'+this.movieId+'/'+method+'?'+this.key,
        method: "POST",
        success: (res) => {
          if (res.data.status === 200) {
            if (method === 1) {
              this.directorArr = res.data.data
            } else if (method === 2) {
              this.actorArr = res.data.data
            }
          }
        }
      })
    },
    getMovieInfo () {
      uni.showNavigationBarLoading()
      uni.showLoading({
        mask: true,
        title: '请稍后...'
      })
      uni.request({
        url: this.serverUrl + '/search/trailer/'+this.movieId+'?'+this.key,
        method: "POST",
        success: (res) => {
          if (res.data.status === 200) {
            this.movieInfo = res.data.data
            uni.setNavigationBarTitle({
              title: this.movieInfo.name
            })
            this.plotPicsArr = JSON.parse(res.data.data.plotPics)
            this.getActors(1)
            this.getActors(2)
          }
        },
        complete: () => {
          uni.hideLoading()
          uni.hideNavigationBarLoading()
        },
      })
    }
  },
  onLoad(params) {
    this.movieId = params.movieId
    this.getMovieInfo()
    uni.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#000"
    })
  },
  onReady () {
    this.videoContext = uni.createVideoContext('myMovie')
  },
  onShow () {
    if (this.videoContext) {
      this.videoContext.play()
    }
  },
  onHide () {
    this.videoContext.pause()
  },
  onShareAppMessage (res) {
    return {
      title: this.movieInfo.name,
      path: '/pages/movie/movie?movieId='+this.movieId
    }
  },
  onNavigationBarButtonTap (e) {
    if (e.index === 0) {
      uni.share({
        provider: "weixin",
        scene: "WXSenceTimeline",
        type: 0,
        href: "https://cinob.github.io/movie/index.html#/pages/movie/movie?movieId=" + this.movieId,
        title: "超英预告：" + this.movieInfo.name,
        summary: "超英预告：" + this.movieInfo.name,
        imageUrl: this.movieInfo.cover,
        success: function (res) {
            console.log("success:" + JSON.stringify(res))
        },
        fail: function (err) {
            console.log("fail:" + JSON.stringify(err))
        }
      })
    }
  }
}
</script>

<style lang="stylus">
@import '/../../common/globle.styl'

.player
  background-color black
  .movie
    width 100%
    height 440rpx
.movie-info
  padding 40rpx 20rpx
  flex(row)
  background-color #f7f4f9
  .cover
    width 280rpx
    height 380rpx
  .movie-desc
    flex(column)
    margin-left 30rpx
    width 400rpx
    .title
      font-size 24px
    .basic-info
      color darkgray
      font-size 13px
      line-height 36rpx
      ellipsis()
    .score-block
      background-color white
      margin-top 20rpx
      width 360rpx
      height 90rpx
      padding 20rpx
      flex(row)
      justify-content flex-start
      box-shadow 3px 2px 10px #dedede
      .big-score
        .score-words
          font-size 12px
          color grey
        .movie-score
          font-size 26px
          font-weight bold
          margin-left 8rpx
          color #FEAB2A
          line-height 60rpx
      .score-stars
        .prise-counts
          font-size 12px
          color grey
          line-height 44rpx
.plots-block
  background-color #f7f4f9
  padding 20rpx 40rpx
  .plots-title
    color #a9a9a9
    font-size 14px
  .plots-desc
    margin-top 16px
.scroll-block
  background-color #f7f4f9
  padding 20rpx 40rpx
  .plots-title
    color #a9a9a9
    font-size 14px
    flex(column)
  .scroll-list
    width 100%
    white-space nowrap
    margin-top 20rpx
    .plot-image
      width 220rpx
      height 320rpx
      margin-right 10rpx
    .actor-wapper
      display inline-block
      height 100%
      .single-actor
        width 170rpx
        height 240rpx
        margin-right 10rpx
      .actor-name
        width 170rpx
        text-align center
        font-size 15px
        ellipsis()
      .actor-role
        width 170rpx
        text-align center
        font-size 13px
        color #A9A9A9
        ellipsis()
</style>
