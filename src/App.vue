<script setup>
import BaseProvider from '@/components/provider/BaseNProvider.vue'
import { dateZhCN, zhCN } from 'naive-ui'
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <BaseProvider>
      <router-view />
    </BaseProvider>
  </n-config-provider>
</template>
