
<template>
  <a-card :bordered="false">
    <!-- <a-button @click="handleEditNew"
                  type="primary"
                  style="margin-bottom:20px">修改</a-button> -->
    <a-form :form="form"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            v-if="userType === 'PT'">
      <a-form-item label="企业名称">
        <a-input v-decorator="['carrierName']"
                 :disabled="true"></a-input>
      </a-form-item>
      <a-form-item label="企业简称">
        <a-input v-decorator="['shortName']"
                 :disabled="true"></a-input>
      </a-form-item>
      <a-form-item label="企业编号">
        <a-input v-decorator="['carrierCode']"
                 :disabled="true"></a-input>
      </a-form-item>
      <a-form-item label="联系人">
        <a-input v-decorator="['linkName']"
                 :disabled="true"></a-input>
      </a-form-item>
      <a-form-item label="联系电话">
        <a-input v-decorator="['linkPhone']"
                 :disabled="true"></a-input>
      </a-form-item>
      <a-form-item label="企业地址">
        <a-input v-decorator="['officeAddr']"
                 :disabled="true"></a-input>
      </a-form-item>
    </a-form>
    <a-row>

      <a-form :form="form"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              v-if="userType === 'HZ'">
        <a-row>
          <a-col>
            <a-form-item label="单位全称">
              <a-input v-decorator="['customerName']"
                       :disabled="true" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-form-item label="单位简称">
              <a-input v-decorator="['shortName']"
                       :disabled="true" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-form-item label="单位编号">
              <a-input v-decorator="['customerCode']"
                       :disabled="true" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="span">
            <a-form-item label="联系人"
                         :labelCol="labelCol2"
                         :wrapperCol="wrapperCol2">
              <a-input v-decorator="['linkName']"
                       :disabled="true" />
            </a-form-item>

          </a-col>
          <a-col :span="span">
            <a-form-item label="联系电话"
                         :labelCol="labelCol2"
                         :wrapperCol="wrapperCol2">
              <a-input v-decorator="['linkPhone']"
                       :disabled="true" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="span">
            <a-form-item label="纳税人识别号"
                         :labelCol="labelCol2"
                         :wrapperCol="wrapperCol2">
              <a-input v-decorator="['actualId']"
                       :disabled="true" />
            </a-form-item>

          </a-col>
          <a-col :span="span">
            <a-form-item label="开户账号"
                         :labelCol="labelCol2"
                         :wrapperCol="wrapperCol2">
              <a-input v-decorator="['openingBankAccount']"
                       :disabled="true" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="span">
            <a-form-item label="开户名"
                         :labelCol="labelCol2"
                         :wrapperCol="wrapperCol2">
              <a-input v-decorator="['accountName']"
                       :disabled="true" />
            </a-form-item>

          </a-col>
          <a-col :span="span">
            <a-form-item label="开户行"
                         :labelCol="labelCol2"
                         :wrapperCol="wrapperCol2">
              <a-input v-decorator="['openingBank']"
                       :disabled="true" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="注册地址">
          <a-input v-decorator="['registerAddr']"
                   :disabled="true" />
        </a-form-item>
        <a-form-item label="所在城市"
                     :disabled="true">
          <a-input v-decorator="['countryAddr']"
                   :disabled="true" />
        </a-form-item>

        <a-form-item label="详细地址">
          <a-input v-decorator="['detailAddr']"
                   :disabled="true" />
        </a-form-item>
        <a-form-item label="企业费率(%)">
          <a-input v-decorator="['customerRate']"
                   suffix="%"
                   :disabled="true" />
        </a-form-item>
      </a-form>
    </a-row>

    <a-form :form="form"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
            v-if="userType === 'CYS'">
      <a-row>
        <a-col :span="span">
          <a-form-item label="企业全称">
            <a-input v-decorator="['carrierName']"
                     :disabled="true" />
          </a-form-item>

        </a-col>
        <a-col :span="span">
          <a-form-item label="企业简称">
            <a-input v-decorator="['shortName']"
                     :disabled="true" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="span">
          <a-form-item label="企业类型">
            <a-radio-group v-decorator="['enterpriseType']"
                           :disabled="true">
              <a-radio value="0">小规模纳税人</a-radio>
              <a-radio value="1">一般纳税人</a-radio>
            </a-radio-group>
          </a-form-item>

        </a-col>
        <a-col :span="span">
          <a-form-item label="业务类型">
            <a-radio-group v-decorator="['carrierType']"
                           :disabled="true">
              <a-radio value="0">开票</a-radio>
              <a-radio value="1">常规</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="span">
          <a-form-item label="企业编码">
            <a-input v-decorator="['carrierCode']"
                     :disabled="true" />
          </a-form-item>

        </a-col>
        <a-col :span="span">
          <a-form-item label="联系人">
            <a-input v-decorator="['linkName']"
                     :disabled="true" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="span">
          <a-form-item label="联系电话">
            <a-input v-decorator="['linkPhone']"
                     :disabled="true" />
          </a-form-item>

        </a-col>
        <a-col :span="span">
          <a-form-item label="企业地址">
            <a-input v-decorator="['registerAddr']"
                     :disabled="true" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :span="24">
        <a-col :span="span">
          <a-form-item label="营业执照号：">
            <a-input v-decorator="['companyBusinessLicense']"
                     :disabled="true" />
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item label="法定代表人：">
            <a-input v-decorator="['legalPerson']"
                     :disabled="true" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :span="24">
        <a-col :span="span">
          <a-form-item label="法定代表人电话：">
            <a-input v-decorator="['legalerTel']"
                     :disabled="true" />
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item label="注册资本：">
            <a-input v-decorator="['registerMoney']"
                     :disabled="true" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :span="24">
        <a-col :span="span">
          <a-form-item label="成立日期：">
            <j-date
                :trigger-change="true"
                v-decorator="['foundTime']"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width:100%"
                :showTime="true"
                :disabled="title == '详情'"
              ></j-date>
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item label="统一社会信用代码：">
            <a-input v-decorator="['actualCarrierId']"
                     :disabled="true" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :span="24">
        <a-col :span="span">
          <a-form-item label="纳税人识别号：">
            <a-input v-decorator="['taxpayer']"
                     :disabled="true" />
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item label="运输经营许可证号：">
            <a-input v-decorator="['actualCarrierBusinessLicense']"
                     :disabled="true" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :span="24">
        <a-col :span="span">
          <a-form-item label="经营范围：">
            <a-input v-decorator="['busiScope']"
                     :disabled="true" />
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item label="开户行：">
            <a-input v-decorator="['openingBank']"
                     :disabled="true" />
          </a-form-item>
        </a-col>

      </a-row>

      <a-row :span="24">
        <a-col :span="span">
          <a-form-item label="开户名称：">
            <a-input v-decorator="['accountName']"
                     :disabled="true" />
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item label="开户账号：">
            <a-input v-decorator="['openingBankAccount']"
                     :disabled="true" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :span="24">
        <a-col :span="span">
          <a-form-item label="运输经营许可证：">
            <JImageUpload v-model="model.businessLicenseImg"
                          :isMultiple="true"></JImageUpload>
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item label="营业执照：">
            <JImageUpload v-model="model.actualCarrierImg"
                          :isMultiple="true"></JImageUpload>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :span="24">
        <a-col :span="span">
          <a-form-item label="企业费率">
            <a-input v-decorator="['carrierRate']"
                     suffix="%"
                     :disabled="true" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <companny-modal ref="modalForm"
                    @ok="modalFormOk"></companny-modal>
  </a-card>
