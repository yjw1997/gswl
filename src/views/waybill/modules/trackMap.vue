<!--
 * @Description:
 * @Date: 2020-04-02 16:15:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-27 16:59:59
 -->
<template>
  <a-card :bordered="false">
    <a-row>
      <!-- //  地图信息 -->
      <a-col :span="span">
        <div class="buttonBox">
          <a-button type="primary"
                    @click="waybillGpsRefresh"
                    :loading="loading">
            刷新GPS
          </a-button>
          <a-button @click="getJump">GPS校准</a-button>
          <a-button type="dashed"
                    @click="handleLock">
            锁定
          </a-button>
        </div>
        <a-spin tip="地图资源加载中Loading..."
                :spinning="spinning">
          <base-map style="height: calc(100vh - 230px);" ref="baseMap"     />

        </a-spin>

      </a-col>

      <!-- //  运单信息 -->
      <a-col :span="6">
        <a-steps direction="vertical">
          <a-step title="托运单信息"
                  status="finish">
            <a-icon slot="icon"
                    type="file-text" />
            <a-card slot="description">
              <a-form :form="form"
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol">
                <a-col :span="24">
                  <a-form-item label="订单号：">{{data.orderNo}}</a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item label="托运时间：">{{data.consignmentDateTime}}</a-form-item>
                </a-col>

                <a-col :span="24">
                  <a-form-item label="配送时间：">{{data.shippingDateTime}}</a-form-item>
                </a-col>

                <a-col :span="24"
                       v-if="data.gswlWaybill ">
                  <a-form-item label="司机：">{{data.gswlWaybill.driverName}}</a-form-item>
                </a-col>
                <a-col :span="24"
                       v-if="data.gswlWaybill ">
                  <a-form-item label="车牌号：">{{data.gswlWaybill.vehicleNo}}</a-form-item>
                </a-col>
              </a-form>
            </a-card>
          </a-step>
          <a-step title="发货信息"
                  status="finish">
            <a-icon slot="icon"
                    type="audit" />
            <a-card slot="description">
              <a-form :form="form"
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol">
                <a-col :span="24">
                  <a-form-item label="发货单位：">{{data.consignor}}</a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item label="发货人：">{{data.consignorLinkName}}</a-form-item>
                </a-col>

                <a-col :span="24">
                  <a-form-item label="联系电话：">{{data.consignorLinkPhone}}</a-form-item>
                </a-col>

                <a-col :span="24">
                  <a-form-item label="发货地址：">{{data.consignorAddr}}</a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item label="详细地址：">{{data.consignorDeailAddr}}</a-form-item>
                </a-col>
              </a-form>
            </a-card>
          </a-step>
          <a-step title="收货信息"
                  status="finish">
            <a-icon slot="icon"
                    type="cloud-server" />

            <a-card slot="description">
              <a-form :form="form"
                      :labelCol="labelCol"
                      :wrapperCol="wrapperCol">
                <a-col :span="24">
                  <a-form-item label="收货单位：">{{data.consignee}}</a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item label="收货人：">{{data.consigneeLinkName}}</a-form-item>
                </a-col>

                <a-col :span="24">
                  <a-form-item label="联系电话：">{{data.consigneeLinkPhone}}</a-form-item>
                </a-col>

                <a-col :span="24">
                  <a-form-item label="目的地：">{{data.consigneeAddr}}</a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item label="详细地址：">{{data.consigneeDeailAddr}}</a-form-item>
                </a-col>
              </a-form>
            </a-card>
          </a-step>
        </a-steps>
        <!-- <a-card title="托运单信息" slot="description">
            <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-col :span="24">
                <a-form-item label="订单号：">{{data.orderNo}}</a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="托运时间：">{{data.consignmentDateTime}}</a-form-item>
              </a-col>

              <a-col :span="24">
                <a-form-item label="配送时间：">{{data.shippingDateTime}}</a-form-item>
              </a-col>

              <a-col :span="24" v-if="data.gswlWaybill ">
                <a-form-item label="司机：">{{data.gswlWaybill.driverName}}</a-form-item>
              </a-col>
              <a-col :span="24" v-if="data.gswlWaybill ">
                <a-form-item label="车牌号：">{{data.gswlWaybill.vehicleNo}}</a-form-item>
              </a-col>
            </a-form>
          </a-card>
          <a-card title="发货信息">
            <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-col :span="24">
                <a-form-item label="发货单位：">{{data.consignor}}</a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="发货人：">{{data.consignorLinkName}}</a-form-item>
              </a-col>

              <a-col :span="24">
                <a-form-item label="联系电话：">{{data.consignorLinkPhone}}</a-form-item>
              </a-col>

              <a-col :span="24">
                <a-form-item label="发货地址：">{{data.consignorAddr}}</a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="详细地址：">{{data.consignorDeailAddr}}</a-form-item>
              </a-col>
            </a-form>
          </a-card>
          <a-card title="收货信息">
            <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-col :span="24">
                <a-form-item label="收货单位：">{{data.consignee}}</a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="收货人：">{{data.consigneeLinkName}}</a-form-item>
              </a-col>

              <a-col :span="24">
                <a-form-item label="联系电话：">{{data.consigneeLinkPhone}}</a-form-item>
              </a-col>

              <a-col :span="24">
                <a-form-item label="目的地：">{{data.consigneeAddr}}</a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="详细地址：">{{data.consigneeDeailAddr}}</a-form-item>
              </a-col>
            </a-form>
          </a-card> -->
      </a-col>
    </a-row>

    <a-modal style="width: 20px;"
             :visible="visible"
             @ok="handleLockOk"
             :ok-button-props="{ props: { disabled: !disabledLock ,loading:loadingLock} }"
             @cancel="handleLockClose">
      <div slot="title">锁定后无法修改该订单GPS数据，确认要锁定吗</div>
      <a-checkbox v-model='disabledLock'>
        校准了GPS数据
      </a-checkbox>
    </a-modal>
  </a-card>
