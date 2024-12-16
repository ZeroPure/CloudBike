<script setup lang="ts">
const toRent = () => {
  uni.switchTab({
    url: '/pages/category/category',
  })
}

</script>

<template>
  <view class="option">
    <!--租赁-->
    <view class="rent" @tap="toRent">
      <image class="rentImage" src="@/static/img/rent.jpg"></image>
      <text class="renttext">购买租赁</text>
    </view>
    <!--骑行团-->
    <navigator class="join" url="/pagesOrder/bikegroup/bikegroup">
      <image class="joinImage" src="@/static/img/join.png"></image>
      <text class="jointext">加入骑行团</text>
    </navigator>
  </view>
  <image url="@/static/img/join.png"></image>
</template>

<style scoped lang="scss">
.option {
  height:400rpx;
  border-radius: 40rpx;
  margin: 20rpx 20rpx 0;
  font-size: 30rpx;
  display: flex;
  flex-direction: row;
  background: radial-gradient(circle 800rpx at center, #dc4f7e, #ff7f00);
  .rent{
    position:relative;
    display:flex;
    flex-direction: column;
    margin-top:45rpx;
    border-right: 3rpx solid #fff;
    margin-right:50rpx;
    margin-left: 20rpx;
    height:80%;
    width:50%;
    padding: 70rpx 50rpx 0;
  }
  .join{
    position:relative;
    display:flex;
    flex-direction: column;
    width:50%;
    height:80%;
    padding: 80rpx 0 0 50rpx;
  }
  .rentImage{
    height:150rpx;
    width:235rpx;
    margin-bottom:20rpx;
  }
  .joinImage{
    height:240rpx;
    width:200rpx;
    margin-bottom:15rpx;
  }
  .renttext{
    font-size: 30rpx;
    font-weight: bold;
    color: #fff;
    padding-left: 60rpx;
  }
  .jointext{
    font-size: 30rpx;
    font-weight: bold;
    color: #fff;
    padding-left: 33rpx;
  }

}
</style>
