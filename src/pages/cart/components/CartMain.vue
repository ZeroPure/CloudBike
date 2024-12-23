<script setup lang="ts">
import { ref } from 'vue'
import { onLoad,onShow } from '@dcloudio/uni-app'
import {getCartAPI} from '@/services/cart'
import { deleteCartAPI } from '@/services/cart'
import {postSubmitOrderAPI,putUpdateCartAPI} from '@/services/cart'
import type {DeleteCartParams,UpdateCartParams} from '@/services/cart'
import type { GetCartResult } from '@/services/cart'
import type { SubmitOrderParams} from '@/services/cart'
import type {SubmitOrderResult} from '@/services/cart'


//总价
const totalPrice = ref(0)

const memberStore = ref<Array<GetCartResult>>([])

const deleteParams = ref<DeleteCartParams>({
  ids: Array<number>()
})

const submitParams = ref<SubmitOrderParams>({
  id: 0,//购物车id
})

onLoad(async () => {
    getCartData()
})

onShow(async () => {
  getCartData()
})

const getCartData = async () => {
  const response = await getCartAPI()
  console.log(response)
  if(response && response.code === 1){
    memberStore.value = response.data
    // 默认都未选中
    memberStore.value.forEach((item) => {
      item.selected = false;
    })
    console.log('success',memberStore.value)
  }
  else{
    console.log('error',response)
  }
}


// 选择/取消选中商品
const selectItem = (item: { id: number; selected: boolean; payment: number; status: number }) => {
  if(item.status === 0){
    item.selected = !item.selected;
    calculateTotalPrice();
  }
};

//选中并计算总价
const calculateTotalPrice = () => {
  totalPrice.value = memberStore.value.reduce((total, item) => {
    return item.selected ? total + item.payment : total;
  }, 0);
};

//清空(请求修改的api接口删除购物车数据)
const clearAll = async () => {
  // 将 memberStore 中的 id (number) 转换为 string 并赋值给 deleteParams
  deleteParams.value = {
    ids: memberStore.value.map((item) => item.id), // 使用 map 方法将 number 转为 string
  };
  console.log(deleteParams.value)
  const response = await deleteCartAPI(deleteParams.value)
  if(response && response.code === 1){
    getCartData()
    console.log('success',response)
    uni.showToast({ title: '购物车已清空', icon: 'success' })
    calculateTotalPrice(); // 重置总价
  }
  else{
    console.log('error',response)
  }
}


//减少天数
const sub = (item: { count: number}) => {
  if (item.count > 0) {
    item.count -= 1
  }
}

//增加天数
const add = (item: { count: number }) => {
  if (item.count < 12) {
    item.count += 1
  }
}

//提交订单(cartID提交)
const commitOrder = async () => {
  memberStore.value.forEach((item) => {
    if(item.selected){
      submitParams.value.id = item.id
    }
  })
  console.log(submitParams.value)
  const response = await postSubmitOrderAPI(submitParams.value)
  if(response && response.code === 1){
    console.log('success',response)
    uni.navigateTo({ url: '/pagesOrder/create/create?id='+ response.data.id })
  }
  else if(response && response.msg === '来晚了，单车已被抢'){
    uni.showToast({ title: '该订单已支付', icon: 'error' })
  }
  else{
    console.log('error',response)
    uni.showToast({ title: '提交订单失败', icon: 'error' })
  }

}
</script>

<template>
  <!-- 购物车列表 -->
  <scroll-view enable-back-to-top scroll-y class="scroll-view">
    <view
      v-for="item in memberStore"
      :key="item.name"
      class="cart-list"
      @tap="selectItem(item)"
    >


      <view class="cart">
        <view class="cart-tag" v-if="item.selected && item.status === 0"> 选中 </view>
        <view class="cart-isSell" v-else-if= "item.status !== 0"> 已支付</view>
        <view class="list-img">
          <image :src="(item.images[0]===''?item.images[1]:item.images[0])" mode="aspectFill"></image>
        </view>

        <view class="list-title">
          <text style="margin: 0 200rpx 0 5rpx; font-size: 30rpx">{{ item.name }}</text>
          <text v-if="item.type === 2" class="list-type">购买</text>
          <text v-else class="list-type">租赁</text>
        </view>

        <view class="list-mid">
          <text class="list-id">id:{{ item. number }}</text>
          <view v-if="item.type !== 2" class="list-count">
            <text class="rent-time">租期: </text>
            <text>{{ item.count }}</text>
            <text v-if="item.type === 0">日</text>
            <text v-else-if="item.type === 1">月</text>
          </view>
        </view>

        <view class="list-price">
          {{ item.payment }}币
          <text v-if="item.type === 0">/日</text>
          <text v-else-if="item.type === 1">/月</text>
        </view>
      </view>
    </view>
  </scroll-view>

  <!-- 底部 -->
  <view class="cart-bottom">
    <view class="bottom-top">
      <view @tap="clearAll" class="clear-all">清空</view>
    </view>

    <view class="bottom-mid">
      <text>合计：{{ totalPrice }} 币</text>
    </view>

    <button class="commit" @click="commitOrder">提交订单</button>
  </view>

  <view class="background"></view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #f7f7f8;
}

.cart-list {
  display: flex;
  flex-direction: column;
  margin: 20rpx 10rpx;
  .cart {
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }
  .list-img {
    width: 200rpx;
    height: 200rpx;
    overflow: hidden;
    border-radius: 10rpx;
    image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.list-title {
  display: flex;
  flex-direction: row;
}
.list-id {
  color: #7f7f7f;
  font-size: 25rpx;
}
.list-type {
  color: #fff;
  background-color: #ff6700;
  border: 2rpx solid #000;
  border-radius: 10rpx;
}
.cart-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #00c853;
  font-size: 25rpx;
}
.cart-isSell {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #7f7f7f;
  font-size: 25rpx;
}
.bottom-top {
  display: flex;
  flex-direction: row;
}
.select-all {
  border: 2rpx solid #000;
  border-radius: 10rpx;
  margin-right: 500rpx;
}
.clear-all {
  border: 2rpx solid #000;
  border-radius: 10rpx;
}
.commit {
  margin-top: 100rpx;
  height: 100rpx;
  width: 500rpx;
  border-radius: 60rpx;
  font-size: 30rpx;
  display: flex;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle 800rpx at center, #dc4f7e, #ff7f00);
  font-weight: bold;
}
.edit-certain{
  border: 2rpx solid #7f7f7f;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25rpx;
}
.commit{
  position: absolute;
  bottom: 120rpx;
  left: 130rpx;
}
.clear-all{
  position: absolute;
  bottom: 20rpx;
}
.bottom-mid{
  position: absolute;
  bottom: 70rpx;
}
.background{
  position:absolute;
  z-index: -1;
  height: 600rpx;
  width: 100%;
  top: 0;
  background: linear-gradient(to bottom, #dc4f7e, #f7f7f8);
}
</style>
