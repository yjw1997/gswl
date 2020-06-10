<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="12">
            <a-form-item label="单位名称：">
              <a-input placeholder="请输入客户名称" v-model="queryParam.customerName"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="12">
            <a-form-item label="联系人：">
              <a-input placeholder="请输入联系人" v-model="queryParam.linkName"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="12">
            <a-form-item label="联系电话：">
              <a-input placeholder="请输入联系电话" v-model="queryParam.linkPhone"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="default" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px;margin-top:8px">
      <div>
        <a-radio-group class="block" v-model="queryParam.delFlag" @change="changeTabs">
          <a-radio-button :value="undefined">全部</a-radio-button>
          <a-radio-button :value="'0'">启用</a-radio-button>
          <a-radio-button :value="'1'">禁用</a-radio-button>
        </a-radio-group>
        <a-button @click="handleAdd()" type="primary">新增客户</a-button>
      </div>
    </div>

    <!-- table区域 -->
    <div>
      <!-- table区域-begin -->

      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        tableLayout="auto"
        :columns="columns"
        :scroll="{ x: true }"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
        :customRow="rowClick"
      >
        <span slot="type" slot-scope="text">
          <div v-if="text == 0">单位</div>
          <div v-if="text == 1">个体</div>
        </span>
        <span slot="action" slot-scope="text, record">
          <a-switch
            checkedChildren="启用"
            unCheckedChildren="禁用"
            :defaultChecked="record.delFlag == 0 ? true : false"
            @click="handleDeleteStatus(record)"
            :loading="switchLoading"
          />
          <a-divider type="vertical"></a-divider>
          <a @click="handleEdit(record)">修改</a>
          <a-divider type="vertical"></a-divider>
          <a @click="handleDetail(record)">详情</a>
        </span>
      </a-table>
    </div>

    <!-- table区域-end -->
    <customer-modal ref="modalForm" @ok="modalFormOk"></customer-modal>
  </a-card>
</template>
<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import customerModal from './customerModal'
import { getAction, editStatus } from '@/api/manage'

import api from '@/api/index'
import { customerTableDataUser, customerTableData } from '../const.js'
export default {
  name: '',
  mixins: [JeecgListMixin],
  components: {
    customerModal
  },
  data() {
    return {
      ipagination: {},
      columns: customerTableData,
      columnsUser: customerTableDataUser,
      url: api.customerUrl,
      rowClick: record => ({
        on: {
          dblclick: () => {}
        }
      })
    }
  },
  watch: {},
  created() {
    const userType = JSON.parse(localStorage.getItem('pro__Login_Userinfo')).value.userType
    if (userType === 'HZ') {
      this.columns = this.columnsUser
    }
  },
  methods: {
    changeTabs() {
      this.searchQuery()
    },
    handleDeleteStatus: function(record) {
      this.switchLoading = true
      if (record.delFlag === 0) {
        record.delFlag = 1
      } else {
        record.delFlag = 0
      }
      editStatus(this.url.deleteStatus, {
        id: record.id,
        delFlag: record.delFlag
      })
        .then(res => {
          if (res.success) {
            this.$message.success(res.message)
            this.loadData()
          } else {
            this.$message.warning(res.message)
          }
        })
        .finally(() => {
          this.switchLoading = false
        })
    },

    modalFormOk() {
      // 新增/修改 成功时，重载列表
      this.loadData()
    },
    //  分页查询
    loadData(arg) {
      // 加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1
      }

      var params = this.getQueryParams() // 查询条件
      params.userId = JSON.parse(localStorage.getItem('pro__Login_Userinfo')).value.dataId
      this.loading = true
      getAction(this.url.list, params).then(res => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // // 新增
    handleAdd() {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = '新增'
      this.$refs.modalForm.disableSubmit = false
    },

    //  修改
    handleEdit(record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '编辑'
      this.$refs.modalForm.disableSubmit = false
    },
    //  详情
    handleDetail(record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '详情'
      this.$refs.modalForm.disableSubmit = true
    }
  }
}
</script>
<style scoped lang="less">
// @import url('./article.less');
</style>
