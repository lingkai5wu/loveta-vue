<script setup>
defineProps({
  action: Object,
  icon: Object
})
</script>

<template>
  <n-button v-if="action.fields" :disabled="action.disable" circle secondary>
    <template #icon>
      <n-icon>
        <component :is="icon" />
      </n-icon>
    </template>
  </n-button>
</template>

<style scoped></style>
