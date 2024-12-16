<script setup lang="ts">
import '@/static/font.css'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets!.top + 10 + 'px' }">
    <!-- logo文字 -->
    <view class="logo">
      <text class="logo-text">云百客</text>
    </view>
    <!-- 搜索条 -->
    <view class="search">
      <text class="icon-search">请输入内容查找</text>
    </view>
  </view>
</template>

<style lang="scss">
/* 自定义导航条 */
.navbar {
  background-image: url(@/static/img/indexBackImage.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  height:550rpx;
  .logo {
    display: flex;
    align-items: center;
    height: 64rpx;
    padding-left: 15rpx;
    .logo-text {
      font-family: 'AaYuanWeiTusi';
      font-weight: bold;
      font-size:50rpx;
      flex: 1;
      color: #fff;
      margin: 0 0 0 20rpx;
    }
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10rpx 0 26rpx;
    height: 64rpx;
    margin: 16rpx 20rpx;
    color: #fff;
    font-size: 28rpx;
    border-radius: 32rpx;
    background-color: rgba(255, 255, 255, 0.5);
  }
  .icon-search {
    color: #646363;
    &::before {
      margin-right: 10rpx;
    }
  }
}
</style>
