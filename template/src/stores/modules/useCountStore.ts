import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCountStore = defineStore('count', () => {
  const count = ref(0)

  const add = () => {
    count.value++
  }

  const minus = () => {
    count.value--
  }

  return {
    count,
    add,
    minus,
  }
})
