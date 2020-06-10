<!--
 * @Description:
 * @Date: 2020-03-03 13:21:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-28 17:03:37
 -->
<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <a-row :gutter="24">
      <div class="table-page-search-wrapper">
        <a-form @keyup.enter.native="searchQuery"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol">
          <a-col :span="label">
            <a-form-item label="订单号：">
              <a-input placeholder="请输入订单号"
                       v-model="queryParam.orderNo"></a-input>
            </a-form-item>
          </a-col>

          <a-col :span="label">
            <a-form-item label="客户名称：">
              <a-input v-model="queryParam['customerName']"
                       placeholder="请输入客户名称"></a-input>
            </a-form-item>
          </a-col>
          <!-- 收起展开列表 -->
          <template v-if="toggleSearchStatus">
            <a-col :span="label">
              <a-form-item label="托运时间：">
                <j-date v-model="queryParam.consignmentDateTime"
                        placeholder="请选择时间"
                        :show-time="true"
                        date-format="YYYY-MM-DD HH:mm:ss"></j-date>
              </a-form-item>
            </a-col>

            <a-col :span="label">
              <a-form-item label="配送时间：">
                <j-date v-model="queryParam.shippingDateTime"
                        placeholder="请选择时间"
                        :show-time="true"
                        date-format="YYYY-MM-DD HH:mm:ss"></j-date>
              </a-form-item>
            </a-col>

            <a-col :span="label">
              <a-form-item label="收货单位：">
                <a-input v-model="queryParam['consignee']"
                         placeholder="请输入收货客户名称"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="label">
              <a-form-item label="发货单位：">
                <a-input v-model="queryParam['consignor']"
                         placeholder="请输入发货客户名称"></a-input>
              </a-form-item>
            </a-col>
          </template>

          <a-col :span="label">
            <span style="overflow: hidden;float:left"
                  class="table-page-search-submitButtons">
              <a-button type="primary"
                        @click="searchQuery"
                        icon="search">查询</a-button>
              <a-button type="default"
                        @click="searchReset"
                        icon="reload"
                        style="margin-left: 8px">重置</a-button>

              <a @click="handleToggleSearch"
                 style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>

          </a-col>
        </a-form>
      </div>
    </a-row>

    <!-- 操作按钮区域 -->
    <div class="table-operator"
         style="border-top: 5px">
      <!-- table区域-begin -->
      <div>

        <!-- //订单导入模板下载 -->
        <a-tooltip placement="bottom"
                   :mouseLeaveDelay="2">
          <template slot="title">
            <span>导入步骤</span>
            <a-steps direction="vertical">
              <a-step title="步骤一"
                      description="下载订单模板" />
              <a-step title="步骤二"
                      description="填写订单数据" />
              <a-step title="步骤三"
                      description="导入订单数据文件" />
              <a-step title="步骤四"
                      description="确认导入" />
            </a-steps>
          </template>
          <a-button @click="handleCommonDown">订单导入模板</a-button>
        </a-tooltip>
        <a-upload name="file"
                  :showUploadList="false"
                  :multiple="false"
                  :headers="tokenHeader"
                  :action="url.importExcelUrl"
                  @change="handleImportExcel">
          <a-button type="primary"
                    icon="import">导入</a-button>
        </a-upload>

        <a-upload name="file"
                  :showUploadList="false"
                  :multiple="false"
                  :headers="tokenHeader"
                  :action="url.importExcelUrl"
                  @change="handleImportExcel">
        </a-upload>

        <a-button type="danger"
                  ghost
                  @click="handleEmpty">清空</a-button>
        <a-button type="primary"
                  @click="handleImportData">确认导入</a-button>
        <!-- <a-button type="danger"
                  @click="batchDel"
                  ghost>
          删除
        </a-button> -->
      </div>
    </div>

    <!-- table区域 -->
    <div>
      <a-table ref="table"
               bordered
               size="middle"
               rowKey="id"
               :columns="columns"
               :scroll="{ x: true }"
               :dataSource="dataSource"
               :pagination="ipagination"
               table-layout="auto"
               :loading="loading"
               @change="handleTableChange">
        <!-- //运输模式 -->
        <span slot="transportMode"
              slot-scope="text">
          <span v-if="text == 0">整车</span>
          <span v-if="text == 1">零担</span>
        </span>
        <!-- //TODO 操作-->
        <span slot="action"
              slot-scope="text, record">
          <a @click="handleDetail(record)">详情</a>

        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <carrier-modal ref="carriermodal"
                   @ok="modalFormOk"></carrier-modal>
    <driver-modal ref="drivermodal"
                  @ok="modalFormOk"></driver-modal>
    <sourcer-modal ref="sourcemodal"
                   @ok="modalFormOk"></sourcer-modal>
  </a-card>
