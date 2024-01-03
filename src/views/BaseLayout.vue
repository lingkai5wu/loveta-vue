<script setup>
import TheHeader from '@/components/layout/TheHeader.vue'
import TheSider from '@/components/layout/TheSider.vue'
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider>
      <TheSider />
    </n-layout-sider>
    <n-layout>
      <n-layout-header>
        <TheHeader />
      </n-layout-header>
      <n-layout-content>
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
