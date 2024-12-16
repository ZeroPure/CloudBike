<script setup lang="ts">
import { useGuessList } from '@/composables'
import { ref } from 'vue'
import type { TireCoin } from '@/types/tireCoin'
import { useMemberStore } from '@/stores'
import { onShow } from '@dcloudio/uni-app'
import { getMemberTireCoinAPI } from '@/services/recharge'

const tireCoinList = [
  { type: '1', text: '66', price: '6.00', selected: false },
  { type: '2', text: '180', price: '16.00', selected: false },
  { type: '3', text: '200', price: '64.80', selected: false },
  { type: '4', text: '200', price: '168.00', selected: false },
  { type: '5', text: '360', price: '300.00', selected: false },
  { type: '6', text: '798', price: '648.00', selected: false },
]

//当前选中的价格
const selectedPrice = ref<string | null>(null)

const memberStore = useMemberStore()
const balance = ref(0)
const tireCoins = ref<number>()
const getMemberTireCoin = async () => {
  const res = await getMemberTireCoinAPI()
  tireCoins.value = res.result
}

//初始化获得已登录用户的余额
onShow(() => {
  if (memberStore.profile) {
    getMemberTireCoin()
  }
})

// 修改选中状态
const onChangeSelected = (item: any) => {
  // 遍历方案列表，更新选中状态
  tireCoinList.forEach((coin) => {
    coin.selected = false
  })

  item.selected = true
  selectedPrice.value = item.price
}
</script>

<template>
  <view class="viewport">
    <view class="title">
      <navigator>
        <text class="balance">余额:{{ balance }}</text>
        <text class="record">充值记录</text>
        <text class="icon-right"></text>
      </navigator>
    </view>

    <view class="content">
      <view
        class="select"
        :class="{ selected: item.selected }"
        v-for="item in tireCoinList"
        :key="item.type"
        hover-class="none"
        @click="onChangeSelected(item)"
      >
        <image src="@/static/img/tireCoin.png" class="image2"></image>
        <text class="coin-number">x{{ item.text }}</text>
        <view class="bottom"> ¥{{ item.price }} </view>
      </view>
      <text v-if="selectedPrice" class="selectedprice">选中的价格: ¥{{ selectedPrice }}</text>
      <text class="mention">
        请仔细检查并确认充值信息，因用户个人疏忽导致的充值错误，需由用户自行承担。一旦完成充值，概不退换。
      </text>
    </view>
    <view class="certain">
      <navigator class="navigator" :url="'./rechargeSuccess?price=' + selectedPrice" hover-class="none">
        确认付款
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: #f7f7f8;
}

.viewport::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 34%;
  background-image: linear-gradient(to bottom, rgba(189, 17, 78, 0.8), rgba(255, 255, 255, 0));
  z-index: 1;
  pointer-events: none;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    width: 100%;
    padding: 50rpx 50rpx 10rpx 50rpx;
    font-size: 30rpx;
    font-weight: bold;
    color: #3f3b3b;
    z-index: 999;
    margin-bottom: 0;
  }
  .balance {
    margin-right: 400rpx;
  }
}

.content {
  position: relative;
  width: 100%;
  margin: 0 0;
  z-index: 999;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10rpx;
  .select {
    display: flex;
    flex-direction: column;
    border-radius: 20rpx;
    border: 5rpx solid #dd4f7f;
    width: 30%;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    margin: 10rpx 10rpx;
  }
  .bottom {
    position: relative;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 35%;
    background-color: #dd4f7f;
    justify-content: center;
    align-items: center;
    font-size: 30rpx;
    border-radius: 0 0 15rpx 15rpx;
    font-weight: bold;
    color: #ffffff;
  }
  .coin-number {
    font-size: 40rpx;
    color: #dc4f7e;
    font-weight: bold;
  }
  .mention {
    margin-top: 20rpx;
    font-size: 25rpx;
    padding: 10rpx 10rpx 10rpx 20rpx;
    color: #7f7f7f;
    font-weight: bold;
  }
  .checkmark {
    position: relative;
    top: 10rpx;
    right: 10rpx;
    font-size: 24rpx;
    color: #00c853;
  }
}
.image2 {
  width: 150rpx;
  height: 180rpx;
  padding-top: 20rpx;
}

.certain {
  border-radius: 40rpx;
  margin: 370rpx 14.5%;
  font-size: 30rpx;
  display: flex;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle 800rpx at center, #dc4f7e, #ff7f00);
  font-weight: bold;
  width: 70%;
  .navigator {
    margin: 20rpx;
  }
}

.selectedprice{
  margin-top: 20rpx;
  font-size: 25rpx;
  padding: 10rpx 10rpx 10rpx 20rpx;
  color: #000000;
  font-weight: bold;
}
</style>
