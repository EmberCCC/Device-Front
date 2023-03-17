/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-01 20:45:23
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-17 10:07:45
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BulbTwoTone, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { Drawer, message, Tabs, Spin } from 'antd';
import FormRender, { useForm } from 'form-render';
import { defaultCommonSetting, defaultGlobalSettings, defaultGlobalSettingsi, defaultSettings } from 'constants/field_config';
import Generator from 'fr-generator';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useUpdateEffect } from 'ahooks';
import { Link_item } from './self_item/link_item';
import { toJS } from 'mobx';
import './index.less'
import { exChange, getAllField, restore, newExChange,formEditRestore } from './changeTool';
import { Submit_check } from './self_item/submit_check';
import { Self_divider } from './self_item/self_divider';
import mul_tag from './self_item/mul_tag';
import RichTextEditor from './self_item/rich_text';
import Self_select from './self_item/self_select';
import Select_option from './self_item/select_option';
import link_condition from './self_item/link_condition';
import { nanoid } from 'nanoid';
import My_string from './self_item/my_string';
import self_textarea from './self_item/self_textarea';
import self_number from './self_item/self_number';
import self_radio from './self_item/self_radio';
import self_pattern from './self_item/self_pattern';
import self_datapick from './self_item/self_datapick';
import self_linkquery from './self_item/self_linkquery';
import linkquery_condition from './self_item/linkquery_condition';
import { Self_address } from './self_item/self_address';
import self_department_user from './self_item/self_department_user';
import self_setting from './self_item/self_setting';
import Tab from './self_item/Tab';

const { Provider, Sidebar, Canvas, Settings } = Generator;


