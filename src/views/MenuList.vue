<script setup>
import DataActionButtonGroup from '@/components/DataActionButtonGroup.vue'
import { useMenuStore } from '@/stores/menu.js'

const menuStore = useMenuStore()

const columns = ref([
  { title: '菜单名', key: 'label' },
  { title: '路由名', key: 'name' },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return h(DataActionButtonGroup, {
        onAdd: () => onAdd(row),
        onEdit: () => onEdit(row),
        onDelete: () => onDelete(row)
      })
    }
  }
])
const data = ref(menuStore.menuOptions)

function onAdd(row) {
  window.$message.info('I want to add', row.id)
}

function onEdit(row) {
  window.$message.warning('I want to edit', row.id)
}

function onDelete(row) {
  window.$message.error('I want to delete', row.id)
}
</script>

<template>
  <n-data-table :columns="columns" :data="data" :row-key="(row) => row.id" />
</template>

<style scoped></style>
