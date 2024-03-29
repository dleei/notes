<template>
  <view class="container">
    <view class="banner">
      <swiper indicator-dots autoplay :interval="3000" :duration="1000" circular class="swiper-box">
        <swiper-item v-for="item in 3" class="swiper-box-item">
          <image src="../../wallpaper素材/banner2.jpg" mode="aspectFill"></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="notice">
      <div class="left">
        <uni-icons type="sound-filled" size="30" color="#28b389"></uni-icons>
        <text class="text">公告</text>
      </div>
      <div class="center">
        <swiper autoplay :interval="2000" :duration="150" circular vertical>
          <swiper-item v-for="item in 12">
            <text>内容</text>
          </swiper-item>
        </swiper>
      </div>
      <div class="right">
        <uni-icons type="right" size="16" color="#666"></uni-icons>
      </div>
    </view>
    <view class="scroll-pic">
      <common-title></common-title>
      <view class="content">
        <scroll-view scroll-x>
          <view class="box" v-for="item in 12">
            <image src="../../wallpaper素材/preview_small.webp" mode="aspectFill"></image>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.container {
  padding: 0 30rpx;
  .banner {
    width: 750rpx;
    padding: 30rpx 0;
    .swiper-box {
      width: 750rpx;
      height: 340rpx;
      &-item {
        width: 100%;
        height: 100%;
        padding: 0 30rpx;
        image {
          height: 100%;
          height: 100%;
          border-radius: 15rpx;
        }
      }
    }
  }

  .notice {
    display: flex;
    width: 690rpx;
    height: 80rpx;
    border-radius: 80rpx;
    background-color: #f9f9f9;
    margin: 0 auto;
    .left {
      width: 140rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      .text {
        font-size: 30rpx;
        color: #28b389;
        font-weight: 700;
      }
    }
    .center {
      flex: 1;
      line-height: 80rpx;
      swiper {
        height: 100%;
        &-item {
          height: 100%;
          font-size: 30rpx;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
        }
      }
    }
    .right {
      width: 70rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .scroll-pic {
    padding-top: 50rpx;
    .content {
      width: 720rpx;
      margin-top: 30rpx;
      scroll-view {
        white-space: nowrap;
        .box {
          width: 200rpx;
          height: 430rpx;
          display: inline-block;
          margin-right: 15rpx;
          image {
            width: 100%;
            height: 100%;
          }
          &:last-child {
            margin-right: 30rpx;
          }
        }
      }
    }
  }
}
</style>
<script setup></script>