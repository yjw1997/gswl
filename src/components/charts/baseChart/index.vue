<template>
  <div>
    <slot name="title"></slot>
    <div class="title" v-if="title">{{ title }}</div>
    <div :ref="chartId" :style="{ width, height }"></div>
  </div>
</template>

<script>
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts')
// 引入图表
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/line')

// 引入组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

export default {
  name: 'vue-echarts',
  data() {
    return {
      chart: null,
      chartId: 'chart' + new Date().getTime()
    }
  },
  props: {
    model: {
      type: Object
    },
    title: { type: String, default: '' },
    width: {
      type: String | Number,
      required: false,
      default: '100%'
    },
    height: {
      type: String | Number,
      required: false,
      default: '100%'
    }
  },
  methods: {
    setOption(data) {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs[this.chartId])
      }
      if (data) this.chart.setOption(data)
    },
    getChart() {
      return this.chart
    }
  },
  mounted() {
    this.setOption(this.model)
  },

  watch: {
    model: {
      handler(newV, oldV) {
        this.setOption(newV)
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 18px;
  font-weight: bold;
  text-indent: 10px;
  padding:5px

}
</style>
