<script setup>
import { Add, BuildOutline, EyeOutline, TrashBinOutline } from '@vicons/ionicons5'
import DataTableActionButton from '@/components/table/DataTableActionButton.vue'

const props = defineProps({
  row: { type: Object, required: true },
  view: Object,
  add: Object,
  edit: Object,
  remove: Object
})
const emits = defineEmits(['action'])

const view = ref({ ...props.view, type: 'view', label: '查看' })
const add = ref({ ...props.add, type: 'add', label: '新增' })
const edit = ref({ ...props.edit, type: 'edit', label: '编辑' })
const remove = ref({ ...props.remove, type: 'remove', label: '删除' })

function handleClick(action) {
  const data = {}
  for (let field of action.fields) {
    if (typeof field === 'string') {
      data[field] = props.row[field]
      continue
    }
    if (typeof field.value === 'function') {
      data[field.key] = field.value(props.row)
    } else {
      data[field.key] = field.value
    }
  }
  emits('action', { label: action.label, type: action.type, drawerFromData: data })
}
</script>

<template>
  <n-flex>
    <DataTableActionButton :action="view" :icon="EyeOutline" @click="handleClick(view)" />
    <DataTableActionButton :action="add" :icon="Add" type="info" @click="handleClick(add)" />
    <DataTableActionButton
      :action="edit"
      :icon="BuildOutline"
      type="warning"
      @click="handleClick(edit)"
    />
    <DataTableActionButton
      :action="remove"
      :icon="TrashBinOutline"
      type="error"
      @click="handleClick(remove)"
    />
  </n-flex>
</template>
