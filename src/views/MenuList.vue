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
const formData = ref()
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
  // eslint-disable-next-line no-unused-vars
  const { children, ...targetObj } = row
  formData.value = targetObj
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
      :loading="tableLoading"
      :row-key="(row) => row.id"
    />
  </n-space>
  <n-drawer v-model:show="isDrawerShow" :width="502">
    <n-drawer-content :title="drawerTitle" closable>
      <n-form :model="formData">
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
        <n-form-item label="菜单名">
          <n-input v-model:value="formData.label" />
        </n-form-item>
        <n-form-item v-if="formData.type !== 'PARENT'" label="附加数据">
          <n-input
            v-model:value="formData.data"
            :autosize="{
              minRows: 1
            }"
            type="textarea"
          />
        </n-form-item>
        <n-button type="primary" @click="onFormSubmit">提交</n-button>
      </n-form>
      <p>{{ formData }}</p>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped></style>
