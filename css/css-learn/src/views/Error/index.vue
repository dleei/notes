<script setup>
import { ref, onMounted } from 'vue';

const showAnimation = ref(false);

onMounted(() => {
  setTimeout(() => {
    showAnimation.value = true;
  }, 100); // 延迟触发动画
});
</script>

<template>
  <div class="error-page" :class="{ 'animate': showAnimation }">
    <div class="error-content">
      <h1 class="error-title">404</h1>
      <p class="error-message">页面找不到了！</p>
      <p class="error-submessage">请检查 URL 是否正确，或者返回首页。</p>
      <button class="go-home" @click="window.location.href = '/'">返回首页</button>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  color: #333;
  font-family: 'Arial', sans-serif;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.error-page.animate {
  opacity: 1;
}

.error-content {
  text-align: center;
}

.error-title {
  font-size: 100px;
  font-weight: bold;
  color: #ff6f61;
  margin: 0;
}

.error-message {
  font-size: 24px;
  color: #333;
  margin: 20px 0;
}

.error-submessage {
  font-size: 16px;
  color: #777;
}

.go-home {
  margin-top: 30px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.go-home:hover {
  background-color: #e55c52;
}
</style>
