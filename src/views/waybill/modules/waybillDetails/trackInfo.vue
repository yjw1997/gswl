<template>
  <a-spin tip="地图资源加载中Loading..."
          :spinning="spinning">
    <!-- <div id="container"></div> -->
    <base-map style="height: calc(100vh - 230px);" ref="baseMap"   :option="options"  />
    <a-card id="panel">
      <div slot="cover"
           class="cover">
        <div>
          {{baseInfo.consigneeAddr.split("-")[0]}}
          <div class="city">{{baseInfo.consigneeAddr.split("-")[1]}}</div>
        </div>
        <div class="pro">--{{baseInfo.distance}}m--</div>
        <div>
          {{baseInfo.consignorAddr.split("-")[0]}}
          <div class="city">{{baseInfo.consignorAddr.split("-")[1]}}</div>
        </div>
      </div>
      <div class="contant">
        <div>司机：{{baseInfo.gswlWaybill.driverName}} {{baseInfo.gswlWaybill.driverPhone}}</div>
        <div>车辆：{{baseInfo.gswlWaybill.vehicleNo}} </div>
        <div>货物：重量{{baseInfo.totalWeight}}吨 数量{{baseInfo.totalNumber}}件 体积{{baseInfo.totalCube}}m³</div>
        <div>运费：{{baseInfo.gswlWaybill.freight}}元</div>
      </div>
    </a-card>
  </a-spin>
</template>

<script>
import { baseMap, MapService } from '@/components/BaseMap/index'
export default {
  components: {
    baseMap
  },
  props: {
    baseInfo: {
      type: Object | Array,
      required: true
    },
    trackInfo: {
      type: Object | Array,
      required: true
    },
    spinning: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    if (this.spinning) return
    this.init()
  },
  data() {
    return {
      waypoint: [],
      options: {}
    }
  },
  watch: {
    spinning: {
      handler(newVal, oldVal) {
        if (!newVal) {
          this.init()
        }
      }
    }
  },
  methods: {
    init() {
      //   地址处理
      this.waypoint = this.trackInfo
      const maps = new MapService(this.$refs.baseMap.getMapObj())
      maps.addLineWithGaode({
        waypoint: this.waypoint
      })
      maps.addMapControl()
      maps.markerClusterer(this.waypoint)
      if (this.waypoint.length === 0) return
      this.options = { center: [this.waypoint[0].longitude, this.waypoint[0].latitude] }
    }
  }
}
</script>
<style scoped lang="less">
#container {
  width: 100%;
  height: 400px;
}
#panel {
  position: absolute;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 0px;
  right: 0px;
  text-align: center;
}
#panel .amap-call {
  background-color: #009cf9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}
.cover {
  font-size: 16px;
  font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
  font-weight: 650;
  div {
    display: inline-block;
  }
  .pro {
    display: inline-block;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.447058823529412);
    padding: 0px 15px;
  }
  .city {
    display: inline-block;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.447058823529412);
  }
}
.contant {
  text-align: left;
  div {
    margin: 10px 0px;
  }
}
</style>
