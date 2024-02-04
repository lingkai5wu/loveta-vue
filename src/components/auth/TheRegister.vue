<script setup>
import { register } from '@/api/auth.js'
import { initRuntimeData } from '@/utils/init.js'
import router from '@/router/index.js'
import { useAuthStore } from '@/stores/auth.js'
import SmsCode from '@/components/auth/SmsCode.vue'

const formData = ref({
  phone: '',
  smsCode: '',
  password: '',
  reenteredPassword: ''
})
const formRef = ref()
const reenteredPasswordRef = ref()
const rules = {
  phone: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('请输入手机号')
        }
        if (!/^1\d{10}$/.test(value)) {
          return new Error('请输入正确的手机号')
        }
        return true
      },
      trigger: 'blur'
    }
  ],
  smsCode: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('请输入验证码')
        }
        if (!/^\d{6}$/.test(value)) {
          return new Error('请输入正确的验证码')
        }
      },
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('请输入密码')
        }
        if (value.length < 6) {
          return new Error('密码过短')
        }
        if (value.length > 20) {
          return new Error('密码过长')
        }
        if (!/[a-zA-Z]/.test(value)) {
          return new Error('密码需要包含英语字母')
        }
        if (!/\d/.test(value)) {
          return new Error('密码需要包含阿拉伯数字')
        }
      },
      trigger: 'blur'
    }
  ],
  reenteredPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: 'blur'
    },
    {
      validator: (_, value) =>
        formData.value.password &&
        formData.value.password.startsWith(value) &&
        formData.value.password.length >= value.length,
      message: '两次密码输入不一致',
      trigger: 'input'
    },
    {
      validator: (_, value) => value === formData.value.password,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input']
    }
  ]
}
const isLoading = ref(false)

function handlePasswordInput() {
  if (formData.value.reenteredPassword) {
    reenteredPasswordRef.value.validate({ trigger: 'password-input' }).catch(() => {
      // pass
    })
  }
}

const authStore = useAuthStore()

async function handelRegister() {
  await formRef.value.validate()
  isLoading.value = true
  const data = { ...formData.value }
  delete data.reenteredPassword
  register(formData.value)
    .then(async (data) => {
      authStore.token = data
      await initRuntimeData()
      window.$message.success('注册成功')
      // TODO 跳转到初次使用引导页面
      await router.push('/')
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <n-h1>欢迎！</n-h1>
  <n-h3>让我们创建您的帐户</n-h3>
  <n-form ref="formRef" :model="formData" :rules="rules" size="large">
    <n-form-item label="手机号" path="phone">
      <n-input v-model:value="formData.phone" placeholder="中国大陆手机号" />
    </n-form-item>
    <n-form-item label="验证码" path="smsCode">
      <SmsCode v-model:value="formData.smsCode" />
    </n-form-item>
    <n-form-item first label="密码" path="password">
      <n-input
        v-model:value="formData.password"
        placeholder="6~16位，包含字母和数字"
        show-password-on="mousedown"
        type="password"
        @input="handlePasswordInput"
      />
    </n-form-item>
    <n-form-item ref="reenteredPasswordRef" first label="重复密码" path="reenteredPassword">
      <n-input
        v-model:value="formData.reenteredPassword"
        placeholder="再次输入您的密码"
        show-password-on="mousedown"
        type="password"
      />
    </n-form-item>
    <n-button :loading="isLoading" type="primary" @click="handelRegister">注册</n-button>
  </n-form>
</template>
