<script setup>
import { Add, BuildOutline, EyeOutline, TrashBinOutline } from '@vicons/ionicons5'
import DataTableActionButton from '@/components/table/DataTableActionButton.vue'

const props = defineProps({
  actions: { type: Object, required: true },
  row: { type: Object, required: true }
})
const emits = defineEmits(['action'])

const defaultActions = {
  view: {
    label: '查看',
    drawer: true,
    popConfirm: false
  },
  add: {
    label: '新增',
    drawer: true,
    popConfirm: false
  },
  edit: {
    label: '修改',
    drawer: true,
    popConfirm: false
  },
  remove: {
    label: '删除',
    drawer: false,
    popConfirm: true
  }
}
const updatedActions = ref({})
getUpdatedActions()

function getUpdatedActions() {
  for (let actionKey in props.actions) {
    updatedActions.value[actionKey] = {
      row: props.row,
      ...defaultActions[actionKey],
      ...props.actions[actionKey]
    }
  }
}

watchEffect(checkDisable)

function checkDisable() {
  for (let key in updatedActions.value) {
    const rawAction = props.actions[key]
    if (typeof rawAction.disable === 'function') {
      updatedActions.value[key].disable = rawAction.disable(props.row)
    }
  }
}

function handleActionClick(action) {
  const data = {}
  if (action.fields) {
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
  }
  emits('action', { ...action, data: data })
}
</script>

<template>
  <n-flex>
    <DataTableActionButton
      :action="updatedActions.view"
      :icon="EyeOutline"
      @action-click="handleActionClick"
    />
    <DataTableActionButton
      :action="updatedActions.add"
      :icon="Add"
      type="info"
      @action-click="handleActionClick"
    />
    <DataTableActionButton
      :action="updatedActions.edit"
      :icon="BuildOutline"
      type="warning"
      @action-click="handleActionClick"
    />
    <DataTableActionButton
      :action="updatedActions.remove"
      :icon="TrashBinOutline"
      type="error"
      @action-click="handleActionClick"
    />
  </n-flex>
</template>
