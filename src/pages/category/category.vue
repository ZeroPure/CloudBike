<script setup lang="ts">
import { getCategoryTopAPI } from '@/services/category'
import { getHomeBannerAPI } from '@/services/home'
import type { CategoryTopItem } from '@/types/category'
import type { BannerItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
//是否加载完成
const isFinish = ref(true)
//目前列表被选中的索引
const activeIndex = ref(6)
//焦点图列表
//分类列表
const categoryList = [
  { id: 0, name: '公路车' },
  { id: 1, name: '旅行车' },
  { id: 2, name: '折叠车' },
  { id: 3, name: '死飞' },
  { id: 4, name: '山地车' },
  { id: 5, name: '其他' },
  { id: 6, name: '特惠' },
]

const backgroundImageUrl = ref('/static/test/test.jpg')

//api接口

//模拟数据
const data = [
  {
    id: '1',
    name: '飞天大摩托',
    size: '27',
    price: '8848',
    daily: '10',
    monthly: '100',
    image: '/static/test/test.jpg',
  },
  {
    id: '2',
    name: '飞天大摩托',
    size: '27',
    price: '8848',
    daily: '10',
    monthly: '100',
    image: '/static/test/test.jpg',
  },
]

//详情页面
const toDetail = (id: string) => {
  uni.navigateTo({
    url: '/pages/goods/goods?id='+ id,
  })
}
</script>

<template>
  <view class="viewport" v-if="isFinish">
    <!-- 顶部导航栏 -->
    <view class="navbar" :style="{ backgroundImage: 'url(' + backgroundImageUrl + ')' }">
      <text class="title">购车租车</text>
      <!-- 搜索框 -->
      <view class="search">
        <view class="input">
          <text class="icon-search">摩托车</text>
        </view>
      </view>
      <!-- 提车地点以及营业时间 -->
      <text class="location">提车地点: 深圳大学</text>
      <text class="open-time">营业时间: 09:00-21:00</text>
    </view>

    <!-- 主内容 -->
    <view class="categories">
      <!-- 分类栏 -->
      <view class="primary" scroll-y>
        <view
          v-for="(item, index) in categoryList"
          :key="item.id"
          class="item"
          :class="{ active: index === activeIndex }"
          @tap="activeIndex = index"
        >
          <text class="name">
            {{ item.name }}
          </text>
        </view>
      </view>

      <scroll-view class="secondary">
        <!-- 显示商品 -->
        <view class="list">
          <text class="list-title">
            {{ categoryList[activeIndex].name }}
          </text>
          <view
            class="bikes"
            v-for="item in data"
            :key="item.id"
            :style="{ backgroundImage: 'url(' + item.image + ')' }"
            hover-class="none"
            @tap="toDetail(item.id)"
          >
            <text class="top">
              <text class="bike-title">{{ item.name }}</text>
              <text class="bike-size">{{ item.size }}寸</text>
            </text>
            <text class="information">
              <text class="sell">售价</text>
              <text class="rent">租价</text>
              <text class="detail">查看详情</text>
            </text>
            <text class="price">
              <text class="price-sell">{{ item.price }}币</text>
              <text class="price-rent">{{ item.monthly }}币/月</text>
            </text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: #f7f7f8;
}

.navbar {
  display: flex;
  flex-direction: column;
  background-position: center;
  background-size: cover;
  height: 350rpx;
  .title {
    margin-top: 87rpx;
    margin-left: 45rpx;
    color: #fff;
    font-size: 40rpx;
    font-weight: bold;
  }
  .search {
    color: #7f7f7f;
    background-color: #fff;
    height: 50rpx;
    width: 600rpx;
    border-radius: 50rpx;
    margin-top: 30rpx;
    margin-left: 70rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .location {
    margin-left: 45rpx;
    color: #fff;
    font-weight: bold;
    font-size: 23rpx;
    margin-top: 20rpx;
    margin-bottom: 10rpx;
  }
  .open-time {
    margin-left: 45rpx;
    color: #fff;
    font-weight: bold;
    font-size: 23rpx;
  }
}

.categories {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.primary {
  overflow: hidden;
  background-color: #edeef0;
  width: 30%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 2rpx;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 30rpx;
    color: #7f7f7f;
    margin-bottom: 10rpx;
  }
  .item.active {
    background-image: linear-gradient(to right, #dc778f, #ebecee);
    font-weight: bold;
  }
}

.secondary {
  overflow: hidden;
  width: 70%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f7f7f8;
  .list {
    display: flex;
    flex-direction: column;
    margin: 5rpx 20rpx 0 15rpx;
    .list-title {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }
    .bikes {
      display: flex;
      flex-direction: column;
      border-bottom: 1rpx solid #bbbbbb;
      margin-bottom: 30rpx;
      height: 200rpx;
      background-position: left center;
      background-repeat: no-repeat;
      background-size: 40% 80%;
      .top {
        display: flex;
        flex-direction: row;
        margin-left: 225rpx;
        margin-top: 30rpx;
        font-size: 25rpx;
        font-weight: bold;
        .bike-title {
          margin-right: 50rpx;
          color: #7f7f7f;
        }
        .bike-size {
          color: #dc778f;
        }
      }
    }
    .information {
      display: flex;
      flex-direction: row;
      margin: 20rpx 0 20rpx 225rpx;
      font-size: 25rpx;
      color: #000000;
      .sell {
        background-color: #77dcdc;
        border-radius: 15rpx;
        margin-right: 30rpx;
      }
      .rent {
        background-color: #eacc52;
        border-radius: 15rpx;
        margin-right: 30rpx;
      }
    }
    .price {
      display: flex;
      flex-direction: row;
      margin-left: 225rpx;
      font-size: 20rpx;
      font-weight: bold;
      color: #cf4444;
      .price-sell {
        margin-right: 20rpx;
      }
    }
  }
}
</style>
