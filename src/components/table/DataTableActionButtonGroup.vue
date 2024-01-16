<script setup>
import { Add, BuildOutline, TrashBinOutline } from '@vicons/ionicons5'

defineProps({
  onAdd: Function,
  isAddDisabled: Boolean,
  onEdit: Function,
  isEditDisabled: Boolean,
  onDelete: Function,
  isDeleteDisabled: Boolean
})
</script>

<template>
  <n-flex>
    <n-button v-if="onAdd" :disabled="isAddDisabled" circle secondary type="info" @click="onAdd">
      <template #icon>
        <n-icon>
          <Add />
        </n-icon>
      </template>
    </n-button>
    <n-button
      v-if="onEdit"
      :disabled="isEditDisabled"
      circle
      secondary
      type="warning"
      @click="onEdit"
    >
      <template #icon>
        <n-icon>
          <BuildOutline />
        </n-icon>
      </template>
    </n-button>
    <n-popover v-if="onDelete" placement="left" trigger="click">
      <template #trigger>
        <n-button :disabled="isDeleteDisabled" circle secondary type="error">
          <template #icon>
            <n-icon>
              <TrashBinOutline />
            </n-icon>
          </template>
        </n-button>
      </template>
      <n-button size="small" type="error" @click="onDelete">确认删除</n-button>
    </n-popover>
  </n-flex>
</template>

<style scoped></style>
