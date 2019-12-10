<template>
  <view class="movie-score-wapper">
    <image v-for="item in yelloScore" src="/../static/icos/star-yellow.png" class="star-icon"></image>
    <image v-for="item in grayScore" src="/../static/icos/star-gray.png" class="star-icon"></image>
    <view class="movie-score" v-if="showNum === 1">
      {{innerScore}}
    </view>
  </view>
</template>

<script>
export default {
  name: "trailerStars",
  data () {
    return {
      yelloScore: 0,
      grayScore: 5
    };
  },
  props: ['innerScore', 'showNum'],
  created () {
    let tempScore = 0
    if (this.innerScore != null && this.innerScore != undefined && this.innerScore != '') {
      tempScore = this.innerScore
    }
    
    this.yelloScore = parseInt(tempScore / 2)
    this.grayScore = 5 - this.yelloScore
  }
}
</script>

<style lang="stylus">
.movie-score-wapper
  display flex
  flex-direction row
  .star-icon
    width 20rpx
    height 20rpx
    margin-top 6rpx
  .movie-score
    font-size 12px
    color grey
    margin-left 8rpx
</style>
