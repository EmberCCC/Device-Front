import React from 'react'
import { Tabs } from 'antd'

const { TabPane } = Tabs

export default class TabContent extends React.Component{
  render(){
    const { dataSource,onChange,keyName,tabName,level,...otherProps } = this.props
    return dataSource.length > 0 && <Tabs 
      defaultActiveKey={dataSource[0][keyName].toString()} 
      onChange={onChange}
      {...otherProps}
    >
      {
        dataSource.map(tab => !tab.displayNone && 
        <TabPane key={level === 'menu' ? `${tab[keyName]}-${tab[tabName]}` : tab[keyName]}
          tab={tab[tabName]} 
        >
        </TabPane>)
      }
    </Tabs>
  }
}