<script setup>
import { useMenuStore } from '@/stores/menu.js'
import { OpenOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'

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
  <n-menu
    :options="menuStore.menuOptions"
    :render-extra="renderMenuExtra"
    :render-label="renderMenuLabel"
    key-field="id"
  />
</template>

<style scoped></style>
