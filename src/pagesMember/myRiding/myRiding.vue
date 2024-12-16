<script setup lang="ts">
import {ref} from 'vue'
const options = [
  {type:'1',text: '全部'},
  {type:'2',text: '未开始'},
  {type:'3',text: '已结束'},
]

//选中的状态类别
const activeStatus = ref('全部')

// 模拟数据
const test = [
  { id:'1', title:'深大侠客行',time:'2024/11/29 8:30am',
    status:'1天后开始',position:'深圳大学沧海校区东门',picture:'/static/test/test.jpg',
    joins:[
      { userID: '1', userImage: '/static/img/join.png' },
      { userID: '2', userImage: '/static/img/join.png' },
    ],
  },
  { id:'2', title:'深大侠客行',time:'2024/11/29 8:30am',
    status:'已结束',position:'深圳大学沧海校区东门',picture:'/static/test/test.jpg',
    joins:[
      { userID: '1', userImage: '/static/img/join.png' },
      { userID: '2', userImage: '/static/img/join.png' },
    ],
  },
]

// 过滤信息

const filterTasks = () =>{
  if(activeStatus.value === '未开始'){
    return test.filter(item => item.status.includes('天后开始'));
  } else if(activeStatus.value === '已结束'){
    return test.filter(item => item.status === '已结束')
  }
  return test;
}

</script>

<template>
  <!-- 导航栏 -->
  <view class="myRiding">
    <view class="topbar">
      <view
        class="topbar-content"
        v-for="item in options"
        :key="item.type"
        :class="{ active: activeStatus === item.text}"
        @tap="activeStatus = item.text"
      >
        {{item.text}}
      </view>
    </view>
  </view>
  <!-- 骑行列表 -->
  <scroll-view class="scroll-view" scroll-y>
    <navigator
      class="list"
      v-for="item in filterTasks()"
      :key="item.id"
      :style="{ backgroundImage: 'url(' + item.picture + ')' }"
      :url="`/pagesOrder/bikegroup/groupDetail?id=`+ item.id"
    >
      <view class="content">
        <text class="content-top">
          <text class="title">{{item.title}}</text>
          <text class="status" :class="{ active: item.status === '已结束'}">{{item.status}}</text>
        </text>

        <text class="time">{{item.time}}</text>
        <text class="position">{{item.position}}</text>

        <view
          class="users"
          v-for="join in item.joins"
          :key="join.userID"
        >
          <image :src="join.userImage" class="user-image"></image>
        </view>
      </view>
    </navigator>
  </scroll-view>

  <!--加骑行团-->
  <navigator class="add-group" url="/pagesMember/launchGroup/launchGroup">
    <text class="add">+</text>
  </navigator>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f7f7f8;
}
.myRiding{
  display:flex;
  flex-direction:row;
  margin: 20rpx 15rpx;
  .topbar{
    display:flex;
    flex-direction:row;
    height: 100rpx;
    width: 100%;
    background:#fff;
    border-radius: 20rpx;
    align-items: center;
    .topbar-content{
      display:flex;
      flex-direction:column;
      margin: 0 20rpx;
      font-size: 30rpx;
    }
    .topbar-content.active{
      font-weight:bold;
      border-bottom: 10rpx solid #d53b70;
    }
  }
}

.scroll-view{
  display:flex;
  flex-direction:row;
  margin: 20rpx 15rpx;
  .list{
    display:flex;
    flex-direction:column;
    margin-top: 20rpx;
    height: 300rpx;
    width:96.5%;
    background:#fff;
    border-radius: 20rpx;
    align-items: center;
    background-size: 40% 100%;
    background-repeat: no-repeat;
    background-position: left center;
  }
  .content{
    margin-left: 310rpx;
    margin-top:20rpx;
    display:flex;
    flex-direction:row;
    flex-wrap: wrap;
    .content-top{
      width: 400rpx;
      .title{
        font-size: 30rpx;
        font-weight:bold;
      }
      .status{
        float:right;
        font-size: 25rpx;
        color: #d43b6f;
        font-weight:bold;
      }
      .status.active{
        color: #7f7f7f;
      }
    }
    .time{
      width:400rpx;
      margin:15rpx 0;
      font-size: 25rpx;
      color:#7f7f7f;
    }
    .position{
      width:400rpx;
      font-size: 25rpx;
      margin-bottom:70rpx;
      color:#7f7f7f;
    }
    .users{
      display:flex;
      flex-direction:column;
      .user-image{
        width:60rpx;
        height:60rpx;
        border-radius: 100%;
      }

    }
  }
}
.add-group {
  height: 150rpx;
  width: 150rpx;
  border-radius: 100%;
  background: radial-gradient(circle 70rpx at center, white, #dc4f7e);
  position: fixed;
  display: flex;
  justify-content: center;
  left: 39.5%; /* 水平居中 */
  bottom: 70rpx; /* 距离屏幕底部 20rpx */
  .add {
    color: white;
    font-size: 100rpx;
    font-weight: bold;
  }
}

</style>
