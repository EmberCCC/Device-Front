/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-01 20:45:23
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-03 11:02:42
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
import { exChange, restore } from './changeTool';
import { Submit_check } from './self_item/submit_check';
import { Self_divider } from './self_item/self_divider';
import mul_tag from './self_item/mul_tag';
import RichTextEditor from './self_item/rich_text';
import { type } from 'os';

const { Provider, Sidebar, Canvas, Settings } = Generator;


const FormEdit = observer(({ HomeStore, FormStore }) => {
  const [schema, setSchema] = useState({});
  const [visible, setVisisble] = useState(false)
  const [lookItem, setLookItem] = useState({})
  const [type,setType] = useState(1)
  const { schemaList, subFormName } = FormStore
  const { formInfo } = HomeStore
  const ref = useRef();
  const refList = useRef();
  const form = useForm();
  const formList = useForm();
  useEffect(() => {
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
              <FormRender schema={item['schema']} widgets={{ self_divider: Self_divider, RichTextEditor: RichTextEditor }}
                form={formList} style={{ overflowY: 'auto' }} />
            </Tabs.TabPane>
          )
        })
      )
    }
  }
  const handleSchemaChange = (schema, index, type) => {
    
    if (type == 'root') {
      setType(1)
      let iObj = {}
      Object.keys(schema).map((key) => {
        if(key != 'properties'){
          iObj[key] = schema[key]
        }
      })
    } else {
      setType(2)
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
              onCanvasSelect={() => setType(2)}
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
                <div className='edit_main subForm' style={{ width: '100%' }} onClick={() => {
                  console.log(11);
                }}>
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
          onCanvasSelect={() => setType(1)}
          onSchemaChange={(schema) => handleSchemaChange(schema, 0, 'root')}
          extraButtons={[false, false, false, false]}
          controlButtons={[true, false, { text: 'up', onClick: (event, schema) => console.log(event, schema) }]}
          hideId={true}
          widgets={{
            link_item: Link_item,
            submit_check: Submit_check,
            self_divider: Self_divider,
            mul_tag: mul_tag,
            RichTextEditor: RichTextEditor
          }}
        >
          <div className="fr-generator-container" >
            <Sidebar />
            <div className='edit_main' style={{ width: '100%' }}>
              <Canvas />
              <Tabs type='card' className={`myTabs ${type == 2 ? 'activedSub' : ''}`} tabBarGutter={5} size='small'>
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
        <FormRender schema={lookItem} form={form} widgets={{ self_divider: Self_divider }} />
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
