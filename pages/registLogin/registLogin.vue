<template>
  <view class="body">
    <form @submit="formSubmit">
      <view class="face-wapper">
        <image src="../../static/icos/default-face.png" class="face"></image>
      </view>
      
      <view class="info-wapper">
        <label class="words-lab">账号</label>
        <input type="text" value="" name="username" class="input" placeholder="请输入用户名" placeholder-class="graywords"/>
      </view>
      
      <view class="info-wapper info-margin">
        <label class="words-lab">密码</label>
        <input type="text" password="true" value="" name="password" class="input" placeholder="请输入用户名" placeholder-class="graywords"/>
      </view>
      
      <button type="primary" class="login-btn" form-type="submit">注册/登陆</button>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    formSubmit (e) {
      if (e)
      uni.request({
        url: this.serverUrl + '/user/registOrLogin?'+this.key,
        method: "POST",
        data: e.detail.value,
        success: (res) => {
          if (res.data.status === 200) {
            uni.setStorageSync('userInfo', res.data.data)
            uni.switchTab({
              url: "../me/me"
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus">
@import '/../../common/globle.styl'

.body
  .face-wapper
    flex(row)
    justify-content center
    margin 120rpx 0rpx
    .face
      width 160rpx
      height 160rpx
  .login-btn
    margin-top 60rpx
    width 90%
  .info-margin
    margin-top 40rpx
  .info-wapper
    flex(row)
    justify-content center
    border-bottom solid 1px #DBDBDA
    padding-bottom 20rpx
    margin 30rpx
    .words-lab
      color #808080
     .input
      width 500rpx
      margin-left 40rpx
    .graywords
      color #EAEAEA
</style>