</template>

<script>
import { getAction, postAction, postHeaderAction } from '@/api/manage'
import { baseMap, MapService } from '@/components/BaseMap/index'

export default {
  name: '',
  components: { baseMap },

  data() {
    return {
      data: {},
      center: [],
      waypoint: [],
      currentLocation: [],
      trackInfo: {},
      loadingLock: false,
      form: this.$form.createForm(this),
      spinning: true,
      tagType: 'radio',
      model: {},
      loading: false,
      span: 18,
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      disabledLock: false,
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      },
      options: {}
    }
  },
  mounted() {
    //  运单信息
    this.data = JSON.parse(window.localStorage.getItem('trackInfo'))
    if (!this.data) this.$router.go(-1)
    console.log('运单信息', this.data)

    //  地图轨迹信息
    this.getTrackInfo({ waybillId: this.data.gswlWaybill.id })
  },
  methods: {
    init() {
      this.waypoint = this.trackInfo
      const maps = new MapService(this.$refs.baseMap.getMapObj())
      maps.addLineWithGaode({
        waypoint: this.waypoint
      })
      maps.addMapControl()
    },
    // 获取车辆轨迹信息
    getTrackInfo(data) {
      this.spinning = true
      this.loading = true
      //  地图轨迹信息
      getAction('/order/gswlWaybillGps/waybillGpsList', data).then(res => {
        if (res.success) {
          this.trackInfo = res.result
          this.$message.success(res.message)
          console.log('地图轨迹信息', this.trackInfo)
          this.init()
          this.loading = false
          this.spinning = false
        }
      })
    },
    //  刷新
    waybillGpsRefresh() {
      this.spinning = true
      this.loading = true
      postAction('/order/gswlWaybillGps/waybillGpsRefresh', {
        departureTime: this.data.gswlWaybill.departureTime,
        driverId: this.data.gswlWaybill.driverId,
        serviceTime: this.data.gswlWaybill.serviceTime,
        vehicleId: this.data.gswlWaybill.vehicleId,
        waybillId: this.data.gswlWaybill.id
      }).then(res => {
        if (res.success) {
          this.trackInfo = res.result
          this.$message.success(res.message)
          this.init()
          this.loading = false
          this.spinning = false
        }
        this.$message.success(res.message)
      })
    },
    //  GPS校准
    getJump() {
      this.$confirm({
        title: '确认校准GPS',
        content: '是否跳转运力平台?',
        onOk: function() {
          window.open('http://218.85.66.151:60041/#/GSWL')
        }
      })
    },
    //  锁定
    handleLock() {
      // this.$confirm({
      //   title: '锁定后无法修改该订单GPS数据，确认要锁定吗',
      //   width: '500px',
      //   forceRender: true,
      //   content:
      //      `
      //        <a-checkbox :value=${this.disabledLock} >
      //         校准了GPS数据
      //        </a-checkbox>
      //      `,
      //   okButtonProps: { props: { disabled: this.disabledLock } },
      //   onOk: function() {}
      // })
      this.visible = true
    },
    handleLockClose() {
      this.visible = false
      this.disabledLock = false
    },
    handleLockOk() {
      this.loadingLock = true
      postHeaderAction('/order/gswlWaybillGps/lockDriverGps', { waybillId: this.data.gswlWaybill.id }).then(res => {
        if (res.success) {
          this.$message.success(res.message)
        } else {
          this.$message.warning(res.message)
        }
        this.handleLockClose()
      }).finally(() => {
        this.loadingLock = false
      })
    }
  }
}
</script>
<style scoped lang="less">
.buttonBox {
  margin-bottom: 10px;
  button {
    margin-left: 8px;
  }
}
#box {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
}
#container {
  height: 100%;
}
#info {
  width: 20%;
  border-style: solid;
}
#panel {
  position: absolute;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 30px;
  right: 10px;
  width: 320px;
  text-align: center;
}
#panel .amap-call {
  background-color: #009cf9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}
.cover {
  font-size: 16px;
  font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
  font-weight: 650;
  div {
    display: inline-block;
  }
  .pro {
    display: inline-block;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.447058823529412);
    padding: 0px 15px;
  }
  .city {
    display: inline-block;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.447058823529412);
  }
}
.contant {
  text-align: left;
  div {
    margin: 10px 0px;
  }
}
/deep/ .ant-form-item {
  margin-bottom: 0px;
}
/deep/ .ant-card-head-title {
  padding: 11px 0;
}

/deep/.ant-card-wider-padding,
/deep/ .ant-card-body {
  padding: 9px 5px;
}
/deep/ .ant-card-head {
  padding: 0px 5px;
}
</style>
