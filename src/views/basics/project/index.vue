<!--
 * @Author: your name
 * @Date: 2020-05-26 09:18:43
 * @LastEditTime: 2020-05-27 09:10:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gswl-web\src\views\basics\project\index.vue
-->
<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline"
              @keyup.enter.native="loadData">
        <a-row :gutter="24">
          <a-col :md="6"
                 :sm="12">
            <a-form-item label="项目名称：">
              <a-input placeholder="请输入项目名称"
                       v-model="queryParam.projectName"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6"
                 :sm="12">
            <a-form-item label="项目类型：">
              <j-dict-select-tag dictCode="project_type"
                                 style="width: 100%"
                                 v-model="queryParam.projectType"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :md="6"
                 :sm="8">
            <span style="float: left;overflow: hidden;"
                  class="table-page-search-submitButtons">
              <a-button type="primary"
                        @click="loadData"
                        icon="search">查询</a-button>
              <a-button type="default"
                        @click="loadData"
                        icon="reload"
                        style="margin-left: 8px">重置</a-button>
              <!-- <a-button type="default"
                        @click="loadData"
                        icon="reload"
                        style="margin-left: 8px">导出</a-button> -->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 操作按钮区域 -->
    <div class="table-operator"
         style="border-top: 5px;margin-top:8px">
      <a-button @click="handleAdd()"
                type="primary">新增</a-button>
    </div>

    <!-- table区域 -->
    <div>
      <!-- table区域-begin -->

      <a-table ref="table"
               bordered
               size="middle"
               rowKey="id"
               :columns="columns"
               :scroll="{ x: true }"
               :dataSource="dataSource"
               :pagination="ipagination"
               table-layout="auto"
               :loading="loading"
               @change="handleTableChange">
        <span slot="number"
              slot-scope="text, record,index">{{(ipagination.current-1)*ipagination.pageSize+index+1}}</span>
        <span slot="action"
              slot-scope="text, record">
          <a @click="handleEdit(record)">修改</a>
          <a-divider type="vertical"></a-divider>
          <a @click="handleDetail(record)">详情</a>
        </span>
      </a-table>
    </div>

    <!-- table区域-end -->
    <project-modal ref="modalForm" @ok="modalFormOk"></project-modal>
  </a-card>
</template>
<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { projectManagerTable, projectUrl } from './const.js'
import store from '@/store/'
import projectModal from './projectModal'
export default {
  name: '',
  mixins: [JeecgListMixin],
  components: { projectModal },
  data() {
    return {
      columns: projectManagerTable(),
      url: projectUrl(),
      userType: store.getters.userType,
      rowClick: record => ({
        on: {
          dblclick: () => {}
        }
      })
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="less">
// @import url('./article.less');
</style>
