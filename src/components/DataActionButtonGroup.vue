<script setup>
import { Add, BuildOutline, TrashBinOutline } from '@vicons/ionicons5'

defineProps({
  onAdd: Function,
  onEdit: Function,
  onDelete: Function,
  hasChildren: Boolean
})
</script>

<template>
  <n-space>
    <n-button v-if="onAdd" circle secondary type="info" @click="onAdd">
      <template #icon>
        <n-icon>
          <Add />
        </n-icon>
      </template>
    </n-button>
    <n-button v-if="onEdit" circle secondary type="warning" @click="onEdit">
      <template #icon>
        <n-icon>
          <BuildOutline />
        </n-icon>
      </template>
    </n-button>
    <n-popover v-if="onDelete" placement="left" trigger="click">
      <template #trigger>
        <n-button :disabled="hasChildren" circle secondary type="error">
          <template #icon>
            <n-icon>
              <TrashBinOutline />
            </n-icon>
          </template>
        </n-button>
      </template>
      <n-button size="small" type="error" @click="onDelete">确认删除</n-button>
    </n-popover>
  </n-space>
</template>

<style scoped></style>
