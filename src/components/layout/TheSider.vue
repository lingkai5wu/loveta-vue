<script setup>
import { useMenuStore } from '@/stores/menu.js'
import { OpenOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'

defineEmits(['menuClick'])

const menuStore = useMenuStore()

function renderMenuLabel(menuOption) {
  switch (menuOption.type) {
    case 'ROUTE':
      return h(RouterLink, { to: menuOption.path }, { default: () => menuOption.label })
    case 'LINK':
      return h('a', { href: menuOption.path, target: '_blank' }, menuOption.label)
    default:
      return menuOption.label
  }
}

function renderMenuExtra(menuOption) {
  // 外链加个小上标
  if (menuOption.type === 'LINK') {
    return h(NIcon, null, { default: () => h(OpenOutline) })
  }
}
</script>

<template>
  <n-scrollbar style="max-height: 100vh">
    <n-menu
      :default-value="$route.name"
      :on-update:value="() => $emit('menuClick')"
      :options="menuStore.menuOptions"
      :render-extra="renderMenuExtra"
      :render-label="renderMenuLabel"
      key-field="id"
    />
  </n-scrollbar>
</template>

<style scoped></style>
