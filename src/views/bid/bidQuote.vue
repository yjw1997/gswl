<template>
  <span>
    <a-divider type="vertical"></a-divider>
    <a @click="handleShowModel">报价</a>
    <a-modal
      title="报价"
      width="800px"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      okText="提交"
      @cancel="handleCancel"
      cancelText="取消"
      style="top:20px;"
    >
      <a-row :gutter="10">
        <a-col span="17">
          <a-col span="12"> <span class="name">竞价单号：</span>{{ info.biddingNo }} </a-col>
          <a-col span="12"> <span class="name">竞价状态：</span>{{ info.biddingStatus_dictText }} </a-col>
          <a-col span="12"> <span class="name">货物名称：</span>{{ info.goodsNames }} </a-col>
          <a-col span="12"> <span class="name">参考价格(元)：</span>{{ info.biddingLimitAmount }} </a-col>
          <a-col span="12"> <span class="name">件数 ：</span>{{ info.totalNumber }} </a-col>

          <!-- <a-col span="8"> <span class="name">类型：</span>{{}} </a-col> -->
          <a-col span="12"> <span class="name">重量：</span>{{ info.totalWeight }} </a-col>
          <a-col span="12"> <span class="name">体积(m³)：</span>{{ info.totalCube }}</a-col>
        </a-col>
        <a-col span="6">
          <a-statistic-countdown
            title="竞价倒计时"
            :value="timer"
            style="text-align:center:margin-right:20px"
            format="D 天 H 时 m 分"
          />
        </a-col>
        <a-col span="24" style="margin-top:20px">
          <span>金额：</span
          ><a-input-number
            :min="0"
            :step="0.01"
            style="width:50%"
            placeholder="请输入金额"
            v-model="params.bidAmount"
          />
        </a-col>
        <a-col span="24" style="margin-top:20px">
          <div style="display:flex;">
            <div style="width:3em">备注：</div>
            <div style="flex:1"><a-textarea placeholder="请输入备注" v-model="params.remark"></a-textarea></div>
          </div>
        </a-col>
      </a-row>
    </a-modal>
  </span>
</template>
<script>
import JInput from '@/components/jeecg/JInput.vue'
import { carrierBidOffer } from '@/api/bid'
// import {}
export default {
  name: '',
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  components: { JInput },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      params: {},
      timeObj: { diff: null },
      timer: 0
      /* table选中keys*/
    }
  },
  methods: {
    edit(record) {
      this.model = record
      this.visible = true
    },
    handleShowModel() {
      this.visible = true
      const { bidAmount, remark } = this.info.gswlBiddingOffer
      this.params = { bidAmount, remark }
      this.timer = Date.now() + this.info.residueTimeStamp * 1000
    },
    async handleSubmit() {
      const { bidId, id: orderId, remark } = this.info
      const parmas = {
        bidId,
        orderId,
        remark,
        ...this.params
      }
      const { success, message } = await carrierBidOffer(parmas)
      if (success) {
        this.$message.success(message)
        this.handleCancel()
        this.$emit('ok')
      } else {
        this.$message.warning(message)
      }
    },
    handleCancel() {
      this.visible = false
      this.confirmLoading = false
      clearInterval(this.timeObj.fun)
      this.timeObj.fun = null
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .name {
  width: 7em;
  display: inline-block;
  text-align: right;
  margin: 5px 0;
}

/deep/ .ant-statistic-title{
    font-size: 36px;
    color: #333;
}
</style>
