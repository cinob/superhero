<template>
  <view class="page page-fill">
    <view class="pending-wapper">
      <image :src="imgPath" class="pending-face"></image>
    </view>
    <view class="notice">
      <view class="notice-words">
        * 请从相册中选择等比宽高的图片哦~
      </view>
    </view>
    
    <view class="footer-operator">
      <view class="operator-words" @click="changeImg">
        重新选择
      </view>
      <view class="operator-words" @click="upload">
        确认上传
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imgPath: ''
    }
  },
  methods: {
    upload () {
      const userInfo = this.getStorage('userInfo')
      uni.showLoading({
        mask: true,
        title: '上传中，请稍后'
      })
      uni.uploadFile({
        url: this.serverUrl + '/user/uploadFace?userId=' + userInfo.id+'&'+this.key,
        filePath: this.imgPath,
        name: 'file',
        success: (res) => {
          console.log(res)
        },
        complete: () => {
          uni.hideLoading()
        }
      })
    },
    changeImg () {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed '],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.imgPath = res.tempFilePaths[0]
        }
      })
    }
  },
  onLoad (params) {
    this.imgPath = params.imgPath
  }
}
</script>

<style lang="stylus">
@import '/../../common/globle.styl'

.page-fill
  width 100%
  height 100%
  position absolute
  background-color black
  .pending-wapper
    flex(row)
    justify-content center
    margin-top 40rpx
    .pending-face
      width 600rpx
      height 600rpx
  .notice
    flex(row)
    justify-content flex-end
    .notice-words
      color gray
      font-size 13px
      margin-top 30rpx
      width 600rpx
  .footer-operator
    position fixed
    bottom 0
    border-top #515050 solid 1px
    width 100%
    flex(row)
    justify-content space-between
    padding 30rpx
    .operator-words
      color #e8e5e5
      font-size 16px
      width 200rpx
</style>
