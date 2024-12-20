<script setup lang="ts">
import { defineProps } from 'vue'

const { name, rotate } = defineProps({
  name: { type: String, required: true },
  rotate: { type: Boolean, default: false },
})
</script>

<template>
  <svg class="icon" :class="{ rotate: rotate }" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<style lang="scss" scoped>
.icon {
  width: 1.5em;
  height: 1.5em;
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
  transition: transform 0.5s ease-in-out;
  &.rotate {
    animation: rotateIcon 1s linear infinite;
  }
}

@keyframes rotateIcon {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
