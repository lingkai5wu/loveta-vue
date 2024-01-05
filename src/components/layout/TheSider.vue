<script setup>
import { useMenuStore } from '@/stores/menu.js'
import { OpenOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'

const menuStore = useMenuStore()

function renderMenuLabel(option) {
  // 外链
  if (option.href) {
    return h('a', { href: option.href, target: '_blank' }, option.label)
  }
  // 路由
  if (option.path) {
    return h(RouterLink, { to: { name: option.name } }, { default: () => option.label })
  }
  return option.label
}

function renderMenuExtra(option) {
  // 外链加个小上标
  if (option.href) {
    return h(NIcon, null, { default: () => h(OpenOutline) })
  }
}
</script>

<template>
  <n-menu
    :options="menuStore.menuOptions"
    key-field="name"
    :render-label="renderMenuLabel"
    :render-extra="renderMenuExtra"
  />
</template>

<style scoped></style>
