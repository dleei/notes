<script setup></script>

<template>
  <div class="css-layout">
    <a-row :gutter="16">
      <a-col :span="2">
        <div class="box">
          <div class="triangle"></div>
        </div>
      </a-col>
      <a-col :span="2">
        <div class="box">1</div>
      </a-col>
      <a-col :span="2">
        <div class="box">1</div>
      </a-col>
      <a-col :span="2">
        <div class="box">1</div>
      </a-col>
      <a-col :span="2">
        <div class="box">1</div>
      </a-col>
      <a-col :span="2">
        <div class="box">1</div>
      </a-col>
      <a-col :span="2">
        <div class="box">1</div>
      </a-col>
      <a-col :span="2">
        <div class="box">1</div>
      </a-col>
      <a-col :span="2">
        <div class="box">1</div>
      </a-col>
      <a-col :span="2">
        <div class="box">1</div>
      </a-col>
      <a-col :span="2">
        <div class="box">1</div>
      </a-col>
      <a-col :span="2">
        <div class="box">1</div>
      </a-col>
    </a-row>
  </div>
</template>

<style lang="scss" scoped>
.css-layout {
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 6px;
  }
}

.triangle {
  width: 90px;
  aspect-ratio: 1;
  clip-path: polygon( 100% 0, 100% 100%, 0 100%);
  background-color: #FCB116;
}
</style>
