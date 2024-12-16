<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const price = ref<string | null>(null)

onLoad((options) => {
  // 获取传递过来的 price 参数
  price.value = options.price
})

// 跳转到 my 页面
const goToMyPage = () => {
  uni.switchTab({
    url: '/pages/my/my',
  })
}
</script>

<template>
  <view class="content">
    <view class="price">¥{{ price }}</view>
    <image src="@/static/img/rechargeSuccess.png" class="image"></image>
    <button class="certain" @click="goToMyPage">
      <text style="padding-left:150rpx;">支付成功</text>
    </button>
  </view>
</template>

<style scoped lang="scss">
.content {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 5px solid #eaebed;
  background-color: #eaebed;
  .price {
    margin-top: 100rpx;
    font-size: 50rpx;
    font-weight: bold;
    color: #000000;
    z-index: 999;
  }
  .image {
    margin-top: 60rpx;
    width: 200rpx;
    height: 200rpx;
    padding-top: 20rpx;
    z-index: 999;
  }
  .certain {
    margin-top: 200rpx;
    padding-left: 50rpx;
    border-radius: 40rpx;
    font-size: 30rpx;
    display: flex;
    color: #ffffff;
    align-items: center;
    background: radial-gradient(circle 800rpx at center, #dc4f7e, #ff7f00);
    font-weight: bold;
    width: 70%;
  }
}
</style>
