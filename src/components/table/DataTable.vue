<script setup>
import DataActionButtonGroup from '@/components/table/DataTableActionButtonGroup.vue'

const props = defineProps({
  columns: { type: Array, required: true },
  getDataFunction: { type: Function, required: true },
  actions: Object,
  emptyName: { type: String, default: '' }
})
const tableData = ref()
const isTableLoading = ref(false)
getData()

const columns = props.columns
setActionColumn()

const isDrawerShow = ref(false)
const drawerTitle = ref()
const drawerData = ref()

async function getData() {
  isTableLoading.value = true
  tableData.value = await props.getDataFunction()
  isTableLoading.value = false
}

function setActionColumn() {
  if (props.actions) {
    columns.push({
      title: '操作',
      key: 'action',
      render(row) {
        return h(DataActionButtonGroup, {
          row: row,
          ...props.actions,
          onAction: (e) => handelAction(e)
        })
      }
    })
  }
}

function handelAction(e) {
  console.log(e)
  isDrawerShow.value = true
  drawerTitle.value = e.label + props.emptyName
  drawerData.value = {
    actionType: e.type,
    formData: e.drawerFromData,
    tableData: tableData
  }
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
    <n-drawer-content :title="drawerTitle" closable>
      <slot name="drawer" v-bind="drawerData" />
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped></style>
