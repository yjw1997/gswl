
<template>
  <vue-echarts :model='currentOption'
               title="车型分布"
               height="300px"></vue-echarts>
</template>

<script>
import vueEcharts from '../baseChart'
import { getAction } from '@/api/manage'
export default {
  name: 'echartsPoliceStatistic',
  props: {
    typeIndex: {
      type: Number,
      default: 0
    },
    refresh: {
      type: Boolean,
      default: false
    }
  },
  components: { vueEcharts },
  watch: {
    refresh(value) {
      this.options.legend.data = []
      this.options.series[0].data = []
      this.initData()
    }
  },
  data() {
    return {
      currentOption: {},
      options: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}\n{c}辆  {d}%'
        },
        legend: {
          bottom: 20,
          data: ['空闲', '办公占用', '设备占用', '公用'],
          textStyle: {
            color: 'auto',
            fontSize: 12
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['50%', '40%'],
            label: {
              normal: {
                formatter: '{b|{b}}\n{c|{c}} 辆  {d|{d}}%',
                rich: {
                  b: {
                    fontSize: 12,
                    lineHeight: 14,
                    align: 'left'
                  },
                  c: {
                    fontSize: 12,
                    lineHeight: 14,
                    align: 'left'
                  },
                  d: {
                    fontSize: 12,
                    lineHeight: 14,
                    align: 'left'
                  }
                }
              }
            },
            data: [
              { value: 335, name: '空闲' },
              { value: 310, name: '办公占用' },
              { value: 234, name: '设备占用' },
              { value: 120, name: '公用' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.currentOption = this.options

      getAction('/online/car/vTypeDistribution', {}).then(res => {
        const data = res.result
        const arr = []
        const seriesData = []
        data.forEach(element => {
          arr.push(element.vehicleTypeText)
          seriesData.push({
            name: element.vehicleTypeText,
            value: element.number
          })
        })
        this.options.legend.data = arr
        this.options.series[0].data = seriesData
        this.currentOption = this.options
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
