<template>
  <view class="page page-fill">
    <form @submit="birthdaySub">
      <view class="page-block">
        <picker mode="date" @change="dateChange">
          <view class="birthday">{{birthday}}</view>
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
      uni.request({
        url: this.serverUrl + '/user/modifyUserinfo?'+this.key,
        header: {
          'headerUserId': this.userInfo.id,
          'headerUserToken': this.userInfo.userUniqueToken
        },
        data: {
          'userId': this.userInfo.id,
          'birthday': this.birthday
        },
        method: 'POST',
        success: (res) => {
          if (res.data.status === 200) {
            uni.setStorageSync('userInfo', res.data.data)
            uni.navigateBack({
              delta: 1
            })
          } else if (res.data.status === 500 || res.data.status === 502) {
            uni.showToast({
              title: res.data.msg,
              image: '../../static/icos/error.png',
              duration: 2000
            })
          }
        }
      })
    },
    dateChange (e) {
      this.birthday = e.detail.value
    }
  },
  onLoad () {
    this.userInfo = this.getStorage('userInfo')
    this.birthday = this.userInfo.birthday
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
  .subbtn
    width 95%
    margin-top 40rpx
</style>
