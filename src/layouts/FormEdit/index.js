/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-01 20:45:23
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-01 23:38:38
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
import './index.css'
import { exChange, restore } from './changeTool';
import { Submit_check } from './self_item/submit_check';
import { Self_divider } from './self_item/self_divider';
import mul_tag from './self_item/mul_tag';

const { Provider, Sidebar, Canvas, Settings } = Generator;


const FormEdit = observer(({ HomeStore, FormStore }) => {
  const [schema, setSchema] = useState({});
  const [visible, setVisisble] = useState(false)
  const [lookItem, setLookItem] = useState({})
  const { schemaList, subFormName } = FormStore
  const {formInfo} = HomeStore
  const ref = useRef();
  const refList = useRef();
  const form = useForm();
  const formList = useForm();
  useEffect(() => {
    FormStore.getFormField({ formId: HomeStore.firstFormId }).then(() => {
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
    console.log(toJS(schemaList));
    if (JSON.stringify(schemaList) != '{}') {
      return (
        schemaList.map((item, index) => {
          return (
            <Tabs.TabPane tab={subFormName[index]} key={index}>
              <FormRender schema={item['schema']} widgets={{ self_divider: Self_divider }}
                form={formList} style={{ overflowY: 'auto' }} />
            </Tabs.TabPane>
          )
        })
      )
    }
  }
  const handleSchemaChange = (schema, index) => {
    let iList = [...schemaList]
    iList.splice(index, 1, { 'name': subFormName[index], 'schema': schema });
    FormStore.setValue('schemaList', iList);
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
              widgets={{
                link_item: Link_item,
                submit_check: Submit_check,
                self_divider: Self_divider,
              }}
            >
              <div className="fr-generator-container" style={{ height: '100%' }}>
                <div className='edit_main' style={{ width: '100%' }}>
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
          extraButtons={[false, false, false, false]}
          controlButtons={[true, false, { text: 'up', onClick: (event, schema) => console.log(event, schema) }]}
          hideId={true}
          widgets={{
            link_item: Link_item,
            submit_check: Submit_check,
            self_divider: Self_divider,
            mul_tag: mul_tag
          }}
        >
          <div className="fr-generator-container" >
            <Sidebar />
            <div className='edit_main' style={{ width: '100%' }}>
              <Canvas />
              <Tabs type='card' className='myTabs' tabBarGutter={5} size='small'>
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
        <FormRender schema={lookItem} form={form} />
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
