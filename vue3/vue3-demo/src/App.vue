<script setup lang="ts">
  import son from './components/son.vue'
</script>

<template>
  <son>
    <template #header>
      <h1>我是标题</h1>
    </template>

    <template #default>
      <p>我是内容</p>
    </template>

    <template #footer>
      <p>我是底部</p>
    </template>
  </son>
</template>

<style lang="scss" scoped></style>
