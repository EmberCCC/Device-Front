/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-02 03:21:54
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-08 18:10:11
 * @FilePath: \bl-device-manage-test\src\layouts\FormLayout\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import FormRender, { useForm } from 'form-render';
import { Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { restore } from 'layouts/FormEdit/changeTool';
import './index.css'
import { getCheckArr } from './formUtil';

const FormData = observer(({ HomeStore, FormStore, TableStore }) => {
  const [schema, setSchema] = useState({});
  const form = useForm();
  const onFinish = (formData) => {
    const { firstFormId } = HomeStore;
    let checkArr = getCheckArr(form.schema);
    console.log(checkArr);
    console.log({ 'formId': firstFormId, 'data': formData });
    console.log({ 'formId': firstFormId, 'data': formData, 'dataId': toJS(TableStore.detailData['data']['id']) });
    if (TableStore.formEdit == false) {
      FormStore.setValue('formCopyVis', false)
      TableStore.setDataPageModalVis(false);
      if (checkArr.length == 0) {
        FormStore.submitData({ 'formId': firstFormId, 'data': formData }).then(() => {
          if (TableStore.model == 'subitAndManage') {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'myself')
          } else {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'all')
          }
        })
      } else {
        FormStore.submitData({ 'formId': firstFormId, 'data': formData, 'checkFieldIds': checkArr }).then(() => {
          if (TableStore.model == 'subitAndManage') {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'myself')
          } else {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'all')
          }
        })
      }
    } else {
      if (checkArr.length == 0) {
        FormStore.changeData({ 'formId': firstFormId, 'data': formData, 'dataId': toJS(TableStore.detailData['data']['id']) }).then(() => {
          TableStore.setValue('formEdit', false);
          TableStore.getOneData({ 'formId': HomeStore.firstFormId, 'dataId': toJS(TableStore.detailData['data']['id']) })
          if (TableStore.model == 'subitAndManage') {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'myself')
          } else {
            TableStore.getAllData({ formId: HomeStore.firstFormId }, 'all')
          }
        })
      } else {
        FormStore.changeDataCheck({ 'formId': firstFormId, 'data': formData, 'dataId': toJS(TableStore.detailData['data']['id']), 'checkFieldIds': checkArr }).then(() => {
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
    form.resetFields();
  }
  const handleCancel = () => {
    TableStore.setValue('formEdit', false);
  }
  useEffect(() => {
    FormStore.getFormField({ formId: HomeStore.firstFormId }).then(() => {
      setSchema(restore(toJS(FormStore.formField)))
      console.log(toJS(FormStore.formField));
      const formData = JSON.parse(toJS(TableStore.formData)['formData'])
      form.setValues(formData);
    });
  }, [])
  return (
    <div className='form_content'>
      <div className='form_main'>
        <FormRender schema={schema['root']} form={form} onFinish={onFinish} style={{ overflowY: 'auto' }} debug='true' />
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