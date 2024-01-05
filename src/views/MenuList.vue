<script setup>
import { listMenu, removeMenu, saveMenu, updateMenu } from '@/api/menu.js'
import DataActionButtonGroup from '@/components/DataActionButtonGroup.vue'
import { buildMenuTree } from '@/utils/menu.js'
import { Add } from '@vicons/ionicons5'

const columns = ref([
  { title: '菜单名', key: 'label' },
  { title: '菜单类型', key: 'type' },
  { title: '附加数据', key: 'data' },
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
const drawerTitle = ref('')
const formData = ref({
  pid: 0,
  id: 0,
  type: 0,
  label: '',
  data: ''
})
let onFormSubmit

function onAdd(row) {
  isDrawerShow.value = true
  drawerTitle.value = '新增菜单'
  formData.value = {
    type: 'ROUTE',
    pid: row ? row.id : 0
  }
  onFormSubmit = () => {
    saveMenu(formData.value).then(() => formSubmitSuccess('保存成功'))
  }
}

function onEdit(row) {
  isDrawerShow.value = true
  drawerTitle.value = '编辑菜单'
  formData.value = {
    id: row.id,
    pid: row.pid,
    type: row.type,
    label: row.label,
    data: row.data
  }
  onFormSubmit = () => {
    updateMenu(formData.value).then(() => formSubmitSuccess('更新成功'))
  }
}

function onDelete(row) {
  removeMenu(row.id).then(() => {
    window.$message.success('删除成功')
    getTableData()
  })
}

function formSubmitSuccess(message) {
  isDrawerShow.value = false
  window.$message.success(message)
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
      根菜单
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
        <n-form-item label="根菜单">
          <n-switch
            v-model:value="formData.pid"
            :round="false"
            :checked-value="0"
            :unchecked-value="null"
          />
        </n-form-item>
        <n-form-item label="菜单类型">
          <n-radio-group v-model:value="formData.type">
            <n-radio-button label="父菜单" value="PARENT" />
            <n-radio-button label="路由" value="ROUTE" />
            <n-radio-button label="链接" value="LINK" />
          </n-radio-group>
        </n-form-item>
        <n-form-item label="上级菜单" v-if="formData.pid !== 0">
          <n-tree-select v-model:value="formData.pid" :options="tableData" key-field="id" />
        </n-form-item>
        <n-form-item label="菜单名">
          <n-input v-model:value="formData.label" />
        </n-form-item>
        <n-form-item label="附加数据" v-if="formData.type !== 'PARENT'">
          <n-input v-model:value="formData.data" />
        </n-form-item>
        <n-button type="primary" @click="onFormSubmit">提交</n-button>
      </n-form>
      <p>{{ formData }}</p>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped></style>
