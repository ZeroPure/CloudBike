import { http } from '@/utils/http'
import type { LoginResult } from '@/types/member'
type LoginParams = {
  code: string
  encryptedData: string
  iv: string
}

export const postLoginWxMinAPI = (data: { code: string; encryptedData: string | undefined; iv: string | undefined }) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/user/user/login',
    data:{

    }
  })
}
