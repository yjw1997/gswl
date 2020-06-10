<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="loadData">
        <a-row :gutter="24">
          <a-col :md="6" :sm="12">
            <a-form-item label="竞价单号：">
              <a-input placeholder="请输入竞价单号" v-model="queryParam.biddingNo"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="12" v-if="userType === 'PT'">
            <a-form-item label="关联订单号：">
              <a-input placeholder="请输入关联订单号" v-model="queryParam.orderNo"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="12" v-if="userType === 'PT'">
            <a-form-item label="竞价状态：">
              <j-dict-select-tag dictCode="bidding_status" style="width: 100%"
                           v-model="queryParam.biddingStatus"></j-dict-select-tag>
              <!-- <a-select v-model="queryParam.biddingStatus" style="width: 100%">
                <a-select-option value="">
                  全部
                </a-select-option>
                <a-select-option :value="item.value" :key="item.value" v-for="(item) in statusDict">
                  {{ item.text }}
                </a-select-option> -->
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="12" v-if="userType === 'CYS'">
            <a-form-item label="托运时间：">
              <a-range-picker
                :show-time="{ format: 'HH' }"
                format="YYYY-MM-DD HH"
                :placeholder="['开始时间', '结束时间']"
                v-model="consignDateTime"
                style="width:100%"
              />
              <!-- <a-input placeholder="请输入联系电话" v-model="queryParam.linkPhone"></a-input> -->
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="12" v-if="userType === 'CYS'">
            <a-form-item label="配送时间：">
              <a-range-picker
                :show-time="{ format: 'HH' }"
                format="YYYY-MM-DD HH"
                :placeholder="['开始时间', '结束时间']"
                v-model="shippingDateTime"
                style="width:100%"
              />
              <!-- <a-input placeholder="请输入联系电话" v-model="queryParam.linkPhone"></a-input> -->
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="loadData" icon="search">查询</a-button>
              <a-button type="default" @click="loadData" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px;margin-top:8px">
      <div>
        <a-radio-group class="block" v-model="listType" @change="changeTabs" v-if="userType === 'CYS'">
          <a-radio-button :value="'0'">实时竞价单</a-radio-button>
          <a-radio-button :value="'1'">历史竞价单</a-radio-button>
        </a-radio-group>
        <a-button @click="bidEnd()" type="primary" v-if="userType === 'PT'" :disabled="bidEndStatus">作废</a-button>
      </div>
    </div>

    <!-- table区域 -->
    <div>
      <!-- table区域-begin -->

      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="bidId"
        tableLayout="auto"
        :columns="columns"
        :scroll="{ x: true }"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
        :customRow="rowClick"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleDetail(record)">详情</a>

          <bid-quote v-if="record.biddingStatus === '0' && userType === 'CYS'" :info="record" @ok="loadData" />
          <a-divider
            type="vertical"
            v-if="
              userType === 'PT' &&
                record.gswlBiddingOfferList &&
                record.gswlBiddingOfferList.length !== 0 &&
                record.biddingStatus === '0'
            "
          ></a-divider>
          <a
            @click="handleSealBid(record.id)"
            v-if="
              userType === 'PT' &&
                record.gswlBiddingOfferList &&
                record.gswlBiddingOfferList.length !== 0 &&
                record.biddingStatus === '0'
            "
            >封标</a
          >
          <a-divider type="vertical" v-if="userType === 'PT' && record.biddingStatus === '1'"></a-divider>
          <a
            @click="
              () => {
                bidEvaluation(record)
              }
            "
            v-if="userType === 'PT' && record.biddingStatus === '1'"
            >评标</a
          >
        </span>
      </a-table>
    </div>

    <bin-evaluation-modal ref="bidModalForm" @ok="modalFormOk"/>

    <!-- table区域-end -->
  </a-card>
</template>
<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import bidQuote from './bidQuote'
import binEvaluationModal from './bidEvaluationModal'
import { bidManagerTable } from './const.js'
import { initDictOptions } from '@/components/dict/JDictSelectUtil'
import store from '@/store/'
import { queryBiddingOfferList, queryHistoryPage, queryRealTimePage, deleteBidding, querySealBid } from '@/api/bid'
export default {
  name: '',
  mixins: [JeecgListMixin],
  components: { bidQuote, binEvaluationModal },
  data() {
    return {
      ipagination: {},
      show: 'all',
      listType: '0',
      ids: new Set(),
      shippingDateTime: null,
      consignDateTime: null,
      statusDict: [],
      columns: [],
      bidEndStatus: true,
      userType: store.getters.userType,
      rowClick: record => ({
        on: {
          dblclick: () => {}
        }
      })
    }
  },
  computed: {},
  watch: {},
  mounted() {
    initDictOptions('bid_status').then(res => {
      if (res.success) {
        this.statusDict = res.result
        this.loadData()
        this.columns = bidManagerTable(store.getters.userType, res.result)
        this.$set(this.queryParam, 'biddingStatus', '')
      }
    })
  },
  methods: {
    // ...mapGetters(['userInfo']),
    changeTabs(value) {
      this.columns = bidManagerTable(store.getters.userType, this.listType)
      this.loadData()
    },
    onSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows
      this.ids = new Set()
      for (const key in this.selectionRows) {
        if (this.selectionRows.hasOwnProperty(key)) {
          if (this.selectionRows[key].biddingStatus !== '0') {
            this.bidEndStatus = true
            return
          }
          this.bidEndStatus = false
          this.ids.add(this.selectionRows[key].id)
        }
      }
    },
    //  分页查询
    // loadData(arg) {
    // },
    async loadData() {
      this.loading = true
      const params = this.getQueryParams() // 查询条件it (
      const getTimer = (timer) => {
        if (timer) return timer.set('minute', 0).set('second', 0).format('YYYY-MM-DD HH:mm:ss')
        return null
      }
      if (this.shippingDateTime) {
        params.shippingBeginDt = getTimer(this.shippingDateTime[0])
        params.shippingEndDt = getTimer(this.shippingDateTime[1])
      }
      if (this.consignDateTime) {
        params.shippingBeginDt = getTimer(this.consignDateTime[0])
        params.shippingEndDt = getTimer(this.consignDateTime[1])
      }

      let res = {}
      if (this.userType === 'PT') {
        res = await queryBiddingOfferList(params)
      } else {
        if (this.listType === '0') {
          res = await queryRealTimePage(params)
        } else {
          res = await queryHistoryPage(params)
        }
      }
      const { result, success } = res
      this.loading = false
      if (success) {
        this.dataSource = result.records
        this.ipagination.total = result.total
      }
    },
    bidEnd() {
      // const _fun =
      const _that = this
      this.$confirm({
        title: '确认执行',
        content: '是否操作选中数据?',
        onOk: async () => {
          const ids = Array.from(_that.ids).toString()
          const { success, message } = await deleteBidding({ ids })
          if (success) {
            _that.$message.success('作废成功！')
            _that.loadData()
          } else {
            _that.$message.warning(message)
          }
        }
      })
    },
    async handleSealBid(id) {
      const { success, message } = await querySealBid({ ids: id })
      if (success) {
        this.$message.success('封标成功！')
        this.loadData()
      } else {
        this.$message.warning(message)
      }
    },
    //  详情
    handleDetail(record) {
      sessionStorage.setItem('bidDetails', JSON.stringify(record))
      this.$router.push({ name: 'bid-bidDetails' })
    },
    bidEvaluation(row) {
      this.$refs.bidModalForm.edit(row)
    }
  }
}
</script>
<style scoped lang="less">
// @import url('./article.less');
</style>
