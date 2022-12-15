import React, { Component , useEffect, useRef, useState} from 'react'
import {Tabs} from 'antd'
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';

const Tab = observer(({FormStore})=> {
  const [schemaList,setSchemaList]=useState(toJS(FormStore.schemaList))
  useEffect(() => {
    setSchemaList(FormStore.schemaList)
  }, [FormStore.schemaList])
  const onChange=(e)=>{
    console.log(e)
    const lastChoose=toJS(FormStore.tabLastChoose)
    FormStore.changeFormEditSchema(e,lastChoose)
    FormStore.setValue('tabLastChoose',e)
  }
  return (
      <Tabs
      defaultActiveKey={FormStore.tabLastChoose}
      onChange={onChange}
      items={schemaList}
      tabBarGutter={'10px'}
      type='card'
    />
  )

})
export default inject((store) => ({ FormStore: store.FormStore }))(Tab);