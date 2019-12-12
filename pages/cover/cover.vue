<template>
  <view class="black">
    <image :src="cover" mode="widthFix" class="cover" @longpress="operator"></image>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cover: ''
    }
  },
  methods: {
    operator () {
      uni.showActionSheet({
        itemList: ["保存图片到本地"],
        success: (res) => {
          if (res.tapIndex === 0) {
            uni.showLoading({
              title: "图片保存中..."
            })
            uni.downloadFile({
              url: this.cover,
              success: (res) => {
                uni.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: () => {
                    uni.showToast({
                      title: "保存成功",
                      duration: 2000
                    })
                  },
                  complete: () => {
                    uni.hideLoading()
                  }
                })
              }
            })
          }
          
        }
      })
    }
  },
  onLoad(params) {
    this.cover = params.cover
    uni.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#000"
    })
  }
}
</script>

<style lang="stylus">
@import '/../../common/globle.styl'

.black
  background-color #000
  width 100%
  height 100%
  flex(column)
  justify-content center
  position fixed
  .cover
    align-self center
</style>
