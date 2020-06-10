<!--
 * @Author: your name
 * @Date: 2020-05-15 10:16:00
 * @LastEditTime: 2020-05-19 16:47:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gswl-web\src\views\bid\bidEvaluation.vue
 -->
<template>
  <a-modal title="评标"
           :width="1000"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleSubmit"
           okText="中标"
           @cancel="handleCancel"
           cancelText="关闭"
           style="top:20px;">

    <a-descriptions :column="{ xs: 2, sm: 2, md: 2}">
      <a-descriptions-item label="竞价单号">
        {{model.biddingNo}}
      </a-descriptions-item>
      <a-descriptions-item label="竞价状态">
        <j-dict-select-tag dictCode="bidding_status"
                           :disabled="true"
                           v-model="model.biddingStatus"></j-dict-select-tag>
      </a-descriptions-item>
      <a-descriptions-item label="封标时间">
        {{model.sealingTime}}
      </a-descriptions-item>
      <a-descriptions-item label="上限价格">
        {{model.biddingLimitAmount}}
      </a-descriptions-item>

    </a-descriptions>
    <a-descriptions :column="{ xs: 3, sm: 5, md: 5}">
      <a-descriptions-item label="货物">
        {{model.goodsNames}}
      </a-descriptions-item>
      <a-descriptions-item label="类型">
        {{model.cargoTypes}}
      </a-descriptions-item>
      <a-descriptions-item label="重量（吨）">
        {{model.weights}}
      </a-descriptions-item>
      <a-descriptions-item label="体积（m³）">
        {{model.cubes}}
      </a-descriptions-item>
      <a-descriptions-item label="件数">
        {{model.numbers}}
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions title="竞价列表"
                    :column="{ xs: 1, sm: 1, md: 1}">
      <a-descriptions-item>
        <a-table ref="table"
                 bordered
                 size="middle"
                 :columns="columns"
                 :scroll="{ y:200 }"
                 :dataSource="dataSource"
                 :pagination="false"
                 :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio' }"
                 rowKey="rowKey"
                 :customRow="rowClick">
          <!-- //TODO 序号-->
          <span slot="id"
                slot-scope="text, record, index">{{ index + 1 }}</span>

        </a-table>
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>
<script>
import JInput from '@/components/jeecg/JInput.vue'
import { goodsColumnsData, columnsData } from './const'
import { bidEvaluation } from '@/api/bid'
export default {
  name: '',
  components: { JInput },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      goodsDataSource: [],
      goodsColumns: goodsColumnsData(),
      columns: columnsData(),
      dataSource: [],
      model: {},
      /* table选中keys*/
      selectedRowKeys: [],
      selectionRows: [],
      rowClick: (record, index) => ({
        on: {
          click: () => {
            this.selectedRowKeys = []
            this.selectionRows = []
            this.selectedRowKeys = [index]
            this.selectionRows = [record]
          }
        }
      })
    }
  },
  methods: {
    edit(record) {
      this.model = record

      this.goodsDataSource = this.model.gswlOrderGoodsList
      this.dataSource = this.model.gswlBiddingOfferList
      this.visible = true
    },
    async handleSubmit() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.warning('请选择承运商公司')
        return
      }

      const { success, message } = await bidEvaluation({
        bidId: this.model.bidId,
        id: this.model.id,
        bidderId: this.selectionRows[0].bidderId
      })
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
      this.selectedRowKeys = []
      this.selectionRows = []
    },
    onSelectChange(selectedRowKeys, selectionRows) {
      console.log('selectedRowKeys', selectedRowKeys)
      console.log('selectionRows', selectionRows)

      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows
    }
  }
}
</script>
<style scoped lang="less">
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
</style>
