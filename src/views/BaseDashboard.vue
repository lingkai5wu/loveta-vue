<script setup>
import { useUserStore } from '@/stores/user.js'

const userStore = useUserStore()
</script>

<template>
  <h2>我是Dashboard</h2>
  <p>{{ userStore.userVO }}</p>
</template>

<style scoped></style>
