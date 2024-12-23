import { http } from '@/utils/http'

// 加入购物车参数类型
export type AddCartParams = {
  bikeId: number
  type: number
  count: number
}

// 修改购物车数量参数类型
export type UpdateCartParams = {
  id: number
  type: number
}

//查看自己购物车参数
export type GetCartResult = {
  id: number
  type: number //0:日租 1:月租  2:购买
  count: number //业务叠加数量
  payment: number
  number: string //车牌号
  name: string
  images: Array<string> //图片数组
  selected: boolean // 是否选中
  status: number // 0：正常，1：待提车，2：租赁中，3：已售，4：待归还
}

// 根据id批量删除购物车
export type DeleteCartParams = {
  ids: Array<number>
}

// 提交订单
export type SubmitOrderParams = {
  id: number // 购物车id
}

export type SubmitOrderResult = {
  id: number // 订单id
}

/**
 * 加入购物车
 * @param data 请求体参数
 */
export const postAddCartAPI = (data: AddCartParams) => {
  return http({
    method: 'POST',
    url: '/user/cart',
    data,
  })
}

/**
 * 修改购物车数量
 */
export const putUpdateCartAPI = (id: number, data: UpdateCartParams) => {
  return http({
    method: 'PUT',
    url: `/user/cart/${id}?type=${data.type}`,
  })
}

/**
 * 查看自己购物车
 */
export const getCartAPI = () => {
  return http<Array<GetCartResult>>({
    method: 'GET',
    url: '/user/cart/list',
  })
}

/**
 * 根据id批量删除购物车
 */
export const deleteCartAPI = (data: DeleteCartParams) => {
  return http({
    method: 'DELETE',
    url: `/user/cart?ids=${data.ids}`, // 直接拼接查询参数
  })
}

/**
 * 提交订单
 */
export const postSubmitOrderAPI = (data: SubmitOrderParams) => {
  return http<SubmitOrderResult>({
    method: 'POST',
    url: `/user/cart/submit?id=${data.id}`,
  })
}
