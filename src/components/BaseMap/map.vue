<!--
 * @Author: your name
 * @Date: 2020-05-22 13:00:47
 * @LastEditTime: 2020-05-25 18:49:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gswl-web\src\components\BaseMap\map.vue
-->
<template>
  <div :id="mapId" class="map-container" width="100%" height="100%"></div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图

let mapObj = {}

export default {
  name: 'BaseMap',
  components: {},
  props: {
    options: {
      // 地图基础信息
      type: Object,
      default: () => {}
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    }
  },

  data() {
    return {
      mapId: 'map_' + new Date().getTime()
    }
  },
  mounted() {
    this.init()
    //  地图轨迹信息
  },
  methods: {
    init() {
      // 基本地图加载
      if (this.options && this.options.id) {
        this.mapId = this.options.id
      }
      mapObj = new AMap.Map(this.mapId, {
        resizeEnable: true,
        zoom: 13, // 地图显示的缩放级别

        ...this.options
      })
    },
    getMapObj() {
      return mapObj
    }
  }
}
</script>

<style>
.map-container {
  width: 100%;
  height: 100%;
  min-height: 100px;
}

/* .amap-icon img {
  width: 25px;
  height: 34px;
} */

.amap-marker-label {
  border: 0;
  background-color: transparent;
}

.amap-marker-label .info {
   padding: 0.4rem 0.6rem;
  border-radius: 0.25rem;
  background-color: white;
  width: auto;
  border-width: 0;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
  min-width: 0;
}

.amap-marker-label::after{
    content:'';
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 10px solid #fff;
   position: relative;
   top:10px;

}

.amap-icon{
 cursor: pointer;
 box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
 background: #fff;
}
</style>
