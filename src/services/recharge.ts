import { http } from '@/utils/http'

export type RechargeParams = {
  discount: number // 套餐号
}

/**
 * 轮胎币充值
 * @returns
 */
export const putMemberTireCoinAPI = async (data: RechargeParams) => {
  return http({
    method: 'PUT',
    url: `/user/user/deposit?discount=${data.discount}`,
  })
}
