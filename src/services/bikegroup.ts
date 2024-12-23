import { http } from '@/utils/http'

// 申请骑行团参数
export type ApplyBikeGroupParams = {
  name: string
  meetingPoint: string
  departureTime: string
  description: string
  maxPeople: number
  images: Array<string>
}

// 最近的骑行团列表
export type GetRecentBikeGroupResult = {
  id: number
  name: string
  username: string
  images: Array<string>
  departureTime: string
  participants: number
}

// 根据id查询骑行团详情
export type BikeGroupDetailParams = {
  id: number
}

export type BikeGroupDetailResult = {
  id: number
  username: string
  rideTimes: number
  name: string // 骑行团名称
  departureTime: string // 出发时间
  meetingPoint: string // 集合地点
  description: string // 骑行团描述
  participants: number // 参与人数
  images: Array<string>
}

//加入骑行团参数
export type JoinBikeGroupParams = {
  id: number // 骑行团id
}

// 查询我的骑行活动
export type GetMyBikeActivitiesParams = {
  status: number // 0：全部，1：未开始，2：已结束
}

export type GetMyBikeActivitiesResult = {
  id: number // 骑行活动id
  name: string
  meetingPoint: string
  departureTime: string
  participants: number
  images: Array<string>
  status: number // 0：审核中，1：已通过，2：已驳回，3：已结束
}

/**
 * 申请骑行团
 * @param data
 */
export const postApplyBikeGroupAPI = (data: ApplyBikeGroupParams) => {
  return http({
    url: '/user/ride',
    method: 'POST',
    data,
  })
}

/**
 * 申请骑行团
 * @param data
 */
export const getRecentBikeGroupAPI = () => {
  return http<Array<GetRecentBikeGroupResult>>({
    url: '/user/ride/list',
    method: 'GET',
  })
}

/**
 * 根据id查询骑行团详情
 * @param data
 */
export const getBikeGroupDetailAPI = (data: BikeGroupDetailParams) => {
  return http<BikeGroupDetailResult>({
    url: '/user/ride',
    method: 'GET',
    data,
  })
}

/**
 * 加入骑行团
 * @param data
 */
export const putBikeGroupJoinAPI = (data: JoinBikeGroupParams) => {
  return http({
    url: `/user/ride/join?id=${data.id}`,
    method: 'PUT',
  })
}

/**
 * 查询“我的”骑行活动
 * @param data
 */

export const getMyBikeActivitiesAPI = (data: GetMyBikeActivitiesParams) => {
  return http<Array<GetMyBikeActivitiesResult>>({
    url: '/user/ride/history',
    method: 'GET',
    data,
  })
}
