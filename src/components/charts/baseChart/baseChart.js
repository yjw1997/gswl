// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入图表
// require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')

// 引入组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

class baseChart {
  constructor() {
    this.myChart = null
  }

  init(dom) {
    this.myChart = echarts.init(dom)
  }
}

class Pie extends baseChart {
  constructor(dom) {
    super()
    this.init(dom)
    this.setOptions()
  }
  setOptions() {
    this.myChart.setOption({
      title: {
        text: '全国车辆分布'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}:{c}㎡ {d}%'
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
              formatter: '{b|{b}}\n{c|{c}}㎡ {d|{d}}%',
              rich: {
                b: {
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
              shadowBlur: 50,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }
}

class Line extends baseChart {
  constructor(title) {
    super()
    this.setOptions()
  }
  setOptions() {
    this.myChart.setOption({
      title: {
        text: this.title
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    })
  }
}

export {
  Pie,
  Line
}
