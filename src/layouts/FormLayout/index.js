/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-02 03:21:54
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-31 05:08:32
 * @FilePath: \bl-device-manage-test\src\layouts\FormLayout\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import FormRender, { useForm } from 'form-render';
import { Button, Spin, Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { restore } from 'layouts/FormEdit/changeTool';
import { getCheckArr } from './formUtil';
import { Self_divider } from 'layouts/FormEdit/self_item/self_divider';


const FormLayout = observer(({ HomeStore, FormStore }) => {
  const { formField, schema } = FormStore
  const [data, setData] = useState({});
  const form = useForm();
  const formList = useForm()
  const onFinish = (formData) => {
    const { firstFormId } = HomeStore;
    let checkArr = getCheckArr(schema)
    let nData = formList.getValues()
    console.log(({ 'formId': firstFormId, 'data': { ...formData, ...nData, ...data }, 'checkFieldIds': checkArr }));
    if (checkArr.length > 0) {
      FormStore.submitDataCheck({ 'formId': firstFormId, 'data': { ...formData, ...nData, ...data }, 'checkFieldIds': checkArr });
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

    formList.setValues(iObj)
    formList.resetFields();
  }
  return (
    <Spin spinning={FormStore.loading} tip={'loading...'}>
      <div>
        <div className='form_layout'>
          <FormRender schema={schema['root']} widgets={{ self_divider: Self_divider }}
            form={form} onFinish={onFinish} style={{ overflowY: 'auto' }} />
          <Tabs onChange={handleChange} tabBarGutter={20} destroyInactiveTabPane={true} type='card'>
            {
              getItem()
            }
          </Tabs>
        </div>
        <Button className='form_btn_sub' onClick={form.submit} type="primary">提交</Button>
      </div>
    </Spin>
  );
});

export default inject((stores) => ({ HomeStore: stores.HomeStore, FormStore: stores.FormStore }))(FormLayout);