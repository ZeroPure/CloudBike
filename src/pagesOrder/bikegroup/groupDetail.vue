<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import {getBikeGroupDetailAPI} from '@/services/bikegroup'
import { putBikeGroupJoinAPI } from '@/services/bikegroup'
import type { JoinBikeGroupParams } from '@/services/bikegroup'
import type { BikeGroupDetailParams } from '@/services/bikegroup'
import type { BikeGroupDetailResult } from '@/services/bikegroup'
const params = ref<BikeGroupDetailParams>({
  id: 0, // 活动编号
})
const paramsJoin = ref<JoinBikeGroupParams>({
  id: 0, // 活动编号
})

const userStore = useUserStore()

const data = ref<BikeGroupDetailResult>({
  id: 0,
  username: '',
  rideTimes: 0,
  name: '',
  departureTime: '',
  meetingPoint: '',
  description: '',
  participants: 0,
  images: Array<string>(),
})

//传入的参数
onLoad(async (options) => {
  if (options) {
    const id = options.id
    console.log(id)
    params.value.id = id
    paramsJoin.value.id = id
  } else {
    console.log('没有参数传入')
    return
  }

  const response = await getBikeGroupDetailAPI(params.value)
  console.log(response)
  if(response && response.code === 1){
    data.value = response.data
    console.log("成功",data)
  }
  else{
    console.log('失败')
  }

})

const joinBikeGroup = async () => {
  const response = await putBikeGroupJoinAPI(paramsJoin.value)
  console.log(response)
  if(response && response.code === 1){
    console.log('成功', response.data)
    uni.showToast({
      title: '报名成功',
      icon: 'success',})
    uni.navigateBack()
  }
  else if(response && response.msg === '当天已有其他活动'){
    uni.showToast({
      title: '当天已有其他活动',
      icon: 'none',
    })
  }
  else{
    console.log('失败', response)
  }
}



//api接口请求数据部分(根据id请求数据)

//模拟数据部分
// const data = {
//   id: 1, // 活动编号
//   username: 'Kobe',
//   phone: '11451419191',
//   name: '洛杉矶之旅',
//   departureTime: '2022/11/29 8:30am',
//   meetingPoint: '洛杉矶',
//   maxPeople: '10',
//   UserImage: '/static/img/join.png',
//   groupImages: ['/static/test/test.jpg', '/static/test/test.jpg'],
//   description: '扫码进群谢谢,扫码进群谢谢,扫码进群谢谢',
//   status: '1', //审核状态
// }
</script>

<template>
  <view class="viewport">
    <view class="top">
      <image :src="userStore.selectedUser.image" class="user-image"></image>
      <text class="username">{{ data.username }}</text>
    </view>
    <view class="content">
      <text class="title">{{ data.name }}</text>
      <text class="start-time">开始时间:{{ data.departureTime }}</text>
      <text class="meeting-point">集合地点: {{ data.meetingPoint }}</text>
      <text class="description">{{ data.description }}</text>
      <text class="join-people">{{ data.participants}}人已报名</text>
    </view>
  </view>

  <view class="pictures-content">
    <view class="pictures-item">
      <image :src="(data.images[1])" class="content-image"></image>
      <image :src="(data.images[2])" class="content-image"></image>
    </view>
  </view>

  <view class="button" @tap="joinBikeGroup">申请加入</view>
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
    .join-people{
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
.pictures-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.content-image{
  width: 200rpx;
  height: 200rpx;
  margin: 0 80rpx;
}
.button{
  display:flex;
  justify-content:center;
  align-items:center;
  height: 100rpx;
  width: 300rpx;
  margin-top: 200rpx;
  margin-left: 100rpx;
  border-radius: 60rpx;
  font-size: 30rpx;
  display: flex;
  color: #ffffff;
  align-items: center;
  background: radial-gradient(circle 800rpx at center, #dc4f7e, #ff7f00);
  font-weight: bold;
  width: 70%;
}
</style>
