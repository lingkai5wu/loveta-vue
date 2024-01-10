<script setup>
import { listUsers } from '@/api/user.js'
import BaseTagList from '@/components/BaseTagList.vue'

const columns = ref([
  { title: 'ID', key: 'id' },
  { title: '手机号', key: 'phone' },
  { title: '状态', key: 'status' },
  { title: '昵称', key: 'nickname' },
  { title: '姓名', key: 'realname' },
  { title: '头像', key: 'avatar' },
  { title: '性别', key: 'sex' },
  { title: '创建时间', key: 'createTime' },
  {
    title: '用户组',
    key: 'groupList',
    render: (row) => h(BaseTagList, { list: row.groupList })
  }
])
const tableData = ref()
const tableLoading = ref(false)
getTableData()

async function getTableData() {
  tableLoading.value = true
  const result = await listUsers()
  tableData.value = result.data
  tableLoading.value = false
}
</script>

<template>
  <n-data-table
    :columns="columns"
    :data="tableData"
    :loading="tableLoading"
    :row-key="(row) => row.id"
  />
</template>

<style scoped></style>
