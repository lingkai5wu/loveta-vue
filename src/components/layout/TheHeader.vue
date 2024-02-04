<script setup>
import { logout } from '@/api/auth.js'
import router from '@/router/index.js'
import { useAuthStore } from '@/stores/auth.js'
import { MenuOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

defineEmits(['drawerSiderShowChange'])

function handelLogout() {
  logout().then(() => {
    useAuthStore().token = null
    router.push('/login')
    window.$message.success('登出成功')
  })
}
</script>

<template>
  <n-page-header class="header">
    <n-flex justify="space-between">
      <n-flex>
        <n-button
          id="drawer-menu-show-change-button"
          round
          secondary
          @click="$emit('drawerSiderShowChange')"
        >
          <template #icon>
            <n-icon>
              <MenuOutline />
            </n-icon>
          </template>
        </n-button>
      </n-flex>
      <n-flex>
        <n-button round secondary type="warning" @click="handelLogout">登出</n-button>
      </n-flex>
    </n-flex>
  </n-page-header>
</template>

<style scoped>
.header {
  padding: 10px;
}

@media screen and (min-width: 1024px) {
  #drawer-menu-show-change-button {
    display: none;
  }
}
</style>
