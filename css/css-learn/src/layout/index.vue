<script setup>
import { ref } from 'vue'
import router from '@/routers'

const menuList = ref([
  {
    name: 'Css',
    path: '/css',
  },
  {
    name: 'Project',
    path: '/project',
  },
  {
    name: 'Tool',
    path: '/tool',
  },
])

const menuItemClick = item => {
  router.push(item.path)
}
</script>

<template>
  <div>
    <a-layout class="min-h-screen">
      <a-layout-header class="h-[80px] bg-#165DFF"></a-layout-header>
      <a-layout>
        <a-layout-sider>
          <a-menu>
            <a-menu-item
              @click="menuItemClick(item)"
              v-for="item in menuList"
              :key="item.name"
            >
              <template #icon>
                <Icon :name="item.name" />
              </template>
              <span style="font-weight: 600">{{ item.name }}</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content>
          <div class="p-4 content">
            <router-view></router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<style lang="scss" scoped>
.content {
  min-height: calc(100vh - 112px);
}
</style>
