<template>
  <view class="page page-fill">
    <form @submit="sexSub">
      <view class="page-block">
        <radio-group class="radio-sex" @change="changeSex">
          <label class="radio-single">
            <radio value="1" :checked="sex === 1" /><text>男</text>
          </label>
          <label class="radio-single">
            <radio value="0" :checked="sex === 0" /><text>女</text>
          </label>
        </radio-group>
      </view>
      <button type="primary" form-type="submit" class="subbtn">提交</button>
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
    changeSex (e) {
      this.sex = e.detail.value
    },
    sexSub () {
      uni.request({
        url: this.serverUrl + '/user/modifyUserinfo?'+this.key,
        header: {
          'headerUserId': this.userInfo.id,
          'headerUserToken': this.userInfo.userUniqueToken
        },
        data: {
          'userId': this.userInfo.id,
          'sex': this.sex
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
    this.sex = this.userInfo.sex
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
    .radio-sex
      flex(column)
      .radio-single
        padding 20rpx
  .subbtn
    width 95%
    margin-top 40rpx
</style>
