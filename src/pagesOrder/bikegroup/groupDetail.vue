<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'

//传入的参数
onLoad((options) => {
  if (options) {
    const id = options.id
    console.log(id)
  } else {
    console.log('没有参数传入')
  }
})

//api接口请求数据部分(根据id请求数据)

//模拟数据部分
const data = {
  id: 1, // 活动编号
  username: 'Kobe',
  phone: '11451419191',
  name: '洛杉矶之旅',
  departureTime: '2022/11/29 8:30am',
  meetingPoint: '洛杉矶',
  maxPeople: '10',
  UserImage: '/static/img/join.png',
  groupImages: ['/static/test/test.jpg', '/static/test/test.jpg'],
  description: '扫码进群谢谢,扫码进群谢谢,扫码进群谢谢',
  status: '1', //审核状态
}
</script>

<template>
  <view class="viewport">
    <view class="top">
      <image :src="data.UserImage" class="user-image"></image>
      <text class="username">{{ data.username }}</text>
    </view>
    <view class="content">
      <text class="title">{{ data.name }}</text>
      <text class="start-time">开始时间:{{ data.departureTime }}</text>
      <text class="meeting-point">集合地点: {{ data.meetingPoint }}</text>
      <text class="description">{{ data.description }}</text>
    </view>
  </view>

  <view class="pictures-content">
    <view class="pictures-item-first">
      <image :src="data.groupImages[0]"></image>
    </view>
    <view class="pictures-item-second">
      <image :src="data.groupImages[1]"></image>
    </view>
  </view>
</template>

<style scoped lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: #f7f7f8;
}

.viewport {
  margin: 5rpx 10rpx;
  border-radius: 20rpx;
  background-color: #f7f7f8;
  display: flex;
  flex-direction: column;
  .username{
    font-size: 30rpx;
    font-weight: bold;
  }
  .top {
    display: flex;
    flex-direction: row;
    margin: 30rpx 20rpx;
    .user-image {
      border-radius: 100%;
      width: 100rpx;
      height: 100rpx;
    }
  }
  .content {
    margin: 30rpx 20rpx;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 30rpx;
      font-weight: bold;
    }
    .start-time {
      margin-top: 10rpx;
      color: #7f7f7f;
      font-size: 25rpx;
    }
    .meeting-point {
      margin-top: 10rpx;
      color: #7f7f7f;
      font-size: 25rpx;
    }
    .description{
      margin-top: 10rpx;
      color: #000;
      font-size: 30rpx;
    }
  }
}

.pictures-content {
  margin: 10rpx 10rpx;
  border-radius: 20rpx;
  height: 400rpx;
  background-color: #f7f7f8;
  display: flex;
  flex-direction: row;
  .pictures-item-first {
    margin: 30rpx 20rpx;
  }
}
</style>
