/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-02 03:21:54
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-13 10:12:04
 * @FilePath: \bl-device-manage-test\src\layouts\FormLayout\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import FormRender, { useForm } from 'form-render';
import { Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { restore } from 'layouts/FormEdit/changeTool';
import { getCheckArr } from './formUtil';
import { Self_divider } from 'layouts/FormEdit/self_item/self_divider';


const FormLayout = observer(({ HomeStore, FormStore }) => {
  const [schema, setSchema] = useState({});
  const form = useForm();
  const onFinish = (formData) => {
    const { firstFormId } = HomeStore;
    // FormStore.submitData({ 'formId': firstFormId, 'data': formData })
    let checkArr = getCheckArr(form.schema)
    console.log(form.schema.properties);
    console.log(({'formId': firstFormId, 'data': formData, 'checkFieldIds': checkArr}));
    if (checkArr.length > 0) {
      FormStore.submitDataCheck({ 'formId': firstFormId, 'data': formData, 'checkFieldIds': checkArr });
    } else {
      FormStore.submitData({ 'formId': firstFormId, 'data': formData })
    }
    console.log(checkArr);
    form.resetFields();
  }
  useEffect(() => {
    const { firstFormId } = HomeStore
    FormStore.getFormField({ formId: firstFormId }).then(() => {
      setSchema(restore(toJS(FormStore.formField)))
      console.log(schema);
    });
  }, [])
  return (
    <div>
      <div className='form_layout'>
        <FormRender schema={schema['root']} widgets={{self_divider:Self_divider}}
          form={form} onFinish={onFinish} style={{ overflowY: 'auto' }} />
      </div>
      <Button onClick={form.submit} type="primary">提交</Button>
    </div>
  );
});

export default inject((stores) => ({ HomeStore: stores.HomeStore, FormStore: stores.FormStore }))(FormLayout);