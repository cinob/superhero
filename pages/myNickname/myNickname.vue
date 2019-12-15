<template>
  <view class="page page-fill">
    <form @submit="nickNameSub">
      <view class="page-block">
        <input
          type="text"
          name="nickname"
          :value="userInfo.nickname"
          class="input"
          placeholder="请输入昵称"
          placeholder-class="graywords"
          maxlength="10"
        />
      </view>
      <button type="primary" form-type="submit" class="subbtn">提交</button>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    nickNameSub (e) {
      uni.request({
        url: this.serverUrl + '/user/modifyUserinfo?'+this.key,
        header: {
          'headerUserId': this.userInfo.id,
          'headerUserToken': this.userInfo.userUniqueToken
        },
        data: {
          'userId': this.userInfo.id,
          'nickname': e.detail.value.nickname
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
  .subbtn
    width 95%
    margin-top 40rpx
  .page-block
    margin-top 20rpx
    .graywords
      color #EAEAEA
    .input
      height 80rpx
      line-height 80rpx
      width 500rpx
      margin-left 40rpx
</style>
