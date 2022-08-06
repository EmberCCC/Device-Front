/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-02 03:21:54
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-06 13:05:49
 * @FilePath: \bl-device-manage-test\src\layouts\FormLayout\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import FormRender, { useForm } from 'form-render';
import { Button, message, Modal, Spin, Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import { getCheckArr, getNotNullObj } from './formUtil';
import { Self_divider } from 'layouts/FormEdit/self_item/self_divider';

import './index.less'
import { toJS } from 'mobx';
import select_option from 'layouts/FormEdit/self_item/select_option';
import self_select from 'layouts/FormEdit/self_item/self_select';
const FormLayout = observer(({ HomeStore, FormStore }) => {
  const { schema, formField } = FormStore
  const [data, setData] = useState({});
  const form = useForm();
  const formList = useForm()
  const onFinish = (formData, error) => {
    const { firstFormId } = HomeStore;
    if (error.length > 0) {
      return;
    }
    console.log(formData);
    let checkArr = getCheckArr(schema)
    let nData = formList.getValues()
    const result = getNotNullObj(toJS(formField['fields']), toJS(formField['fieldsAuth']), { ...formData, ...nData, ...data, ...formList.getValues() })
    if (JSON.stringify(result) != "{}") {
      message.error(
        <div>
          {
            Object.keys(result).map((item, index) => {
              console.log(result);
              return (
                <div key={index}>{result[item]}</div>
              )
            })
          }
        </div>
      )
      return;
    }
    if (checkArr.length > 0) {
      FormStore.submitDataCheck({ 'formId': firstFormId, 'data': { ...formData, ...nData, ...data }, 'checkFieldIds': checkArr })
    } else {
      FormStore.submitData({ 'formId': firstFormId, 'data': { ...formData, ...nData, ...data } })
    }
    console.log(checkArr);
    form.resetFields();
    formList.resetFields();
  }
  useEffect(() => {
    const { firstFormId } = HomeStore
    FormStore.getFormField({ formId: firstFormId })
  }, [])
  const handleMount = () => {
    formList.setValues(data)
  }
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
        if (JSON.stringify(item['schema']['properties']) != '{}') {
          return (
            <Tabs.TabPane tab={item['name']} key={index}>
              <FormRender schema={item['schema']} widgets={{
                self_divider: Self_divider,
                self_select: self_select,
                select_option: select_option
              }}
                form={formList} style={{ overflowY: 'auto' }} watch={watch} onMount={handleMount} />
            </Tabs.TabPane>
          )
        }
      })
    )
  }
  const handleChange = (activeKey) => {

    let tdata = formList.getValues()

    let nData = { ...data, ...tdata }
    setData(nData);
    let iObj = {}
    for (const key in nData) {
      if (Object.hasOwnProperty.call(nData, key)) {
        const element = nData[key];
        iObj[key] = element
      }
    }

    formList.setValues(iObj)

    // formList.resetFields();
  }
  const watch = {
    '#': val => {
      console.log(val);
    }
  }
  return (
    <Spin spinning={FormStore.loading} tip={'loading...'} wrapperClassName={'form_layout'}>
      <div style={{ height: '100%' }}>
        <div className='form_layout'>
          <FormRender schema={schema['root']} widgets={{
            self_divider: Self_divider,
            self_select: self_select,
            select_option: select_option
          }}
            form={form} onFinish={onFinish} style={{ overflowY: 'auto' }} watch={watch} />

          <Tabs onTabClick={handleChange} tabBarGutter={20} destroyInactiveTabPane={true} type='card'>
            {
              getItem()
            }
          </Tabs>
        </div>
        <div className='form_footer'>
          <Button onClick={form.submit} type="primary">提交</Button>
        </div>
      </div>
    </Spin>
  );
});

export default inject((stores) => ({ HomeStore: stores.HomeStore, FormStore: stores.FormStore }))(FormLayout);