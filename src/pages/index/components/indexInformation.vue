<script setup lang="ts">
const information = [
  { type: '1', title: '低至0.3元/天 享僵尸车畅骑', content: '方便又划算', imgsrc:'/static/img/indexInformationImg1.png' },
  { type: '2', title: '了解租赁规则', content: '避免扣押金', imgsrc:'/static/img/indexInformationImg2.png'},
]

// 生成随机颜色的函数
function getRandomColor() {
  const random = () => Math.floor(Math.random() * 256);
  return `rgb(${random()}, ${random()}, ${random()})`;
}

// 生成一个随机的线性渐变
function getRandomGradient(type) {
  const color = getRandomColor();
  return `linear-gradient(to right, white , ${color})`;
}
</script>

<template>
  <!-- 滚动容器 -->
  <view class="information">
    <scroll-view
      class="scroll-content"
      hover-class="none"
      v-for="item in information"
      :key="item.type"
    >
      <view
        class="content"
        :style="{
          background: getRandomGradient(item.type),
        }"
      >
        <text class="title">
          {{item.title}}
        </text>
        <text class="supplement">
          {{item.content}}
          <text class="icon-right"></text>
        </text>
        <image class="img" :src="item.imgsrc"></image>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
.information{
  display: flex;
  flex-direction: column;
  margin: 5rpx 20rpx;
  .content{
    height: 200rpx;
    display:flex;
    flex-direction: column;
    margin-bottom: 20rpx;
    border-radius: 40rpx;
    justify-content: center;
  }
  .title{
    padding-left: 60rpx;
    margin-bottom:5rpx;
    font-size:28rpx;
  }
  .supplement{
    padding-left: 60rpx;
    font-size:25rpx;
    color:#7f7f7f;
  }
  .img{
    position: absolute;
    height: 80rpx;
    width: 80rpx;
    margin-left: 600rpx;
  }
}

</style>
