// TODO 消除硬编码
const baseTitle = 'LoveTA'

export function createPageTitleGuard(router) {
  router.afterEach((to) => {
    const pageTitle = to.meta?.label
    if (pageTitle) {
      document.title = `${pageTitle} - ${baseTitle}`
    } else {
      document.title = baseTitle
    }
  })
}
