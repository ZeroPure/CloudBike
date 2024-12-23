<script setup lang="ts">
import { onLoad,onShow } from '@dcloudio/uni-app'
import { ref, watch } from 'vue'
import { getDetailAPI } from '@/services/category'
import { postAddCartAPI } from '@/services/cart'
import type { DetailResult } from '@/services/category'
import type { DetailParams } from '@/services/category'
import type { AddCartParams } from '@/services/cart'

const params = ref<DetailParams>({
  id: 0,
})
const data = ref<DetailResult>({
  id: 0,
  number: 0,
  name: '',
  type: 0, // 自行车类型（0：公路车，1：旅行车，2：折叠车，3：死飞，4：山地车，5：其他）
  size: 0,
  age: 0,
  price: 0,
  daily: 0,
  monthly: 0,
  description: '',
  status: 0,
  images: Array<string>(),
})

// 加入购物车参数
const addParams = ref<AddCartParams>({
  bikeId: 0,
  type: 0, // 业务类型（0：日租，1：月租，2：购买）
  count: 0,
})

//接收跳转页面参数
onLoad((options) => {
  const id = options.id
  params.value.id = id
  addParams.value.bikeId = id
  console.log('接收到的商品ID:', id)
  // console.log('接收到的商品参数:', params.value)
  getDetail()
})

const getDetail = async () => {
  const response = await getDetailAPI(params.value.id, params.value)
  console.log('响应信息: ', response)
  if (response && response.code === 1) {
    data.value = response.data
    console.log('成功:', data.value)
  } else {
    console.log('失败')
  }
}

// 确认弹窗
const certain = () => {
  uni.showModal({
    title: '提示',
    content: '是否确定将该方案添加至购物车？',
    showCancel: true, // 显示取消按钮
    cancelText: '取消', // 自定义取消按钮文字
    confirmText: '确定', // 自定义确定按钮文字
    success: (res) => {
      if (res.confirm) {
        // 用户点击了确定
        addToCart()
      } else if (res.cancel) {
        // 用户点击了取消
        console.log('用户取消了操作')
      }
    },
    fail: (err) => {
      console.error('弹窗失败:', err)
    },
  })
}

// 添加购物车
const addToCart = async () => {
  const response = await postAddCartAPI(addParams.value)
  console.log('响应信息: ', response)
  if (response && response.code === 1) {
    console.log('成功')
    uni.switchTab({
      url: '/pages/cart/cart',
    })
  } else {
    console.log('失败')
  }
}

// 每次重选方案时会自动调用
const initAddParams = () => {
  addParams.value.bikeId = 0
  addParams.value.type = 0
  addParams.value.count = 0
}

const goToCart = () => {
  uni.switchTab({
    url: '/pages/cart/cart',
  })
}

//返回上一页
const goBack = () => {
  uni.navigateBack()
}

//购物车跳转
//用来显示租车方案
const showRentPrice = () => {
  isShow.value = true
}

//关闭租车方案
const close = () => {
  isShow.value = false
}
//加减天数
const add = () => {
  addParams.value.count += 1
}
const sub = () => {
  if (addParams.value.count > 0) {
    addParams.value.count -= 1
  }
}

//状态映射
const statusMap = ['正常', '待提车', '租赁中', '已售', '待归还']
//是否显示租车方案
const isShow = ref(false)

// ==================模拟数据==================
// const data = {
//   id: '1',
//   number: '123456',
//   name: '山地车',
//   type: '1',
//   size: '24',
//   age: '114',
//   price: '8848',
//   daily: '100',
//   monthly: '200',
//   description: '这是一辆很牛逼的车',
//   status: 0,
//   images: ['/static/test/test.jpg'],
// }
// ==================模拟数据==================
</script>

