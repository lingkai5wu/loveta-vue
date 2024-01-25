<script setup>
import { logout } from '@/api/auth.js'
import router from '@/router/index.js'
import { useAuthStore } from '@/stores/auth.js'

function onLogout() {
  logout().then(() => {
    useAuthStore().token = null
    router.push('/login')
    window.$message.success('登出成功')
  })
}
</script>

<template>
  <n-page-header class="header">
    <n-button round secondary type="warning" @click="onLogout">登出</n-button>
  </n-page-header>
</template>

<style scoped>
.header {
  padding: 10px;
}
</style>
