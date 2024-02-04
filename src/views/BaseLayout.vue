<script setup>
import TheHeader from '@/components/layout/TheHeader.vue'
import TheSider from '@/components/layout/TheSider.vue'

const drawerSiderShow = ref(false)

function handleDrawerSiderShowChange() {
  drawerSiderShow.value = !drawerSiderShow.value
}
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider>
      <TheSider />
    </n-layout-sider>
    <n-drawer v-model:show="drawerSiderShow" placement="left">
      <TheSider @menu-click="drawerSiderShow = false" />
    </n-drawer>
    <n-layout>
      <n-layout-header>
        <TheHeader @drawer-sider-show-change="handleDrawerSiderShowChange" />
      </n-layout-header>
      <n-layout-content>
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
@media screen and (max-width: 1024px) {
  .n-layout-sider {
    display: none;
  }
}
</style>