<template>
  <view class="viewport">
    <!--顶部导航栏 -->
    <view class="header">
      <text class="header-title">
        <text class="icon-left" @tap="goBack"></text>
        <text class="title">商品详情</text>
      </text>

      <view class="bike-image" :style="{ backgroundImage: 'url(' + data.images[0] + ')' }"></view>
    </view>
    <!-- 商品信息 -->
    <view class="information">
      <!-- 价格以及状态 -->
      <view class="information-top">
        <text class="price">{{ data.price }}轮胎币</text>
        <text class="status">状态 {{ statusMap[data.status] }}</text>
      </view>
      <!-- 名字、编号、车况、车龄 -->
      <view class="information-bottom">
        <text class="name" style="margin-bottom: 5rpx">{{ data.name }}</text>
        <text class="number" style="margin-bottom: 5rpx">单车编号: {{ data.number }}</text>
        <text class="description" style="margin-bottom: 5rpx"
          >车况介绍: {{ data.description }}</text
        >
        <text class="age" style="margin-bottom: 5rpx">车龄: {{ data.age }}年</text>
      </view>
    </view>

    <view class="user">
      <text class="safe">
        <text class="safe-title">保障</text>
        <text class="safe-content">不支持七天无理由-急速退款</text>
      </text>

      <text class="address">
        <text class="address-title">地址</text>
        <text class="address-content">沧海校区东北门</text>
      </text>
    </view>

    <view class="bottom">
      <view class="bottom-title">
        <text class="attention">云百客交易须知</text>
        <navigator class="detail"
          >付款前了解交易规则，保障您的权益 <text class="icon-right"></text
        ></navigator>
      </view>

      <view class="price-information">
        <view class="tobuy" @tap="goToCart">
          <image src="@/static/tabs/cart_default.png" class="tobuy-image"></image>
        </view>
        <text class="tag">租越久，越便宜</text>
        <view class="price-daily-box" @tap="showRentPrice">
          <text class="price-daily">{{ data.daily }}币/天</text>
          <text class="price-tag">定期租赁</text>
        </view>
        <view
          class="price-sell-box"
          @tap="
            addParams.type = 2;
            certain()
          "
        >
          <text class="price-sell">{{ data.price }}币</text>
          <text class="sell-tag">全款购买</text>
        </view>
      </view>
    </view>
  </view>
  <!-- 租车方案 -->
  <view v-if="isShow" class="rent-detail">
    <view class="rent-detail-title">
      选择租车方案
      <text
        class="close"
        @tap="
          close();
          initAddParams()
        "
        >x</text>
    </view>
    <view class="rent-detail-content">
      <view class="detail-daily-box" @tap="initAddParams(); addParams.type = 0 ; ">
        <text class="detail-daily-title">日租</text>
        <text class="detail-daily-price">{{ data.daily }}币/天</text>
      </view>
      <view class="detail-monthly-box">
        <text class="detail-monthly-title" @tap="initAddParams(); addParams.type = 1 ; ">月租</text>
        <text class="detail-monthly-price">{{ data.monthly }}币/月</text>
      </view>
    </view>
    <view class="rent-detail-bottom">
      <text class="rent-tag">租车时长</text>
      <text class="rent-time">共{{ addParams.count }}{{ addParams.type === 0 ? '天' : '月' }}</text>
      <text class="rent-options">
        <text class="time-sub" @tap="sub">-</text>
        <text class="rent-option-time">{{ addParams.count }}</text>
        <text class="time-add" @tap="add">+</text>
      </text>
      <text class="certain" @tap="certain()">提交</text>
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

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  .header {
    display: flex;
    flex-direction: column;
    height: 800rpx;
    background: linear-gradient(to bottom, rgba(189, 17, 78, 0.8), rgba(255, 255, 255, 0));
    background-size: cover;

    .header-title {
      font-size: 35rpx;
      font-weight: bold;
      color: #fff;
      margin: 87rpx 0 30rpx 25rpx;
      .title {
        margin-left: 250rpx;
      }
    }

    .bike-image {
      border-radius: 30rpx;
      background-size: cover;
      background-position: center;
      height: 80%;
      z-index: 999;
      width: 100%;
    }
  }

  .information {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 20rpx;
    margin: 5rpx 10rpx 20rpx;
    .information-top {
      font-weight: bold;
      display: flex;
      flex-direction: row;
      .price {
        color: #cf4444;
        font-size: 40rpx;
        margin-left: 20rpx;
      }
      .status {
        margin-left: 350rpx;
        color: #7f7f7f;
        font-size: 30rpx;
        padding-top: 10rpx;
      }
    }
    .information-bottom {
      margin-left: 20rpx;
      margin-bottom: 10rpx;
      display: flex;
      flex-direction: column;
      .name {
        font-weight: bold;
        font-size: 30rpx;
      }
    }
  }
  .user {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 20rpx;
    margin: 5rpx 10rpx 20rpx;
    .safe {
      margin: 25rpx 20rpx 0;
      padding-bottom: 25rpx;
      border-bottom: 2rpx solid #e5e5e5;
      .safe-title {
        color: #7f7f7f;
        margin-right: 100rpx;
      }
    }
    .address {
      margin: 0 20rpx 25rpx;
      padding-top: 25rpx;
      .address-title {
        color: #7f7f7f;
        margin-right: 100rpx;
      }
    }
  }

  .bottom {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 20rpx;
    margin: 5rpx 10rpx 20rpx;
    .bottom-title {
      display: flex;
      flex-direction: row;
      margin-left: 20rpx;
    }
    .detail {
      margin-left: 20rpx;
      color: #7f7f7f;
    }
    .price-information {
      display: flex;
      flex-direction: row;
      color: #cf4444;
      margin-top: 50rpx;
      .tobuy {
        margin-left: 15rpx;
        .tobuy-image {
          width: 80rpx;
          height: 80rpx;
        }
      }
      .tag {
        font-size: 20rpx;
        margin: 40rpx 10rpx 0 80rpx;
      }
      .price-daily-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #000;
        margin-bottom: 20rpx;
        width: 200rpx;
        height: 100rpx;
        border-radius: 20rpx 0 0 20rpx;
        background-color: #7f7f7f;
      }
      .price-sell-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20rpx;
        width: 200rpx;
        height: 100rpx;
        color: #fff;
        border-radius: 0 20rpx 20rpx 0;
        background-color: #cf4444;
      }
    }
  }
}

