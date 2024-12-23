<script setup lang="ts">
import { ref, watch } from 'vue'
import { onLoad,onShow } from '@dcloudio/uni-app'
import { getMyBikeActivitiesAPI } from '@/services/bikegroup'
import type { GetMyBikeActivitiesParams } from '@/services/bikegroup'
import type { GetMyBikeActivitiesResult } from '@/services/bikegroup'

const options = [
  { type: 0, text: '全部' },
  { type: 1, text: '未开始' },
  { type: 2, text: '已结束' },
]

const data = ref<Array<GetMyBikeActivitiesResult>>([
  {
    id: 0,
    name: '',
    meetingPoint: '',
    departureTime: '',
    participants: 0,
    images: Array<string>(),
    status: 0, // 申请状态（0：审核中，1：已通过，2：已驳回，3：已结束）
  },
])
const params = ref<GetMyBikeActivitiesParams>({
  status: 0, // 0：全部，1：未开始，2：已结束
})
//选中的状态类别
const activeStatus = ref(0)


onLoad(async () => {
  const response = await getMyBikeActivitiesAPI(params.value)
  console.log(response)
  if (response && response.code === 1) {
    data.value = response.data
    console.log('成功', data.value)
  } else {
    console.log('失败')
  }
})

onShow(async () => {
  const response = await getMyBikeActivitiesAPI(params.value)
  console.log(response)
  if (response && response.code === 1) {
    data.value = response.data
    console.log('成功', data.value)
  } else {
    console.log('失败')
  }
})

//监听
watch(activeStatus, async (newValue) => {
  params.value.status = newValue
  await changeParams()
})

const changeParams = async () => {
  params.value.status = activeStatus.value
  const response = await getMyBikeActivitiesAPI(params.value)
  console.log(response)
  if (response && response.code === 1) {
    data.value = response.data
    console.log('成功', data.value)
  } else {
    console.log('失败')
  }
}
</script>

<template>
  <!-- 导航栏 -->
  <view class="myRiding">
    <view class="topbar">
      <view
        class="topbar-content"
        v-for="item in options"
        :key="item.type"
        :class="{ active: activeStatus === item.type }"
        @tap="activeStatus = item.type"
      >
        {{ item.text }}
      </view>
    </view>
  </view>
  <!-- 骑行列表 -->
  <scroll-view class="scroll-view" scroll-y>
    <navigator
      class="list"
      v-for="item in data"
      :key="item.id"
      :style="{ backgroundImage: 'url(' + (item.images[0] === '' ? item.images[1] : item.images[0]) + ')' }"
      :url="`/pagesOrder/bikegroup/groupDetail?id=` + item.id"
    >
      <view class="content">
        <text class="content-top">
          <text class="title">{{ item.name }}</text>
          <text class="status" v-if="item.status === 0">审核中</text>
          <text class="status" v-else-if="item.status === 1">已通过</text>
          <text class="status" v-else-if="item.status === 2">已驳回</text>
          <text class="status" v-else-if="item.status === 3">已结束</text>
        </text>

        <text class="time">{{ item.departureTime }}</text>
        <text class="position">{{ item.meetingPoint }}</text>

        <!--        <view class="users" v-for="join in item.joins" :key="join.userID">-->
        <!--          <image :src="join.userImage" class="user-image"></image>-->
        <!--        </view>-->
      </view>
    </navigator>
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
.myRiding {
  display: flex;
  flex-direction: row;
  margin: 20rpx 15rpx;
  .topbar {
    display: flex;
    flex-direction: row;
    height: 100rpx;
    width: 100%;
    background: #fff;
    border-radius: 20rpx;
    align-items: center;
    .topbar-content {
      display: flex;
      flex-direction: column;
      margin: 0 20rpx;
      font-size: 30rpx;
    }
    .topbar-content.active {
      font-weight: bold;
      border-bottom: 10rpx solid #d53b70;
    }
  }
}

.scroll-view {
  display: flex;
  flex-direction: row;
  margin: 20rpx 15rpx;
  .list {
    display: flex;
    flex-direction: column;
    margin-top: 20rpx;
    height: 300rpx;
    width: 96.5%;
    background: #fff;
    border-radius: 20rpx;
    align-items: center;
    background-size: 40% 100%;
    background-repeat: no-repeat;
    background-position: left center;
  }
  .content {
    margin-left: 310rpx;
    margin-top: 20rpx;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .content-top {
      width: 400rpx;
      .title {
        font-size: 30rpx;
        font-weight: bold;
      }
      .status {
        float: right;
        font-size: 25rpx;
        color: #d43b6f;
        font-weight: bold;
      }
      .status.active {
        color: #7f7f7f;
      }
    }
    .time {
      width: 400rpx;
      margin: 15rpx 0;
      font-size: 25rpx;
      color: #7f7f7f;
    }
    .position {
      width: 400rpx;
      font-size: 25rpx;
      margin-bottom: 70rpx;
      color: #7f7f7f;
    }
    .users {
      display: flex;
      flex-direction: column;
      .user-image {
        width: 60rpx;
        height: 60rpx;
        border-radius: 100%;
      }
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
