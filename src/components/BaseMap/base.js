import AMap from 'AMap' // 引入高德地图
import { message } from 'ant-design-vue'
import img from '@/assets/icons/icon-car-b.png'

export default class BaseMap {
  'use strict'

  constructor(map) {
    this.mapObj = map
    this.originalPoints = [] // 记录原始数据
    this.clusterer = null
  }

  get() {
    return this.map
  }

  set(map) {
    this.mapObj = map
  }

  truckDriving({ options, waypoint }) {
    var truckDriving = new AMap.TruckDriving({
      map: this.mapObj,
      policy: 0, // 规划策略
      size: 1, // 车型大小
      width: 2.5, // 宽度
      height: 2, // 高度
      load: 1, // 载重
      weight: 12, // 自重
      axlesNum: 2, // 轴数
      isOutline: true,
      outlineColor: '#ffeeee',
      ...options
    })
    const path = this.disposeData(waypoint)
    truckDriving.search(path, function(status, result) {
      if (status === 'complete') {
        message.success('获取驾车数据成功')
      } else {
        message.error('获取驾车数据失败：' + result)
      }
    })
  }

  /**
   * 处理原始数据
   * @param {array} data
   */
  disposeData(data) {
    this.originalPoints = data
    const arr = []
    if (data.length === 0) {
      message.error('地图轨迹数据为空')
    } else {
      data.forEach(e => {
        arr.push([e.longitude, e.latitude])
      })
    }
    return arr
  }
  addLineWithGaode({ waypoint, show = true }) {
    const path = this.disposeData(waypoint)
    // const star = path[0]
    var color = '#3366FF'
    var strokeOpacity = 0.7
    var polyline = new AMap.Polyline({
      path: path,
      strokeColor: color,
      strokeOpacity: strokeOpacity,
      strokeWeight: 4,
      strokeStyle: 'solid',
      lineJoin: 'round'
    })
    polyline.setMap(this.mapObj)
    this.mapObj.setFitView()
    //  起始点和终点
    if (show) {
      // 创建一个 Icon
      // const points = this.disposeData(waypoint)

      this.addMarkers({ ponitList: [waypoint[0]], icon: this.custIcon('start') })
      this.addMarkers({ ponitList: [waypoint[waypoint.length - 1]], icon: this.custIcon('end') })
    }
  }

  SvgMarker(type, position) {
    // eslint-disable-next-line no-undef
    AMapUI.loadUI(['overlay/SvgMarker'], function(SvgMarker) {
      if (!SvgMarker.supportSvg) {
        alert('当前环境不支持SVG')
      }

      const symbolJs = '//at.alicdn.com/t/font_1847718_wunvekllny8.js'
      let icon = ''
      switch (type) {
        case 'car':
          icon = 'icontruck-colorful'
      }

      return new SvgMarker(
        new SvgMarker.Shape.IconFont({
          // 参见 symbol引用, http://www.iconfont.cn/plus/help/detail?helptype=code
          symbolJs,
          icon,
          size: 100,
          offset: [-50, -78]
        }),
        {
          map: this.mapObj,
          position,
          showPositionPoint: {
            color: 'orange'
          }
        }
      )
    })
  }

  //  起始点终点图标位置
  custIcon(type) {
    const opt = {}

    switch (type) {
      case 'start':
        opt.image = '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png'
        opt.size = new AMap.Size(25, 34)
        opt.imageOffset = new AMap.Pixel(-9, -3)
        opt.imageSize = new AMap.Size(135, 40)
        break
      case 'end':
        opt.image = '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png'
        opt.size = new AMap.Size(25, 34)
        opt.imageOffset = new AMap.Pixel(-95, -3)
        opt.imageSize = new AMap.Size(135, 40)
        break
      case 'car':
        opt.image = img // 'src/assets/images/icon-car-y.png'
        opt.size = new AMap.Size(20, 16)
        opt.imageOffset = new AMap.Pixel(0, 0)
        opt.imageSize = new AMap.Size(20, 16)
        break
      default:
        ''
    }
    return new AMap.Icon(opt)
  }

  /**
   *
   * @param {*} param0
   */
  addMarkers({ iconType, icon, ponitList, notToMap = false, clickCall, labelCotent }) {
    const points = this.disposeData(ponitList)
    // 将 icon 传入 marker
    const markers = []
    if (iconType) {
      icon = this.custIcon(iconType)
    }
    points.forEach((item, index) => {
      const _marker = new AMap.Marker({
        position: new AMap.LngLat(item[0], item[1]),
        icon
      })
      const { originalPoints } = this

      if (clickCall) {
        // 点击marker点回调
        _marker.on('click', function(e) {
          clickCall(_marker, originalPoints[index], index)
        })
      }

      if (labelCotent === 'vehicleNumber') {
        _marker.setLabel({
          offset: new AMap.Pixel(-20, -32), // 设置文本标注偏移量
          content: `<div class='info'>${ponitList[index].vehicleNumber}</div>`, // 设置文本标注内容
          direction: 'right' // 设置文本标注方位
          // anchor
        })
      }

      markers.push(_marker)
    })

    if (!notToMap) {
      this.mapObj.add(markers)
    }

    return markers
  }

  /**
   * [controlgaode 添加高德地图控件]
   * @return {[type]} [description]
   */
  addMapControl(arg) {
    let opt = {
      isToolBar: true,
      isScale: true,
      isMapType: true
    }
    if (typeof arg === 'object') {
      opt = { ...opt, ...arg }
    } else if (typeof arg === 'boolean') {
      for (const key in opt) {
        if (opt.hasOwnProperty(key)) {
          opt[key] = arg
        }
      }
    }
    const that = this
    this.mapObj.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.MapType'], function() {
      // 平移等级缩放
      if (opt.isToolBar) {
        const ToolBar = new AMap.ToolBar({ position: 'RB', offset: new AMap.Pixel(0, 24) })
        that.mapObj.addControl(ToolBar)
      }

      // 比例尺
      if (opt.isScale) {
        const scale = new AMap.Scale({ position: 'RB', offset: new AMap.Pixel(40, 30) })
        that.mapObj.addControl(scale)
      }

      // 地图类型
      if (opt.isMapType) {
        const type = new AMap.MapType({ defaultType: 0 })
        that.mapObj.addControl(type)
      }
    })
  }

  addInfoWindow() {
    // var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) })
    // opts.infoWindow.setContent(info.join("<br/>"));
    // opts.infoWindow.setPosition(marker.getPosition());
    // opts.infoWindow.open(opts.mapObj, marker.getPosition());
  }

  resetCluster() {
    if (this.clusterer) {
      this.clusterer.clearMarkers()
    }
  }

  /**
   * 聚合
   */
  markerClusterer(ponitList, clickCall) {
    const _markers = this.addMarkers({
      notToMap: true,
      ponitList,
      clickCall,
      iconType: 'car',
      labelCotent: 'vehicleNumber'
    })
    const that = this
    if (!this.clusterer) {
      this.mapObj.plugin(['AMap.MarkerClusterer'], function() {
        that.clusterer = new AMap.MarkerClusterer(that.mapObj, _markers, {
          gridSize: 100,
          minClusterSize: 2,
          averageCenter: true,
          maxZoom: 15
        })
      })
    } else {
      this.clusterer.addMarkers(_markers)
    }
    this.mapObj.setFitView()
  }
}
