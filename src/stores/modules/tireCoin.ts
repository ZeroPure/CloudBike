import type { BalanceResult } from '@/services/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTireCoinStore = defineStore('tireCoin', () => {
  const selectedTireCoin = ref<BalanceResult>({
    balance: 0,
  })

  const changeSelectedTireCoin = (val: BalanceResult) => {
    selectedTireCoin.value = val
  }

  return {
    selectedTireCoin,
    changeSelectedTireCoin,
  }
})
