import { axios } from '@/utils/request'

// 获取首页基础统计
export function queryStatisBase(params) {
  return axios({
    url: 'statis/transCapaHome/statisBase',
    params
  })
}

// 管理列表-平台
export function queryBiddingOfferList(params) {
  return axios({
    url: '/order/gswlBiddingOffer/list',
    params
  })
}

// 管理列表-承运商-历史竞价单
export function queryHistoryPage(params) {
  return axios({
    url: '/order/gswlBiddingOffer/queryHistoryPage',
    params
  })
}

// 管理列表-承运商-实时竞价单
export function queryRealTimePage(params) {
  return axios({
    url: '/order/gswlBiddingOffer/queryRealTimePage',
    params
  })
}

// 管理列表-作废
export function deleteBidding(params) {
  return axios({
    url: '/order/gswlBiddingOffer/deleteBidding',
    method: 'delete',
    params
  })
}

//  平台点击封标按钮
export function querySealBid(params) {
  return axios({
    url: '/order/gswlBiddingOffer/sealBid',
    method: 'put',
    params
  })
}
// 竞价单评标及指派承运商
export function bidEvaluation(params) {
  return axios({
    url: '/order/gswlBiddingOffer/bidEvaluation',
    method: 'POST',
    params
  })
}
//  开启竞价
export function openBidding(data) {
  return axios({
    url: '/order/gswlBiddingOffer/openBidding',
    method: 'POST',
    data
  })
}
//  报价
export function carrierBidOffer(data) {
  return axios({
    url: '/order/gswlBiddingOffer/carrierBidOffer',
    method: 'POST',
    data
  })
}

