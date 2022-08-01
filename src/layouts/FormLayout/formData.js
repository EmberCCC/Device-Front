/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-02 03:21:54
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-01 11:22:50
 * @FilePath: \bl-device-manage-test\src\layouts\FormLayout\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import FormRender, { useForm } from 'form-render';
import { Button, Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { restore } from 'layouts/FormEdit/changeTool';
import './index.less'
import { getCheckArr } from './formUtil';
import { Self_divider } from 'layouts/FormEdit/self_item/self_divider';

const FormData = observer(({ HomeStore, FormStore, TableStore }) => {
  const [schema, setSchema] = useState({
    "type": "object",
    "properties": {},
    "labelWidth": 120,
    "displayType": "row"
  });
  const [data, setData] = useState({});
  const form = useForm();
  const formList = useForm()
  const onFinish = (formData) => {
    const { firstFormId } = HomeStore;
    let checkArr = getCheckArr(schema);
    let nData = formList.getValues()
    let newData = { ...formData, ...nData, ...data };
    if (TableStore.formEdit == false) {
      FormStore.setValue('formCopyVis', false)
      TableStore.setDataPageModalVis(false);
      if (checkArr.length == 0) {
        FormStore.submitData({ 'formId': firstFormId, 'data': newData }).then(() => {
          if (TableStore.model == 'subitAndManage') {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'myself')
          } else {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'all')
          }
        })
      } else {
        FormStore.submitData({ 'formId': firstFormId, 'data': newData, 'checkFieldIds': checkArr }).then(() => {
          if (TableStore.model == 'subitAndManage') {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'myself')
          } else {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'all')
          }
        })
      }
    } else {
      if (checkArr.length == 0) {
        FormStore.changeData({ 'formId': firstFormId, 'data': newData, 'dataId': toJS(TableStore.detailData['data']['id']) }).then(() => {
          TableStore.setValue('formEdit', false);
          TableStore.getOneData({ 'formId': HomeStore.firstFormId, 'dataId': toJS(TableStore.detailData['data']['id']) })
          if (TableStore.model == 'subitAndManage') {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'myself')
          } else {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'all')
          }
        })
      } else {
        FormStore.changeDataCheck({ 'formId': firstFormId, 'data': newData, 'dataId': toJS(TableStore.detailData['data']['id']), 'checkFieldIds': checkArr }).then(() => {
          TableStore.setValue('formEdit', false);
          TableStore.getOneData({ 'formId': HomeStore.firstFormId, 'dataId': toJS(TableStore.detailData['data']['id']) })
          if (TableStore.model == 'subitAndManage') {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'myself')
          } else {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'all')
          }
        })
      }

    }
    formList.resetFields();
    form.resetFields();
  }
  const handleCancel = () => {
    TableStore.setValue('formEdit', false);
  }
  useEffect(() => {
    FormStore.getFormField({ formId: HomeStore.firstFormId }).then(() => {
      setSchema(restore(toJS(FormStore.formField), 'submit'))
      console.log(toJS(FormStore.formField));
      const formData = JSON.parse(toJS(TableStore.formData)['formData'])
      formList.setValues(formData);
      form.setValues(formData);
    });
  }, [])
  const getItem = () => {
    let nArr = []
    for (const key in schema) {
      if (Object.hasOwnProperty.call(schema, key)) {
        const element = schema[key];
        if (key != 'root') {
          let iObj = {}
          iObj['name'] = key
          iObj['schema'] = element
          nArr.push(iObj);
        }
      }
    }
    return (
      nArr.map((item, index) => {
        return (
          <Tabs.TabPane tab={item['name']} key={index}>
            <FormRender schema={item['schema']} widgets={{ self_divider: Self_divider }}
              form={formList} style={{ overflowY: 'auto' }} />
          </Tabs.TabPane>
        )
      })
    )
  }
  const handleChange = (activeKey) => {
    let tdata = formList.getValues()
    let nData = { ...data, ...tdata }
    console.log(tdata);
    setData(nData);
    console.log(nData);
    let iObj = {}
    for (const key in nData) {
      if (Object.hasOwnProperty.call(nData, key)) {
        const element = nData[key];
        iObj[key] = element

      }
    }
    formList.setValues(nData)
  }
  return (
    <div className='form_content'>
      <div className='form_main'>
        <FormRender schema={schema['root']} form={form} onFinish={onFinish} style={{ overflowY: 'auto' }} widgets={{ self_divider: Self_divider }} />
        <Tabs onChange={handleChange} tabBarGutter={20} destroyInactiveTabPane={true} type='card'>
          {
            getItem()
          }
        </Tabs>
      </div>
      <div className='form_footer'>
        <Button onClick={form.submit} type="primary">提交</Button>
        {
          TableStore.formEdit && <Button onClick={handleCancel} style={{ marginLeft: '20px' }}>取消</Button>
        }
      </div>
    </div>
  );
});

export default inject((stores) => ({ HomeStore: stores.HomeStore, FormStore: stores.FormStore, TableStore: stores.TableStore }))(FormData);