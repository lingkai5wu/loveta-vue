<script setup>
import TheHeader from '@/components/layout/TheHeader.vue'
import TheSider from '@/components/layout/TheSider.vue'

const collapsed = ref(false)
const collapsedWidth = 0

function handleCollapsedChange() {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider :collapsed="collapsed" :collapsed-width="collapsedWidth" collapse-mode="width">
      <TheSider :collapsed="collapsed" :collapsed-width="collapsedWidth" />
    </n-layout-sider>
    <n-layout>
      <n-layout-header>
        <TheHeader @collapsed-change="handleCollapsedChange" />
      </n-layout-header>
      <n-layout-content>
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
