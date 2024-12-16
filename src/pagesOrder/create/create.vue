<script setup lang="ts">
import { ref } from 'vue'
import {onLoad} from "@dcloudio/uni-app";
//总价
const totalPrice = ref(0)

//测试数据(真实数据要通过订单id获取)
const data = [
  {
    id: 1,
    number: '123456',
    name: '商品1',
    images:[
        'https://img0.baidu.com/it/u=2341097482,2639203366&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067'
    ],
    type:0, // 0: 日租 1: 月租 2: 购买
    count: 100,
    createTime: '2022-01-01 12:00:00',
    pickTime: '2022-01-01 12:00:00',
    payment: 100,
    status: 0, // 0待付款，1待提车，2租赁中，3已完成，4待归还，5已取消
  }
]

//获取订单id, 通过api请求数据
onLoad((options) => {
  const id = options.id;
  console.log(id);
})

// 支付, 成功返回主页, 并扣除轮胎币
const toPay = () => {
  uni.switchTab({
    url: '/pages/index/index',
  })
}
</script>

<template>
  <view class="viewport">
    <view class="content">
      <image :src="data[0].images[0]" class="image"></image>
      <view class="content-text">
        <text class="name">{{ data[0].name }}</text>
        <text class="number">id: {{ data[0].number }}</text>
        <view class="type" v-if="data[0].type !== 2">
          <text class="start-time">开始时间: {{ data[0].createTime }}</text>
          <text class="end-time">结束时间: {{ data[0].pickTime }}</text>
        </view>
      </view>
    </view>

    <view class="bottom">
      <text class="price">合计: {{ data[0].payment }}币 </text>
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
.content{
  margin: 10rpx 20rpx 0 20rpx;
  border-radius: 10rpx;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  .image{
    width: 200rpx;
    height: 150rpx;
    border-radius: 20rpx;
    margin: 20rpx;
  }
  .content-text{
    display: flex;
    flex-direction: column;
    margin: 20rpx 0;
    .name{
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }
    .number{
      font-size: 25rpx;
      color: #7f7f7f;
      margin-bottom: 20rpx;
    }
  }
  .type{
    display: flex;
    flex-direction: column;
  }

}

.bottom{
  margin: 200rpx 20rpx 0 20rpx;
  border-radius: 10rpx;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  .price{
    margin: 20rpx;
  }
  .pay{
    margin: 20rpx;
    background-color: #ff7f50;
  }
}
</style>