const FormEdit = observer(({ HomeStore, FormStore }) => {
  const [schema, setSchema] = useState({});
  const [visible, setVisisble] = useState(false)
  const [lookItem, setLookItem] = useState({})
  const [messageApi, contextHolder] = message.useMessage();
  const { schemaList } = FormStore
  const { formInfo } = HomeStore
  const ref = useRef();
  const refList = useRef();
  const form = useForm();
  const formList = useForm();
  useEffect(() => {
    FormStore.getFormSimple();
    let formId = sessionStorage.getItem('formId') ? sessionStorage.getItem('formId') : HomeStore.firstFormId
    FormStore.getFormField({ 'formId': formId }).then(() => {
    let {formField}=FormStore
    let properties=JSON.parse(formField.form.properties)
    let newSchemma={}
    newSchemma={...properties}
    let getStore=formEditRestore(toJS(FormStore.formField))
    FormStore.setValue('schemaList',getStore.Tabs)
    console.log('formEditRestore',formEditRestore(toJS(FormStore.formField)))
    newSchemma.properties=getStore.properties
    if(getStore.Tabs.length>0){//有多标签
      newSchemma.properties['Tabs']={"type":"any",widget:"Tab"}
      FormStore.setValue('formEditSchema',newSchemma)
      let tabLastChoose=getStore.Tabs[0].key
      FormStore.setValue('checked',true)
      console.log('schemaList',getStore.Tabs)
      FormStore.setValue('tabLastChoose',tabLastChoose)
      FormStore.changeFormEditSchema(tabLastChoose, tabLastChoose,false,true)
      newSchemma=FormStore.formEditSchema
    }else{
      FormStore.setValue('formEditSchema',newSchemma)
      FormStore.setValue('checked',false)
    }
    console.log('finallyNewSchema',toJS(FormStore.schemaList))
    setSchema(toJS(newSchemma))
    // try {
    //     FormStore.setValue('subFormList', JSON.parse(FormStore?.['formField']?.['form']?.['formFields']))
    //     let nameArr = []
    //     console.log('FormStore.formField', toJS(FormStore.formField));

    //     let iList = restore(toJS(FormStore.formField))
    //     console.log('restoreend',toJS(iList))
    //     delete iList.root
    //     let newArri = []
    //     for (const key in iList) {
    //       if (Object.hasOwnProperty.call(iList, key)) {
    //         const element = iList[key];
    //         let iObj = {}
    //         iObj['name'] = key
    //         iObj['schema'] = element
    //         newArri.push(iObj);
    //       }
    //     }
    //     for (const key in iList) {
    //       if (iList.hasOwnProperty.call(iList, key)) {
    //         nameArr.push(key);
    //       }
    //     }
    //     if (newArri.length > 0) {
    //       FormStore.setValue('checked', true);
    //     }
    //     console.log('nameArr', nameArr);
    //     console.log('newArri', newArri);
    //     FormStore.setValue('schemaList', newArri);
    //     console.log(toJS(FormStore.formField))
    //     setSchema(restore(toJS(FormStore.formField)))
    //   } catch (error) {
    //     console.log(error);
    //   }
    });
    // console.log('渲染渲染')
  }, []);
  useUpdateEffect(() => {
    ref.current.setValue(FormStore.formEditSchemaExtend)
    setLookItem(FormStore.formEditSchemaExtend)
    console.log('ref', ref)
    console.log('refchange', toJS(FormStore.formEditSchemaExtend))
  }, [FormStore.formEditSchemaExtend])
  const look = () => {
    setLookItem(ref.current.getValue())
    console.log('ref', ref.current.getValue());
    setVisisble(true);
  }
  const save = () => {
    let formId = sessionStorage.getItem('formId') ? sessionStorage.getItem('formId') : HomeStore.firstFormId
    const { tabLastChoose, checked } = FormStore
    if (checked) { FormStore.changeFormEditSchema(tabLastChoose, tabLastChoose) }
    let params = newExChange(ref.current.getValue(), formId, toJS(FormStore.schemaList))
    // FormStore.changeFormEditSchema(tabLastChoose,tabLastChoose)
    console.log('rootparams', params)
    // if (schemaList.length > 0) {
    //   schemaList.map((item, index) => {
    //     // console.log(exChange(item['schema'], HomeStore.firstFormId, subFormName[index]));
    //     params['subForms'].push(exChange(item['schema'], formId, schemaList[index]['label'])['subForms'][0] || { 'name': schemaList[index]['label'], 'fields': [] })
    //   })
    // }


    FormStore.saveForm(params).then((req)=>{
      console.log(req)
      messageApi.open({
        type: 'success',
        content: req.msg,
      });
    },(res)=>{
      messageApi.open({
        type: 'fail',
        content: res.msg,
      });
    })
    console.log(params);
  }
  const closeDrawer = () => {
    setVisisble(false)
  }
  /**
   * 获取列表单
   * @returns
   */
  // const getItem = () => {
  //   const { schemaList } = FormStore
  //   if (JSON.stringify(schemaList) != '{}') {
  //     return (
  //       schemaList.map((item, index) => {
  //         return (
  //           <Tabs.TabPane tab={schemaList[index]['label']} key={index}>
  //             <FormRender
  //               schema={item['schema']}
  //               mapping={{ string: 'My_string' }}
  //               widgets={{
  //                 self_divider: Self_divider,
  //                 RichTextEditor: RichTextEditor,
  //                 self_select: Self_select,
  //                 select_option: Select_option,
  //                 My_string: My_string,
  //                 self_textarea: self_textarea,
  //                 self_number: self_number,
  //                 self_radio: self_radio,
  //                 self_datapick: self_datapick,
  //                 self_linkquery: self_linkquery,
  //                 self_address: Self_address,
  //                 self_department_user: self_department_user,

  //               }}
  //               form={formList} style={{ overflowY: 'auto' }} />
  //           </Tabs.TabPane>
  //         )
  //       })
  //     )
  //   }
  // }
  const deleteField = (event, schema) => {
    if (schema.widget === 'Tab') { return }
    console.log(schema)
    let id = schema.$id.substring(2)
    schema = ref.current.getValue()
    delete schema.properties[id]
    ref.current.setValue(schema)
    FormStore.setValue('formEditSchema', toJS(schema))
  }

  const schemaChange = (schema) => {
    console.log('schema:change', toJS(schema))
      console.log(toJS(FormStore.checked),schema.properties.hasOwnProperty('Tabs') === false)
    // if (schema.properties.hasOwnProperty('Tabs') === false && FormStore.checked === true) {
    //   let { formEditSchemaExtend, tabLastChoose, schemaList } = FormStore
    //   // console.log('beeefore',toJS(formEditSchemaExtend))
    //   // FormStore.setValue('loading',true)
    //   ref.current.setValue(formEditSchemaExtend)
    // } else {
      FormStore.setValue('formEditSchema', toJS(schema))
    // }
    // if (schema.properties.hasOwnProperty('Tabs') === false && FormStore.checked === true) {
    //   let {formEditSchemaExtend, tabLastChoose, schemaList } = FormStore

    //   let lastsubFormItem = schemaList.find((item) => item.key === tabLastChoose)
    //   for (const item in lastsubFormItem.fields) {
    //     delete schema.properties[item]
    //   }
    //   FormStore.setValue('checked',false)
    //   console.log('deleteschema',schema)
    //   setTimeout(()=>{
    //     FormStore.setValue('formEditSchema', toJS(schema))
    //     FormStore.setValue('formEditSchemaExtend',FormStore.formEditSchema)
    //   },100)
    // }else{
    //   FormStore.setValue('formEditSchema', toJS(schema))
    // }
    // if (schema.properties.hasOwnProperty('Tabs') === false && FormStore.checked === true) {
    //   console.log('formEditSchemaExtend', toJS(FormStore.formEditSchemaExtend))
    //   FormStore.setValue('formEditSchemaExtend', FormStore.formEditSchemaExtend)
    // } else {
    //   FormStore.setValue('formEditSchema', toJS(schema))
    // }
  }

  return (
    <>
    {contextHolder}
      <div className='edit_header'>
        <div className='edit_left'>
          <BulbTwoTone className='icon_edit' />
          <a>查看新手引导</a>
        </div>
        <div className='edit_right'>
          <button className='edit_look' onClick={look}>预览</button>
          <button className='edit_save' onClick={save}>保存</button>
        </div>
      </div>
      <Spin spinning={FormStore.loading} wrapperClassName={'myForm_layout'}>
        <div className="fr-generator-playground" style={{ height: '88vh' }}>
          <Provider
            ref={ref}
            defaultValue={schema}
            settings={defaultSettings}
            commonSettings={defaultCommonSetting}
            globalSettings={defaultGlobalSettings}
            onSchemaChange={schemaChange}
            extraButtons={[false, false, false, false]}
            controlButtons={[false, false, { text: <DeleteOutlined />, onClick: deleteField }]}
            hideId={true}
            getId={name => `${name}_${nanoid(19)}`}
            mapping={{ string: 'My_string' }}
            widgets={{
              link_item: Link_item,
              submit_check: Submit_check,
              self_divider: Self_divider,
              mul_tag: mul_tag,
              RichTextEditor: RichTextEditor,
              self_select: Self_select,
              select_option: Select_option,
              link_condition: link_condition,
              My_string: My_string,
              self_textarea: self_textarea,
              self_number: self_number,
              self_radio: self_radio,
              self_pattern: self_pattern,
              self_datapick: self_datapick,
              self_linkquery: self_linkquery,
              linkquery_condition: linkquery_condition,
              self_address: Self_address,
              self_department_user: self_department_user,
              self_setting: self_setting,
              Tab: Tab
            }}
          >
            <div className="fr-generator-container" >
              <Sidebar />
              <div className='edit_main' style={{ width: '100%' }}>
                  <Spin  spinning={FormStore.canvasLoading}>
                    <Canvas />
                  </Spin>
              </div>
              <Settings />
            </div>
          </Provider>
        </div>
      </Spin>
      <Drawer
        placement='bottom'
        size='large'
        width={1200}
        visible={visible}
        extra={
          <CloseOutlined onClick={closeDrawer} />
        }
      >
        <FormRender
          schema={lookItem}
          form={form}
          mapping={{ string: 'My_string' }}
          widgets={{
            self_divider: Self_divider,
            RichTextEditor: RichTextEditor,
            self_select: Self_select,
            select_option: Select_option,
            My_string: My_string,
            self_textarea: self_textarea,
            self_number: self_number,
            self_radio: self_radio,
            self_datapick: self_datapick,
            self_linkquery: self_linkquery,
            self_address: Self_address,
            self_department_user: self_department_user,
            self_setting: self_setting,
            Tab: Tab
          }} />
      </Drawer>
    </>
  );
});

export default inject((stores) => ({ HomeStore: stores.HomeStore, FormStore: stores.FormStore }))(FormEdit);
