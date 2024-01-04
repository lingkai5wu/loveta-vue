<script setup>
import { Add, BuildOutline, TrashBinOutline } from '@vicons/ionicons5'

defineProps({
  onAdd: Function,
  onEdit: Function,
  onDelete: Function
})
</script>

<template>
  <n-space>
    <n-button v-if="onAdd" secondary circle type="info" @click="onAdd">
      <template #icon>
        <n-icon>
          <Add />
        </n-icon>
      </template>
    </n-button>
    <n-button v-if="onEdit" secondary circle type="warning" @click="onEdit">
      <template #icon>
        <n-icon>
          <BuildOutline />
        </n-icon>
      </template>
    </n-button>
    <n-popover v-if="onDelete" trigger="click" placement="left">
      <template #trigger>
        <n-button secondary circle type="error">
          <template #icon>
            <n-icon>
              <TrashBinOutline />
            </n-icon>
          </template>
        </n-button>
      </template>
      <n-button type="error" @click="onDelete" size="small">确认删除</n-button>
    </n-popover>
  </n-space>
</template>

<style scoped></style>
