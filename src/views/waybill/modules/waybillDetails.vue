<!--
 * @Description:
 * @Date: 2020-03-30 20:20:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-25 10:33:04
 -->
<template>
  <div style="padding:0 80px">
    <a-row :gutter="24">
      <a-card>
        <!-- <div slot="extra">
          <a-button @click="clear()">返回</a-button>
        </div> -->
        <a-tabs type="line" v-model="activeKey">
          <a-button @click="clear()"  slot="tabBarExtraContent">返回</a-button>

          <a-tab-pane tab="基础信息" key="1">
            <base-info :baseInfo="baseInfo" v-if="Object.keys(baseInfo).length != 0"></base-info>
          </a-tab-pane>
          <a-tab-pane tab="司机信息" key="2">
            <driver-info :driverInfo="driverInfo" v-if="activeKey === '2'"></driver-info>
          </a-tab-pane>
          <a-tab-pane tab="物流跟踪" key="3">
            <logistics-info :logisticsInfo="logisticsInfo" v-if="activeKey === '3'"></logistics-info>
          </a-tab-pane>
          <a-tab-pane tab="回单信息" key="4">
            <receipt-info :receiptInfo="receiptInfo"   v-if="activeKey === '4'"></receipt-info>
          </a-tab-pane>
          <a-tab-pane tab="地图轨迹" key="5">
            <track-info :trackInfo="trackInfo" :spinning="spinning" :baseInfo="baseInfo" v-if="activeKey === '5'"></track-info>
          </a-tab-pane>
          <a-tab-pane tab="照片展示" key="6">
            <div  v-if="activeKey === '6'">
              <div>
                <span class="label">发车照片：</span>
                <JImageUpload :disabled="false" v-model="baseInfo.gswlWaybill.departureImg"  :isMultiple="true"></JImageUpload>
              </div>
              <div>
                <span class="label">送达照片：</span>
                <JImageUpload  v-model="baseInfo.gswlWaybill.serviceImg" :isMultiple="true"  :disabled="false"></JImageUpload>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </a-row>
  </div>
</template>
<script>
import baseInfo from './waybillDetails/baseInfo'
import driverInfo from './waybillDetails/driverInfo'
import logisticsInfo from './waybillDetails/logisticsInfo'
import trackInfo from './waybillDetails/trackInfo'
import receiptInfo from './waybillDetails/receiptInfo'
import { getAction } from '@/api/manage'
import JImageUpload from './waybillDetails/JImageUpload'
export default {
  name: '',
  components: { baseInfo, driverInfo, logisticsInfo, trackInfo, receiptInfo, JImageUpload },

  data() {
    return {
      activeKey: '1',
      confirmLoading: false,
      confirmDirty: false,
      loading: false,
      disableSubmit: false,
      spinning: true,
      //  基础信息
      baseInfo: {},
      //  司机信息
      driverInfo: {},
      //  logisticsInfo 物流跟踪信息
      logisticsInfo: [],
      //  轨迹信息
      trackInfo: [],
      receiptInfo: {}
    }
  },
  mounted() {
    this.edit()
  },
  methods: {
    clear() {
      this.$router.back(-1)
    },
    edit() {
      // 基础信息
      const data = JSON.parse(sessionStorage.getItem('waybillDetails'))

      this.baseInfo = data
      this.baseInfo.gswlWaybill.departureImg = this.baseInfo.gswlWaybill.departureImg ? this.baseInfo.gswlWaybill.departureImg : []
      //  回单信息
      this.receiptInfo.receiptImg = this.baseInfo.gswlWaybill.receiptImg
        ? this.baseInfo.gswlWaybill.receiptImg.split(',')
        : []
      this.receiptInfo.receiptNo = this.baseInfo.receiptNo ? this.baseInfo.receiptNo : '0'
      this.receiptInfo.receiptStatus = this.baseInfo.gswlWaybill.receiptStatus

      //  司机信息
      const showFlag = data.gswlOrderTransfer.showFlag ? data.gswlOrderTransfer.showFlag : ''
      getAction('/order/gswlWaybill/queryDriverByDriId', {
        showFlag: showFlag,
        driverId: data.gswlWaybill.driverId,
        carrierId: data.gswlOrderTransfer.carrierId
      }).then(res => {
        this.driverInfo = res.result ? res.result : {}
        this.driverInfo.vehicleNo = data.gswlWaybill.vehicleNo
        this.driverInfo.showFlag = data.gswlOrderTransfer.showFlag
        this.driverInfo.freight = parseFloat(data.gswlWaybill.freight).toFixed(2)
        this.driverInfo.MarginRatio =
          ((data.gswlOrderTransfer.carrierFreight - data.gswlWaybill.freight) /
            data.gswlOrderTransfer.carrierFreight.toFixed(2)) *
            100 +
          '%'
      })
      //  物流跟踪信息
      getAction('/order/gswlWaybill/queryTrackByWaybillId', {
        waybillId: data.gswlWaybill.id,
        orderId: data.orderId
      }).then(res => {
        this.logisticsInfo = res.result ? res.result : []
      })
      //  地图轨迹信息
      getAction('/gps/gswlDriverGps/queryGpsList', { waybillId: data.gswlWaybill.id }).then(res => {
      // getAction('/gps/gswlDriverGps/queryGpsList', { waybillId: '8a8282ef719ff35b0171a0d435f00002' }).then(res => {
        this.trackInfo = res.result ? res.result : []
        this.spinning = false
      })
    },

    close() {
      this.activeKey = '1'
      this.baseInfo = {}
      this.driverInfo = {}
      this.logisticsInfo = []
      this.trackInfo = []
      this.receiptInfo = {}
    }
  }
}
</script>
<style scoped lang="less">
@import url('../waybill.less');
.top-bar {
  text-align: right;
  background: #fff;
  padding: 10px 30px 5px 0px;
}

.label{
    color: rgb(24, 144, 255);
    font-size: 16px;
    padding-bottom: 10px;
    display: inline-block;

}
</style>
