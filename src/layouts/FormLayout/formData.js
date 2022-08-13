/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-02 03:21:54
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-14 05:07:24
 * @FilePath: \bl-device-manage-test\src\layouts\FormLayout\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useRef, useState } from 'react';
import FormRender, { useForm } from 'form-render';
import { Button, message, Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { restore } from 'layouts/FormEdit/changeTool';
import './index.less'
import { getCheckArr, getNotNullObj } from './formUtil';
import { Self_divider } from 'layouts/FormEdit/self_item/self_divider';
import Self_select from 'layouts/FormEdit/self_item/self_select';
import self_textarea from 'layouts/FormEdit/self_item/self_textarea';
import self_number from 'layouts/FormEdit/self_item/self_number';
import self_radio from 'layouts/FormEdit/self_item/self_radio';
import my_string from 'layouts/FormEdit/self_item/my_string';
import self_select from 'layouts/FormEdit/self_item/self_select';
import self_datapick from 'layouts/FormEdit/self_item/self_datapick';
import self_linkquery from 'layouts/FormEdit/self_item/self_linkquery';
import { Self_address } from 'layouts/FormEdit/self_item/self_address';
import self_department_user from 'layouts/FormEdit/self_item/self_department_user';

const FormData = observer(({ HomeStore, FormStore, TableStore }) => {
  const { formField, formData, flag } = FormStore
  const dataRef = useRef()
  const [schema, setSchema] = useState({
    "type": "object",
    "properties": {},
    "labelWidth": 120,
    "displayType": "row"
  });
  const [data, setData] = useState({});
  const form = useForm();
  const formList = useForm()
  const onFinish = (formData, error) => {
    const { firstFormId } = HomeStore;
    const result = getNotNullObj(toJS(formField['fields']), toJS(formField?.['fieldsAuth']), { ...formData, ...data })

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
    if (error.length > 0) {
      return;
    }
    let checkArr = getCheckArr(schema);
    if (TableStore.formEdit == false) {
      FormStore.setValue('formCopyVis', false)
      TableStore.setDataPageModalVis(false);
      if (checkArr.length == 0) {
        FormStore.submitData({ 'formId': firstFormId, 'data': dataRef.current }).then(() => {
          if (TableStore.model == 'subitAndManage') {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'myself')
          } else {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'all')
          }
        })
      } else {
        FormStore.submitData({ 'formId': firstFormId, 'data': dataRef.current, 'checkFieldIds': checkArr }).then(() => {
          if (TableStore.model == 'subitAndManage') {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'myself')
          } else {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'all')
          }
        })
      }
    } else {
      if (checkArr.length == 0) {
        FormStore.changeData({ 'formId': firstFormId, 'data': dataRef.current, 'dataId': toJS(TableStore.detailData['data']['id']) }).then(() => {
          TableStore.setValue('formEdit', false);
          TableStore.getOneData({ 'formId': HomeStore.firstFormId, 'dataId': toJS(TableStore.detailData['data']['id']) })
          if (TableStore.model == 'subitAndManage') {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'myself')
          } else {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'all')
          }
        })
      } else {
        FormStore.changeDataCheck({ 'formId': firstFormId, 'data': dataRef.current, 'dataId': toJS(TableStore.detailData['data']['id']), 'checkFieldIds': checkArr }).then(() => {
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
  const handleMount = () => {
    formList.setValues(dataRef.current)
  }
  useEffect(() => {
    dataRef.current = data
  }, [data])
  useEffect(() => {
    console.log(toJS(formData));
    setData(formData)
    form.setValues(formData)
    formList.setValues(formData)
  }, [flag])
  useEffect(() => {
    FormStore.getFormField({ formId: HomeStore.firstFormId }).then(() => {
      setSchema(restore(toJS(FormStore.formField), 'submit'))
      const formData = JSON.parse(toJS(TableStore.formData)['formData'])
      FormStore.setValue('formData', formData)
      setData(formData);
      formList.setValues(dataRef.current);
      form.setValues(dataRef.current);
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
        if (JSON.stringify(item['schema']['properties']) != "{}") {
          return (
            <Tabs.TabPane tab={item['name']} key={index}>
              {/* <div style={{ fontSize: "10", fontWeight: '200' }}>（双击恢复之前数据）</div> */}
              <FormRender
                schema={item['schema']}
                mapping={{ string: 'My_string' }}
                widgets={{
                  self_divider: Self_divider,
                  self_select: self_select,
                  My_string: my_string,
                  self_textarea: self_textarea,
                  self_number: self_number,
                  self_radio: self_radio,
                  self_datapick: self_datapick,
                  self_linkquery: self_linkquery,
                  self_address: Self_address,
                  self_department_user: self_department_user
                }}
                form={formList}
                style={{ overflowY: 'auto' }}
                onMount={handleMount}
                watch={watch} />
            </Tabs.TabPane>
          )
        }
      })
    )
  }
  const watch = {
    '#': val => {
      let data = { ...data, ...val }
      setData(data)
      FormStore.setValue('formData', data)
    }
  }
  return (
    <div className='form_content'>
      <div className='form_main'>
        <FormRender
          schema={schema['root']}
          form={form}
          onFinish={onFinish}
          style={{ overflowY: 'auto' }}
          mapping={{ string: 'My_string' }}
          widgets={{
            self_divider: Self_divider,
            self_select: self_select,
            My_string: my_string,
            self_textarea: self_textarea,
            self_number: self_number,
            self_radio: self_radio,
            self_datapick: self_datapick,
            self_linkquery: self_linkquery,
            self_address: Self_address,
            self_department_user: self_department_user
          }}
          watch={watch}
        />

        <Tabs tabBarGutter={20} destroyInactiveTabPane={true} type='card'>
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