</template>
<script>
import CarrierModal from './modules/carrierModal'
import driverModal from './modules/driverModal'
import sourcerModal from './modules/releaseSource'

import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JDate from '@/components/jeecg/JDate.vue'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
import { downFile, deleteAction, postAction } from '@/api/manage'
import store from '@/store/'
import moment from 'moment'
import constData from './const'
export default {
  name: '',
  mixins: [JeecgListMixin],
  components: { CarrierModal, JDate, driverModal, sourcerModal },
  data() {
    return {
      url: constData.orderImportUrl.url,
      checkButton: false,
      dataSource_dictionary: [],
      orderStatus_dictionary: [],
      receiptType_dictionary: [],
      settlementWays_dictionary: [],
      userType: store.getters.userType,
      /* 分页参数 */
      ipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30', '50', '100'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      label: '6',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 }
      },
      columns: [
        {
          title: '订单号',
          align: 'center',
          dataIndex: 'orderNo',
          fixed: 'left',
          ellipsis: true,
          customRender: (text, record) => {
            return (
              <a
                onClick={() => {
                  this.handleDetail(record)
                }}
              >
                {{ text }}
              </a>
            )
          },
          sorter: (a, b) => {
            const total = a['orderNo'].split('').reduce(function(prev, cur, index, arr) {
              return cur.charCodeAt(0) + prev
            }, 0)
            const total2 = b['orderNo'].split('').reduce(function(prev, cur, index, arr) {
              return cur.charCodeAt(0) + prev
            }, 0)
            return total - total2
          }
        },
        {
          title: '错误描述',
          align: 'center',
          dataIndex: 'errorDesc',
          ellipsis: true,
          customRender: (text, record) => {
            return (
              <a-tooltip placement='top'>
                <template slot='title'>
                  <span>{{ text }}</span>
                </template>
                <div style='width:120px;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;'>{{ text }}</div>
              </a-tooltip>
            )
          }
        },
        {
          title: '委托单号',
          align: 'center',
          dataIndex: 'shippingNoteNumber',
          width: 100,
          ellipsis: true
        },
        {
          title: '托运时间',
          align: 'center',
          dataIndex: 'consignmentDateTime',
          ellipsis: true,
          width: 20,
          tableLayout: 'fixed',
          sorter: (a, b) => moment(a['consignmentDateTime']).valueOf() - moment(b['consignmentDateTime']).valueOf()
        },
        {
          title: '配送时间',
          align: 'center',
          dataIndex: 'shippingDateTime',
          ellipsis: true,
          sorter: (a, b) => moment(a['shippingDateTime']).valueOf() - moment(b['shippingDateTime']).valueOf()
        },
        {
          title: '发货单位',
          align: 'center',
          dataIndex: 'consignor',
          ellipsis: true
        },
        {
          title: '发货人',
          dataIndex: 'consignorLinkName',
          align: 'center',
          ellipsis: true
        },
        {
          title: '发货电话',
          align: 'center',
          dataIndex: 'consignorLinkPhone',
          ellipsis: true
        },
        {
          title: '出发地',
          align: 'center',
          dataIndex: 'consignorAddr',
          ellipsis: true
        },
        {
          title: '发货地址',
          align: 'center',
          dataIndex: 'consignorDeailAddr',
          ellipsis: true
        },
        {
          title: '收货单位',
          align: 'center',
          dataIndex: 'consignee',
          ellipsis: true
        },
        {
          title: '收货人',
          align: 'center',
          dataIndex: 'consigneeLinkName',
          ellipsis: true
        },
        {
          title: '收货电话',
          align: 'center',
          dataIndex: 'consigneeLinkPhone',
          ellipsis: true
        },
        {
          title: '目的地',
          align: 'center',
          dataIndex: 'consigneeAddr',
          width: 120,
          ellipsis: true
        },
        {
          title: '收货地址',
          align: 'center',
          dataIndex: 'consigneeDeailAddr',
          ellipsis: true
        },
        {
          title: '运输模式',
          align: 'center',
          dataIndex: 'transportMode',
          scopedSlots: {
            customRender: 'transportMode'
          }
        },
        {
          title: '物品名称',
          align: 'center',
          dataIndex: 'goodsNames',
          ellipsis: true
        },
        {
          title: '数量',
          align: 'center',
          dataIndex: 'numbers',
          ellipsis: true
        },
        {
          title: '重量（吨）',
          align: 'center',
          dataIndex: 'weights',
          ellipsis: true
        },
        {
          title: '体积（m³）',
          align: 'center',
          dataIndex: 'cubes',
          ellipsis: true
        },
        {
          title: '结算方式',
          align: 'center',
          dataIndex: 'settlementWays',
          width: 80,
          customRender: text => {
            // 字典值替换通用方法
            return filterDictText(this.settlementWays_dictionary, text)
          }
        },
        {
          title: '回单类型',
          align: 'center',
          dataIndex: 'receiptType',
          width: 80,
          customRender: text => {
            // 字典值替换通用方法
            return filterDictText(this.receiptType_dictionary, text)
          }
        },
        {
          title: '回单数量',
          align: 'center',
          dataIndex: 'receiptNo',
          width: 80
        },
        {
          title: '运费',
          align: 'center',
          dataIndex: 'freight',
          width: 120,
          scopedSlots: {
            customRender: 'freight'
          },
          sorter: (a, b) => a.freight - b.freight
        },
        {
          title: '结算天数',
          align: 'center',
          dataIndex: 'settlementDays'
        },
        {
          title: '操作人',
          align: 'center',
          dataIndex: 'createBy',
          ellipsis: true
        },
        {
          title: '操作',
          align: 'center',
          fixed: 'right',
          dataIndex: 'action',
          ellipsis: true,
          scopedSlots: {
            customRender: 'action'
          }
        }
      ]
    }
  },
  methods: {
    //  订单导入模板下载
    handleCommonDown() {
      downFile(this.url.commonDown, {}).then(data => {
        if (!data) {
          this.$message.warning('文件下载失败')
          return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(
            new Blob([data], {
              type: 'application/vnd.ms-excel'
            }),
            '订单导入模板' + '.xls'
          )
        } else {
          const url = window.URL.createObjectURL(
            new Blob([data], {
              type: 'application/vnd.ms-excel'
            })
          )
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '订单导入模板' + '.xls')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) // 下载完成移除元素
          window.URL.revokeObjectURL(url) // 释放掉blob对象
        }
      })
    },
    //  点击详情
    handleDetail(record) {
      sessionStorage.setItem('OrderDetails', JSON.stringify(record))
      this.$router.push({ name: 'order-modules-orderDetail' })
    },
    //  确认导入
    handleImportData() {
      var that = this
      this.$confirm({
        title: '确认导入',
        content: '确认导入所有数据到自有订单?',
        onOk: function() {
          that.loading = true
          postAction(that.url.confirmImport)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.loadData()
                that.onClearSelected()
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.loading = false
            })
        }
      })
    },
    //  清空
    handleEmpty() {
      var that = this
      this.$confirm({
        title: '确认清空',
        content: '是否清空所有表格数据?',
        onOk: function() {
          that.loading = true
          deleteAction(that.url.deleteBatch)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.loadData()
                that.onClearSelected()
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.loading = false
            })
        }
      })
    },
    //  -------------字典表处理--------------------
    initDictConfig() {
      // //初始化字典 - 订单来源
      // initDictOptions('dataSource_dictionary').then(res => {
      //   if (res.success) {
      //     this.dataSource_dictionary = res.result
      //   }
      // })
      //  订单状态
      initDictOptions('orderStatus').then(res => {
        if (res.success) {
          this.orderStatus_dictionary = res.result
        }
      })
      // //  回单类型
      initDictOptions('receiptType_dictionary').then(res => {
        if (res.success) {
          this.receiptType_dictionary = res.result
        }
      })
      // //  结算方式
      initDictOptions('settlementWays').then(res => {
        if (res.success) {
          this.settlementWays_dictionary = res.result
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.tabs {
  display: inline-block;
  margin-right: 15px;
}
/deep/ .ant-steps-item-description,
/deep/ .ant-steps-item-title {
  color: white !important;
}
</style>
