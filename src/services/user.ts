import { http } from '@/utils/http'

// 查看个人信息参数
export type UserInfoResult = {
  username: string
  phone: string
  image: string // 头像图片路径
}

// 编辑个人信息参数
export type EditUserInfoParams = {
  username: string
  phone: string
  image: string
}

//查询个人余额参数
export type BalanceResult = {
  balance: number
}

/**
 * 查看个人信息
 */
export const getUserInfoAPI = () => {
  return http<UserInfoResult>({
    method: 'GET',
    url: '/user/user',
  })
}

/**
 * 编辑个人信息
 */
export const putUserInfoAPI = (data: EditUserInfoParams) => {
  return http({
    method: 'PUT',
    url: `/user/user?username=${data.username}&phone=${data.phone}&image=${data.image}`,
  })
}

/**
 * 查询个人余额
 */
export const getBalanceAPI = () => {
  return http<BalanceResult>({
    method: 'GET',
    url: '/user/user/balance',
  })
}
