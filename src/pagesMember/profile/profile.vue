<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useUserStore } from '@/stores/modules/user'
import { useMemberStore } from '@/stores/modules/member'
import { putUserInfoAPI } from '@/services/user'
import type { EditUserInfoParams } from '@/services/user'

const userStore = useUserStore()
const isShowEdit = ref(false)
const params = ref<EditUserInfoParams>({
  username: userStore.selectedUser.username,
  phone: userStore.selectedUser.phone,
  image: userStore.selectedUser.image,
})

const chooseImage = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      params.value.image = res.tempFilePaths[0]
    },
    fail: (err) => {
      console.log("失败",err)
    }
  })
}

const commit = async () => {
  const res = await putUserInfoAPI(params.value)
  console.log(res)
  if(res && res.code === 1){
    uni.showToast({title: '修改成功', icon:'success', duration: 2000})
    setTimeout(() => {
      uni.switchTab({
        url: '/pages/my/my',
      })
    },500)
  }
  else{
    uni.showToast({title: '修改失败', icon: 'none', duration: 2000})
  }
}
</script>

<template>
  <view class="viewport">
    <view class="top">
      <view class="title">个人信息</view>
      <image :src="userStore.selectedUser.image" class="user-image"></image>
      <view class="username">{{ userStore.selectedUser.username }}</view>
    </view>
    <view class="content">
      <view class="content-item">
        <text class="row-title">用户名</text>
        <text class="row-content">{{ userStore.selectedUser.username }}</text>
      </view>
      <view class="content-item">
        <text class="row-title">电话</text>
        <text class="row-content">{{ userStore.selectedUser.phone }}</text>
      </view>
    </view>
    <view class="edit" @tap="isShowEdit = true">更改信息</view>
  </view>

  <view class="edit-modal" v-if="isShowEdit">
    <view class="edit-item">
      <text class="edit-row-title">用户名更改</text>
      <input type="text" v-model="params.username" placeholder="请输入新的用户名" />
    </view>
    <view class="edit-item">
      <text class="edit-row-title">联系方式更改</text>
      <input type="text" v-model="params.phone" placeholder="请输入新的联系方式" />
    </view>
    <view class="edit-item">
      <text class="edit-row-title">头像更改</text>
      <view class="upload" @tap="chooseImage">选择图片</view>
    </view>
    <image :src="params.image" class="image-preview"></image>
    <view class="edit-choose">
      <view class="edit-choose-item" @tap="isShowEdit = false">取消</view>
      <view class="edit-choose-item" @tap="commit">确定</view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: #f7f8f7;
}
.top{
  background-color: #3b5944;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title{
    margin: 50rpx 0;
    font-size: 40rpx;
    font-size: bold;
    color: #fff;
  }
  .username{
    font-size: 30rpx;
    font-size: bold;
    margin: 40rpx 0;
    color: #fff;
  }
}

.content{
  display:flex;
  flex-direction: column;
  margin: 30rpx 10rpx;
  background-color: #fff;
  border-radius: 10rpx;
  .content-item{
    display:flex;
    flex-direction: row;
    margin: 20rpx 10rpx;
    border-bottom: 3rpx solid #e1e1e1;
  }
  .row-title{
    width: 200rpx;
    margin-right: 30rpx;
  }
}
.edit{
  margin: 200rpx 110rpx;
  border-radius: 60rpx;
  font-size: 30rpx;
  display: flex;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle 800rpx at center, #dc4f7e, #ff7f00);
  font-weight: bold;
  width: 70%;
  height: 100rpx;
}

.user-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background-color: #eee;
}

.edit-modal{
  position: absolute;
  background-color: #fff;
  bottom:0;
  width:100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  .edit-item{
    display: flex;
    flex-direction: row;
    margin: 20rpx 10rpx;
  }
  .image-preview{
    width: 200rpx;
    height: 200rpx;
    border-radius: 100%;
    background-color: #7f7f7f;
    margin: 0 280rpx;
  }
  .edit-row-title{
    width: 200rpx;
    margin: 0 100rpx 0 20rpx;
  }
  .edit-choose{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .edit-choose-item{
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: bold;
      width: 200rpx;
      height: 80rpx;
      margin: 100rpx 100rpx;
      background-color: #7f7f7f;
      border-radius: 20rpx;
    }
  }
}
</style>
