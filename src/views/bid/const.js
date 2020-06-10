import moment from 'moment'
import { filterDictText, initDictOptions } from '@/components/dict/JDictSelectUtil'

export const statusDict = { '0': '竞价中', '1': '已封标', '2': '竞价完成', '3': '作废', '4': '流标' }

//  竞价管理列表
export const bidManagerTable = (userType, type) => {
  let dynamicColumns = []
  if (userType === 'PT') {
    // 平台列表
    dynamicColumns = [
      {
        title: '订单号',
        align: 'center',
        width: 140,
        ellipsis: true,
        dataIndex: 'orderNo'
      },
      {
        title: '竞价状态',
        align: 'center',

        ellipsis: true,
        dataIndex: 'biddingStatus_dictText'
      },
      {
        title: '中标公司',
        width: 140,
        align: 'center',
        ellipsis: true,
        dataIndex: 'winningName'
      },
      {
        title: '中标金额',
        align: 'center',
        ellipsis: true,
        dataIndex: 'winningAmount',
        scopedSlots: {
          customRender: 'unitType'
        }
      },
      {
        title: '封标时间',
        align: 'center',
        ellipsis: true,
        dataIndex: 'sealingTime'
      }
    ]
  } else {
    // 承运商列表
    const countDown = (tiemr) => {
      // 倒计时时间
      if (tiemr) {
        const _d = parseInt(tiemr / 3600 / 24, 10)
        const _h = parseInt(tiemr % _d / 3600, 10)
        const _m = parseInt(tiemr % _h / 60, 10)
        return `${_d || 0}天${_d || 0}小时${_m || 0}分钟`
      }
      return ''
    }

    dynamicColumns = [
      {
        title: '报价金额(元)',
        align: 'center',
        ellipsis: true,
        dataIndex: 'gswlBiddingOffer',
        customRender: (text, record, index) => text.bidAmount

      },
      {
        title: '报价时间',
        align: 'center',
        width: 140,
        ellipsis: true,
        dataIndex: 'bidTime',
        customRender: (text, record) => record.gswlBiddingOffer.bidTime
      }
    ]
    if (type === '0') {
      // 实时竞价单
      dynamicColumns.unshift({
        title: '竞价倒计时',
        width: 140,
        align: 'center',
        ellipsis: true,
        dataIndex: 'residueTimeStamp',
        customRender: (text, record, index) => countDown(text)
      })
    } else {
      // 历史竞价单
      let dict = {}
      initDictOptions('bid_winning_status').then(res => {
        if (res.success) {
          dict = res.result
        }
      })
      dynamicColumns.unshift({
        title: '中标状态',
        align: 'center',
        ellipsis: true,
        dataIndex: 'bidWinningStatus',
        customRender: (text, record) => filterDictText(dict, record.gswlBiddingOffer.bidWinningStatus)
      })
    }
  }

  const columnsData = [
    {
      title: '竞价单号',
      align: 'center',
      width: 180,
      ellipsis: true,
      fixed: 'left',
      dataIndex: 'biddingNo'
    },
    // 动态部分
    ...dynamicColumns,
    {
      title: '托运时间',
      align: 'center',
      width: 160,
      ellipsis: true,
      dataIndex: 'consignmentDateTime'
    },
    {
      title: '配送时间',
      align: 'center',
      width: 160,
      ellipsis: true,
      dataIndex: 'shippingDateTime'
    },
    {
      title: '发货地址',
      align: 'center',
      ellipsis: true,
      dataIndex: 'consignorDeailAddr'
    },
    {
      title: '收货地址',
      align: 'center',
      ellipsis: true,
      dataIndex: 'consigneeDeailAddr'
    },
    {
      title: '货物名称',
      align: 'center',
      ellipsis: true,
      dataIndex: 'goodsNames'
    },
    // {
    //   title: '货物类型',
    //   align: 'center',
    //   ellipsis: true,
    //   dataIndex: 'cargoTypeClassificationCode'
    // },
    // {
    //   title: '包装',
    //   align: 'center',
    //   ellipsis: true,
    //   dataIndex: 'cargoPackCode'
    // },
    {
      title: '数量',
      align: 'center',
      ellipsis: true,
      dataIndex: 'totalNumber'
    },
    {
      title: '重量(吨)',
      align: 'center',
      ellipsis: true,
      dataIndex: 'totalWeight'
    },
    {
      title: '体积(m³)',
      align: 'center',
      ellipsis: true,
      dataIndex: 'totalCube'
    },
    {
      title: '操作',
      ellipsis: true,
      dataIndex: 'action',
      scopedSlots: {
        customRender: 'action'
      },
      fixed: 'right'
    }
  ]

  columnsData.forEach((item) => {
    if (!item.width) { item.width = 99 }
  })

  return columnsData
}

export const goodsColumnsData = that => {
  return [
    {
      title: '序号',
      align: 'center',
      width: 30,
      dataIndex: 'id',
      scopedSlots: {
        customRender: 'id'
      }
    },
    {
      title: '货物名称',
      align: 'center',
      width: 100,
      dataIndex: 'descriptionOfGoods',
      scopedSlots: {
        customRender: 'descriptionOfGoods'
      }
    },
    {
      title: '货物类型',
      align: 'center',
      width: 100,
      dataIndex: 'cargoTypeClassificationCode',
      scopedSlots: {
        customRender: 'cargoTypeClassificationCode'
      }
    },

    {
      title: '包装',
      align: 'center',
      width: 100,
      dataIndex: 'cargoPackCode',
      scopedSlots: {
        customRender: 'cargoPackCode'
      }
    },
    {
      title: '数量',
      align: 'center',
      width: 100,
      dataIndex: 'totalNumberOfPackages',
      scopedSlots: {
        customRender: 'totalNumberOfPackages'
      }
    },
    {
      title: '重量（吨）',
      align: 'center',
      width: 100,
      dataIndex: 'goodsItemGrossWeight',
      scopedSlots: {
        customRender: 'goodsItemGrossWeight'
      }
    },
    {
      title: '体积（m³）',
      align: 'center',
      width: 100,
      dataIndex: 'cube',
      scopedSlots: {
        customRender: 'cube'
      }
    }
  ]
}
export const columnsData = that => {
  return [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'id',
      width: 40,
      ellipsis: true,
      scopedSlots: {
        customRender: 'id'
      }
    },
    {
      title: '报价公司',
      align: 'center',
      dataIndex: 'bidderName',
      width: 120,
      ellipsis: true
    },
    {
      title: '报价金额',
      align: 'center',
      dataIndex: 'bidAmount',
      width: 80,
      ellipsis: true,
      sorter: (a, b) => {
        return a - b
      }
    },
    {
      title: '报价时间',
      align: 'center',
      dataIndex: 'bidTime',
      width: 100,
      ellipsis: true,
      sorter: (a, b) => moment(a['bidTime']).valueOf() - moment(b['bidTime']).valueOf()
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'remark',
      width: 200,
      ellipsis: true
    }
  ]
}
