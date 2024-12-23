<script setup lang="ts">
import '@/static/font.css'
import { onLoad,onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getRecentBikeGroupAPI } from '@/services/bikegroup'
import { useUserStore } from '@/stores/modules/user'
import type{ GetRecentBikeGroupResult } from '@/services/bikegroup'
const groups = ref<Array<GetRecentBikeGroupResult>>([])

const userStore = useUserStore()

// api接口
onLoad(async () => {
  const response = await getRecentBikeGroupAPI()
  console.log(response)
  if(response && response.code === 1){
    groups.value = response.data
    console.log("成功",groups.value)
  }
  else{
    console.log("失败")
  }
})

onShow(async () => {
  const response = await getRecentBikeGroupAPI()
  console.log(response)
  if(response && response.code === 1){
    groups.value = response.data
    console.log("成功",groups.value)
  }
  else{
    console.log("失败")
  }
})
</script>

<template>
  <view class="navbar">
    <!-- logo文字 -->
    <view class="logo">
      <text class="logo-title">云百客</text>
      <text class="logo-content">骑行团</text>
    </view>
    <!-- 搜索条 -->
    <view class="topbar">
      <navigator class="search">
        <text class="icon-search">请输入内容查找</text>
      </navigator>
      <!--我的骑行-->
      <navigator class="my" url="/pagesMember/myRiding/myRiding">
        <text class="icon-home"></text>
        <text class="icon-text">我的骑行</text>
      </navigator>
    </view>
  </view>
  <!-- 骑行团列表 -->
  <scroll-view class="scroll-view" scroll-y>
    <view class="list">
      <navigator
        class="list-content"
        v-for="item in groups"
        hover-class="none"
        :key="item.id"
        :url="`/pagesOrder/bikegroup/groupDetail?id=${item.id}`"
      >
        <view class="content" :style="{ backgroundImage: 'url(' + item.images[0] + ')' }">
          <text class="content-top">
            <text class="title">{{ item.name }}</text>
          </text>
          <text class="signup">{{ item.participants }}人报名</text>
          <text class="time">开始时间 {{ item.departureTime }}</text>

          <view class="user">
            <image class="userImage" :src="userStore.selectedUser.image"></image>
            <text class="username">{{ item.username }}</text>
          </view>
        </view>
      </navigator>
    </view>
  </scroll-view>

  <!--加骑行团-->
  <navigator class="add-group" url="/pagesMember/launchGroup/launchGroup">
    <text class="add">+</text>
  </navigator>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f7f7f8;
}

/* 自定义导航条 */
.navbar {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 5rpx;
  .logo {
    display: flex;
    flex-direction: row;
    height: 64rpx;
    padding-left: 15rpx;
    font-family: 'AaYuanWeiTusi';
    color: #d53b70;
    .logo-title {
      font-weight: bold;
      font-size: 50rpx;
    }
    .logo-content {
      font-size: 30rpx;
      padding-top: 20rpx;
    }
  }
  .topbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 16rpx 20rpx 5rpx 20rpx;
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 600rpx;
    padding: 0 10rpx 0 26rpx;
    margin-right: 20rpx;
    height: 64rpx;
    font-size: 28rpx;
    border: 2rpx solid #7f7f7f;
    border-radius: 32rpx;
    background-color: rgb(255, 255, 255);
  }
  .icon-search {
    color: #7f7f7f;
  }
  .my {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #7f7f7f;
    font-size: 20rpx;
    .icon-home {
      font-size: 50rpx;
    }
  }
}

.list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 5rpx 20rpx;
  padding: 5rpx;
  align-items: center;
  justify-content: center;
  .list-content {
    display: flex;
    flex-direction: column;
  }
  .content {
    display: flex;
    flex-direction: column;
    padding: 10rpx;
    border: 2rpx solid #afaeae;
    border-radius: 20rpx;
    height: 450rpx;
    width: 320rpx;
    margin: 10rpx;
    background-position: top center;
    background-size: 100% 55%;
    background-repeat: no-repeat;
  }

  .content-top {
    display: flex;
    flex-direction: row;
    margin: 78% 0 3% 0;
    .title {
      max-width: 80rpx;
      font-size: 28rpx;
      font-weight: bold;
      color: #000;
      margin-right: 50rpx;
    }
    .signup {
      font-size: 25rpx;
      color: #7f7f7f;
    }
  }
  .signup{
    font-size: 25rpx;
    color: #7f7f7f;
    margin-bottom: 15rpx;
  }
  .time {
    font-size: 22rpx;
    color: #7f7f7f;
    margin-bottom: 20rpx;
  }
  .user {
    display: flex;
    flex-direction: row;
    align-items: center;
    .userImage {
      width: 60rpx;
      height: 60rpx;
      border-radius: 100%;
    }
    .username {
      font-size: 22rpx;
      color: #7f7f7f;
      margin-left: 20rpx;
    }
  }
}

.add-group {
  height: 150rpx;
  width: 150rpx;
  border-radius: 100%;
  background: radial-gradient(circle 70rpx at center, white, #dc4f7e);
  position: fixed;
  display: flex;
  justify-content: center;
  left: 39.5%; /* 水平居中 */
  bottom: 70rpx; /* 距离屏幕底部 20rpx */
  .add {
    color: white;
    font-size: 100rpx;
    font-weight: bold;
  }
}

</style>
