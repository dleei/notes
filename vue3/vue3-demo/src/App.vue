<template>
  <div>
    <h1 ref="titleRef">{{ title }}</h1>
    <button @click="getNativeDOM">getDOM</button>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

const title = ref('Hello World');

const titleRef = useTemplateRef('titleRef');

const getNativeDOM = () => {
  console.log(titleRef.value);
};
</script>
