import { defineStore } from 'pinia'
import { getDirectPostObjectInfo } from '@/api/oss.js'

export const useOssStore = defineStore('oss', () => {
  const directPostObjectInfo = ref()
  let directPostObjectInfoPromise = null

  function getValidOrRefreshDirectPostObjectInfo() {
    if (directPostObjectInfo.value && directPostObjectInfo.value.expire - Date.now() > 10 * 1000) {
      return Promise.resolve(directPostObjectInfo.value)
    }

    if (!directPostObjectInfoPromise) {
      directPostObjectInfoPromise = new Promise((resolve) => {
        getDirectPostObjectInfo()
          .then((result) => {
            directPostObjectInfo.value = result.data
            resolve(result.data)
          })
          .finally(() => {
            directPostObjectInfoPromise = null
          })
      })
    }
    return directPostObjectInfoPromise
  }

  return {
    getValidOrRefreshDirectPostObjectInfo
  }
})
