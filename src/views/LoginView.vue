<script setup>
import router from '@/router'
import { useTokenStore } from '@/stores/token.js'
import request from '@/utils/request.js'

const formData = ref({
  phone: '18888888888',
  password: '123456'
})

const tokenStore = useTokenStore()

function onLogin() {
  request.post('/auth/login', formData.value).then((result) => {
    tokenStore.setToken(result.data)
    window.$message.success('登录成功')
    console.log(tokenStore.name, tokenStore.value)
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
        <n-button>注册</n-button>
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