.rent-detail {
  position: absolute;
  z-index: 999;
  height: 30vh;
  width: 97.5vw;
  bottom: 0;
  margin: 0 10rpx;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 20rpx 20rpx 0 0;
  .rent-detail-title {
    display: flex;
    flex-direction: row;
    margin: 20rpx 0 0 20rpx;
    font-size: 35rpx;
    font-weight: bold;
    .close {
      margin-left: 450rpx;
    }
  }
  .rent-detail-content {
    display: flex;
    flex-direction: row;
    margin: 20rpx 0 0 20rpx;
    .detail-daily-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      background-color: #7f7f7f;
      border-radius: 20rpx;
      margin-right: 150rpx;
      height: 250rpx;
      width: 250rpx;
      .detail-daily-title {
        color: #fff;
        margin-bottom: 20rpx;
      }
      .detail-daily-price {
        font-size: 45rpx;
        color: #cf4444;
      }
    }
    .detail-monthly-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      background-color: #7f7f7f;
      border-radius: 20rpx;
      height: 250rpx;
      width: 250rpx;
    }
    .detail-monthly-title {
      color: #fff;
      margin-bottom: 20rpx;
    }
    .detail-monthly-price {
      font-size: 45rpx;
      color: #cf4444;
    }
  }
  .rent-detail-bottom {
    display: flex;
    flex-direction: row;
    margin: 20rpx 0 0 20rpx;
    .rent-time {
      margin-left: 300rpx;
    }
    .rent-options {
      margin-left: 20rpx;
      display: flex;
      .time-sub {
        font-size: 30rpx;
        font-weight: bold;
        border: 2rpx solid #7f7f7f;
        border-radius: 10rpx;
        width: 40rpx;
        height: 10rpx;
      }
      .time-add {
        font-size: 30rpx;
        font-weight: bold;
        border: 2rpx solid #7f7f7f;
        border-radius: 10rpx;
        width: 40rpx;
        height: 10rpx;
      }
      .rent-option-time {
        margin: 0 10rpx;
      }
    }
  }
}
.certain{
  margin-left: 20rpx;
}
</style>
