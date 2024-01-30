<script setup>
import { listMenus, removeMenu, saveMenu, updateMenu } from '@/api/menu.js'
import { generateMenuOptions } from '@/utils/menu.js'
import DataTable from '@/components/table/DataTable.vue'

const columns = ref([
  { title: '标签', key: 'label' },
  { title: '类型', key: 'type' },
  { title: '路径', key: 'path' },
  { title: '组件', key: 'component' }
])
const actions = ref({
  add: {
    fields: [
      { key: 'pid', value: (row) => row.id },
      { key: 'type', value: 'ROUTE' }
    ],
    handle: saveMenu
  },
  edit: {
    fields: ['id', 'pid', ...columns.value.map((column) => column.key)],
    handle: updateMenu
  },
  remove: {
    fields: ['id'],
    handle: removeMenu,
    disable: (row) => Object.prototype.hasOwnProperty.call(row, 'children')
  }
})
</script>

<template>
  <DataTable
    :actions="actions"
    :columns="columns"
    :get-data-function="async () => generateMenuOptions(await listMenus())"
    empty-name="菜单"
  >
    <template #drawer="{ formData, tableData }">
      <n-form-item label="根菜单">
        <n-switch
          v-model:value="formData.pid"
          :checked-value="0"
          :round="false"
          :unchecked-value="null"
        />
      </n-form-item>
      <n-form-item v-if="formData.pid !== 0" label="上级菜单">
        <n-tree-select v-model:value="formData.pid" :options="tableData" key-field="id" />
      </n-form-item>
      <n-form-item label="菜单类型">
        <n-radio-group v-model:value="formData.type">
          <n-radio-button label="父菜单" value="PARENT" />
          <n-radio-button label="路由" value="ROUTE" />
          <n-radio-button label="链接" value="LINK" />
        </n-radio-group>
      </n-form-item>
      <n-form-item label="标签">
        <n-input v-model:value="formData.label" />
      </n-form-item>
      <!-- TODO 图标 -->
      <n-form-item v-if="formData.type !== 'PARENT'" label="路径">
        <n-input
          v-model:value="formData.path"
          :autosize="{
            minRows: 1
          }"
          type="textarea"
        />
      </n-form-item>
      <n-form-item v-if="formData.type === 'ROUTE'" label="组件">
        <n-input
          v-model:value="formData.component"
          :autosize="{
            minRows: 1
          }"
          type="textarea"
        />
      </n-form-item>
    </template>
  </DataTable>
</template>

<style scoped></style>
