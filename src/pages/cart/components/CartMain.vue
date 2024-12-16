<script setup lang="ts">
import { ref } from 'vue'

//总价
const totalPrice = ref(0)
//购物车id(通过api获取)
const cartID = ref(0)

//测试数据
const memberStore = ref([
  {
    type: 0, // 日租:0,月租:1,购买:2
    count: 10,
    payment: 1000,
    nunmber: 5555555,
    name: '随便',
    images:
      'https://img0.baidu.com/it/u=2341097482,2639203366&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067',
    selected: false, //是否选中
  },
  {
    type: 2, // 日租:0,月租:1,购买:2
    count: 10,
    payment: 1,
    nunmber: 5555555,
    name: '随便了',
    images:
      'https://img0.baidu.com/it/u=2341097482,2639203366&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067',
    selected: false, //是否选中
  },
])

// 选择/取消选中商品
const selectItem = (item: { id: number; selected: boolean; payment: number }) => {
  item.selected = !item.selected;
  calculateTotalPrice();
};

//选中并计算总价
const calculateTotalPrice = () => {
  totalPrice.value = memberStore.value.reduce((total, item) => {
    return item.selected ? total + item.payment : total;
  }, 0);
};

//清空(请求修改的api接口删除购物车数据)
const clearAll = async () => {
  // try {
  //   // 发起后端请求，清空购物车数据
  //   const res = await uni.request({
  //     url: 'https://your-api-endpoint/clear-cart', // 替换为你的 API 地址
  //     method: 'POST',
  //     data: {
  //       cartIds: memberStore.value.map((item) => item.id), // 发送购物车的商品 ID 数组
  //     },
  //   })
  //
  //   if (res.statusCode === 200) {
  //     // 清空本地购物车数组
  //     memberStore.value = [];
  //     uni.showToast({ title: '购物车已清空', icon: 'success' })
  //     calculateTotalPrice(); // 重置总价
  //   } else {
  //     uni.showToast({ title: '清空失败，请稍后再试', icon: 'error' })
  //   }
  // } catch (error) {
  //   console.error('清空购物车失败:', error)
  //   uni.showToast({ title: '网络错误，请稍后再试', icon: 'error' })
  // }

  memberStore.value = [];
  uni.showToast({ title: '购物车已清空', icon: 'success' })
  calculateTotalPrice(); // 重置总价
}

//减少天数
const sub = (item: { count: number }) => {
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
const commitOrder = () => {
  // 接收到订单id后，跳转到订单页面
  //这里要写个api接口，提交订单

  //==================
  let id = 1; // 假设订单id为1
  uni.navigateTo({ url: '/pagesOrder/create/create?id='+id })
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
      <view class="cart-tag" v-if="item.selected"> yes </view>

      <view class="cart">
        <view class="list-img">
          <image :src="item.images" mode="aspectFill"></image>
        </view>

        <view class="list-title">
          <text style="margin: 0 200rpx 0 5rpx; font-size: 30rpx">{{ item.name }}</text>
          <text v-if="item.type === 2" class="list-type">购买</text>
          <text v-else class="list-type">租赁</text>
        </view>

        <view class="list-mid">
          <text class="list-id">id:{{ item. nunmber }}</text>
          <view v-if="item.type !== 2" class="list-count">
            <text>租期</text>
            <text @click.stop="sub(item)">-</text>
            <text>{{ item.count }}</text>
            <text @click.stop="add(item)">+</text>
          </view>
        </view>

        <view class="list-price"> {{ item.payment }}币 </view>
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
  color: #fff;
  background-color: #00c853;
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
  border: 2rpx solid #000;
  border-radius: 10rpx;
}
</style>
