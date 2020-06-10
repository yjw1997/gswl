/*
 * @Description:
 * @Date: 2019-10-08 22:27:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-27 19:14:37
 */
import {
  util
} from '../util'
import Mock from 'mockjs'
export const GET = {

  // '/order/gswlWaybill/list': (req, res) => {
  //   //    获得参数
  //   let url = req.url
  //   console.log('url', url);

  //   let userName = util.getQueryString(url, 'userName')
  //   console.log('userName', userName)
  //   let userPassword = util.getQueryString(url, 'userPassword')
  //   console.log('userPassword', userPassword)
  //   return {
  //     code: 0,
  //     message: "操作成功！",
  //     success: true,
  //     result: {
  //       current: 1,
  //       orders: [],
  //       pages: 1,
  //       records: [{
  //           businessTypeCode: "1003997",
  //           businessTypeCode_dictText: "城市配送",
  //           consignee: "3",
  //           consigneeAddr: "福建省-莆田市-涵江区",
  //           consigneeAddrCode: "1111",
  //           consigneeDeailAddr: "收货详细地址3",
  //           consigneeId: "3",
  //           consigneeIdno: "2313",
  //           consigneeLinkName: "收货测试人3",
  //           consigneeLinkPhone: "13799999999",
  //           consignmentDateTime: "2020-03-05 02:15:55",
  //           consignor: "2",
  //           consignorAddr: "北京市-北京城区-朝阳区",
  //           consignorAddrCode: "1111",
  //           consignorDeailAddr: "发货详细地址2",
  //           consignorId: "2",
  //           consignorIdno: "2313",
  //           consignorLinkName: "发货测试人2",
  //           consignorLinkPhone: "13799999999",
  //           createBy: "admin",
  //           createTime: "2020-03-30 18:15:46",
  //           dataSource: "0",
  //           dataSource_dictText: "录入",
  //           delFlag: "0",
  //           goodsNames: "测试",
  //           gswlOrderGoodsList: [{
  //               cargoPackCode: "1",
  //               cargoTypeClassificationCode: "0100",
  //               createTime: null,
  //               cube: 21,
  //               descriptionOfGoods: "测试",
  //               goodsItemGrossWeight: 12,
  //               id: "8a8282ef712aec0501712af110510004",
  //               orderId: null,
  //               totalNumberOfPackages: 12
  //             },
  //             {
  //               cargoPackCode: "2",
  //               cargoTypeClassificationCode: "0100",
  //               createTime: null,
  //               cube: 21,
  //               descriptionOfGoods: "测试2",
  //               goodsItemGrossWeight: 12,
  //               id: "8a8282ef712aec0501712af110510003",
  //               orderId: null,
  //               totalNumberOfPackages: 12
  //             }
  //           ],
  //           gswlOrderTransfer: {
  //             carrierFreight: null,
  //             carrierId: null,
  //             carrierName: null,
  //             createBy: "admin",
  //             createTime: "2020-03-30 18:15:46",
  //             customerId: "3",
  //             customerName: "刘某某",
  //             delFlag: "0",
  //             enterpriseId: null,
  //             enterpriseName: null,
  //             freight: 30,
  //             id: "8a8282ef712aec0501712af0a3920001",
  //             orderId: null,
  //             orderStatus: "0",
  //             orderType: "0",
  //             paymentMeansCode: "2",
  //             rate: null,
  //             settlementDays: "30",
  //             settlementType: "1",
  //             settlementWays: "4",
  //             updateBy: null,
  //             updateTime: null
  //           },
  //           id: "8a8282ef712aec0501712af0a3920001",
  //           orderNo: "WLHY2020033012567",
  //           originalDocumentNumber: null,
  //           receiptNo: "1",
  //           receiptType: "1",
  //           remark: null,
  //           rowkey: 1,
  //           shippingDateTime: "2020-03-04 02:15:55",
  //           shippingMethod: "0",
  //           shippingNoteNumber: "1112020033012567",
  //           totalCube: 21,
  //           totalNumber: 12,
  //           totalWeight: 12,
  //           transportMode: "0",
  //           transportTypeCode: "2",
  //           transportTypeCode_dictText: "公铁联运",
  //           updateBy: null,
  //           updateTime: null
  //         },
  //         {
  //           'id': 'GS2002240002',
  //           'commison': 'GS2002240002',
  //           '2': '2016-09-21  08:50:08',
  //           '3': '2016-09-21  08:50:08',
  //           'status': '1',
  //           'CarrierFreight': '1111.11',
  //           'FreightIncome': '66',
  //           'weigth': '25',
  //           'capacity': '21.33'
  //         },
  //         {
  //           'id': 'GS2002240003',
  //           'commison': 'GS2002240003',
  //           '2': '2016-09-21  08:50:08',
  //           '3': '2016-09-21  08:50:08',
  //           'status': '2',
  //           'CarrierFreight': '1111.11',
  //           'FreightIncome': '77',
  //           'weigth': '23',
  //           'capacity': '21.33'
  //         },
  //         {
  //           'id': 'GS2002240004',
  //           'commison': 'GS2002240004',
  //           '2': '2016-09-21  08:50:08',
  //           '3': '2016-09-21  08:50:08',
  //           'status': '3',
  //           'CarrierFreight': '1111.55',
  //           'FreightIncome': '22',
  //           'weigth': '333',
  //           'capacity': '21.33'
  //         },
  //         {
  //           'id': 'GS2002240005',
  //           'commison': 'GS2002240005',
  //           '2': '2016-09-21  08:50:08',
  //           '3': '2016-09-21  08:50:08',
  //           'status': '4',
  //           'CarrierFreight': '1111.33',
  //           'FreightIncome': '444',
  //           'weigth': '111',
  //           'capacity': '21.33'
  //         }
  //       ],
  //       searchCount: true,
  //       size: 10,
  //       total: 5,
  //     },

  //   }
  // },
  '/order/gswlWaybillGps/waybillGpsList1': (req, res) => {
    return {
      code: 0,
      message: '操作成功！',
      success: true,

      result: [{
        longitude: 114.395148,
        latitude: 22.966582
      },
      {
        longitude: 113.549017,
        latitude: 23.03305

      }
      ],
      currentLocation: [116.379344, 39.9999],
      info: {
        address1: '湖南',
        city1: '长沙',
        address2: '成都',
        city2: '内江',
        km: '1226.58',
        driverName: '林程',
        phone: '15880098587',
        driverNumber: '川AS8911',
        long: '17.5',
        type: '厢式货车',
        weight: '30',
        d1: '20',
        d2: 0,
        d3: 66.7,
        freight: 8000
      }
    }
  },
  'waybill/logistics': (req, res) => {
    return {
      code: 0,
      message: '操作成功！',
      success: true,
      result: [{
        title: '创建订单',
        time: '2020-03-11 09:35:35',
        contant: '创建订单，创建人【付川】'
      },
      {
        title: '指派司机',
        time: '2020-03-11 09:35:35',
        contant: '运单指派司机，指派人【付川】'
      },
      {
        title: '已发车',
        time: '2020-03-11 09:35:35',
        contant: '运单已发车，发车人【林程】，福建省平潭综合试验区8号'
      },
      {
        title: '已送达',
        time: '2020-03-11 09:35:35',
        contant: '运单已送达，送达人【林程】浙江省平潭综合试验区8号'
      },
      {
        title: '签收',
        time: '2020-03-11 09:35:35',
        contant: '运单已签收，签收人【付川】'
      }
      ]
    }
  },
  '/order/compony': (req, res) => {
    return {
      code: 0,
      success: true,
      result: [{
        id: 1,
        name: '北京火炬信息有限公司',
        profit: '10%',
        contanct: '陈楚格',
        phone: '13623456789'
      },
      {
        id: 2,
        name: '福建省高速富通物流有限公司',
        profit: '23%',
        contanct: '陈楚格',
        phone: '13623456789'
      },
      {
        id: 3,
        name: '福建省火炬冰淇淋有限公司',
        profit: '15%',
        contanct: '陈楚格',
        phone: '13623456789'
      },
      {

      }
      ]
    }
  },
  '/order/detail': (req, res) => {
    return {
      code: 0,
      success: true,
      result: {

      }
    }
  },
  // 指派承运商
  '/order/myorder/assignedCarrier': (req, res) => {
    return {
      code: 0,
      success: true,
      result: null,
      message: '指派承运商成功'
    }
  },
  // 基础管理
  //  物品
  '/basics/tableData': (req, res) => {
    return {
      code: 0,
      message: '操作成功！',
      success: true,
      result: {
        current: 1,
        orders: [],
        pages: 1,
        records: [{
          'id': '1',
          'name': '惠普笔记本',
          'type': '1',
          'package': '0',
          'dun': '0.1',
          'tiji': '53',
          'time': '2018-08-30 19:20:22'
        },
        {
          'id': '2',
          'name': '玻璃',
          'type': '1',
          'package': '1',
          'dun': '0.1',
          'tiji': '53',
          'time': '2018-08-30 19:20:22'
        },
        {
          'id': '3',
          'name': '硅胶',
          'type': '2',
          'package': '2',
          'dun': '0.1',
          'tiji': '53',
          'time': '2018-08-30 19:20:22'
        },
        {
          'id': '4',
          'name': '假发',
          'type': '3',
          'package': '3',
          'dun': '0.1',
          'tiji': '53',
          'time': '2018-08-30 19:20:22'
        },
        {
          'id': '5',
          'name': '润滑油',
          'type': '4',
          'package': '2',
          'dun': '0.1',
          'tiji': '53',
          'time': '2018-08-30 19:20:22'
        }
        ],
        searchCount: true,
        size: 10,
        total: 5
      }

    }
  },
  '/basics/edit': (req, res) => {
    return {
      code: 0,
      message: '修改成功',
      success: true
    }
  },
  '/basics/add': (req, res) => {
    return {
      code: 0,
      message: '添加成功',
      success: true
    }
  },
  // 客户
  // 发货
  '/customer/tableData': (req, res) => {
    return {
      code: 0,
      message: '操作成功！',
      success: true,
      result: {
        current: 1,
        orders: [],
        pages: 1,
        records: [{
          'id': '1',
          'unitname': '福清盛丰物流有限公司',
          'account': '1238713712683',
          'contact': '鲁经理',
          'phone': '18850109018',
          'address': '福建福州',
          'time': '2018-08-30 19:20:22',
          'delFlag': '0'
        },
        {
          'id': '2',
          'unitname': '福清盛丰物流有限公司',
          'account': '1238713712683',
          'contact': '鲁经理',
          'phone': '18850109018',
          'address': '福建福州',
          'time': '2018-08-30 19:20:22',
          'delFlag': '1'
        },
        {
          'id': '3',
          'unitname': '福清盛丰物流有限公司',
          'account': '1238713712683',
          'contact': '鲁经理',
          'phone': '18850109018',
          'address': '福建福州',
          'time': '2018-08-30 19:20:22',
          'delFlag': '0'
        },
        {
          'id': '4',
          'unitname': '福清盛丰物流有限公司',
          'account': '1238713712683',
          'contact': '鲁经理',
          'phone': '18850109018',
          'address': '福建福州',
          'time': '2018-08-30 19:20:22',
          'delFlag': '1'
        },
        {
          'id': '5',
          'unitname': '福清盛丰物流有限公司',
          'account': '1238713712683',
          'contact': '鲁经理',
          'phone': '18850109018',
          'address': '福建福州',
          'time': '2018-08-30 19:20:22',
          'delFlag': '0'
        }
        ],
        searchCount: true,
        size: 10,
        total: 5
      }

    }
  },

  '/customer/edit': (req, res) => {
    return {
      code: 0,
      message: '修改客户成功',
      success: true
    }
  },
  '/customer/add': (req, res) => {
    return {
      code: 0,
      message: '添加客户成功',
      success: true
    }
  },
  '/customer/contact/add': (req, res) => {
    return {
      code: 0,
      message: '添加发货联系人成功',
      success: true
    }
  },
  '/customer/ship/tableData': (req, res) => {
    return {
      code: 0,
      message: '操作成功！',
      success: true,
      result: {
        current: 1,
        orders: [],
        pages: 1,
        records: [{
          'id': '1',
          'unit': '福清盛丰物流有限公司',
          'contact': '鲁经理',
          'phone': '18831234444',
          'address': '福建福州',
          'time': '2018-08-30 19:20:22',
          'delFlag': '0'
        },
        {
          'id': '2',
          'unit': '福清盛一卡通有限公司',
          'contact': '鲁经理',
          'phone': '18831234444',
          'address': '福建福州',
          'time': '2018-08-30 19:20:22',
          'delFlag': '0'
        }
        ],
        searchCount: true,
        size: 10,
        total: 2
      }
    }
  },
  '/customer/receive/tableData': (req, res) => {
    return {
      code: 0,
      message: '操作成功！',
      success: true,
      result: {
        current: 1,
        orders: [],
        pages: 1,
        records: [{
          'id': '1',
          'unit': '福清盛丰物流有限公司',
          'contact': '鲁经理',
          'phone': '18831234444',
          'address': '福建福州',
          'time': '2018-08-30 19:20:22',
          'delFlag': '0'
        },
        {
          'id': '2',
          'unit': '福清盛丰物流有限公司',
          'contact': '鲁经理',
          'phone': '18831234444',
          'address': '福建福州',
          'time': '2018-08-30 19:20:22',
          'delFlag': '0'
        }
        ],
        searchCount: true,
        size: 10,
        total: 2
      }
    }
  },
  '/customer/contact/add': (req, res) => {
    return {
      code: 0,
      message: '添加联系人成功',
      success: true
    }
  },
  //  承运商
  '/basics/carrier/tableData': (req, res) => {
    return {
      code: 0,
      message: '操作成功！',
      success: true,
      result: {
        current: 1,
        orders: [],
        pages: 1,
        records: [{
          'id': '1',
          'unitFullname': '福清盛丰物流有限公司',
          'accountNumber': '1321312312',
          'UnitShortName': '盛丰物流',
          'unitNum': '3213423141324123',
          'unitType': '0',
          'principal': '张二狗',
          'businessLicense': './img',
          'businessPermits': './img',
          'contact': '张二狗',
          'phone': '13799999999',
          'createTime': '2020-08-15 22:22:22',
          'delFlag': '0'
        },
        {
          'id': '2',
          'unitFullname': '福建省振飞科技有限公司',
          'accountNumber': '1321312312',
          'UnitShortName': '盛丰物流',
          'unitNum': '3213423141324123',
          'unitType': '1',
          'principal': '张二狗',
          'businessLicense': './img',
          'businessPermits': './img',
          'contact': '张二狗',
          'phone': '13799999999',
          'createTime': '2020-08-15 22:22:22',
          'delFlag': '0'
        },
        {
          'id': '3',
          'unitFullname': '厦门山水通物流有限公司',
          'accountNumber': '1321312312',
          'UnitShortName': '盛丰物流',
          'unitNum': '3213423141324123',
          'unitType': '1',
          'principal': '张二狗',
          'businessLicense': './img',
          'businessPermits': './img',
          'contact': '张二狗',
          'phone': '13799999999',
          'createTime': '2020-08-15 22:22:22',
          'delFlag': '1'
        },
        {
          'id': '4',
          'unitFullname': '福清盛丰物流有限公司',
          'accountNumber': '1321312312',
          'UnitShortName': '盛丰物流',
          'unitNum': '3213423141324123',
          'unitType': '0',
          'principal': '张二狗',
          'businessLicense': './img',
          'businessPermits': './img',
          'contact': '张二狗',
          'phone': '13799999999',
          'createTime': '2020-08-15 22:22:22',
          'delFlag': '0'
        },
        {
          'id': '5',
          'unitFullname': '福清盛丰物流有限公司',
          'accountNumber': '1321312312',
          'UnitShortName': '盛丰物流',
          'unitNum': '3213423141324123',
          'unitType': '0',
          'principal': '张二狗',
          'businessLicense': './img',
          'businessPermits': './img',
          'contact': '张二狗',
          'phone': '13799999999',
          'createTime': '2020-08-15 22:22:22',
          'delFlag': '1'
        }
        ],
        searchCount: true,
        size: 10,
        total: 5
      }

    }
  },
  '/basics/carrier/edit': (req, res) => {
    return {
      code: 0,
      message: '修改成功',
      success: true
    }
  },
  '/basics/carrier/add': (req, res) => {
    return {
      code: 0,
      message: '添加成功',
      success: true
    }
  },
  //  费率记录
  '/basics/carrier/rate/tableData': (req, res) => {
    return {
      code: 0,
      message: '操作成功！',
      success: true,
      result: {
        current: 1,
        orders: [],
        pages: 1,
        records: [{
          'id': '1',
          'rate': '1:1',
          'startTime': '1321312312',
          'endTime': '盛丰物流',
          'operator': '诸葛三胖',
          'operatingTime': '0'
        },
        {
          'id': '2',
          'rate': '1:1',
          'startTime': '1321312312',
          'endTime': '盛丰物流',
          'operator': '赵铁柱',
          'operatingTime': '0'
        },
        {
          'id': '3',
          'rate': '1:1',
          'startTime': '1321312312',
          'endTime': '盛丰物流',
          'operator': '李二妞',
          'operatingTime': '0'
        },
        {
          'id': '4',
          'rate': '1:1',
          'startTime': '1321312312',
          'endTime': '盛丰物流',
          'operator': '王铁蛋',
          'operatingTime': '0'
        },
        {
          'id': '5',
          'rate': '1:1',
          'startTime': '1321312312',
          'endTime': '盛丰物流',
          'operator': '张二狗',
          'operatingTime': '0'
        }

        ],
        searchCount: true,
        size: 10,
        total: 5
      }

    }
  },
  '/basics/carrier/edit': (req, res) => {
    return {
      code: 0,
      message: '修改成功',
      success: true
    }
  },
  '/basics/carrier/add': (req, res) => {
    return {
      code: 0,
      message: '添加成功',
      success: true
    }
  },
  //   ----------------------------创建订单-----------------------------------
  //  获取客户单位
  '/createorder/customerList': (req, res) => {
    return {
      code: 0,
      success: true,
      result: [{
        id: 1,
        name: '杨某某'
      },
      {
        id: 2,
        name: '张某某'
      },
      {
        id: 3,
        name: '刘某某'
      }, {
        id: 4,
        name: '赵某某'
      }, {
        id: 5,
        name: '陈某某'
      }
      ]
    }
  },
  //  获取发货单位列表信息
  '/createorder/getConsignorList': (req, res) => {
    return {
      code: 0,
      success: true,
      result: [{
        id: 1,
        name: '发货单位1',
        consignorLinkName: '发货测试人1',
        consignorLinkPhone: '13799999999',
        consignorAddr: '江西省-萍乡市-莲花县',
        consignorDeailAddr: '发货详细地址1',
        consignorAddrCode: '1111',
        consignorIdno: '2313'
      },
      {
        id: 2,
        name: '发货单位2',
        consignorLinkName: '发货测试人2',
        consignorLinkPhone: '13799999999',
        consignorAddr: '北京市-北京城区-朝阳区',
        consignorDeailAddr: '发货详细地址2',
        consignorAddrCode: '1111',
        consignorIdno: '2313'

      },
      {
        id: 3,
        name: '发货单位3',
        consignorLinkName: '发货测试人3',
        consignorLinkPhone: '13799999999',
        consignorAddr: '河北省-秦皇岛市-北戴河区',
        consignorDeailAddr: '发货详细地址3',
        consignorAddrCode: '1111',
        consignorIdno: '2313'
      }, {
        id: 4,
        name: '发货单位4',
        consignorLinkName: '发货测试人4',
        consignorLinkPhone: '13799999999',
        consignorAddr: '浙江省-宁波市-江北区',
        consignorDeailAddr: '发货详细地址4',
        consignorAddrCode: '1111',
        consignorIdno: '2313'
      }, {
        id: 5,
        name: '发货单位5',
        consignorLinkName: '发货测试人5',
        consignorLinkPhone: '13799999999',
        consignorAddr: '内蒙古自治区-包头市-青山区',
        consignorDeailAddr: '发货详细地址5',
        consignorAddrCode: '1111',
        consignorIdno: '2313'
      }
      ]
    }
  },
  //  获取收货单位列表信息
  '/createorder/getConsigneeList': (req, res) => {
    return {
      code: 0,
      success: true,
      result: [{
        id: 1,
        name: '收货单位1',
        consigneeLinkName: '收货测试人1',
        consigneeLinkPhone: '13799999999',
        consigneeAddr: '吉林省-吉林市-昌邑区',
        consigneeDeailAddr: '收货详细地址1',
        consigneeAddrCode: '1111',
        consigneeIdno: '2313'

      },
      {
        id: 2,
        name: '收货单位2',
        consigneeLinkName: '收货测试人2',
        consigneeLinkPhone: '13799999999',
        consigneeAddr: '浙江省-宁波市-江北区',
        consigneeDeailAddr: '收货详细地址2',
        consigneeAddrCode: '1111',
        consigneeIdno: '2313'

      },
      {
        id: 3,
        name: '收货单位3',
        consigneeLinkName: '收货测试人3',
        consigneeLinkPhone: '13799999999',
        consigneeAddr: '福建省-莆田市-涵江区',
        consigneeDeailAddr: '收货详细地址3',
        consigneeAddrCode: '1111',
        consigneeIdno: '2313'

      }, {
        id: 4,
        name: '收货单位4',
        consigneeLinkName: '收货测试人4',
        consigneeLinkPhone: '13799999999',
        consigneeAddr: '湖北省-黄石市-西塞山区',
        consigneeDeailAddr: '收货详细地址4',
        consigneeAddrCode: '1111',
        consigneeIdno: '2313'

      }, {
        id: 5,
        name: '收货单位5',
        consigneeLinkName: '收货测试人5',
        consigneeLinkPhone: '13799999999',
        consigneeAddr: '重庆市-市辖区-万州区',
        consigneeDeailAddr: '收货详细地址5',
        consigneeAddrCode: '1111',
        consigneeIdno: '2313'
      }
      ]
    }
  },
  //  获取公司列表
  'basics/list': (req, res) => {
    return {
      code: 0,
      success: true,
      result: {
        current: 1,
        orders: [],
        pages: 1,
        records: [{
          id: 1,
          projectName: 'A项目',
          projectType: '1'
        },
        {
          id: 2,
          projectName: 'B项目',
          projectType: '2'
        }
        ],
        searchCount: true,
        size: 10,
        total: 5
      }
    }
  },
  'chartData': (req, res) => {
    return Mock.mock({
      'array|10': [{
        'number|1-25': 1

      }
      ]
    })
  }

}
