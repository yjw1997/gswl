<template>
  <div id="chart">
    <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  name: 'MiniArea',
  props: {
    dataSource: {
      type: Array,
      default: false
    }
  },
  data() {
    return {
      series: [],
      chartOptions: {
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        },
        chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'numeric'
        }

      }

    }
  },
  computed: {
    scale() {
      return [
        { dataKey: 'x', title: this.x, alias: this.x },
        { dataKey: 'y', title: this.y, alias: this.y }
      ]
    }
  },
  watch: {
    dataSource: {
      handler(newVal) {
        if (Array.isArray(newVal)) {
          this.series = newVal
        }
      },
      immediate: true,
      deep: true // 表示开启深度监听
    }
  }
}
</script>

<style lang="less" scoped>
@import 'chart';
</style>
