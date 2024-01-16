<script setup>
import router from '@/router'
import { useAuthStore } from '@/stores/auth.js'
import { login, register } from '@/api/auth.js'
import { initRuntimeData } from '@/utils/init.js'

const formData = ref({
  phone: '18888888888',
  password: '123456'
})
const isLoginLoading = ref(false)
const isRegisterLoading = ref(false)
const authStore = useAuthStore()

function onLogin() {
  isLoginLoading.value = true
  login(formData.value)
    .then(async (result) => {
      authStore.token = result.data
      await initRuntimeData()
      window.$message.success('登录成功')
      router.push('/')
    })
    .finally(() => {
      isLoginLoading.value = false
    })
}

function onRegister() {
  isRegisterLoading.value = true
  register(formData.value)
    .then((result) => {
      authStore.token = result.data
      window.$message.success('注册成功')
    })
    .finally(() => {
      isRegisterLoading.value = false
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
          <n-button
            :disabled="isRegisterLoading"
            :loading="isLoginLoading"
            type="primary"
            @click="onLogin"
            >登录
          </n-button>
        </n-form-item>
        <n-button :disabled="isLoginLoading" :loading="isRegisterLoading" @click="onRegister"
          >注册
        </n-button>
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
