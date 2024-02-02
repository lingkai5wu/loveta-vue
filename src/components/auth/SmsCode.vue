<script setup>
defineProps({
  timeout: { type: Number, default: 60 }
})
const model = defineModel('value', { required: true })

const active = ref(false)

function renderCountdown({ hours, minutes, seconds }) {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds
  return h('span', totalSeconds + 's')
}
</script>

<template>
  <n-input v-model:value="model" placeholder="6 位验证码" style="width: 100%">
    <template #suffix>
      <n-button :disabled="active" quaternary size="small" @click="active = true">
        <n-flex size="small">
          <n-countdown
            v-if="active"
            :active="active"
            :duration="timeout * 1000"
            :render="renderCountdown"
            @finish="active = false"
          />
          <span>获取验证码</span>
        </n-flex>
      </n-button>
    </template>
  </n-input>
</template>

<style scoped>
.sms-code-input {
  width: 100%;
}
</style>
