<script setup lang="ts">
import { ref, computed,watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getOrderListAPI } from '@/services/order'
import { putOrderCancelAPI } from '@/services/order'
import type { OrderCancelParams } from '@/services/order'
import type { OrderParams } from '@/services/order'
import type { OrderResult } from '@/services/order'


const activeIndex = ref(0)
const orderParams = ref<OrderParams>({
  category: activeIndex.value,
})
const orderCancelParams = ref<OrderCancelParams>({
  id: 0,
})
const data = ref<Array<OrderResult>>([
  {
    id: 0,
    number: '0',
    name: '0',
    images: Array<string>(),
    type: 0,
    count: 0,
    createTime: '',
    pickTime: '',
    payment: 0,
    status: 0,
  },
])
// tabs 数据
const orderTabs = [
  { orderState: 0, title: '待付款', isRender: false },
  { orderState: 1, title: '待提车', isRender: false },
  { orderState: 2, title: '租赁中', isRender: false },
  { orderState: 3, title: '已完成', isRender: false },
  { orderState: 4, title: '待归还', isRender: false },
  { orderState: 5, title: '已取消', isRender: false },
  { orderState: 6, title: '全部', isRender: false },
]

onLoad(async () => {
  // 初始调用api渲染订单
  getOrderList()
})

watch(activeIndex, async (newValue) => {
  orderParams.value.category = newValue
  getOrderList()
})

const getOrderList = async () => {
  console.log(orderParams.value)
  const ListResponse = await getOrderListAPI(orderParams.value)
  console.log('订单列表数据：', ListResponse)
  if (ListResponse && ListResponse.code === 1) {
    data.value = ListResponse.data
    console.log('成功')
  } else {
    console.log('失败')
  }
}

const cancelOrder = async (id: number) => {
  orderCancelParams.value.id = id
  const response = await putOrderCancelAPI(orderCancelParams.value)
  if(response && response.code === 1){
    console.log('取消订单成功',response)
    //getOrderList()
  }
  else{
    console.log('取消订单失败',response)
    uni.showToast({title: '取消订单失败',icon: 'error'})
  }
}

// 计算属性，将status映射为title
const getStatusTitle = computed(() => (status: number) => {
  const tab = orderTabs.find((tab) => tab.orderState === status)
  return tab ? tab.title : ''
})

//api(通过activeIndex获取对应状态的订单列表)
</script>

<template>
  <view class="viewport">
    <!-- tabs -->
    <view class="tabs">
      <view
        class="title-item"
        v-for="(item, index) in orderTabs"
        :key="item.title"
        :class="{ active: index === activeIndex }"
        @tap="activeIndex = index"
      >
        <text>{{ item.title }}</text>
      </view>
    </view>
    <scroll-view class="scroll-view" scroll-y>
      <view class="order-item" v-for="item in data" :key="item.id">
        <view class="top">
          <image :src="item.images[0]" class="image"></image>
          <view class="content">
            <view class="content-top">
              <text class="name">{{ item.name }}</text>
              <text class="status"> {{ getStatusTitle(item.status) }} </text>
            </view>
            <view class="number">单车编号: {{ item.number }}</view>
            <view class="payment">实付款: {{ item.payment }}币</view>
          </view>
        </view>
        <view class="bottom">
          <text class="time">订单创办时间: {{ item.createTime }}</text>
          <view class="cancel" v-if="item.status === 0" @tap="cancelOrder(item.id)">取消订单</view>
          <!-- 跳转到详情页（要传订单id） -->
          <navigator v-if="item.status === 0" :url="`/pagesOrder/create/create?id=${item.id}`" class="detail"
            >去付款</navigator
          >
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: #f7f7f8;
}
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.tabs {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .title-item {
    color: #000;
    font-size: 25rpx;
    margin: 5rpx 10rpx;
  }

  .title-item.active {
    font-weight: bold;
    border-bottom: 5rpx solid #ff9900;
  }
}

.order-item {
  margin: 10rpx 20rpx;
  background-color: #f7f7f8;
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  .content {
    margin-left: 10rpx;
    .name {
      max-width: 250rpx;
      font-size: 30rpx;
      font-weight: bold;
      margin-right: 200rpx;
    }
  }
  .image {
    width: 150rpx;
    height: 150rpx;
    border-radius: 10rpx;
  }
  .top {
    display: flex;
    flex-direction: row;
    margin: 20rpx 20rpx;
    .status {
      font-size: 25rpx;
      color: #ff9900;
    }
    .number {
      font-size: 25rpx;
      color: #7f7f7f;
    }
    .payment {
      margin-top: 50rpx;
      margin-left: 300rpx;
      font-size: 30rpx;
      font-weight: bold;
      color: #000000;
    }
  }
  .bottom {
    display: flex;
    flex-direction: row;
    margin: 20rpx 20rpx;
    .cancel {
      font-size: 25rpx;
      color: #7f7f7f;
      margin-right: 50rpx;
    }
    .time {
      font-size: 25rpx;
      margin-right: 200rpx;
    }
  }
}
</style>
