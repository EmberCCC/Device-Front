import React, { useEffect, useRef, useState } from 'react';
import FormRender, { useForm } from 'form-render';
import { Button, message, Modal, Spin, Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import { getCheckArr, getNotNullObj } from './formUtil';
import { Self_divider } from 'layouts/FormEdit/self_item/self_divider';

import './index.less'
import { toJS } from 'mobx';
import self_select from 'layouts/FormEdit/self_item/self_select';
import My_string from 'layouts/FormEdit/self_item/my_string';
import self_textarea from 'layouts/FormEdit/self_item/self_textarea';
import self_number from 'layouts/FormEdit/self_item/self_number';
import self_radio from 'layouts/FormEdit/self_item/self_radio';
import self_datapick from 'layouts/FormEdit/self_item/self_datapick';
import self_linkquery from 'layouts/FormEdit/self_item/self_linkquery';
import { Self_address } from 'layouts/FormEdit/self_item/self_address';
import self_department_user from 'layouts/FormEdit/self_item/self_department_user';
import self_editable_table from "layouts/FormEdit/self_item/self_editable_table";
const FormLayout = observer(({ HomeStore, FormStore, type, formId, handleCancel, handleClose }) => {
  const { schema, formField, formData, flag } = FormStore
  const [data, setData] = useState({});
  const form = useForm();
  const formList = useForm()
  const dataRef = useRef()
  const onFinish = (error) => {
    const { firstFormId } = HomeStore;
    if (error.length > 0) {
      return;
    }
    let checkArr = getCheckArr(schema)
    const result = getNotNullObj(toJS(formField['fields']), toJS(formField['fieldsAuth']), data)
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
    if (formId) {
      if (checkArr.length > 0) {
        FormStore.submitDataCheck({ 'formId': formId, 'data': { ...formData, ...data }, 'checkFieldIds': checkArr })
      } else {
        FormStore.submitData({ 'formId': formId, 'data': { ...formData, ...data } })
      }
    } else {
      if (checkArr.length > 0) {
        FormStore.submitDataCheck({ 'formId': firstFormId, 'data': { ...formData, ...data }, 'checkFieldIds': checkArr })
      } else {
        FormStore.submitData({ 'formId': firstFormId, 'data': { ...formData, ...data } })
      }
    }
    if (handleClose) {
      handleClose()
    }
    console.log(toJS(data));
    console.log(checkArr);
    form.resetFields();
    formList.resetFields();
  }
  useEffect(() => {
    const { firstFormId } = HomeStore
    if (formId) {
      //获取表单信息
      FormStore.getFormField({ formId: formId }, '1')
    } else {
      FormStore.getFormField({ formId: firstFormId }, '1')
    }
    FormStore.setValue('formData', {});
    setData({})

  }, [])
  useEffect(() => {
    setData(formData)
    form.setValues(formData)
    formList.setValues(formData)
    // FormStore.handleBlur({fieldId:'1'})
  }, [flag])
  useEffect(() => {
    dataRef.current = data
  }, [data])

  const handleMount = () => {
    form.setValues(dataRef.current)
    formList.setValues(dataRef.current)
  }
  const watch = {
    '#': val => {
      let obj = {}
      console.log(val);
      Object.keys(val).map(one => {
        if (val[one] != undefined) {
          obj[one] = val[one]
        }
      })
      Object.keys(dataRef.current).map(one => {
        console.log(val[one]);
        if (val[one] == undefined) {
          try {
            let d = JSON.parse(dataRef.current[one])
            if (Array.isArray(dataRef.current[one])) {
              obj[one] = dataRef.current[one]
            } else {
              obj[one] = d
            }

          } catch (error) {
            obj[one] = dataRef.current[one]
          }
        } else {
          try {
            let d = JSON.parse(val[one])
            if (Array.isArray(val[one])) {
              d = val[one]
            }
            // if(Array.isArray(d)){
            //   obj[one] =
            // }
            console.log(d);
            obj[one] = d
          } catch (error) {
            obj[one] = val[one]
          }
        }
      })
      console.log('watch',obj);
      setData(obj)
      FormStore.setValue('formData', obj)
    }
  }
  const getItem = () => {
    let nArr = []
    for (const key in schema) {
      if (Object.hasOwnProperty.call(schema, key)) {
        const element = schema[key];
        if (key !== 'root') {
          let iObj = {}
          iObj['name'] = key
          iObj['schema'] = element
          nArr.push(iObj);
        }
      }
    }
    return (
      nArr.map((item, index) => {
        if (JSON.stringify(item['schema']['properties']) !== '{}') {
          return (
            <Tabs.TabPane tab={item['name']} key={index}>
              <FormRender
                schema={item['schema']}
                mapping={{ string: 'My_string' }}
                widgets={{
                  self_divider: Self_divider,
                  self_select: self_select,
                  My_string: My_string,
                  self_textarea: self_textarea,
                  self_number: self_number,
                  self_radio: self_radio,
                  self_datapick: self_datapick,
                  self_linkquery: self_linkquery,
                  self_address: Self_address,
                  self_department_user: self_department_user,
                  self_editable_table: self_editable_table,
                }}
                form={formList} style={{ overflowY: 'auto' }} watch={watch} onMount={handleMount} />
            </Tabs.TabPane>
          )
        }
      })
    )
  }


  return (
    <Spin spinning={FormStore.loading} tip={'loading...'} wrapperClassName={'myForm_layout'}>
      <div className='form_layout'>
        <FormRender
          schema={schema['root']}
          mapping={{ string: 'My_string' }}
          widgets={{
            self_divider: Self_divider,
            self_select: self_select,
            My_string: My_string,
            self_textarea: self_textarea,
            self_number: self_number,
            self_radio: self_radio,
            self_datapick: self_datapick,
            self_linkquery: self_linkquery,
            self_address: Self_address,
            self_department_user: self_department_user,
            self_editable_table: self_editable_table,
          }}
          form={form}
          onFinish={onFinish}
          style={{ overflowY: 'auto' }}
          watch={watch}
        />

        <Tabs  tabBarGutter={20} destroyInactiveTabPane={true} type='card'>
          {
            getItem()
          }
        </Tabs>
      </div>
      <div className='form_footer'>
        <Button onClick={form.submit} type="primary">提交</Button>
        {
          type == 'link' && (
            <Button style={{ marginLeft: "10px" }} onClick={handleCancel}>取消</Button>
          )
        }
      </div>
    </Spin>
  );
});

export default inject((stores) => ({ HomeStore: stores.HomeStore, FormStore: stores.FormStore }))(FormLayout);
