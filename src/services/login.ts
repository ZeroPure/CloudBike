import { http } from '@/utils/http'

// 请求参数
type LoginWxMinParams = {
  code: string
}

// 返回参数
export type LoginResult = {
  id: string
  openid: string
  token: string
}
/**
 * 小程序登录
 * @param data 请求参数
 */
export const postLoginWxMinAPI = (data: LoginWxMinParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/user/user/login',
    data,
  })
}
