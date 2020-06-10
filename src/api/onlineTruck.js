import { axios } from '@/utils/request'

// 获取地图车辆信息
export const queryTrucks = () => {
  return axios({
    url: '/online/car/showVehicle'
  })
}

// 根据车牌获取地图车辆信息
export const queryVehicleInfo = (params) => {
  return axios({
    url: '/online/car/getVehicleInfo',
    params
  })
}

// 获取统计数据
export const queryStatisticsVehicle = () => {
  return axios({
    url: '/online/car/statisticsVehicle'
  })
}
