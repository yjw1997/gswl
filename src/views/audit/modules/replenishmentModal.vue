<!--
 * @Author: your name 订单批量补录
 * @Date: 2020-04-27 18:45:38
 * @LastEditTime: 2020-05-29 10:43:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gswl-web\src\views\audit\modules\replenishmentModal.vue
 -->
<template>
  <a-modal title="订单批量补录"
           :width="800"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleSubmit"
           okText="确定"
           @cancel="handleCancel"
           cancelText="关闭"
           style="top:20px;">
    <a-form :layout="layout">
      <!-- <a-form-item label="客户单位：">
        <a-select showSearch
                  allowClear
                  placeholder="请输入客户单位"
                  optionFilterProp="children"
                  v-model="customerId">
          <a-select-option v-for="(role, roleindex) in roleList"
                           :key="roleindex.toString()"
                           :value="role.customerId ? role.customerId : role.id ">{{ role.customerName }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="公司名称：">
        <a-select showSearch
                  allowClear
                  placeholder="请输入公司名称"
                  optionFilterProp="children"
                  v-model="companyId">
          <a-select-option v-for="(role) in companyList"
                           :key="role.id"
                           :value="role.id">{{ role.carrierName }}</a-select-option>
        </a-select>
      </a-form-item> -->
      <a-form-item label="项目名称">
        <a-select showSearch
                  placeholder="请输入项目名称"
                  optionFilterProp="children"
                  v-model="projectId">
          <a-select-option v-for="role in projectList"
                           :key="role.id"
                           :value="role.id ">{{ role.projectName }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="导入Excel："
                   class="import">
        <a-upload name="file"
                  :action="url.importSupplement"
                  :multiple="false"
                  accept=".xls,.xlsx"
                  :fileList="fileList"
                  :remove="handleRemove"
                  :beforeUpload="beforeUpload">
          <a-button>
            <a-icon type="upload" />
            选择导入文件
          </a-button>
        </a-upload>
        <span slot="footer">
          <a-button type="primary"
                    :disabled="fileList.length === 0"
                    :loading="uploading">
            {{ uploading ? '上传中...' : '开始上传' }}
          </a-button>
        </span>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { httpHeaderAction, getAction } from '@/api/manage'
import JImportModal from '@/components/jeecg/JImportModal'
import api from '../const'

export default {
  name: 'reviewModal',
  components: { JImportModal },
  data() {
    return {
      url: api.url,
      visible: false,
      confirmLoading: false,
      confirmDirty: false,
      loading: false,
      batchNo: '',
      label: 12,
      companyList: [],
      layout: 'horizontal',
      roleList: [],
      projectId: '',
      uploading: false,
      fileList: [],
      projectList: []
    }
  },

  methods: {
    show() {
      //  项目名称下拉列表
      getAction('/rate/gswlBaseProject/queryProjectByName', { projectName: '' }).then(res => {
        if (res.success) {
          this.projectList = res.result
        }
      })
      this.visible = true
    },
    beforeUpload(file) {
      this.fileList = [file]
      console.log('this.fileList', this.fileList)

      return false
    },
    close() {
      this.$emit('close')
      this.visible = false
      this.disableSubmit = false
      this.batchNo = ''
      this.companyList = []
      this.roleList = []
      this.customerId = ''
      this.companyId = ''
      this.fileList = []
    },

    handleSubmit() {
      if (this.fileList.length === 0) {
        this.$message.warning('请导入excel')
        return
      }
      if (this.projectId === '') {
        this.$message.warning('请选择项目名称')
        return
      }
      this.confirmLoading = true
      const formData = new FormData()
      formData.append('file', this.fileList[0])
      httpHeaderAction(api.url.importSupplement + '?projectId=' + this.projectId, formData, 'post', {
        // 'Content-Type': 'multipart/form-data'
      })
        .then(res => {
          if (res.success) {
            this.$message.success(res.message)
            this.$emit('ok')
            this.close()
          } else {
            this.$message.warning(res.message)
          }
        })
        .finally(() => {
          this.confirmLoading = false
        })
      this.close()
    },

    handleCancel() {
      this.close()
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    }
  }
}
</script>
<style scoped lang="less">
/deep/ .ant-form-item-control-wrapper {
  width: 600px !important;
  display: inline-block !important;
}
.import /deep/.ant-form-item-label {
  float: left !important;
}
</style>
