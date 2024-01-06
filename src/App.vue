<script setup>
import BaseProvider from '@/components/provider/BaseNProvider.vue'
import { dateZhCN, zhCN } from 'naive-ui'
</script>

<template>
  <n-config-provider :date-locale="dateZhCN" :locale="zhCN">
    <BaseProvider>
      <router-view />
    </BaseProvider>
  </n-config-provider>
</template>
