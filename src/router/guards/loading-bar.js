export function createLoadingBarGuard(router) {
  router.beforeEach(() => {
    window.$loading.start()
  })

  router.afterEach(() => {
    window.$loading.finish()
  })

  router.onError(() => {
    window.$loading.error()
  })
}
