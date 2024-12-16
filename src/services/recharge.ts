import { http } from '@/utils/http'
//获取用户轮胎币余额
export const getMemberTireCoinAPI = async () => {
  return http<number>({
    method: 'GET',
    url: '',
  })
}

//上传用户充值余额
export const putMemberTireCoinAPI = async () => {
  return http<number>({
    method: 'POST',
    url: '',
  })
}
