<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { upload } from '@/services/upload'
import { postApplyBikeGroupAPI } from '@/services/bikegroup'
import type { uploadParams } from '@/services/upload'
import type { ApplyBikeGroupParams } from '@/services/bikegroup'

// 表单数据
const form = ref<ApplyBikeGroupParams>({
  name: '', //活动标题
  meetingPoint: '', //集合地点
  departureTime: '', //开始时间
  description: '', //活动描述
  maxPeople: 0, //活动人数
  images: Array<string>(), //图片数组
})

// 图片转云端
const uploadImageCloud = async (params: uploadParams) => {
  const response = await upload(params)
  if(response && response.code === 1){
    console.log('成功', response.data)
    form.value.images.push(response.data)
  }
  else{
    console.log('fail',response)
  }

}

// 页面展示图片数组
const localImages = ref<{ url: string }[]>([])

//定义校验规则
const rules = {
  title: {
    rules: [
      {
        required: true,
        errorMessage: '请输入活动标题',
      },
    ],
  },
  position: {
    rules: [
      {
        required: true,
        errorMessage: '请输入集合地点',
      },
    ],
  },
  time: {
    rules: [
      {
        required: true,
        errorMessage: '请输入开始时间',
      },
    ],
  },
  number: {
    rules: [
      {
        required: true,
        errorMessage: '请输入活动人数',
      },
    ],
  },
}
// 表单组件实例
const formRef = ref<UniHelper.UniFormsInstance>()

// 提交表单
const commit = async () => {
  console.log('表单信息:', form.value)
  const response = await postApplyBikeGroupAPI(form.value)
  console.log(response)
  if (response && response.code === 1) {
    uni.showToast({ icon: 'none', title: '发布成功' })
    //成功后跳转到首页
    setTimeout(() => {
      uni.switchTab({
        url: '/pages/my/my',
      })
    },500)
  } else {
    uni.showToast({ icon: 'error', title: '发布失败' })
  }
}

// 上传图片
// 上传图片并实时显示
const uploadImage = () => {
  uni.chooseImage({
    count: 3, // 最大选择数量
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: async (res) => {
      console.log('选择图片', res.tempFilePaths)

      for (const path of res.tempFilePaths) {
        try {
          uploadImageCloud()
          // form.value.images.push(path) // 添加到提交表单的图片数组
          localImages.value.push({ url: path }) // 页面显示用
        } catch (error) {
          console.error('图片上传失败', error)
          uni.showToast({ title: '图片上传失败', icon: 'error' })
        }
      }
    },
    fail: () => {
      uni.showToast({ title: '图片选择失败', icon: 'error' })
    },
  })
}
</script>

<template>
  <!-- 表单内容 -->
  <view class="content">
    <uni-forms :rules="rules" :model="form" ref="formRef">
      <uni-forms-item name="title" class="form-item">
        <textarea class="input" placeholder="添加活动标题" v-model="form.name" />
      </uni-forms-item>
      <uni-forms-item name="position" class="form-item">
        <textarea class="input" placeholder="添加集合地点" v-model="form.meetingPoint" />
      </uni-forms-item>
      <uni-forms-item name="time" class="form-item">
        <textarea class="input" placeholder="活动开始时间(格式:2022-01-01 12:00:00)" v-model="form.departureTime" />
      </uni-forms-item>
      <uni-forms-item name="number" class="form-item">
        <textarea class="input" placeholder="活动限制人数" v-model="form.maxPeople" />
      </uni-forms-item>
      <uni-forms-item name="description" class="form-item">
        <textarea class="input description" placeholder="描述一下活动" v-model="form.description" />
      </uni-forms-item>
    </uni-forms>
  </view>

  <view class="commit-images">
    <view v-for="(item, index) in localImages" :key="index" class="image-item">
      <image :src="item.url" class="image-preview"></image>
    </view>
  </view>
  <button @tap="uploadImage" class="upload-button">上传图片</button>
  <!-- 提交按钮 -->
  <view class="commit">
    <text class="commit-label">活动将由管理员审核通过后发布,活动期间请遵守骑行规则</text>
    <button @tap="commit" class="button">申请发布</button>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.content {
  background: #fff;
  margin: 20rpx 20rpx;
  border-radius: 20rpx;
  .uni-forms-item {
    display: flex;
    flex-direction: row;
    margin-bottom: 0;
    padding: 10rpx 10rpx;
    border-bottom: 2rpx solid #ddd;
  }
  .input {
    padding: 10rpx 10rpx;
    height: 60rpx;
  }
  .description {
    height: 200rpx;
  }
}
.commit {
  display: flex;
  flex-direction: row;
  background: #fff;
  height: 120rpx;
  margin: 400rpx 20rpx;
  border-radius: 20rpx;
  border: 2rpx solid #ababab;
  .commit-label {
    font-size: 25rpx;
    font-weight: bold;
    color: #7f7f7f;
    margin: 30rpx 0 0 20rpx;
  }
  .button {
    color: #fff;
    border-radius: 50rpx;
    background-color: #d53b70;
    font-size: 28rpx;
    height: 60rpx;
    width: 280rpx;
    font-weight: bold;
    text-align: center;
    line-height: 60rpx;
    margin: 30rpx 15rpx 0 50rpx;
  }
}
.commit-images {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20rpx 20rpx;
}

.image-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.image-preview {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 200rpx;
  height: 200rpx;
  margin: 0;
}
</style>
