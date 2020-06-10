<template>
  <div :class="isFull ? 'fullscreen' : ''">
    <div class="top-row">
      <a-row>
        <a-col :span="5"
          >
          <div class="blue-font">
            {{ totalTruck.totalNumber || 0 }}
            </div>
          车辆总数</a-col
        >
        <a-col :span="5"
          ><div class="blue-font">{{ totalTruck.transNumber || 0 }}</div>
          在途车辆</a-col
        >
        <a-col :span="5"
          ><div class="blue-font">{{ totalTruck.waitNumber || 0 }}</div>
          待发车辆</a-col
        >
        <a-col :span="5"
          ><div class="blue-font">{{ totalTruck.freeNumber || 0 }}</div>
          空闲车辆</a-col
        >
        <a-col :span="4" style="text-align:right;padding-right:20px">
          <div class="fullScreen-btn" @click="handlerFullScreen">
            <a-icon :type="isFull ? 'fullscreen-exit' : 'fullscreen'" />
            <span>{{ isFull ? '退出全屏' : '全屏' }}</span>
          </div>
          <span style="padding:0 10px">|</span>
          <div class="flash-btn" @click="init">
            <a-icon type="sync" />
            <span>刷新</span>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="main">
      <div  style="margin-top:10px;" :class="showLeft ? 'left on' : 'left off'">
        <a-button  type="primary" :icon="showLeft ? 'arrow-left' : 'arrow-right'" class="left-close-btn" @click="handlerShowLeft"></a-button>
        <echartsWatch class="chart-box" :model="mode" :refresh="refresh"/>
        <echartsBuildingArea class="chart-box"  :refresh="refresh"></echartsBuildingArea>

      </div>

      <div class="right">
         <a-spin size="large" :spinning="loadingDetial"  style="position: absolute;top:50%;left:64%;z-index:1100" />
        <base-map ref="baseMap" :options="mapOptions" />

      </div>

      <a-drawer
        title="车辆信息"
        :visible="visible"
        v-if="visible"
        :mask="false"
        :width="400"
        wrapClassName="drawer-container"
        @close="
          () => {
            visible = false
          }
        "
      >
      <ul class="drawer-list">
        <li>车牌号：<span class="text">{{truckInfo.vehicleNumber}}</span></li>
        <li>车籍地：<span class="text">{{truckInfo.vehicleRegistrationAddr}}</span></li>
        <li>车型：<span class="text">{{truckInfo.vehicleType}}</span></li>
        <li>核载吨位：<span class="text">{{truckInfo.vehicleTonnage?truckInfo.vehicleTonnage:'吨'}} </span></li>
        <li>定位时间：<span class="text">{{truckInfo.locateTime}}</span></li>
        <li>接受时间：<span class="text">{{truckInfo.receivedTime}}</span></li>
        <li>经纬度：<span class="text">{{truckInfo.longLatitude}}</span></li>
        <li>车辆时速：<span class="text">{{truckInfo.speed?truckInfo.speed+'km/h':''}} </span></li>
        <li>行驶方向：<span class="text">{{truckInfo.directionText}}</span></li>
        <li>累计里程：<span class="text">{{truckInfo.mileage?truckInfo.mileage:'km'}}</span></li>
        <li>报警：<span class="text">{{truckInfo.alarmNames}}</span></li>
        <li>传感器速度值：<span class="text">{{truckInfo.senseSpeed}}</span></li>
        <li style="display:flex"><div style="width:72px">位置信息：</div><div style="flex:1" class="text">{{truckInfo.address}}</div></li>
      </ul>
      </a-drawer>
    </div>
  </div>
</template>
<script>
import { baseMap, MapService } from '@/components/BaseMap/index'
import echartsBuildingArea from '@/components/charts/pie/echartsBuildingArea'
import echartsWatch from '@/components/charts/pie/echartsWatch'
import { queryTrucks, queryStatisticsVehicle, queryVehicleInfo } from '@/api/onlineTruck'

let MapObj = {}
export default {
  name: '',
  mixins: [],
  components: { baseMap, echartsBuildingArea, echartsWatch },
  data() {
    return {
      isFull: false,
      visible: false,
      showLeft: true,
      totalTruck: {},
      truckInfo: {},
      loadingDetial: false,
      mode: {},
      mapOptions: { zoom: 5 },
      refresh: false
    }
  },
  mounted() {
    // 地图初始化
    MapObj = new MapService(this.$refs.baseMap.getMapObj(), { level: 11 })
    MapObj.addMapControl()
    // 初始化数据
    this.init()
  },
  watch: {
    '$route.name'(n) {
      this.visible = false
    }
  },
  methods: {
    init() {
      // 获取数据
      MapObj.resetCluster()
      this.getTrucks()
      this.getStatisticsVehicle()
      this.refresh = !this.refresh
    },
    async clickMarker(points, info) {
      // 待添加

      const { vehicleNo } = info
      // console.log(info)"闽KSLSKD黄"
      this.loadingDetial = true
      const { result } = await queryVehicleInfo({ vehicleNo })
      this.loadingDetial = false
      if (result) {
        this.truckInfo = result
        this.visible = true
      } else {
        this.$message.error('未查询到数据')
      }
    },
    handlerShowLeft() {
      this.showLeft = !this.showLeft
    },

    async getTrucks() {
      const { result } = await queryTrucks()
      if (result) {
        MapObj.markerClusterer(result, this.clickMarker)
      }
    },

    async getStatisticsVehicle() {
      const { result } = await queryStatisticsVehicle()
      if (result) {
        this.totalTruck = result
      }
    },

    handlerFullScreen() {
      if (this.isFull) {
        // 退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        // 进入全屏
        const main = document.body
        if (main.requestFullscreen) {
          main.requestFullscreen()
          main.requestFullscreen()
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen()
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen()
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen()
        }
      }

      this.isFull = !this.isFull
    }
  }

}
</script>
<style scoped lang="less">
@import url('./index.less');

</style>
