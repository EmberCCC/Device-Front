/**
 * @author zyn 
 * @date 2019-07-27
 * @description 根据最新的UI封装的组件
 */
import React,{ useState } from 'react'
import classnames from 'classnames'
import './index.less'
import { omit } from 'lodash'
import { BLInput,BLButton, BLPagination, BLSelect, BLTabs , BLRadio, BLCheckbox,  
} from './methods'

function setClassNames(classNames){
  let classes = {}
  classNames = classNames ? classNames.split(' ') : []
  classNames.map(element => {
    classes[element] = true
  })
  return classes
}

const Input = props=>{
  let { className, type, ...otherProps } = props
  let classes = setClassNames(className)
  type = type || ''
  const configs = {
    className:classnames({
      'input-bl':true,
      ...classes,
    }),
    ...omit(otherProps,'type'),
  }
  return type === 'search' ? <BLInput.Search {...configs}/> :
    type === 'group' ? <BLInput.Group {...configs} /> :
      type === 'textarea' ? <span className={classnames({
          'input-bl':true,
          'ant-input-affix-wrapper':true
        })}>
          <BLInput.TextArea {...configs} />
        </span> :
        type === 'password' ? <BLInput.Password {...configs} /> :
          <span className={
            classnames({
              'input-bl':true,
              'ant-input-affix-wrapper':true
            })
          }><BLInput {...configs} /></span>
}

const Button = props =>{
  let { className, type, ...otherProps } = props
  let classes = setClassNames(className)
  type = type || 'default'
  const configs = {
    className:classnames({
      'btn-common-bl':true,
      'btn-primary-bl' : type === 'primary',
      'btn-secondary-bl': type === 'secondary' && localStorage.getItem('ownTheme') === '博拉紫',
      'btn-default-bl' : type === 'default' ,
      'btn-linear-bl' : type === 'linear' && localStorage.getItem('ownTheme') === '博拉紫',
      'btn-link-bl' : type === 'link' && localStorage.getItem('ownTheme') === '博拉紫',
      ...classes,
    }),
    ...otherProps,
  }
  return <BLButton {...configs} />
}

const Pagination = props =>{
  let { className, ...otherProps } = props
  let classes = setClassNames(className)
  const configs = {
    className:classnames({
      'pagination-bl': localStorage.getItem('ownTheme') === '博拉紫',
      ...classes,
    }),
    size:'small',
    ...otherProps,
  }
  return <BLPagination {...configs} />
}

const Select = props => {
  let { className, type, dataSource,onChange,dropdownClassName, ...otherProps } = props
  let classes = setClassNames(className)
  let dropClasses = setClassNames(dropdownClassName)
  dataSource = dataSource || []
  type = type || 'default'
  const configs = {
    className:classnames({
      'select-bl': true,
      ...classes
    }),
    dropdownClassName:classnames({
      'select-dropdown-bl': true,
      ...dropClasses
    })
  }
  return <BLSelect
    defaultValue = {dataSource.length > 0 ? dataSource[0].value : ''}
    {...configs}
    {...otherProps}
  >
    {
      dataSource.length > 0 && dataSource.map(ele=><BLSelect.Option value={ele.value} key={ele.value}>{ele.label}</BLSelect.Option>)
    }
  </BLSelect>;
}

const Tabs = props => {
  let { className, type, dataSource,onChange, ...otherProps } = props
  let classes = setClassNames(className)
  dataSource = dataSource || []
  type = type || 'line'
  const configs = {
    className:classnames({
      'tabs-card-bl': type === 'card',
      'tabs-wrapper-bl':type === 'wrapper',
      ...classes
    })
  }
  return type === 'wrapper' ? <BLRadio.Group
      defaultValue={ dataSource[0] ? dataSource[0].key : ''}
      {...configs}
      {...otherProps}
      onChange={e => onChange(e.target.value)}
    >
      {
        dataSource.length > 0 && dataSource.map(wrap=><BLRadio.Button key={wrap.key} value={wrap.key}>{wrap.tab}</BLRadio.Button>)
      }
    </BLRadio.Group> :<BLTabs 
      type = {type}
      onChange = {onChange}
      {...configs}
      {...otherProps}
    >
      {
        dataSource.length > 0 && dataSource.map(tab => <BLTabs.TabPane key={tab.key} tab={tab.tab}></BLTabs.TabPane>)
      }
    </BLTabs>
}

const Checkbox = BLCheckbox
const Radio = BLRadio

export {
  Input,
  Button,
  Pagination,
  Select,
  Tabs,
  Radio,
  Checkbox,
}
