<template>
  <view class="page page-fill">
    <view class="header">
      
      <view class="face-wapper" v-if="!isLogin">
        <image src="../../static/icos/default-face.png" class="face"></image>
        <view class="info-wapper">
          <view class="nickname regist-login" @click="toLogin">
            注册/登陆
          </view>
        </view>
      </view>
      
      <view class="face-wapper" v-else>
        <image :src="userInfo.faceImage" class="face"></image>
        <view class="info-wapper">
          <view class="nickname">
            {{userInfo.nickname}}
          </view>
          <view class="nav-info">
            ID：{{userInfo.id}}
          </view>
        </view>
        <view class="set-wapper">
          <image src="../../static/icos/settings.png" class="settings" @click="toSetting"></image>
        </view>
      </view>
      
      
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      userInfo: {}
    }
  },
  methods: {
    toLogin () {
      uni.navigateTo({
        url: '../registLogin/registLogin'
      })
    },
    toSetting () {
      uni.navigateTo({
        url: '../myInfo/myInfo'
      })
    }
  },
  onShow () {
    const userInfo = this.getStorage('userInfo')
    if (userInfo) {
      this.isLogin = true
      this.userInfo = userInfo
    } else {
      this.isLogin = false
      this.userInfo = {}
    }
  }
}
</script>

<style lang="stylus">
@import '/../../common/globle.styl'

.page-fill
  width 100%
  height 100%
  .header
    /* #ifdef MP */
    padding 0 30rpx 40rpx
    /* #endif */
    /* #ifndef MP */
    padding 120rpx 30rpx 40rpx
    /* #endif */
    background-color #ffd655
    background url(http://122.152.205.72:88/group1/M00/00/03/CpoxxFwu_1OAYFAIAAAzO_Q1tPg693.png) repeat
    .face-wapper
      flex(row)
      justify-content flex-start
      .face
        width 120rpx
        height 120rpx
        border-radius 50%
        flex-shrink 0
      .info-wapper
        width 80%
        margin-left 40rpx
        flex(column)
        .nickname
          color #6a5018
          font-size 18px
          font-weight bold
        .regist-login
          margin-left 30rpx
          margin-top 30rpx
        .nav-info
          color #a38e62
          font-size 14px
          margin-top 10rpx
      .set-wapper
        flex(row)
        justify-content flex-end
        width 15%
        .settings
          width 40rpx
          height 40rpx
</style>
