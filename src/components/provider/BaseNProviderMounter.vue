<script setup>
import { useDialog, useLoadingBar, useMessage, useNotification } from 'naive-ui'

window['$dialog'] = useDialog()
window['$loading'] = useLoadingBar()
window['$message'] = useMessage()
window['$notification'] = useNotification()
</script>

<template>
  <slot />
</template>
