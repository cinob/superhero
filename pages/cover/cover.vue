<template>
  <view class="black">
    <image :src="cover" mode="widthFix" class="cover"></image>
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
