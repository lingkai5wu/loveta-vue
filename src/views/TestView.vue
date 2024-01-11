<script setup>
import { getDirectPostObjectParam } from '@/api/oss.js'

const directPostObjectParam = ref({})

async function onBeforeUpload() {
  directPostObjectParam.value = (await getDirectPostObjectParam()).data
}

function getData(file) {
  return {
    key: file.file.name,
    ...directPostObjectParam.value.auth
  }
}
</script>

<template>
  <n-upload :action="directPostObjectParam.host" :data="getData" :on-before-upload="onBeforeUpload">
    <n-button>上传文件</n-button>
  </n-upload>
</template>

<style scoped></style>
