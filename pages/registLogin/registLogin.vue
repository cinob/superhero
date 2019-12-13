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
    
    <!-- #ifndef H5 -->
    <view class="third-wapper">
      <view class="third-line">
        <breakLine></breakLine>
        <view class="third-words">
          第三方账号登陆
        </view>
        <breakLine></breakLine>
      </view>
      
      <view class="third-icos-wapper">
        <!-- #ifdef APP-PLUS -->
        <image src="../../static/icos/weixin.png" data-logintype="weixin" @click="appOAuthLogin" class="third-ico"></image>
        <image src="../../static/icos/QQ.png" data-logintype="qq" @click="appOAuthLogin" class="third-ico third-ico-ml"></image>
        <image src="../../static/icos/weibo.png" data-logintype="sinaweibo" @click="appOAuthLogin" class="third-ico third-ico-ml"></image>
        <!-- #endif -->
        <!-- #ifdef MP-WEIXIN -->
        <button open-type="getUserInfo" @getuserinfo="wxLogin" class="third-btn-ico"></button>
        <!-- #endif -->
      </view>
    </view>
    <!-- #endif -->
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
    appOAuthLogin (e) {
      const type = e.currentTarget.dataset.logintype
      uni.login({
        provider: type,
        success: (res) => {
          uni.getUserInfo({
            provider: type,
            success: (info) => {
              // 获取用户信息 传给后台接口进行注册登录
              uni.request({
                url: this.serverUrl + '/appUnionLogin/'+type+'?'+this.key,
                method: "POST",
                data: {
                  'face': 'https://www.imovietrailer.com/users/faces/190419ATT5YP018H/face-190419ATT5YP018H.png?t=20191210092415',
                  'nickname': '洗刷刷',
                  'openIdOrUid': '123123123'
                },
                success: (res) => {
                  uni.setStorageSync('userInfo', res.data.data)
                  uni.switchTab({
                    url: '../me/me'
                  })
                }
              })
            }
          })
        }
      })
    },
    wxLogin (e) {
      uni.login({
        provider: "weixin",
        success: (res) => {
          uni.request({
            url: this.serverUrl + '/stu/mpWXLogin/'+res.code+'?'+this.key,
            method: "POST",
            data: {
              'avatarUrl': 'https://www.imovietrailer.com/users/faces/190419ATT5YP018H/face-190419ATT5YP018H.png?t=20191210092415',
              'nickName': '洗刷刷',
              'whichMP': 1
            },
            success: (res) => {
              if (res.data.status === 200) {
                uni.setStorageSync('userInfo', res.data.data)
                uni.switchTab({
                  url: '../me/me'
                })
              }
            }
          })
        }
      })
    },
    formSubmit (e) {
      if (e) {
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
            } else if (res.data.status === 500) {
              uni.showToast({
                title: res.data.msg,
                duration: 2000,
                image: "../../static/icos/error.png"
              })
            }
          }
        })
      }
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
  .third-wapper
    width 100%
    margin-top 60rpx
    .third-line
      flex(row)
      justify-content center
      .third-words
        color #A9A9A9
        font-size 13px
        flex(column)
        justify-content center
    .third-icos-wapper
      margin-top 30rpx
      flex(row)
      justify-content center
      .third-ico
        width 60rpx
        height 60rpx
      .third-ico-ml
        margin-left 80rpx
      .third-btn-ico
        background-image url(http://122.152.205.72:88/group1/M00/00/05/CpoxxFxFO-yAOjTaAAATCIZEzRU503.png)
        width 60rpx
        height 60rpx
        background-color white
        background-size 60rpx 60rpx
        background-repeat no-repeat
        border none
        padding 0
        &::after
          border none
</style>
