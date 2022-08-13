/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-01 20:45:23
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-14 05:41:38
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BulbTwoTone, CloseOutlined } from '@ant-design/icons';
import { Drawer, message, Tabs } from 'antd';
import FormRender, { useForm } from 'form-render';
import { defaultCommonSetting, defaultGlobalSettings, defaultGlobalSettingsi, defaultSettings } from 'constants/field_config';
import Generator from 'fr-generator';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link_item } from './self_item/link_item';
import { toJS } from 'mobx';
import './index.less'
import { exChange, getAllField, restore } from './changeTool';
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

const { Provider, Sidebar, Canvas, Settings } = Generator;


const FormEdit = observer(({ HomeStore, FormStore }) => {
  const [schema, setSchema] = useState({});
  const [visible, setVisisble] = useState(false)
  const [lookItem, setLookItem] = useState({})
  const [type, setType] = useState(1)
  const { schemaList, subFormName } = FormStore
  const { formInfo } = HomeStore
  const ref = useRef();
  const refList = useRef();
  const form = useForm();
  const formList = useForm();
  useEffect(() => {
    FormStore.getFormSimple();
    let formId = sessionStorage.getItem('formId') ? sessionStorage.getItem('formId') : HomeStore.firstFormId
    FormStore.getFormField({ 'formId': formId }).then(() => {
      try {
        FormStore.setValue('subFormList', JSON.parse(FormStore?.['formField']?.['form']?.['formFields']))
        let nameArr = []
        let iList = restore(toJS(FormStore.formField))
        delete iList.root
        let newArri = []
        for (const key in iList) {
          if (Object.hasOwnProperty.call(iList, key)) {
            const element = iList[key];
            let iObj = {}
            iObj['name'] = key
            iObj['schema'] = element
            newArri.push(iObj);
          }
        }
        for (const key in iList) {
          if (iList.hasOwnProperty.call(iList, key)) {
            nameArr.push(key);
          }
        }
        if (newArri.length > 0) {
          FormStore.setValue('checked', true);
        }
        FormStore.setValue('subFormName', nameArr);
        FormStore.setValue('schemaList', newArri);
        setSchema(restore(toJS(FormStore.formField)))
      } catch (error) {
        console.log(error);
      }


    });
  }, []);
  const look = () => {
    setLookItem(ref.current.getValue())
    setVisisble(true);
  }
  const save = () => {
    let params = exChange(ref.current.getValue(), HomeStore.firstFormId, 'root')
    if (schemaList.length > 0) {
      schemaList.map((item, index) => {
        // console.log(exChange(item['schema'], HomeStore.firstFormId, subFormName[index]));
        params['subForms'].push(exChange(item['schema'], HomeStore.firstFormId, subFormName[index])['subForms'][0] || { 'name': subFormName[index], 'fields': [] })
      })
    }
    FormStore.saveForm(params).then(() => {
      message.success('保存成功')
    })
    console.log(params);
  }
  const closeDrawer = () => {
    setVisisble(false)
  }

  const getItem = () => {
    const { schemaList } = FormStore
    if (JSON.stringify(schemaList) != '{}') {
      return (
        schemaList.map((item, index) => {
          return (
            <Tabs.TabPane tab={subFormName[index]} key={index}>
              <FormRender
                schema={item['schema']}
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
                  self_department_user: self_department_user
                }}
                form={formList} style={{ overflowY: 'auto' }} />
            </Tabs.TabPane>
          )
        })
      )
    }
  }
  const handleSchemaChange = (schema, index, type) => {

    if (type == 'root') {
      FormStore.setValue('rootSchema', schema)
    } else {
      let iList = [...schemaList]
      console.log(schema);
      iList.splice(index, 1, { 'name': subFormName[index], 'schema': schema });
      FormStore.setValue('schemaList', iList);
    }

  }
  const getTag = () => {
    const { schemaList } = FormStore
    let newArr = []
    for (const key in schemaList) {
      if (Object.hasOwnProperty.call(schemaList, key)) {
        const element = schemaList[key];
        let iObj = {}
        iObj['name'] = key
        iObj['schema'] = element
        newArr.push(iObj);
      }
    }
    return (
      newArr.map((item, index) => {
        const { subFormName } = FormStore
        return (
          <Tabs.TabPane tab={subFormName[index]} key={index}>
            <Provider
              ref={refList}
              defaultValue={item['schema']}
              settings={defaultSettings}
              commonSettings={defaultCommonSetting}
              globalSettings={[]}
              onSchemaChange={(schema) => handleSchemaChange(schema, index)}
              extraButtons={[false, false, false, false]}
              controlButtons={[true, false, { text: 'up', onClick: (event, schema) => console.log(event, schema) }]}
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
                self_setting:self_setting
              }}
            >
              <div className="fr-generator-container" style={{ height: '100%' }}>
                <div className='edit_main subForm' style={{ width: '100%' }}>
                  <Canvas />
                </div>
                <Settings />
              </div>
            </Provider>
          </Tabs.TabPane>
        )
      })
    )
  }
  return (
    <>
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
      <div className="fr-generator-playground" style={{ height: '88vh' }}>
        <Provider
          ref={ref}
          defaultValue={schema['root']}
          settings={defaultSettings}
          commonSettings={defaultCommonSetting}
          globalSettings={defaultGlobalSettings}
          onSchemaChange={(schema) => handleSchemaChange(schema, 0, 'root')}
          extraButtons={[false, false, false, false]}
          controlButtons={[true, false, { text: 'up', onClick: (event, schema) => console.log(event, schema) }]}
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
            self_setting:self_setting
          }}
        >
          <div className="fr-generator-container" >
            <Sidebar />
            <div className='edit_main' style={{ width: '100%' }}>
              <Canvas />
              <Tabs type='card' className={`myTabs ${type == 2 ? 'activedSub' : ''}`} tabBarGutter={5} size='small' destroyInactiveTabPane={true}>
                {
                  getTag()
                }
              </Tabs>
            </div>
            <Settings />
          </div>
        </Provider>
      </div>

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
            self_department_user: self_department_user
          }} />
        <Tabs destroyInactiveTabPane={true} tabBarGutter={20} type='card'>
          {
            getItem()
          }
        </Tabs>
      </Drawer>
    </>
  );
});

export default inject((stores) => ({ HomeStore: stores.HomeStore, FormStore: stores.FormStore }))(FormEdit);
