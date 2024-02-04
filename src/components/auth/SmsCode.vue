<script setup>
import LoadButton from '@/components/common/LoadButton.vue'
import { sleep } from '@/utils/common.js'
import { useAuthStore } from '@/stores/auth.js'

onMounted(() =>
  checkInterval().catch(() => {
    // pass
  })
)

const props = defineProps({
  interval: { type: Number, default: 60 }
})
const model = defineModel('value', { required: true })

const countdownActive = ref(false)
const remainder = ref()

function renderCountdown({ hours, minutes, seconds }) {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds
  return h('span', totalSeconds + 's')
}

const authStore = useAuthStore()

function checkInterval() {
  const current = Date.now()
  const last = authStore.lastSentSmsCodeTimestamp
  const interval = props.interval * 1000
  return new Promise((resolve, reject) => {
    if (last && last + interval > current) {
      remainder.value = interval - (current - last)
      countdownActive.value = true
      return reject('请求验证码过快')
    }
    return resolve()
  })
}

async function handleSent() {
  await checkInterval()
  authStore.lastSentSmsCodeTimestamp = Date.now()
  await sleep(1000)
  remainder.value = props.interval * 1000
  window.$message.info('发送验证码的功能还没做...')
  window.$message.info('先给你填好了')
  model.value = '808080'
  setTimeout(() => (countdownActive.value = true), 200)
}
</script>

<template>
  <n-input v-model:value="model" placeholder="6 位验证码" style="width: 100%">
    <template #suffix>
      <LoadButton :disabled="countdownActive" :handle-click="handleSent" quaternary size="small">
        <n-flex size="small">
          <n-countdown
            v-if="countdownActive"
            :active="countdownActive"
            :duration="remainder"
            :render="renderCountdown"
            @finish="countdownActive = false"
          />
          <span>获取验证码</span>
        </n-flex>
      </LoadButton>
    </template>
  </n-input>
</template>

<style scoped>
.sms-code-input {
  width: 100%;
}
</style>
