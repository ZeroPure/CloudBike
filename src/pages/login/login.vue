<script setup lang="ts">
import { postLoginWxMinAPI } from '@/services/login'
import { useMemberStore } from '@/stores'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const memberStore = useMemberStore()
const code = ref('') // 存储微信登录凭证

// 获取 code
onLoad(async () => {
  try {
    const res = await wx.login()
    code.value = res.code
    console.log('获取登录凭证 code:', code)
  } catch (error) {
    uni.showToast({ icon: 'none', title: '获取登录凭证失败' })
  }
})



// 处理微信登录（弹出授权窗口）
const handleWxLogin = async () => {
  if (!code.value) {
    uni.showToast({ icon: 'none', title: '登录凭证失效，请重新进入' })
    return
  }

  // 获取用户头像和昵称
  try {
    // 登录请求，携带 code 和用户信息
    const result = await postLoginWxMinAPI({
      code: code.value,
    })
    console.log('后端返回结果:', result)
    console.log('code返回结果:',result.code)
    if (result && result.code === 1) {
      const userRecord = result.data
      // 保存返回响应的id、token、openid（唯一标识）
      memberStore.setProfile(userRecord)
      console.log("存储信息: ",memberStore.profile)
      uni.showToast({ icon: 'success', title: '登录成功' })
      setTimeout(() => {
        uni.navigateBack()
      }, 500)
    } else {
      uni.showToast({ icon: 'none', title: result.msg || '登录失败' })
    }
  } catch (error) {
    console.error('授权或登录失败:', error)
    uni.showToast({ icon: 'none', title: '授权失败，请重试' })
  }
}
</script>

<template>
  <view class="viewport">
    <view class="logo">
      <image src="/public/logo.png"></image>
    </view>
    <view class="login">
      <!-- 小程序端授权登录 -->
      <!-- #ifdef MP-WEIXIN -->
      <button class="button phone" @click="handleWxLogin">
        <text class="icon icon-phone"></text>
        微信登录
      </button>
      <!-- #endif -->
      <view class="tips">登录/注册即视为你同意《服务条款》和《深大云百客隐私协议》</view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: rgb(253, 242, 247);
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo {
  flex: 1;
  text-align: center;
  image {
    width: 420rpx;
    height: 220rpx;
    margin-top: 15vh;
  }
}

.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 40rpx 20rpx 20rpx;

  .input {
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    border: 1px solid #ddd;
    padding-left: 30rpx;
    margin-bottom: 20rpx;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    color: #fff;
    .icon {
      font-size: 40rpx;
      margin-right: 6rpx;
    }
  }

  .phone {
    background-color: rgb(81, 168, 68);
  }

  .wechat {
    background-color: #06c05f;
  }

  .extra {
    flex: 1;
    padding: 70rpx 70rpx 0;
    .caption {
      width: 440rpx;
      line-height: 1;
      border-top: 1rpx solid #ddd;
      font-size: 26rpx;
      color: #999;
      position: relative;
      text {
        transform: translate(-40%);
        background-color: #fff;
        position: absolute;
        top: -12rpx;
        left: 50%;
      }
    }

    .options {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70rpx;
      button {
        padding: 0;
        background-color: transparent;
        &::after {
          border: none;
        }
      }
    }

    .icon {
      font-size: 24rpx;
      color: #444;
      display: flex;
      flex-direction: column;
      align-items: center;

      &::before {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 6rpx;
        font-size: 40rpx;
        border: 1rpx solid #444;
        border-radius: 50%;
      }
    }
    .icon-weixin::before {
      border-color: #06c05f;
      color: #06c05f;
    }
  }
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}
</style>