</template>
<script>
import { getAction } from '@/api/manage'
import CompannyModal from './modules/companyModal'
import api from '@/api/index'
import store from '@/store/'
import pick from 'lodash.pick'
import JDate from '@/components/jeecg/JDate'
import JImageUpload from '../../waybill/modules/waybillDetails/JImageUpload'
export default {
  name: '',
  components: { CompannyModal, JImageUpload, JDate },
  data() {
    return {
      carrierName: '',
      shortName: '',
      carrierCode: '',
      linkName: '',
      linkPhone: '',
      officeAddr: '',
      recordParams: '',
      form: this.$form.createForm(this),
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      },
      labelCol2: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol2: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      userType: store.getters.userType,
      url: api.systemSttings,
      span: 12,
      title: '详情'
    }
  },
  mounted() {
    getAction('/carrier/gswlBaseCarrier/queryCompanyInfo', {}).then(res => {
      if (res.success) {
        this.recordParams = res.result
        this.model = res.result
        console.log('model', this.model)

        if (this.userType === 'PT') {
          this.$nextTick(() => {
            this.form.setFieldsValue(
              pick(this.model, 'carrierName', 'shortName', 'carrierCode', 'linkName', 'linkPhone', 'officeAddr')
            )
          })
        } else if (this.userType === 'HZ') {
          this.model.customerRate = this.model.customerRate ? this.model.customerRate * 100 : '0'
          this.$nextTick(() => {
            this.form.setFieldsValue(
              pick(
                this.model,
                'customerName',
                'shortName',
                'customerCode',
                'linkName',
                'linkPhone',
                'actualId',
                'openingBankAccount',
                'accountName',
                'openingBank',
                'registerAddr',
                'countryAddr',
                'cityAddr',
                'customerRate',
                'officeAddr',
                'detailAddr'
              )
            )
          })
        } else if (this.userType === 'CYS') {
          this.model.carrierRate = this.model.carrierRate ? this.model.carrierRate * 100 : '0'
          this.$nextTick(() => {
            this.form.setFieldsValue(
              pick(
                this.model,
                'carrierName',
                'shortName',
                'carrierCode',
                'linkName',
                'linkPhone',
                'registerAddr',
                'enterpriseType',
                'carrierType',
                'carrierRate',
                'companyBusinessLicense',
                'legalPerson',
                'legalerTel',
                'registerMoney',
                'foundTime',
                'actualCarrierId',
                'taxpayer',
                'actualCarrierBusinessLicense',
                'busiScope',
                'openingBank',
                'accountName',
                'openingBankAccount',
              )
            )
          })
        }
      }
      if (res.code === 510) {
        this.$message.warning(res.message)
      }
      this.loading = false
    })
  },
  methods: {
    handleEditNew() {
      this.$refs.modalForm.edit(this.recordParams)
      this.$refs.modalForm.title = '编辑'
      this.$refs.modalForm.disableSubmit = false
    },
    modalFormOk() {}
  }
}
</script>
<style scoped lang="less">
/deep/ .ant-input-disabled {
  color: black;
}
</style>
