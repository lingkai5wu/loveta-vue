<script setup>
import DataTable from '@/components/table/DataTable.vue'
import { generateMenuOptions } from '@/utils/menu.js'
import { listMenus } from '@/api/menu.js'

const columns = ref([
  { title: '菜单名', key: 'label' },
  { title: '菜单类型', key: 'type' },
  { title: '路由路径', key: 'path' },
  { title: '跳转目标', key: 'target' }
])
const actions = ref({
  add: {
    fields: [
      'type',
      {
        key: 'pid',
        value: (row) => row.id
      },
      {
        key: 'test',
        value: (row) => row.label
      }
    ]
  },
  edit: {}
})
</script>

<template>
  <DataTable
    :actions="actions"
    :columns="columns"
    :get-data-function="async () => generateMenuOptions(await listMenus())"
    empty-name="菜单"
  >
    <template #drawer="{ actionType, formData }">
      <n-form v-if="actionType === 'add'">
        <n-form-item label="类型">
          <n-input v-model:value="formData.type" />
        </n-form-item>
        <n-form-item label="pid">
          <n-input-number v-model:value="formData.pid" />
        </n-form-item>
        <n-form-item label="测试">
          <n-input v-model:value="formData.test" />
        </n-form-item>
      </n-form>
      <p>{{ JSON.stringify(formData, null, 2) }}</p>
    </template>
  </DataTable>
</template>
