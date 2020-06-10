<template>
  <a-card :bordered="false">
    <!-- 操作按钮区域 -->
    <div style="text-align:right;margin-bottom:8px ">
      <a-button @click="handleNewAdd" type="primary" :disabled="this.titleParams == '详情'"
        >新增</a-button
      >
      <a-button
      style="margin-left:8px"
        @click="loadData"
        type="primary"
      >刷新</a-button>
    </div>

    <!-- table区域 -->
    <div>
      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="false"
        :loading="loading"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">修改</a>
          <a-divider type="vertical"></a-divider>
          <a @click="handleDelete(record.id)">删除</a>
        </span>
      </a-table>
      <!-- table底部区域 -->
      <contact-modal ref="modalForm" @ok="modalFormOk"></contact-modal>
    </div>
  </a-card>
</template>
<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction } from '@/api/manage'
import api from '@/api/index'
import contactModal from './contactModal'
import tableData from '@api/tableData'
export default {
  mixins: [JeecgListMixin],
  name: '',
  components: { contactModal },
  props: ['cusId', 'titleParams'],
  data() {
    return {
      title: '',
      columns: tableData.shipTableData,
      url: api.customerUrl.ship
    }
  },

  watch: {
    cusId() {
      this.loadData(1)
    }
  },

  methods: {
    //  新增
    handleNewAdd() {
      this.$refs.modalForm.edit({ contactsType: '1', customerId: this.cusId })
      this.$refs.modalForm.title = '新增'
      this.$refs.modalForm.disableSubmit = false
    },
    //  分页查询
    loadData(arg) {
      this.loading = true
      const params = { cusId: this.cusId, cusConType: '1' }
      getAction(this.url.list, params).then(res => {
        if (res.success) {
          this.dataSource = res.result
        }

        this.loading = false
      })
    }
  }
}
</script>
<style scoped lang="less">
/deep/ .ant-input-disabled {
  color: black;
}
</style>
