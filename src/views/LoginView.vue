<script setup>
import router from '@/router'
import { useAuthStore } from '@/stores/auth.js'
import { login, register } from '@/api/auth.js'

const formData = ref({
  phone: '18888888888',
  password: '123456'
})

const authStore = useAuthStore()

function onLogin() {
  login(formData.value).then((result) => {
    authStore.token = result.data
    window.$message.success('登录成功')
    router.push('/')
  })
}

function onRegister() {
  register(formData.value).then((result) => {
    authStore.token = result.data
    window.$message.success('注册成功')
    router.push('/')
  })
}
</script>

<template>
  <div class="container">
    <n-card>
      <template #header>
        <span>登录</span>
      </template>
      <n-form :model="formData">
        <n-form-item label="手机号" path="phone">
          <n-input v-model:value="formData.phone" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input v-model:value="formData.password" type="password" />
        </n-form-item>
        <n-form-item>
          <n-button type="primary" @click="onLogin">登录</n-button>
        </n-form-item>
        <n-button @click="onRegister">注册</n-button>
      </n-form>
    </n-card>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.n-card {
  max-width: 400px;
}

.n-button {
  width: 100%;
}
</style>
