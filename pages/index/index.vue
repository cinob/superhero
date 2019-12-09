<template>
	<view class="page">
    <view class="status_bar">
        <!-- 这里是状态栏 -->
    </view>
    <swiper :indicator-dots="true" :autoplay="true" class="carousel">
      <swiper-item>
        <image src="../../static/carousel/batmanvssuperman.png" class="carousel"></image>
      </swiper-item>
      <swiper-item>
        <image src="../../static/carousel/spiderman.png" class="carousel"></image>
      </swiper-item>
    </swiper>
	</view>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  onLoad() {

  },
  methods: {

  }
}
</script>

<style lang="stylus">
.page
  width: 100%
  height: 100%
  background-color: #f7f7f7
  position: absolute
  .carousel
    width: 100%
    height: 440rpx
</style>
