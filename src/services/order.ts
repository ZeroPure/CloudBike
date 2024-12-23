import { http } from '@/utils/http'

//查看我的订单参数
export type OrderParams = {
  category: number
}

export type OrderResult = {
  id: number
  number: string
  name: string
  images: Array<string>
  type: number
  count: number // 业务叠加数量
  createTime: string
  pickTime: string
  payment: number
  status: number // 订单状态（0：待付款，1：待提车，2：租赁中，3：已完成，4：待归还，5：已取消）
}

// 根据id查看订单
export type OrderDetailParams = {
  id: number // 订单id
}

export type OrderDetailResult = {
  id: number
  number: number
  name: string
  images: Array<string>
  type: number // 0：日租，1：月租，2：购买
  count: number // 业务叠加数量
  createTime: string
  pickTime: string
  payment: number
  status: number //0：待付款，1：待提车，2：租赁中，3：已完成，4：待归还，5：已取消
}

// 根据订单ids批量删除订单
export type OrderDeleteParams = {
  ids: Array<string>
}

// 订单支付
export type OrderPayParams = {
  id: number // 订单id
}

// 取消订单
export type OrderCancelParams = {
  id: number // 订单id
}

/**
 * 查看我的订单
 */
export const getOrderListAPI = (data: OrderParams) => {
  return http<Array<OrderResult>>({
    url: '/user/order/list',
    method: 'GET',
    data,
  })
}

/**
 * 根据id查看订单
 */
export const getOrderDetailAPI = (data: OrderDetailParams) => {
  return http<OrderDetailResult>({
    url: '/user/order',
    method: 'GET',
    data,
  })
}

/**
 * 订单支付
 */
export const putOrderPayAPI = (data: OrderPayParams) => {
  return http({
    url: `/user/order/pay?id=${data.id}`,
    method: 'PUT',
  })
}

/**
 * 根据订单ids批量删除订单
 */
export const deleteOrderAPI = (data: OrderDeleteParams) => {
  return http({
    url: '/user/order',
    method: 'DELETE',
  })
}

/**
 * 取消订单
 */
export const putOrderCancelAPI = (data: OrderCancelParams) => {
  return http({
    url: `/user/order/cancel?id=${data.id}`,
    method: 'PUT',
  })
}
