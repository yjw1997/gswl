<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="总运费（元）" :total="chartTotals.sumAvgOrderMap.totalFreight + ''">
          <div>
            <mini-bar :dataSource="chartInfo.freight" :height="40" />
          </div>
          <template slot="footer"
            >日均运费<span>￥ {{ chartTotals.sumAvgOrderMap.avgFreight }}</span></template
          >
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="总订单" :total="chartTotals.sumAvgOrderMap.totalOrder + ''">
          <div>
            <mini-area :dataSource="chartInfo.order" />
          </div>
          <template slot="footer"
            >日订单量<span> {{ chartTotals.sumAvgOrderMap.avgOrder }}</span></template
          >
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="总运单" :total="chartTotals.sumAvgWaybillMap.totalWaybill + ''">
          <div>
            <mini-bar :dataSource="chartInfo.waybill" :height="40" />
          </div>
          <template slot="footer"
            >日运单量 <span>{{ chartTotals.sumAvgWaybillMap.avgWaybill }}</span></template
          >
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="总运量（吨）" :total="chartTotals.sumAvgVolumeMap.totalNumber + ''">
          <div>
            <mini-area :dataSource="chartInfo.volume.number" />
          </div>
          <template slot="footer">
            日运量 <span>{{ chartTotals.sumAvgVolumeMap.avgNumber }}</span>
          </template>
        </chart-card>
      </a-col>
    </a-row>

    <a-card :loading="loading" :bordered="false" :body-style="{ padding: '0' }">
      <div class="salesCard">
        <a-row>
          <a-col :xl="userType === 'PT' ? 16 : 24" :lg="12" :md="12" :sm="24" :xs="24">
            <a-tabs :default-active-key="0" size="large" :tab-bar-style="{ marginBottom: '24px', paddingLeft: '16px' }">
              <a-tab-pane
                loading="true"
                :tab="chartInfoMap[key].tabName"
                v-for="(val, key, index) in chartInfo"
                :key="index"
              >
                <bar v-if="index !== 3" :title="chartInfoMap[key].name" :dataSource="val" />
                <base-line :dataSource="volumeData" v-else />
              </a-tab-pane>
            </a-tabs>
          </a-col>
          <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24" v-if="userType === 'PT'">
            <div class="extra-wrapper">
              <div class="extra-item">
                <a-radio-group v-model="rankParams.dateFlag" button-style="solid" @change="handleChangeFlag">
                  <a-radio-button v-for="(name, key, index) in dateTime" :value="key" :key="index">
                    {{ name }}
                  </a-radio-button>
                </a-radio-group>
              </div>
              <a-range-picker :style="{ width: '256px' }" @change="handlerChangeDate" />
            </div>
            <div style="margin-top:58px;border-top:1px solid rgb(232,232,232);">
              <template v-if="rankList.length !== 0">
                <rank-list title="承运商排行" style="padding-top:20px;height:280px" :list="rankList" />
                <a-pagination
                  size="small"
                  style="float:right;margin-right:20px"
                  @change="handleChangePage"
                  :total="pageTotal"
                  v-model="rankParams.pageNo"
                  :defaultPageSize="rankParams.pageSize"
                />
              </template>
              <template v-else>
                <div style="text-align:center;padding:80px 0;">
                  <div style="font-size:20px">暂无承运商交易数据</div>
                  <a-icon style="font-size:50px;margin-top:10px;color:#999" type="inbox" />
                </div>
              </template>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-card>

    <a-row v-if="userType !== 'HZ'">
      <a-col :span="24">
        <a-card :loading="loading" :bordered="false" title="基础统计" :style="{ marginTop: '24px' }">
          <a-row>
            <a-col :span="userType !== 'CYS' ? 6 : 8">
              <head-info title="客户数量" :content="baseCounts.countCustomerNum"></head-info>
            </a-col>

            <a-col :span="userType !== 'CYS' ? 6 : 8" v-if="userType !== 'CYS'">
              <head-info title="承运商数量" :content="baseCounts.countCarrierNum"></head-info>
            </a-col>

            <a-col :span="userType !== 'CYS' ? 6 : 8">
              <head-info title="司机数量" :content="baseCounts.countDriverNum"></head-info>
            </a-col>

            <a-col :span="6">
              <head-info title="车辆数据" :content="baseCounts.countVehicleNum"></head-info>
            </a-col>
          </a-row>
          <!-- <line-chart-multid :fields="visitFields" :dataSource="visitInfo"></line-chart-multid> -->
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ChartCard from '@/components/ChartCard'
import ACol from 'ant-design-vue/es/grid/Col'
import ATooltip from 'ant-design-vue/es/tooltip/Tooltip'
import MiniArea from '@/components/chart/MiniArea'
import MiniBar from '@/components/chart/MiniBar'
import MiniProgress from '@/components/chart/MiniProgress'
import RankList from '@/components/chart/RankList'
import BaseLine from '@/components/chart/BaseLineArea'
import Bar from '@/components/chart/Bar'
import LineChartMultid from '@/components/chart/LineChartMultid'
import HeadInfo from '@/components/tools/HeadInfo.vue'

