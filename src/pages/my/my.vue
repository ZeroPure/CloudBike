<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app'
import { useGuessList } from '@/composables'
import { ref } from 'vue'
import { useMemberStore } from '@/stores'
import { getUserInfoAPI } from '@/services/user'
import { getBalanceAPI } from '@/services/user'
import { getMyBikeActivitiesAPI } from '@/services/bikegroup'
import { getRecentBikeGroupAPI } from '@/services/bikegroup'
import type { GetRecentBikeGroupResult } from '@/services/bikegroup'
import type { GetMyBikeActivitiesParams } from '@/services/bikegroup'
import type { GetMyBikeActivitiesResult } from '@/services/bikegroup'
import type { UserInfoResult } from '@/services/user'
import type { BalanceResult } from '@/services/user'
import { useUserStore } from '@/stores/modules/user'
import { useTireCoinStore } from '@/stores/modules/tireCoin'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 存储用户信息(
const userInfo = ref<UserInfoResult>({
  username: '',
  phone: '',
  image: '',
})
const userStore = useUserStore()
//存储轮胎币信息
const tireCoin = ref<BalanceResult>({
  balance: 0,
})
const tireCoinStore = useTireCoinStore()
// 获取用户标识(token)
const memberStore = useMemberStore()
// 我的骑行总数
const myRidingNumber = ref(0)
const myRidParams = ref<GetMyBikeActivitiesParams>({
  status: 0, // 0：全部，1：未开始，2：已结束
})
const myRidingList = ref<Array<GetMyBikeActivitiesResult>>([])
// 发布骑行总数
const releaseNumber = ref(0)

//==================虚拟数据==================
// 我的订单
const orderTypes = [
  { type: '1', text: '待支付', icon: 'icon-currency' },
  { type: '2', text: '待提车', icon: 'icon-gift' },
  { type: '3', text: '退换货', icon: 'icon-check' },
]

//获取用户轮胎币、消费次数、我的骑行、发布骑行次数
//const tireCoin = ref(0);
const transactionNumber = ref(0)
// const myRiding = ref(0)
// const releaseNumber = ref(0)
const { guessRef, onScrolltolower } = useGuessList()
const hasUserInfo = ref(false)
//==================虚拟数据==================

// 退出
const logout = () => {
  console.log('注销成功')
  memberStore.clearProfile()
}

//获取用户名、头像、手机号
const getUserInfo = async () => {
  const userInfoResponse = await getUserInfoAPI()
  console.log('response information:', userInfoResponse)
  if (userInfoResponse && userInfoResponse.code === 1) {
    userInfo.value = userInfoResponse.data
    userStore.changeSelectedUser(userInfo.value)
    console.log('成功获取到用户信息: ', userInfo.value)
  } else {
    console.log('获取用户信息失败')
  }
}

// 获取轮胎币信息
const getBalance = async () => {
  const tireCoinResponse = await getBalanceAPI()
  console.log('获取轮胎币信息: ', tireCoinResponse)
  if (tireCoinResponse && tireCoinResponse.code === 1) {
    tireCoin.value = tireCoinResponse.data
    tireCoinStore.changeSelectedTireCoin(tireCoin.value)
    console.log('成功获取到轮胎币信息: ', tireCoin.value)
  } else {
    console.log('获取轮胎币信息失败')
  }
}

// 获取我的骑行总数
const getMyRidingNumber = async () => {
  const response = await getMyBikeActivitiesAPI(myRidParams.value)
  if (response && response.code === 1) {
    myRidingNumber.value = response.data.length
    console.log('获取我的骑行总数成功: ', myRidingNumber.value)
  } else {
    console.log('获取我的骑行总数失败', response)
  }
}

//获取发布骑行总数
const getReleaseNumber = async () => {
  const response = await getRecentBikeGroupAPI()
  if (response && response.code === 1) {
    const temp = response.data
    temp.forEach((item) => {
      if (item.username === userStore.selectedUser.username) {
        releaseNumber.value += 1
      }
    })
    console.log('成功', response.data)
  } else {
    console.log('失败', response)
  }
}

onLoad(async () => {
  getBalance()
  getUserInfo()
  getMyRidingNumber()
  releaseNumber.value = 0
  getReleaseNumber()
})

onShow(async () => {
  getBalance()
  getUserInfo()
  getMyRidingNumber()
  releaseNumber.value = 0
  getReleaseNumber()
})
</script>

<template>
  <scroll-view enable-back-to-top @scrolltolower="onScrolltolower" class="viewport" scroll-y>
    <!-- 个人资料 -->
    <view class="profile" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
      <!-- 情况1：已登录 -->
      <view class="overview" v-if="memberStore.profile">
        <navigator url="/pagesMember/profile/profile" hover-class="none">
          <image class="avatar" :src="userStore.selectedUser.image" mode="aspectFill"></image>
        </navigator>
        <view class="meta">
          <view class="nickname">
            {{ userStore.selectedUser.username }}
          </view>
          <navigator class="extra" url="/pagesMember/profile/profile" hover-class="none">
            <text class="update">更新头像昵称</text>
          </navigator>
        </view>
        <view class="logout" @tap="logout">注销</view>
      </view>
      <!-- 情况2：未登录 -->
      <view class="overview" v-else>
        <navigator url="/pages/login/login" hover-class="none">
          <image
            class="avatar gray"
            mode="aspectFill"
            src="https://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png"
          ></image>
        </navigator>
        <view class="meta">
          <navigator url="/pages/login/login" hover-class="none" class="nickname">
            未登录
          </navigator>
          <view class="extra">
            <text class="tips">点击登录账号</text>
          </view>
        </view>
      </view>
    </view>
    <!--轮胎币、骑行信息等-->
    <view class="information">
      <view class="content">
        <navigator class="navigator" url="/pagesOrder/recharge/recharge" hover-class="none">
          <span class="number">{{ tireCoin.balance }}</span>
          <span class="text">轮胎币</span>
        </navigator>
        <navigator class="navigator">
          <span class="number">{{ transactionNumber }}</span>
          <span class="text">消费次数</span>
        </navigator>
        <navigator class="navigator" url="/pagesMember/myRiding/myRiding">
          <span class="number">{{ myRidingNumber }}</span>
          <span class="text">我的骑行</span>
        </navigator>
        <navigator class="navigator" url="/pagesMember/launchGroup/launchGroup">
          <span class="number">{{ releaseNumber }}</span>
          <span class="text">发布骑行</span>
        </navigator>
      </view>
    </view>

    <!-- 我的订单 -->
    <view class="orders">
      <view class="title">
        <span style="font-weight: bold; margin-right: 63%">我的订单</span>
        <navigator class="navigator" url="/pagesOrder/list/list?type=0" hover-class="none">
          全部订单<text class="icon-right"></text>
        </navigator>
      </view>
      <view class="section">
        <!-- 订单 -->
        <navigator
          v-for="item in orderTypes"
          :key="item.type"
          :class="item.icon"
          :url="`/pagesOrder/list/list?type=${item.type}`"
          class="navigator"
          hover-class="none"
        >
          {{ item.text }}
        </navigator>
      </view>
    </view>
    <!--我的消息-->
    <view class="message">
      <view class="title">
        <span style="font-weight: bold; margin-right: 63%">我的消息</span>
        <navigator class="navigator" url="" hover-class="none" style="padding-top: 5rpx">
          全部消息
          <text class="icon-right"></text>
        </navigator>
      </view>
    </view>
    <!-- 我的骑行 -->
    <view class="riding">
      <view class="title">
        <span style="font-weight: bold; margin-right: 63%">我的骑行</span>
        <navigator
          class="navigator"
          url="/pagesMember/myRiding/myRiding"
          hover-class="none"
          style="padding-top: 5rpx"
        >
          全部骑行
          <text class="icon-right"></text>
        </navigator>
      </view>
    </view>
  </scroll-view>
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
  background: linear-gradient(to bottom, rgba(189, 17, 78, 0.8), rgba(255, 255, 255, 0));
  z-index: 1;
  pointer-events: none;
}

