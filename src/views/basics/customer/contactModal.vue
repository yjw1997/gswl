<!--
 * @Description:
 * @Date: 2020-03-16 17:15:06
 * @LastEditors: 自己洗小红花
 * @LastEditTime: 2020-03-17 10:54:10
 -->
<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="close"
    :okButtonProps="{ props: { disabled: disableSubmit } }"
    cancelText="关闭"
    okText="提交"
    style="top:20px;"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="单位全称：" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
          <a-input placeholder="请输入单位名称" v-decorator="['contactsName', validatorRules.contactsName]" />
        </a-form-item>
        <a-form-item label="联系人：" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
          <a-input placeholder="请输入联系人" v-decorator="['linkName', validatorRules.linkName]" />
        </a-form-item>
        <a-form-item label="联系电话：" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
          <a-input placeholder="请输入联系电话" v-decorator="['linkPhone', validatorRules.linkPhone]" />
        </a-form-item>
        <a-form-item label="所在城市：" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <v-distpicker
            @selected="onSelected"
            v-decorator="['countryAddr', validatorRules.countryAddr]"
            :province="select.province"
            :city="select.city"
            :area="select.area"
          ></v-distpicker>
        </a-form-item>

        <a-form-item label="详细地址：" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
          <a-input placeholder="请输入详细地址" v-decorator="['detailAddr', validatorRules.detailAddr]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>
<script>
import pick from 'lodash.pick'
import { basicsApi } from '@api/basics'
// import api from '@/api/index'
import VDistpicker from 'v-distpicker'
import { isPhoneOrMobileByForm } from '@/utils/validate'
// import { log } from 'util'

export default {
  name: '',
  components: {
    VDistpicker
  },
  data() {
    return {
      select: {},
      title: '',
      confirmLoading: false,
      visible: false,
      model: {},
      disableSubmit: false,
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      validatorRules: {
        contactsName: {
          rules: [
            {
              required: true,
              message: '请输入单位全称!'
            }
          ]
        },
        linkName: {
          rules: [
            {
              required: true,
              message: '请输入联系人!'
            }
          ]
        },
        linkPhone: {
          rules: [
            {
              required: true,
              message: '请输入联系电话!'
            },
            { validator: isPhoneOrMobileByForm }
          ]
        },
        countryAddr: {
          rules: [
            {
              required: true,
              message: '请选择所在城市!'
            }
          ]
        },
        detailAddr: {
          rules: [
            {
              required: true,
              message: '请输入详细地址!'
            }
          ]
        }
      }
    }
  },

  methods: {
    // -------------------表单联动---------------------
    onSelected(data) {
      this.form.setFieldsValue({
        countryAddr: data.province.value + '-' + data.city.value + '-' + data.area.value
      })

      this.model.countryAddr = data.province.value + '-' + data.city.value + '-' + data.area.value
      this.model.countryCode = data.province.code + ',' + data.city.code + ',' + data.area.code

      const address = this.model.countryAddr.split('-')

      this.select = {
        province: address[0],
        city: address[1],
        area: address[2]
      }
    },
    edit(record) {
      this.select = {}
      this.visible = true
      this.model = Object.assign({ delFlag: 0 }, record)
      if (this.model.countryAddr) {
        const address = this.model.countryAddr.split('-')

        this.select = {
          province: address[0],
          city: address[1],
          area: address[2]
        }
      }

      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'contactsName',
            'linkName',
            'linkPhone',
            'countryAddr',
            'detailAddr',
            'contactsType',
            'customerId'
          )
        )
      })
    },
    close() {
      this.visible = false
      this.confirmLoading = false
      this.model = {}
      this.select = {}
      this.form.resetFields()
      this.disableSubmit = false
    },
    handleSubmit() {
      // 触发表单验证
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.confirmLoading = true
          const formData = Object.assign(this.model, values)
          let res = {}
          if (this.title === '编辑') {
            console.log(formData)
            res = await basicsApi.editcontactMessage(formData)
          } else {
            res = await basicsApi.addContact(formData)
          }
          this.confirmLoading = false
          if (res.success) {
            this.$message.success(res.message)
            this.$emit('ok')
            this.close()
          } else {
            this.$message.warning(res.message)
          }
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
/deep/ .ant-input-disabled {
  color: black;
}
</style>
