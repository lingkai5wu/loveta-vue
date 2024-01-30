<script setup>
import DataActionButtonGroup from '@/components/table/DataTableActionButtonGroup.vue'

const props = defineProps({
  actions: Object,
  columns: { type: Array, required: true },
  getDataFunction: { type: Function, required: true },
  emptyName: { type: String, default: '' }
})
const tableData = ref()
const isTableLoading = ref(false)
getData()

const columns = ref(props.columns)
setActionColumn()

const drawerData = ref()
const isDrawerShow = ref(false)

async function getData() {
  isTableLoading.value = true
  tableData.value = await props.getDataFunction()
  isTableLoading.value = false
}

function setActionColumn() {
  if (props.actions) {
    columns.value.push({
      title: '操作',
      key: 'action',
      render(row) {
        return h(DataActionButtonGroup, {
          row: row,
          actions: props.actions,
          onAction: (action) => handelAction(action)
        })
      }
    })
  }
}

async function handelAction(action) {
  if (!action.drawer) {
    await handelSubmit(action)
    return
  }
  isDrawerShow.value = true
  drawerData.value = {
    title: action.label + props.emptyName,
    tableData: tableData,
    action: action
  }
}

async function handelSubmit(action) {
  await action.handle(action.data)
  window.$message.success(action.label + '成功')
  isDrawerShow.value = false
  getData()
}
</script>

<template>
  <n-data-table
    :="$attrs"
    :columns="columns"
    :data="tableData"
    :loading="isTableLoading"
    :row-key="(row) => row.id"
  />
  <n-drawer v-model:show="isDrawerShow">
    <n-drawer-content :title="drawerData.title" closable>
      <n-form :model="drawerData.action.data">
        <slot :formData="drawerData.action.data" :tableData="tableData" name="drawer" />
        <n-form-item :show-label="false">
          <n-flex>
            <n-button @click="isDrawerShow = false">取消</n-button>
            <n-button type="primary" @click="handelSubmit(drawerData.action)">提交 </n-button>
          </n-flex>
        </n-form-item>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped></style>
