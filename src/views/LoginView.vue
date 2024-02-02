<script setup>
import TheRegister from '@/components/auth/TheRegister.vue'
import TheLogin from '@/components/auth/TheLogin.vue'
</script>

<template>
  <n-flex align="center" class="container" justify="center">
    <n-card>
      <n-tabs animated default-value="login" size="large">
        <n-tab-pane name="login" tab="登录">
          <TheLogin />
        </n-tab-pane>
        <n-tab-pane name="register" tab="注册">
          <TheRegister />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-flex>
</template>

<style>
.container {
  min-height: 100vh;
}

.n-card {
  max-width: 400px;
}

.n-h1,
.n-h3 {
  margin: 4px 0;
}

.n-h3 {
  margin-bottom: 24px;
}
</style>
