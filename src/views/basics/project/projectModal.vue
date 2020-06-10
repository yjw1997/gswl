<!--
 * @Description:
 * @Date: 2020-03-10 14:58:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-26 18:07:55
 -->
<template>
  <a-modal :title="title"
           :width="1200"
           :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleSubmit"
           :okButtonProps="{ props: {disabled: disableSubmit} }"
           @cancel="close"
           cancelText="关闭"
           okText="提交"
           style="top:20px;">
    <a-spin :spinning="confirmLoading">
      <a-card :bordered="false">
        <a-form :form="form"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol">
          <a-row>
            <a-col :span="span">
              <a-form-item label="项目名称"
                           hasFeedback>
                <a-input placeholder="请输入物品名称"
                         :disabled="getPageStatus()"
                         v-decorator="[ 'projectName', validatorRules.projectName]" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="项目类型："
                           hasFeedback>
                <j-dict-select-tag :triggerChange="true"
                                   type="radio"
                                   :disabled="getPageStatus()"
                                   style="width:100%"
                                   dictCode="project_type"
                                   v-decorator="[ 'projectType', validatorRules.projectType]"
                                   placeholder="请选择物品类型"></j-dict-select-tag>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="span">
              <a-form-item label="客户单位："
                           has-feedback>
                <a-select showSearch
                          allowClear
                          :disabled="getPageStatus()"
                          placeholder="请输入客户单位"
                          style="width:100%"
                          optionFilterProp="children"
                          @change="roleListChange"
                          v-decorator="['customerId', validatorRules.customerId]">
                  <a-select-option v-for="(role, roleindex) in roleList"
                                   :key="roleindex.toString()"
                                   :value="role.customerId">{{ role.customerName }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="span">
              <a-form-item label="承运商："
                           has-feedback>
                <a-select showSearch
                          allowClear
                          :disabled="getPageStatus()"
                          placeholder="请输入公司名称"
                          optionFilterProp="children"
                          @change="companyListChange"
                          v-decorator="['carrierId', validatorRules.carrierId]">
                  <a-select-option v-for="role in companyList"
                                   :key="role.id"
                                   :value="role.id">{{
                  role.carrierName
                }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="span">
              <a-form-item label="客户费率"
                           has-feedback>
                <a-input :disabled="getPageStatus()"
                         addon-before="%"
                         v-decorator="[ 'customerRate', validatorRules.customerRate]" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="承运商费率"
                           has-feedback>
                <a-input :disabled="getPageStatus()"
                         addon-before="%"
                         v-decorator="[ 'carrierRate', validatorRules.carrierRate]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="span">
              <a-form-item label="项目负责人"
                           has-feedback>
                <a-input :disabled="getPageStatus()"
                         v-decorator="[ 'projectLeader', validatorRules.projectLeader]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="title === '详情'">
            <a-col :span="span">
              <a-form-item label="创建人"
                           has-feedback>
                <a-input :disabled="true"
                         v-decorator="[ 'projectBy']" />
              </a-form-item>
            </a-col>
            <a-col :span="span">
              <a-form-item label="创建时间"
                           has-feedback>
                <a-input :disabled="true"
                         v-decorator="[ 'createTime']" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-table v-if="title === '详情'"
               ref="table"
               bordered
               size="middle"
               :columns="columns"
               :scroll="{ y:200 }"
               :dataSource="dataSource"
               :pagination="false"
               rowKey="rowKey">
        <span slot="number"
              slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="dataRecord"
              slot-scope="text">
          <a-tooltip placement='top'>
            <template slot='title'>
              <span>{{ text }}</span>
            </template>
            <div style='overflow: hidden;white-space: nowrap;text-overflow:ellipsis;'>{{ text }}</div>
          </a-tooltip>
        </span>
      </a-table>

    </a-spin>

  </a-modal>
</template>
<script>
import pick from 'lodash.pick'
import JDate from '@/components/jeecg/JDate.vue'
import { recordingColumnsData, projectUrl } from './const'
import { postAction, getAction, putAction } from '@/api/manage'
export default {
  name: '',
  components: {
    JDate
  },
  data() {
    return {
      disableSubmit: false,
      title: '',
      confirmLoading: false,
      visible: false,
      model: {},
      url: projectUrl(),
      form: this.$form.createForm(this),
      span: 12,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      },
      validatorRules: {
        projectName: { rules: [{ required: true, message: '请输入!' }] },
        projectType: { rules: [{ required: true, message: '请输入!' }], initialValue: '0' },
        customerId: { rules: [{ required: true, message: '请输入!' }] },
        carrierId: { rules: [{ required: true, message: '请输入!' }] },
        customerRate: { rules: [{ required: true, message: '请输入!' }] },
        carrierRate: { rules: [{ required: true, message: '请输入!' }] },
        projectLeader: { rules: [{ required: true, message: '请输入!' }] }
      },
      roleList: [],
      companyList: [],
      columns: recordingColumnsData(),
      dataSource: []
    }
  },
  methods: {
    add() {
      this.edit({})
    },
    getPageStatus() {
      // 获取当前页面是否可以编辑
      if (this.title === '详情') {
        return true
      }
      return false
    },
    edit(record) {
      this.visible = true
      this.model = Object.assign({}, record)
      this.dataSource = this.model.projectLogList ? this.model.projectLogList : []
      this.initialRoleList()
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'projectName',
            'projectType',
            'customerId',
            'carrierId',
            'customerRate',
            'carrierRate',
            'projectLeader',
            'projectBy',
            'createTime'
          )
        )
      })
    },

    initialRoleList() {
      //  客户单位列表
      getAction('/rate/gswlBaseProject/getProjectCustomer', {}).then(res => {
        if (res.success) {
          this.roleList = res.result
        }
      })

      //  获取承运商名称
      getAction('/carrier/gswlBaseCarrier/queryCarrierByName', { carrierName: '' }).then(res => {
        if (res.success) {
          this.companyList = res.result
        }
      })
    },
    close() {
      this.visible = false
      this.confirmLoading = false
      this.model = {}
      this.form.resetFields()
    },
    handleSubmit() {
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true
          const that = this
          const formData = Object.assign(that.model, values)
          // eslint-disable-next-line no-console
          console.log('formData', formData)
          //  修改
          if (this.title === '编辑') {
            putAction(this.url.edit, formData)
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
            return
          }
          postAction(this.url.add, formData)
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
        }
      })
    },
    roleListChange(value) {
      const data = this.roleList.filter(item => item.customerId === value)[0]
      this.model.customerName = data.customerName
      this.form.setFieldsValue({
        customerRate: data.customerRate
      })
      this.model.customerRate = data.customerRate
    },
    companyListChange(value) {
      const data = this.companyList.filter(item => item.id === value)[0]
      this.model.carrierName = data.carrierName
      this.form.setFieldsValue({
        carrierRate: data.carrierRate
      })
      this.model.carrierRate = data.carrierRate
    }
  }
}
</script>
<style scoped lang="less">
/deep/ .ant-input-disabled {
  color: black;
}
</style>
