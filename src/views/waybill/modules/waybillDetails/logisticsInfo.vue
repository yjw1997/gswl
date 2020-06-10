<!--
 * @Description:
 * @Date: 2020-03-31 08:58:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-09 15:39:38
 -->
<template>
  <div>
    <a-steps :current="current">
      <a-step
        v-for="item in logisticsInfo"
        :key="item.id"
        :title="item.action"
        :description="item.createTime"
      />
    </a-steps>
    <a-divider></a-divider>
    <div>
      <div class="stepTime">
        <div class="stepTimes" v-for="item in logisticsInfo" :key="item.id">{{item.createTime}}</div>
      </div>
      <a-steps class="stepCon" :current="current" direction="vertical" size="small">
        <a-step v-for="item in logisticsInfo" :key="item.id" :description="item.operaInfo" />
      </a-steps>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    logisticsInfo: {
      type: Array,
      required: true
    }
  },
  components: {},
  data() {
    return {
      current: 0,
      steps: []
    }
  },
  mounted() {
    this.current = this.logisticsInfo.length - 1
  },
  methods: {
  }
}
</script>
<style scoped lang="less">
.stepTime {
  width: 140px;
  display: inline-block;
  float: left;
  text-align: right;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.447058823529412);
}
.stepTimes {
  display: block;
  height: 48px;
}
.stepCon {
  width: 80%;
  display: inline-block;
}
</style>
