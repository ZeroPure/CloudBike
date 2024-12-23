import { http } from '@/utils/http'

// 分类查询单车信息参数
export type CategoryParams = {
  type: number // 分类id
}


export type CategoryResult = {
  id: number
  name: string
  size: number // 车身大小
  price: number // 单价
  daily: number // 日租金
  monthly: number // 月租金
  images: Array<string> // 图片
}

// 根据id查询单车详情参数
export type DetailParams = {
  id: number // 单车id
}

export type DetailResult = {
  id: number //单车id
  number: number // 单车编号
  name: string // 单车名称
  type: number // 自行车类型（0：公路车，1：旅行车，2：折叠车，3：死飞，4：山地车，5：其他）
  size: number // 车身大小
  age: number // 车龄
  price: number // 售价
  daily: number // 日租金
  monthly: number // 月租金
  description: string // 车况描述
  status: number // 车况状态 0：正常，1：待提车，2：租赁中，3：已售，4：待归还）
  images: Array<string> // 图片
}

/**
 *  分类查询单车信息
 */
export const getCategoryAPI = (data: CategoryParams) => {
  return http<Array<CategoryResult>>({
    url: '/user/bike/category',
    method: 'GET',
    data
  })
}

/**
 *  根据id查询单车详情
 */

export const getDetailAPI = (id: number, data: DetailParams) => {
  return http<DetailResult>({
    method: 'GET',
    url: `/user/bike/${id}`,
    data,
  })
}
