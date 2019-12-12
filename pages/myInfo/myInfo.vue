<template>
  <view class="page page-fill">
    <view class="page-block info-list">
      
      <view class="item-wapper face-line-upbottom">
        <view class="info-words">
          头像
        </view>
        <view class="right-wapper">
          <image src="../../static/icos/default-face.png" class="face"></image>
          <view class="arrow-block">
            <image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
          </view>
        </view>
      </view>
      <breakLine></breakLine>
      <view class="item-wapper">
        <view class="info-words">
          昵称
        </view>
        <view class="right-wapper">
          <view class="gray-fields">
            Cinob
          </view>
          <view class="arrow-block">
            <image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
          </view>
        </view>
      </view>
      <breakLine></breakLine>
      <view class="item-wapper">
        <view class="info-words">
          生日
        </view>
        <view class="right-wapper">
          <view class="gray-fields">
            Cinob
          </view>
          <view class="arrow-block">
            <image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
          </view>
        </view>
      </view>
      <breakLine></breakLine>
      <view class="item-wapper">
        <view class="info-words">
          性别
        </view>
        <view class="right-wapper">
          <view class="gray-fields">
            Cinob
          </view>
          <view class="arrow-block">
            <image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
          </view>
        </view>
      </view>
      
      <view class="footer-wapper">
        <view class="footer-words" @click="clearStorage">
          清理缓存
        </view>
        <view class="footer-words logout">
          退出登陆
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import breakLine from "./../../components/breakLine.vue"
export default {
  components: {
    breakLine
  },
  data() {
    return {
      
    }
  },
  methods: {
    clearStorage () {
      uni.clearStorage()
      uni.showToast({
        title: '清理缓存成功',
        mask: false,
        duration: 1500
      })
    }
  }
}
</script>

<style lang="stylus">
@import '/../../common/globle.styl'

.page-fill
  width 100%
  height 100%
  position absolute
  .info-list
    padding 0 30rpx
    .face-line-upbottom
      margin-top 20rpx
      padding 20rpx 0
    .item-wapper
      flex(row)
      justify-content flex-start
      .info-words
        color #333333
        font-size 16px
        width 25%
        line-height 80rpx
      .gray-fields
        font-size 14px
        color gray
        text-align right
        line-height 80rpx
      .right-wapper
        width 80%
        flex(row)
        justify-content flex-end
        .face
          width 80rpx
          height 80rpx
          border-radius 80%
        .arrow-block
          margin-left 10rpx
          line-height 86rpx
          .arrow-ico
            width 30rpx
            height 30rpx
    .footer-wapper
      position fixed
      bottom 0
      left 0
      flex(column)
      width 100%
      .footer-words
        text-align center
        background-color white
        padding 20rpx
        color #333333
        font-size 16px
      .logout
        margin-top 10rpx
</style>
