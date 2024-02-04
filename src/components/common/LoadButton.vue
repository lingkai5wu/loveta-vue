<script setup>
const props = defineProps({
  handleClick: Function
})

const loading = ref(false)

async function handleClickWithLoading(e) {
  loading.value = true
  try {
    await props.handleClick(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <n-button :loading @click="handleClickWithLoading">
    <slot />
  </n-button>
</template>

<style scoped></style>
