<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { OrderDetailResult } from '@/services/order'
import { getOrderDetailAPI } from '@/services/order'
import { putOrderPayAPI } from '@/services/order'
import type { OrderDetailParams } from '@/services/order'
import type { OrderPayParams } from '@/services/order'

//总价
const totalPrice = ref(0)
// 要传入的参数
const params = ref<OrderDetailParams>({
  id: 0,
})

const payParams = ref<OrderPayParams>({
  id: 0,
})

const data = ref<OrderDetailResult>({
  id: 0,
  number: 0,
  name: '',
  images: Array<string>(),
  type: 0,
  count: 0,
  createTime: '',
  pickTime: '',
  payment: 0,
  status: 0,
})

//测试数据(真实数据要通过订单id获取)
// const data = [
//   {
//     id: 1,
//     number: '123456',
//     name: '商品1',
//     images:[
//         'https://img0.baidu.com/it/u=2341097482,2639203366&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067'
//     ],
//     type:0, // 0: 日租 1: 月租 2: 购买
//     count: 100,
//     createTime: '2022-01-01 12:00:00',
//     pickTime: '2022-01-01 12:00:00',
//     payment: 100,
//     status: 0, // 0待付款，1待提车，2租赁中，3已完成，4待归还，5已取消
//   }
// ]

//获取订单id, 通过api请求数据
onLoad(async (options) => {
  // 更新 params 中的 id
  params.value.id = payParams.value.id = options.id
  console.log(params.value.id)

  const response = await getOrderDetailAPI(params.value)
  if (response && response.code === 1) {
    data.value = response.data
    console.log('成功：', data.value)
  } else {
    console.log('失败')
  }
})

// 支付, 成功返回主页, 并扣除轮胎币
const toPay = async () => {
  console.log(payParams.value.id)
  const response = await putOrderPayAPI(payParams.value)
  console.log(response)
  if (response && response.code === 1) {
    console.log('成功支付')
    uni.switchTab({
      url: '/pages/index/index',
    })
  } else {
    if(response.msg === '余额不足'){
      uni.showToast({
        title: '余额不足',
        icon: 'error',
      })
    }
    console.log('支付失败')
  }
}
</script>

<template>
  <view class="viewport">
    <view class="content">
      <image :src="data.images[0]" class="image"></image>
      <view class="content-text">
        <text class="name">{{ data.name }}</text>
        <text class="number">id: {{ data.number }}</text>
        <view class="type" v-if="data.type !== 2">
          <text class="start-time">开始时间: {{ data.createTime }}</text>
          <text class="end-time">结束时间: {{ data.pickTime }}</text>
        </view>
      </view>
    </view>

    <view class="bottom">
      <text class="price">合计: {{ data.payment }}币 </text>
      <view class="pay" @tap="toPay">付款</view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #f7f7f8;
}
.content {
  margin: 10rpx 20rpx 0 20rpx;
  border-radius: 10rpx;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  .image {
    width: 200rpx;
    height: 150rpx;
    border-radius: 20rpx;
    margin: 20rpx;
  }
  .content-text {
    display: flex;
    flex-direction: column;
    margin: 20rpx 0;
    .name {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }
    .number {
      font-size: 25rpx;
      color: #7f7f7f;
      margin-bottom: 20rpx;
    }
  }
  .type {
    display: flex;
    flex-direction: column;
  }
}

.bottom {
  margin: 200rpx 20rpx 0 20rpx;
  border-radius: 10rpx;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  .price {
    margin: 20rpx;
  }
  .pay {
    margin: 20rpx;
    background-color: #ff7f50;
  }
}
</style>