.viewport {
  height: 100%;
  background-repeat: no-repeat;
  background-image: url(https://imagepphcloud.thepaper.cn/pph/image/247/597/796.jpg);
  background-size: 100% auto;
}

/* 用户信息 */
.profile {
  margin-top: 100rpx;
  position: relative;
  z-index: 98;

  .overview {
    display: flex;
    height: 120rpx;
    padding: 0 36rpx;
    color: #fff;
  }

  .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .gray {
    filter: grayscale(100%);
  }

  .meta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    line-height: 30rpx;
    padding: 16rpx 0;
    margin-left: 20rpx;
  }

  .nickname {
    max-width: 180rpx;
    margin-bottom: 16rpx;
    font-size: 30rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .extra {
    display: flex;
    font-size: 20rpx;
  }

  .tips {
    font-size: 22rpx;
  }

  .update {
    padding: 3rpx 10rpx 1rpx;
    color: rgba(255, 255, 255, 0.8);
    border: 1rpx solid rgba(255, 255, 255, 0.8);
    margin-right: 10rpx;
    border-radius: 30rpx;
  }

  .settings {
    position: absolute;
    bottom: 0;
    right: 40rpx;
    font-size: 30rpx;
    color: #fff;
  }
}
.information {
  position: relative;
  z-index: 99;
  padding: 30rpx;
  margin: 80rpx 20rpx 0;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .navigator {
    display: flex;
    flex-direction: column;
    color: #000000;
    text-align: center;
    margin: 0 30rpx;
    .number {
      font-size: 40rpx;
      margin-bottom: 5rpx;
    }
    .text {
      font-size: 20rpx;
    }
  }
}

/* 我的订单 */
.orders {
  position: relative;
  z-index: 99;
  padding: 30rpx;
  margin: 20rpx 20rpx 0;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);

  .title {
    height: 40rpx;
    width: 100%;
    font-size: 28rpx;
    color: #1e1e1e;
    display: flex;

    .navigator {
      font-size: 24rpx;
      color: #939393;
      float: right;
    }
  }

  .section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 40rpx 20rpx 10rpx;
    .navigator,
    .contact {
      text-align: center;
      font-size: 24rpx;
      color: #333;
      &::before {
        display: block;
        font-size: 60rpx;
        color: #ff9545;
      }
      &::after {
        border: none;
      }
    }
    .contact {
      padding: 0;
      margin: 0;
      border: 0;
      background-color: transparent;
      line-height: inherit;
    }
  }
}

.message {
  position: relative;
  z-index: 99;
  padding: 30rpx;
  margin: 20rpx 20rpx 0;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);

  .title {
    height: 40rpx;
    width: 100%;
    font-size: 28rpx;
    color: #1e1e1e;
    display: flex;
  }

  .navigator {
    font-size: 24rpx;
    color: #939393;
    float: right;
  }
}

.riding {
  position: relative;
  z-index: 99;
  padding: 30rpx;
  margin: 20rpx 20rpx 0;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);

  .title {
    height: 40rpx;
    width: 100%;
    font-size: 28rpx;
    color: #1e1e1e;
    display: flex;
  }

  .navigator {
    font-size: 24rpx;
    color: #939393;
    float: right;
  }
}

.logout {
  display: flex;
  flex-direction: row;
  color: rgba(255, 255, 255, 0.8);
  border: 1rpx solid rgba(255, 255, 255, 0.8);
  align-items: center;
  justify-content: center;
  border-radius: 20rpx;
  height: 40rpx;
  font-size: 24rpx;
  width: 60rpx;
  margin: 5rpx 40rpx;
}
</style>
