<!--
 * @Author: your name
 * @Date: 2020-05-18 13:05:32
 * @LastEditTime: 2020-05-19 15:25:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gswl-web\src\views\order\modules\openBiddingModal.vue
-->
<template>
  <a-modal title="开启竞价"
           :width="800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleSubmit"
           okText="确定"
           @cancel="handleCancel"
           cancelText="关闭"
           style="top:20px;">
    <div class="box-container">
      <a-form :form="form"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol">
        <a-col :span="label">
          <a-form-item label="上限金额">
            <a-input v-decorator="['biddingLimitAmount', validatorRules.biddingLimitAmount]" />
          </a-form-item>
        </a-col>
        <a-col :span="label">
          <a-form-item label="封标时间">
            <j-date placeholder="请选择时间"
                    :trigger-change="true"
                    v-decorator="['sealingTime', validatorRules.sealingTime]"
                    date-format="YYYY-MM-DD HH:00:00"
                    style="width: 100%;"
                    :disabledDateTime="disabledDateTime"
                    :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"></j-date>
            <!-- <a-date-picker :disabled-date="disabledDate"
                           v-decorator="['sealingTime', validatorRules.sealingTime]"
                           format="YYYY-MM-DD HH:mm:ss"
                           :disabled-time="disabledDateTime"
                           style="width: 100%;"
                           :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
                           @change="changeTime"/> -->
          </a-form-item>
        </a-col>
        <a-col :span="label">
          <a-form-item label="要求车型">
            <j-dict-select-tag :triggerChange="true"
                               dictCode="vehicleType"
                               v-decorator="['biddingVehicleType', validatorRules.biddingVehicleType]"></j-dict-select-tag>
          </a-form-item>
        </a-col>
        <a-col :span="label">
          <a-form-item label="要求车长（m）">
            <a-input v-decorator="['biddingVehicleLength', validatorRules.biddingVehicleLength]" />
          </a-form-item>
        </a-col>
      </a-form>
    </div>

  </a-modal>
</template>
<script>
import { openBidding } from '@/api/bid'
import JDate from '@/components/jeecg/JDate.vue'
import moment from 'moment'
export default {
  name: '',
  components: { JDate },
  data() {
    return {

      validatorRules: {
        biddingLimitAmount: { rules: [{ required: true, message: '请输入!' }] },
        sealingTime: { rules: [{ required: true, message: '请输入!' }] },
        biddingVehicleType: { rules: [{ required: true, message: '请输入!' }] },
        biddingVehicleLength: { rules: [{ required: true, message: '请输入!' }] }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      model: {},
      label: 24,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    }
  },
  methods: {
    moment,
    show(record) {
      this.model = record
      this.goodsDataSource = this.model.gswlOrderGoodsList
      this.dataSource = this.model.gswlBiddingOfferList
      this.visible = true
    },
    range(start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    changeTime(val) {
      val ? null : moment(val, 'YYYY-MM-DD HH:mm:ss')
    },
    disabledDateTime() {
      return {
        disabledMinutes: () => this.range(1, 60),
        disabledSeconds: () => this.range(1, 60)
      }
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true
          const object = Object.assign({}, values)
          object.orderId = this.model.id
          object.orderId = this.model.id
          object.biddingFlag = this.model.biddingFlag
          object.orderNo = this.model.orderNo
          object.openBidNum = this.model.openBidNum

          openBidding(object)
            .then(res => {
              if (res.success) {
                this.$message.success(res.message)
                this.handleCancel()
                this.$emit('ok')
              } else {
                this.$message.warning(res.message)
              }
            })
            .finally(() => {
              this.confirmLoading = false
            })
        } else {
          this.$message.error('请注意页面提示！')
        }
      })
    },
    handleCancel() {
      this.visible = false
      this.confirmLoading = false
      this.form.setFieldsValue({})
    }
  }
}
</script>
<style scoped lang="less">
</style>
