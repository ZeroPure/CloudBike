<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'
import CustomActivity from "./components/CustomActivity.vue";
import indexInformation from "./components/indexInformation.vue"
</script>

<template>
  <view class="viewport">
    <!-- 自定义导航栏 -->
    <CustomNavbar/>
    <!-- 购买租赁和加入骑行团 -->
    <CustomActivity/>
    <!-- 信息 -->
    <indexInformation/>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}

</style>
