<script setup>
import { listMenu, removeMenu, saveMenu, updateMenu } from '@/api/menu.js'
import DataActionButtonGroup from '@/components/DataActionButtonGroup.vue'
import { buildMenuTree } from '@/utils/menu.js'
import { Add } from '@vicons/ionicons5'

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
        onDelete: () => onDelete(row),
        hasChildren: row.children !== undefined
      })
    }
  }
])
const tableData = ref()
const tableLoading = ref(false)
getTableData()

async function getTableData() {
  tableLoading.value = true
  const result = await listMenu()
  tableData.value = buildMenuTree(result.data)
  tableLoading.value = false
}

const isDrawerShow = ref(false)
const drawerTitle = ref()
const formData = ref({})
let onFormSubmit

function onAdd(row) {
  isDrawerShow.value = true
  drawerTitle.value = row ? '新增菜单' : '新增根菜单'
  formData.value.pid = row ? row.id : 0
  onFormSubmit = () => {
    saveMenu(formData.value).then(() => formSubmitSuccess('保存成功'))
  }
}

function onEdit(row) {
  isDrawerShow.value = true
  drawerTitle.value = '编辑菜单'
  formData.value = { id: row.id, label: row.label, name: row.name }
  onFormSubmit = () => {
    updateMenu(formData.value).then(() => formSubmitSuccess('更新成功'))
  }
}

function onDelete(row) {
  removeMenu(row.id).then(() => {
    window.$message.info('删除成功')
    getTableData()
  })
}

function formSubmitSuccess(message) {
  isDrawerShow.value = false
  window.$message.info(message)
  getTableData()
}
</script>

<template>
  <n-space vertical>
    <n-button round type="info" @click="onAdd(null)">
      <template #icon>
        <n-icon>
          <Add />
        </n-icon>
      </template>
      新增根菜单
    </n-button>
    <n-data-table
      :columns="columns"
      :data="tableData"
      :row-key="(row) => row.id"
      :loading="tableLoading"
    />
  </n-space>
  <n-drawer v-model:show="isDrawerShow" :width="502">
    <n-drawer-content :title="drawerTitle" closable>
      <n-form :model="formData">
        <n-form-item label="父菜单" v-if="formData.pid">
          <n-tree-select v-model:value="formData.pid" :options="tableData" key-field="id" />
        </n-form-item>
        <n-form-item label="菜单名">
          <n-input v-model:value="formData.label" />
        </n-form-item>
        <n-form-item label="路由名">
          <n-input v-model:value="formData.name" />
        </n-form-item>
        <n-button type="primary" @click="onFormSubmit">提交</n-button>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped></style>
