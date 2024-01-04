<script setup>
import BaseNProviderMounter from '@/components/provider/BaseNProviderMounter.vue'
</script>
<template>
  <n-dialog-provider>
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <BaseNProviderMounter>
            <slot />
          </BaseNProviderMounter>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-dialog-provider>
</template>
