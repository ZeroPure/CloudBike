import type { UserInfoResult } from '@/services/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
    'user', () => {
  const selectedUser = ref<UserInfoResult>({
    username: '',
    phone: '',
    image: '',
  })

  const changeSelectedUser = (val: UserInfoResult) => {
    selectedUser.value = val
  }

  return {
    selectedUser,
    changeSelectedUser,
  }
})
