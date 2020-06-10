<!--
 * @Author: your name
 * @Date: 2020-05-14 15:07:40
 * @LastEditTime: 2020-05-20 08:20:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gswl-web\src\views\bid\bidDetailsModal.vue
 -->
<template>
  <div style="padding:0 80px">
    <a-row :gutter="24">
      <a-card title="基础信息"
              style="margin-bottom:10px">
        <span slot="extra">
          <a-button type="primary"
                    size="small"
                    v-if="userType === 'PT'"
                    @click="handleSeal"
                    :disabled="model.biddingStatus !== '0'"
                    style="font-size: 12px;margin-right:4px">封标</a-button>
          <a-button size="small"
                    @click="handleBack"
                    style="font-size: 12px;margin-right:4px">返回</a-button>

        </span>
        <div class="box-container">
          <a-form :form="form"
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol">
            <a-col :span="label">
              <a-form-item label="竞价单号：">
                <a-input v-decorator="['biddingNo']"
                         :disabled="getPageStatus()" />
              </a-form-item>
            </a-col>
            <a-col :span="label"
                   v-if="userType === 'PT'">
              <a-form-item label="订单号">
                <a-input v-decorator="['orderNo']"
                         :disabled="getPageStatus()" />
              </a-form-item>
            </a-col>
            <a-col :span="label">
              <a-form-item label="竞价状态"
                           v-if="userType === 'PT'">
                <j-dict-select-tag :triggerChange="true"
                                   :disabled="getPageStatus()"
                                   dictCode="bidding_status"
                                   v-decorator="['biddingStatus']"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :span="label">
              <a-form-item label="托运时间：">
                <a-input v-decorator="['consignmentDateTime']"
                         :disabled="getPageStatus()" />
              </a-form-item>
            </a-col>
            <a-col :span="label">
              <a-form-item label="配送时间：">
                <a-input v-decorator="['shippingDateTime']"
                         :disabled="getPageStatus()" />
              </a-form-item>
            </a-col>
            <a-col :span="label">
              <a-form-item label="发货地区：">
                <a-input v-decorator="['consignorAddr']"
                         :disabled="getPageStatus()" />
              </a-form-item>
            </a-col>
            <a-col :span="label">
              <a-form-item label="收货地区：">
                <a-input v-decorator="['consigneeAddr']"
                         :disabled="getPageStatus()" />
              </a-form-item>
            </a-col>
            <a-col :span="label">
              <a-form-item label="车辆类型：">
                <j-dict-select-tag :triggerChange="true"
                                   :disabled="getPageStatus()"
                                   dictCode="vehicleType"
                                   v-decorator="['biddingVehicleType']"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :span="label">
              <a-form-item label="车辆长度：">
                <a-input v-decorator="['biddingVehicleLength']"
                         :disabled="getPageStatus()" />
              </a-form-item>
            </a-col>
            <a-col :span="label">
              <a-form-item :label="userType === 'PT'?'上限价格（元）': '参考价格（元）'">
                <a-input v-decorator="['biddingLimitAmount']"
                         :disabled="getPageStatus()" />
              </a-form-item>
            </a-col>
            <a-col :span="label">
              <a-form-item label="封标时间："
                           v-if="userType === 'PT'">
                <a-input v-decorator="['sealingTime']"
                         :disabled="getPageStatus()" />
              </a-form-item>
              <a-form-item label="竞价倒计时："
                           v-else>
                <a-statistic-countdown :value="Date.now() +model.residueTimeStamp*1000"
                                       format="D 天 H 时 m 分" />
                <!-- <a-input v-decorator="['residueTimeStamp']"
                         :disabled="getPageStatus()" /> -->
              </a-form-item>
            </a-col>
          </a-form>
        </div>
      </a-card>
    </a-row>
    <a-row :gutter="24">
      <a-card title="货物信息"
              style="margin-bottom:10px">
        <div class="ant-alert ant-alert-info"
             style="margin-bottom: 16px;text-align:right">
          <i class="anticon anticon-info-circle ant-alert-icon"></i>
          总数量
          <a style="font-weight: 600;color:rgba(217, 0, 27, 0.647058823529412)">{{ model.totalNumber }}</a>件&nbsp;&nbsp;
          总重量
          <a style="font-weight: 600;color:rgba(217, 0, 27, 0.647058823529412)">{{ model.totalWeight }}</a>吨&nbsp;&nbsp;
          总体积
          <a style="font-weight: 600;color:rgba(217, 0, 27, 0.647058823529412)">{{ model.totalCube }}</a>
          m³&nbsp;&nbsp;
        </div>
        <a-table ref="table"
                 bordered
                 size="middle"
                 :columns="goodsColumns"
                 :dataSource="goodsDataSource"
                 :pagination="false"
                 has-feedback
                 id="table"
                 rowKey="id">
          <!-- //TODO 序号-->
          <span slot="id"
                slot-scope="text, record, index">{{index+1}}</span>

          <!-- //TODO 货物名称-->
          <span slot="descriptionOfGoods"
                slot-scope="text, record, index">
            <j-input v-model="goodsDataSource[index].descriptionOfGoods"
                     type
                     :disabled="getPageStatus()"></j-input>
          </span>
          <!-- //TODO 货物类型-->
          <div slot="cargoTypeClassificationCode"
               slot-scope="text, record, index">
            <j-dict-select-tag dictCode="cargoClassificationCode"
                               :disabled="getPageStatus()"
                               v-model="goodsDataSource[index].cargoTypeClassificationCode"
                               placeholder="请选择类型"></j-dict-select-tag>
          </div>

          <!-- //TODO 包装-->
          <div slot="cargoPackCode"
               slot-scope="text, record, index">
            <j-dict-select-tag dictCode="cargoPackCode"
                               :disabled="getPageStatus()"
                               v-model="goodsDataSource[index].cargoPackCode"
                               placeholder="请选择包装"></j-dict-select-tag>
          </div>

          <!-- //TODO 数量-->
          <span slot="totalNumberOfPackages"
                slot-scope="text, record, index">
            <j-input v-model="goodsDataSource[index].totalNumberOfPackages"
                     placeholder="请输入数量"
                     type
                     :disabled="getPageStatus()"></j-input>
          </span>

          <!-- //TODO 重量-->
          <span slot="goodsItemGrossWeight"
                slot-scope="text, record, index">
            <j-input v-model="goodsDataSource[index].goodsItemGrossWeight"
                     placeholder="请输入重量"
                     type
                     :disabled="getPageStatus()"></j-input>
          </span>

          <!-- //TODO 体积-->
          <span slot="cube"
                slot-scope="text, record, index">
            <j-input v-model="goodsDataSource[index].cube"
                     placeholder="请输入 体积"
                     type
                     :disabled="getPageStatus()"></j-input>
          </span>
        </a-table>
      </a-card>
    </a-row>
    <a-row :gutter="24">
      <a-card title="竞标信息"
              style="margin-bottom:10px"
              v-if="userType === 'PT'">
        <div class="box-container">
          <a-form :form="form"
                  :labelCol="labelCol2"
                  :wrapperCol="wrapperCol2">
            <a-col :span="label2">
              <a-form-item label="中标公司">
                <a-input v-decorator="['winningName']"
                         :disabled="getPageStatus()" />
              </a-form-item>
            </a-col>
            <a-col :span="label2">
              <a-form-item label="中标价格（元）">
                <a-input v-decorator="['winningAmount']"
                         :disabled="getPageStatus()" />
              </a-form-item>
            </a-col>
            <a-col :span="label2">
              <a-form-item label="中标时间">
                <a-input v-decorator="['winningTime']"
                         :disabled="getPageStatus()" />
              </a-form-item>
            </a-col>
          </a-form>
          <div style="padding-top:50px">
          </div>

          <a-table ref="table"
                   bordered
                   size="middle"
                   :columns="columns"
                   :scroll="{ y:200 }"
                   :dataSource="dataSource"
                   :pagination="false"
                   rowKey="rowKey">
            <!-- //TODO 序号-->
            <span slot="id"
                  slot-scope="text, record, index">{{ index + 1 }}</span>

          </a-table>
        </div>
      </a-card>
      <a-card title="竞标信息"
              style="margin-bottom:10px"
              v-else>
        <div class="box-container">
          <a-form :form="form"
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol">
            <a-col :span="label">
              <a-form-item label="报价金额">
                <a-input v-decorator="['bidAmount']"
                         :disabled="getPageStatus()" />
              </a-form-item>
            </a-col>
            <a-col :span="label">
              <a-form-item label="备注">
                <a-input v-decorator="['remark']"
                         :disabled="getPageStatus()" />
              </a-form-item>
            </a-col>
            <a-col :span="label">
              <a-form-item label="中标状态">
                <j-dict-select-tag :triggerChange="true"
                                   :disabled="getPageStatus()"
                                   dictCode="bid_winning_status"
                                   v-decorator="['bidWinningStatus']"></j-dict-select-tag>
              </a-form-item>
            </a-col>
            <a-col :span="label">
              <a-form-item label="报价时间">
                <a-input v-decorator="['bidTime']"
                         :disabled="getPageStatus()" />
              </a-form-item>
            </a-col>
          </a-form>
        </div>
      </a-card>

    </a-row>
    <!-- -------底部按钮区域--------------- -->

    <a-row :gutter="24"
           style="padding: 10px;text-align:center">
      <a-col> </a-col>
    </a-row>
    <!-- table区域-end -->
    <!-- <customer-modal ref="modalForm"
                    @ok="modalFormOk"></customer-modal>
    <clien-contact-modal ref="modalForm2"
                         @ok="modalFormOk"></clien-contact-modal> -->
    <binEvaluationModal ref="bidModalForm" @ok="handleBack"></binEvaluationModal>
  </div>