import { monthsCNText } from './const.js'
import { queryStatisBase, querySumAndAvgByYear, querySumTransCapaByMonth, queryRankCarrierFreight } from '@/api/chart'
import { mapGetters } from 'vuex'
export default {
  name: 'IndexChart',
  components: {
    ATooltip,
    ACol,
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    LineChartMultid,
    HeadInfo,
    BaseLine
  },
  data() {
    return {
      loading: true,
      center: null,
      loginfo: {},
      visitInfo: [],
      baseCounts: {},
      userType: '',
      chartTotals: {
        sumAvgWaybillMap: {},
        sumAvgVolumeMap: {},
        sumAvgOrderMap: {}
      },
      chartInfo: { freight: [], order: [], waybill: [], volume: { number: [], weight: [], cube: [] } },
      dateTime: {
        year: '本年',
        month: '本月',
        week: '本周',
        today: '本日'
      },
      chartInfoMap: {
        order: { tabName: '总订单', name: '每月订单' },
        waybill: { tabName: '总运单', name: '每月运单' },
        volume: { tabName: '总运量', name: '每月运量' },
        freight: { tabName: '总运费', name: '每月运费' }
      },
      rankList: [],
      volumeData: [],
      rankParams: { pageSize: 5, pageNo: 1, dateFlag: 'year' },
      pageTotal: 0,
      indicator: <a-icon type='loading' style='font-size: 24px' spin />
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
    this.getSumAndAvgByYear()
    this.getStatisBase()
    this.getSumTransCapaByMonth()
    this.getRankCarrierFreight()

    this.userType = this.userInfo().userType
  },
  methods: {
    ...mapGetters(['userInfo']),
    handleChangePage(page) {
      this.getRankCarrierFreight()
    },
    handleChangeFlag() {
      this.rankParams.pageNo = 1
      this.getRankCarrierFreight()
    },
    handlerChangeDate(timer) {
      if (timer.length === 0) {
        this.rankParams.dateFlag = 'year'
        delete this.rankParams.beginDt
        delete this.rankParams.endDt
      } else {
        this.rankParams.dateFlag = 'appoint'
        this.rankParams.beginDt = timer[0].format('YYYY-MM-DD')
        this.rankParams.endDt = timer[0].format('YYYY-MM-DD')
      }
      this.getRankCarrierFreight()
    },
    async getStatisBase() {
      const { success, result } = await queryStatisBase()
      if (success) {
        for (const key in result) {
          if (result.hasOwnProperty(key)) {
            this.baseCounts[key] = result[key] + ''
          }
        }
      }
    },
    async getSumAndAvgByYear() {
      const { success, result } = await querySumAndAvgByYear({})
      if (success) {
        this.chartTotals = result
      }
    },
    async getRankCarrierFreight() {
      const { success, result } = await queryRankCarrierFreight(this.rankParams)
      const _list = []
      if (success) {
        this.pageTotal = result.total
        result.records.forEach(item => {
          const { carrierName: name, totalCarrierFreight: total } = item
          _list.push({ total, name })
        })
      }
      this.rankList = _list
    },
    async getSumTransCapaByMonth() {
      //
      const handlerData = (info, preKey, childKey) => {
        const data = []

        for (const key in monthsCNText) {
          if (preKey === 'volume') {
            if (!this.chartInfo.volume[childKey]) {
              this.chartInfo.volume[childKey] = []
            }
            this.chartInfo.volume[childKey].push({ x: monthsCNText[key], y: info[key] })
            data.push({ x: monthsCNText[key], y: info[key] })
          } else {
            this.chartInfo[preKey].push({ x: monthsCNText[key], y: info[key] })
          }
        }
        if (data.length !== 0) {
          const _map = { number: '数量', weight: '重量(吨)', cube: '体积(m³)' }
          this.volumeData.push({ name: _map[childKey], data })
        }
      }
      // 获取图表信息
      for (const rootkey in this.chartInfo) {
        if (this.chartInfo.hasOwnProperty(rootkey)) {
          const { success, result } = await querySumTransCapaByMonth({ queryFlag: rootkey })
          if (success) {
            if (rootkey === 'volume') {
              for (const key in result) {
                handlerData(result[key], rootkey, key)
              }
              this.$set(this.chartInfo, 'volume', this.chartInfo.volume)
            } else {
              handlerData(result, rootkey)
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.circle-cust {
  position: relative;
  top: 28px;
  left: -100%;
}
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;
  width: 542px;
  position: absolute;
  right: 10px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}

/* 首页访问量统计 */
.head-info {
  position: relative;
  text-align: left;
  padding: 0 32px 0 0;
  min-width: 125px;

  &.center {
    text-align: center;
    padding: 0 32px;
  }

  span {
    color: rgba(0, 0, 0, 0.45);
    display: inline-block;
    font-size: 0.95rem;
    line-height: 42px;
    margin-bottom: 4px;
  }
  p {
    line-height: 42px;
    margin: 0;
    a {
      font-weight: 600;
      font-size: 1rem;
    }
  }
}
</style>
