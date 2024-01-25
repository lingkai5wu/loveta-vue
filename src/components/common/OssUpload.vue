<script setup>
import { CloudUploadOutline } from '@vicons/ionicons5'
import { useOssStore } from '@/stores/oss.js'

const directPostObjectInfo = ref({})
const ossStore = useOssStore()

async function onBeforeUpload() {
  directPostObjectInfo.value = await ossStore.getValidOrRefreshDirectPostObjectInfo()
}

function getData(file) {
  return {
    key: file.file.name,
    ...directPostObjectInfo.value.auth
  }
}
</script>

<template>
  <n-upload
    :action="directPostObjectInfo.host"
    :data="getData"
    :on-before-upload="onBeforeUpload"
    directory-dnd
    multiple
    style="max-width: 600px"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon :depth="3" size="48">
          <CloudUploadOutline />
        </n-icon>
      </div>
      <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传</n-text>
    </n-upload-dragger>
  </n-upload>
</template>

<style scoped></style>
