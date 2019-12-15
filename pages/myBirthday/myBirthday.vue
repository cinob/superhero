<template>
  <view class="page page-fill">
    <form @submit="birthdaySub">
      <view class="page-block">
        <picker mode="date">
          <view class="birthday">{{userInfo.birthday}}</view>
        </picker>
      </view>
      <button type="primary" form-type="submit" class="subbtn">提交</button>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      birthday: ''
    }
  },
  methods: {
    birthdaySub () {
      
    }
  },
  onLoad () {
    this.userInfo = this.getStorage('userInfo')
  }
}
</script>

<style lang="stylus">
@import '/../../common/globle.styl'

.page-fill
  width 100%
  height 100%
  position absolute
  .page-block
    margin-top 20rpx
    .birth-input
      background-color white
      height 80rpx
      line-height 40rpx
      padding-left 20rpx
    .birthday
      background-color white
      height 80rpx
      padding-left 20rpx
      padding-top 30rpx
</style>
