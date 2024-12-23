import { http } from '@/utils/http'

export type uploadParams = {
  file: File
}

export const upload = async (data: uploadParams) => {
  return http({
    method: 'POST',
    url: '/common/upload',
    data,
  })
}
