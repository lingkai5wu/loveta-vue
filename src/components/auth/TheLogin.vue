<script setup>
import router from '@/router'
import { useAuthStore } from '@/stores/auth.js'
import { login } from '@/api/auth.js'
import { initRuntimeData } from '@/utils/init.js'

const formData = ref({
  phone: '18888888888',
  password: 'loveta123'
})
const formRef = ref()
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
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
}
const isLoading = ref(false)

const authStore = useAuthStore()

function handelLogin() {
  isLoading.value = true
  login(formData.value)
    .then(async (data) => {
      authStore.token = data
      await initRuntimeData()
      window.$message.success('登录成功')
      // TODO 跳转到登录前页面
      await router.push('/')
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <n-h1>欢迎回来</n-h1>
  <n-h3>登录您的帐户</n-h3>
  <n-form ref="formRef" :model="formData" :rules="rules" size="large">
    <n-form-item label="手机号" path="phone">
      <n-input v-model:value="formData.phone" placeholder="中国大陆手机号" />
    </n-form-item>
    <n-form-item label="密码" path="password">
      <n-input v-model:value="formData.password" placeholder="您的密码" type="password" />
    </n-form-item>
    <n-flex>
      <n-button :loading="isLoading" type="primary" @click="handelLogin">登录</n-button>
      <n-button quaternary type="info">忘记密码</n-button>
    </n-flex>
  </n-form>
</template>
