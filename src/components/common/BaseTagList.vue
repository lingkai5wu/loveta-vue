<script setup>
defineProps({
  list: Array
})
</script>

<template>
  <n-flex size="small">
    <n-tag v-for="(item, index) in list" :key="index">
      {{ item }}
    </n-tag>
  </n-flex>
</template>

<style scoped></style>
