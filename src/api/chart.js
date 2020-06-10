import { axios } from '@/utils/request'

// 获取首页基础统计
export function queryStatisBase(params) {
  return axios({
    url: 'statis/transCapaHome/statisBase',
    params
  })
}

// 获取首页图表总数据汇总
export function querySumAndAvgByYear(params) {
  return axios({
    url: 'statis/transCapaHome/sumAndAvgByYear',
    params
  })
}

// 获取首页图表数据
export function querySumTransCapaByMonth(params) {
  return axios({
    url: 'statis/transCapaHome/sumTransCapaByMonth',
    params
  })
}

// 获取首页承运商排行 日期标志(今日 today,本周 week,本月 month,本年 year,指定 appoint)
export function queryRankCarrierFreight(params) {
  return axios({
    url: 'statis/transCapaHome/rankCarrierFreight',
    params
  })
}
