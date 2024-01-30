<script setup>
const props = defineProps({
  action: Object,
  type: String,
  icon: Object
})
const emits = defineEmits(['actionClick'])

function handleClick() {
  emits('actionClick', props.action)
}
</script>

<template>
  <div v-if="action">
    <n-button
      v-if="!action.popConfirm"
      :disabled="action.disable"
      :type="type"
      circle
      secondary
      @click="handleClick"
    >
      <template #icon>
        <n-icon>
          <component :is="icon" />
        </n-icon>
      </template>
    </n-button>
    <n-popover v-else placement="left" trigger="click">
      <template #trigger>
        <n-button :disabled="action.disable" :type="type" circle secondary>
          <template #icon>
            <n-icon>
              <component :is="icon" />
            </n-icon>
          </template>
        </n-button>
      </template>
      <n-button :type="type" size="small" @click="handleClick">确认{{ action.label }}</n-button>
    </n-popover>
  </div>
</template>

<style scoped></style>