</template>
<script>
import JInput from '@/components/jeecg/JInput.vue'
import store from '@/store/'
import { goodsColumnsData, columnsData } from './const'
import { querySealBid } from '@/api/bid'
import binEvaluationModal from './bidEvaluationModal'
import pick from 'lodash.pick'
export default {
  name: 'bidDetailsModal',
  components: {
    JInput,
    binEvaluationModal
  },
  data() {
    return {
      goodsColumns: goodsColumnsData(),
      goodsDataSource: [],
      columns: columnsData(),
      dataSource: [],
      form: this.$form.createForm(this),
      userType: store.getters.userType,
      model: {},
      path: '',
      label: 6,
      label2: 8,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      labelCol2: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol2: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const data = JSON.parse(sessionStorage.getItem('bidDetails'))
      this.model = Object.assign({}, data)
      this.goodsDataSource = data.gswlOrderGoodsList

      this.dataSource = data.gswlBiddingOfferList
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'biddingNo',
            'consignmentDateTime',
            'shippingDateTime',
            'consignorAddr',
            'consigneeAddr',
            'biddingVehicleType',
            'biddingVehicleLength',
            'biddingLimitAmount'
          )
        )
      })
      if (this.userType === 'PT') {
        this.$nextTick(() => {
          this.form.setFieldsValue(
            pick(
              this.model,
              'winningName',
              'winningAmount',
              'winningTime',
              'biddingNo',
              'orderNo',
              'biddingStatus',
              'consignmentDateTime',
              'shippingDateTime',
              'consignorAddr',
              'consigneeAddr',
              'biddingVehicleType',
              'biddingVehicleLength',
              'biddingLimitAmount',
              'sealingTime'
            )
          )
        })
      } else if (this.userType === 'CYS') {
        this.$nextTick(() => {
          this.form.setFieldsValue(
            pick(this.model.gswlBiddingOffer, 'bidAmount', 'remark', 'bidWinningStatus', 'bidTime')
          )
        })
      }
    },
    getPageStatus() {
      // 获取当前页面是否可以编辑
      return true
    },
    //  点击封标
    async handleSeal() {
      const that = this
      this.$confirm({
        title: '确认执行',
        content: '封标之后承运商不可报价?',
        onOk: async () => {
          const { success, message } = await querySealBid({ ids: that.model.id })

          if (success) {
            that.$message.success(message)
            that.$refs.bidModalForm.edit(that.model)
          } else {
            that.$message.warning(message)
          }
        }
      })
    },

    handleBack() {
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped lang="less">
.top-bar {
  text-align: right;
  background: #fff;
  padding: 10px 30px 5px 0px;
  border: solid #dddee1;
  border-width: 1px 1px 0 1px;
}
/deep/ .ant-calendar-picker-input {
  padding-right: 42px !important;
  font-size: 12px !important;
}
/deep/ .ant-form-item {
  border: solid #dddee1;
  border-width: 1px 1px 1px 1px;
  border-collapse: collapse;
  margin-bottom: 0;
}
.bottonIcon {
  text-align: right;
  font-size: 30px;
  i {
    margin-right: 30px;
  }
  i:hover {
    color: blue;
  }
}
/deep/ input,
/deep/ textarea,
/deep/ .ant-select-selection--single,
/deep/ .ant-select-open,
/deep/ .ant-input-number,
/deep/ .ant-select-focuse {
  border: 0 !important; // 去除未选中状态边框
  outline: none !important; // 去除选中状态边框
  background-color: rgba(0, 0, 0, 0) !important; // 透明背景
}

/deep/ .ant-col-6,
/deep/ .ant-col-8,
/deep/ .ant-col-12,
/deep/ .ant-col-24 {
  padding-left: 0px !important;
  padding-right: 0px !important;
  margin-top: -1px;
  margin-right: -1px;
}
/deep/ .ant-card-head-title {
  padding: 5px 0px;
}
/deep/ .ant-card-head,
/deep/ .ant-card-head-wrapper {
  min-height: 35px;
  height: 35px;
}

/deep/ .ant-radio-group {
  width: 100%;
}
.distpicker-address-wrapper {
  display: flex;
}
.noborder {
  border: none !important;
  text-align: center !important;
}
#table /deep/ .ant-select {
  width: 100%;
}
/deep/ .ant-input[disabled] {
  color: #666;
}
</style>
