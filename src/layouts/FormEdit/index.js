/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-01 20:45:23
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-06 15:58:47
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BulbTwoTone, CloseOutlined } from '@ant-design/icons';
import { Drawer, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import { defaultCommonSetting, defaultGlobalSettings, defaultSettings } from 'constants/field_config';
import Generator from 'fr-generator';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link_item } from './self_item/link_item';
import { toJS } from 'mobx';
import './index.css'
import { exChange, restore } from './changeTool';



const FormEdit = observer(({ HomeStore, FormStore }) => {
  const [schema,setSchema] = useState({});
  const [visible, setVisisble] = useState(false)
  const [lookItem, setLookItem] = useState({})
  const ref = useRef();
  const form = useForm();
  useEffect(() => {
    FormStore.getFormField({ formId: HomeStore.firstFormId }).then(() => {
      console.log(toJS(FormStore.formField));
      setSchema(restore(toJS(FormStore.formField)))
    });
  }, []);
  const look = () => {
    setLookItem(ref.current.getValue())
    setVisisble(true);
  }
  const save = () => {
    let params = exChange(ref.current.getValue(), HomeStore.firstFormId)
    FormStore.saveForm(params).then(() => {
      message.success('保存成功')
    })
    console.log(params);
  }
  const closeDrawer = () => {
    setVisisble(false)
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
      <div className="fr-generator-playground" style={{ height: '90vh' }}>
        <Generator
          ref={ref}
          defaultValue={schema['root']}
          settings={defaultSettings}
          commonSettings={defaultCommonSetting}
          globalSettings={defaultGlobalSettings}
          extraButtons={[false, false, false, false]}
          widgets={{
            link_item: Link_item
          }}
        />
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
      </Drawer>
    </>
  );
});

export default inject((stores) => ({ HomeStore: stores.HomeStore, FormStore: stores.FormStore }))(FormEdit);
