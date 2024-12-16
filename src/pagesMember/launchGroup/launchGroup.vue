<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 表单数据
const form = ref({
  title: '', //活动标题
  position: '', //集合地点
  time: '', //开始时间
  number: '', //活动人数
  description: '', //活动描述

})

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
// 图片数组
const images = ref<{ url: string }[]>([])

// 提交表单
const commit = async () => {
  //表单校验
  try {
    await formRef.value?.validate()
    console.log('提交成功', form.value)

    setTimeout(() => {
      uni.navigateBack()
    }, 400)
  } catch (err) {
    uni.showToast({ icon: 'error', title: '请填写完整信息' })
  }
}

// 上传图片
const uploadImage = () => {
  uni.chooseImage({
    count: 3, // 允许选择最多3张图片
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      console.log('选择图片', res.tempFilePaths);
      // 将选中的图片添加到 images 数组中
      if (Array.isArray(res.tempFilePaths)) {
        res.tempFilePaths.forEach((path) => {
          images.value.push({url: path})
          console.log('上传成功', path)
        })
      }
    },
    fail: () => {
      uni.showToast({ icon: 'error', title: '图片上传失败' })
    },
  })
}

//api 接口
</script>

<template>
  <!-- 表单内容 -->
  <view class="content">
    <uni-forms :rules="rules" :model="form" ref="formRef">
      <uni-forms-item name="title" class="form-item">
        <textarea class="input" placeholder="添加活动标题" v-model="form.title" />
      </uni-forms-item>
      <uni-forms-item name="position" class="form-item">
        <textarea class="input" placeholder="添加集合地点" v-model="form.position" />
      </uni-forms-item>
      <uni-forms-item name="time" class="form-item">
        <textarea class="input" placeholder="活动开始时间" v-model="form.time" />
      </uni-forms-item>
      <uni-forms-item name="number" class="form-item">
        <textarea class="input" placeholder="活动限制人数" v-model="form.number" />
      </uni-forms-item>
      <uni-forms-item name="description" class="form-item">
        <textarea class="input description" placeholder="描述一下活动" v-model="form.description" />
      </uni-forms-item>
    </uni-forms>
  </view>

  <view class="commit-images">
    <view v-for="(item, index) in images" :key="index" class="image-item">
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
.image-preview{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100rpx;
  height:200rpx;
  margin: 0;
}
</style>
