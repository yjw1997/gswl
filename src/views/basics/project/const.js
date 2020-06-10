/*
 * @Author: your name
 * @Date: 2020-05-26 09:18:49
 * @LastEditTime: 2020-05-27 09:09:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gswl-web\src\views\project\const.js
 */
import moment from 'moment'
import { filterDictText, initDictOptions } from '@/components/dict/JDictSelectUtil'
import { tooltip } from 'ant-design-vue'

export const projectManagerTable = () => {
  let dict = {}
  initDictOptions('project_type').then(res => {
    if (res.success) {
      dict = res.result
    }
  })
  return [
    {
      title: '序号',
      align: 'center',
      ellipsis: true,
      dataIndex: 'id',
      scopedSlots: {
        customRender: 'number'
      }
    },
    {
      title: '项目名称',
      align: 'center',
      dataIndex: 'projectName'
    },
    {
      title: '项目类型',
      align: 'center',
      dataIndex: 'projectType',
      customRender: text => {
        // 字典值替换通用方法
        return filterDictText(dict, text)
      }
    },
    {
      title: '客户名称',
      align: 'center',
      ellipsis: true,
      dataIndex: 'customerName'
    },
    {
      title: '客户费率%',
      align: 'center',
      ellipsis: true,
      dataIndex: 'customerRate',
      sorter: (a, b) => a.customerRate - b.customerRate
    },
    {
      title: '承运商名称',
      align: 'center',
      ellipsis: true,
      dataIndex: 'carrierName'
    },
    {
      title: '承运商费率%',
      align: 'center',
      ellipsis: true,
      dataIndex: 'carrierRate',
      sorter: (a, b) => a.carrierRate - b.carrierRate
    },
    {
      title: '项目负责人',
      align: 'center',
      ellipsis: true,
      dataIndex: 'projectLeader'
    },
    {
      title: '创建人',
      align: 'center',
      ellipsis: true,
      dataIndex: 'createBy'
    },
    {
      title: '创建时间',
      align: 'center',
      ellipsis: true,
      dataIndex: 'createTime',
      sorter: (a, b) => moment(a['createTime']).valueOf() - moment(b['createTime']).valueOf()
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'action',
      ellipsis: true,
      scopedSlots: {
        customRender: 'action'
      }
    }
  ]
}
export const projectUrl = () => {
  return {
    list: '/rate/gswlBaseProject/list',
    add: '/rate/gswlBaseProject/add',
    edit: '/rate/gswlBaseProject/edit'
  }
}
export const recordingColumnsData = () => {
  return [
    {
      title: '序号',
      align: 'center',
      ellipsis: true,
      dataIndex: 'id',
      width: 50,
      scopedSlots: {
        customRender: 'number'
      }
    },
    {
      title: '时间',
      align: 'center',
      ellipsis: true,
      dataIndex: 'createTime'
    },
    {
      title: '人员',
      align: 'center',
      ellipsis: true,
      dataIndex: 'createBy'
    },
    {
      title: '操作',
      align: 'center',
      ellipsis: true,
      dataIndex: 'action'
    },
    {
      title: '修改记录',
      align: 'center',
      ellipsis: true,
      dataIndex: 'dataRecord',
      scopedSlots: {
        customRender: 'dataRecord'
      }
      // customRender: (text, record) => {
      //   return (
      //     <tooltip placement='top'>
      //       <template slot='title'>
      //         <span>{{ text }}</span>
      //       </template>
      //       <div style='width:120px;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;'>{{ text }}</div>
      //     </tooltip>
      //   )
      // }
    }
  ]
}
