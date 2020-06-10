<template>
  <div>
    <vue-echarts ref="pie"
                 :model="options"
                 title="车辆分布"
                 height="290px"></vue-echarts>
    <div class="echarts-police-statistic">
      <div id="select">
        <j-dict-select-tag @input="selectChange"
                           v-model="changeData"
                           placeholder="请选择"
                           dictCode="provinceSelection"></j-dict-select-tag>
      </div>

      <vue-echarts height="286px"
                   :model="options2"
                   title="车籍分布"></vue-echarts>
    </div>
  </div>
</template>

<script>
// 全国车辆分布
import vueEcharts from '../baseChart'
import { getAction } from '@/api/manage'
export default {
  name: 'echartWatch',
  components: { vueEcharts },
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    refresh: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}:{c}辆 {d}%'
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
            radius: '50%',
            center: ['50%', '50%'],
            label: {
              normal: {
                formatter: '{b|{b}}\n{c|{c}}辆 {d|{d}}%',
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
              { value: 33, name: '空闲' },
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
      },
      options2: {
        color: [
          '#c23531',
          '#2f4554',
          '#61a0a8',
          '#d48265',
          '#91c7ae',
          '#749f83',
          '#ca8622',
          '#bda29a',
          '#6e7074',
          '#546570',
          '#c4ccd3'
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          bottom: 20,
          data: ['2011年', '2012年']
        },
        grid: {
          left: '3%',
          right: '3%',
          top: '10%',
          containLabel: true
        },

        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          axisLabel: {
            interval: 0,
            rotate: 30
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            type: 'bar',
            backgroundColor: 'transparent',
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    '#c23531',
                    '#2f4554',
                    '#61a0a8',
                    '#d48265',
                    '#91c7ae',
                    '#749f83',
                    '#ca8622',
                    '#bda29a',
                    '#6e7074',
                    '#546570',
                    '#c4ccd3'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            },
            data: [12, 13, 10, 14, 9, 23, 21, 12, 13, 10, 14, 9],
            label: {
              normal: {
                position: 'insideRight',
                show: true
              }
            }
          }
        ]
      },
      changeData: '350000',
      loading: false
    }
  },
  watch: {
    refresh(value) {
      this.options.legend.data = []
      this.options.series[0].data = []
      this.options2.yAxis.data = []
      this.options2.series[0].data = []
      this.initData()
      this.changeData = '350000'
      // 添加点击监听
      this.selectChange(this.changeData)
      this.$refs.pie.chart.on('click', 'series', params => {
        if (params.data.code === '') params.data.code = 'weizhi'
        this.changeData = params.data.code
        this.selectChange(this.changeData)
      })
    }
  },
  mounted() {
    this.initData()
    // 添加点击监听
    this.selectChange(this.changeData)
    this.$refs.pie.chart.on('click', 'series', params => {
      if (!this.loading) return

      this.changeData = params.data.code

      this.selectChange(this.changeData)
    })
  },
  methods: {
    initData() {
      getAction('/online/car/nationalDistribution', {}).then(res => {
        const data = res.result.sort((a, b) => {
          return a.number - b.number
        })
        const arr = []
        const seriesData = []
        data.forEach(element => {
          arr.push(element.text)
          seriesData.push({
            name: element.text,
            value: element.number,
            code: element.code
          })
        })
        this.options.legend.data = arr
        this.options.series[0].data = seriesData
      })
    },
    selectChange(code) {
      if (code === 'weizhi') code = ''
      getAction('/online/car/registrationDistribution', { code: code }).then(res => {
        const data = res.result.sort((a, b) => {
          return a.number - b.number
        })
        const arr = []
        const seriesData = []
        data.forEach(element => {
          arr.push(element.text)
          seriesData.push({
            name: element.text,
            value: element.number,
            code: element.code
          })
        })
        this.options2.yAxis.data = arr
        this.options2.series[0].data = seriesData
        this.loading = true
      })
    }
  }
}
</script>

<style scoped lang="less">
.echarts-police-statistic {
  width: 100%;
  position: relative;
  // & > button {
  //   height: 20px;
  //   width: 100px;
  // }
  // & > div {
  //   height: calc(100% - 20px);
  //   width: 100%;
  // }
}
#select {
  display: inline-block;
  width: 150px;
  height: 32px;
  position: absolute;
  top: 0;
  right: 0;
}
/deep/.ant-select-selection,
/deep/ .ant-select {
  width: 150px;
  height: 32px;
  z-index: 9999999;
}
</style>
