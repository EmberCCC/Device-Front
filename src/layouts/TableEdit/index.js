/*
 * @Author: your name
 * @Date: 2022-03-22 09:57:59
 * @LastEditTime: 2022-04-11 14:55:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage\src\layouts\TableEdit\index.js
 */

import React, { Component } from 'react';
import { Tag, Layout, Button, Modal, message, Form, Input, Select, Menu } from 'antd';
// Default SortableJS
import Sortable from 'react-sortablejs';
import _ from 'lodash';
import uniqueId from 'lodash/uniqueId';
import update from 'immutability-helper';
import { indexToArray, getItem, setInfo, isPath, getCloneItem, itemRemove, itemAdd, changeObj } from '../../utils/loashTools';
import { formItemData, GlobalComponent } from './config';
import EditableTable from './EditableTable/index';
import './index.css'
import { NavLink } from 'react-router-dom';
import { toJS } from 'mobx';
import * as services from '../../services/home';
import { typeName } from 'constants/status_constant';
import { inject, observer } from 'mobx-react';


const { Header, Sider, Content } = Layout;
const { Option } = Select;
const sortableOption = {
  animation: 20,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  group: {
    name: 'formItem',
    pull: true,
    put: true,
  },
};


@inject('BasicStore')
@inject('HomeStore')
@observer
class EditPage extends Component {
  state = {
    newObj :[],
    curItemKey :'',
    curItemName : '',
    curItemType : '',
    isChoose : false
  }
  render() {
    const {firstFormId} = this.props.HomeStore;                  // 组件数据
    let obj = this.state.newObj

    const handleLabelChange = (e) => {
      const val = e.target.value;
      this.setState({
        curItemName : val
      })
      obj[this.state.curItemKey].label = val;
      this.setState({
        newObj:obj
      })
    }

    const handleDel = () => {
      let newTreeData = itemRemove(this.state.curItemKey, obj);
      this.setState({
        curItemKey :'',
        curItemName :'',
        curItemType :''
      })
      console.log(newTreeData);
      this.setState({
        newObj:newTreeData
      })
    }

    const sortableChoose = (e) => {
      console.log(e)
      this.setState({
        isChoose : true
      })
      const curKey = e.item.getAttribute('data-id');
      const curName = e.item.firstChild.innerText;
      const curType = e.item.getAttribute('type');
      this.setState({
        curItemKey :curKey,
        curItemName :curName,
        curItemType :curType
      })
    };

    // 拖拽的添加方法
    const sortableAdd = e => {
      // 组件名或路径
      const nameOrIndex = e.clone.getAttribute('data-id');
      // 父节点路径
      const parentPath = e.path[1].getAttribute('data-id');
      // 拖拽元素的目标路径
      const { newIndex } = e;
      // 新路径 为根节点时直接使用index
      const newPath = parentPath ? `${parentPath}-${newIndex}` : newIndex;
      console.log('nameOrIndex:' + nameOrIndex, 'parentPath:' + parentPath, 'newIndex:' + newIndex, 'newPath:' + newPath)
      // 判断是否为路径 路径执行移动，非路径为新增
      if (isPath(nameOrIndex)) {
        // 旧的路径index
        const oldIndex = nameOrIndex;
        // 克隆要移动的元素
        const dragItem = getCloneItem(oldIndex, this.state.newObj)
        // 比较路径的上下位置 先执行靠下的数据 再执行靠上数据
        if (indexToArray(oldIndex) > indexToArray(newPath)) {
          // 删除元素 获得新数据
          let newTreeData = itemRemove(oldIndex, this.state.newObj);
          // 添加拖拽元素
          newTreeData = itemAdd(newPath, newTreeData, dragItem)
          // 更新视图
          this.setState({
            newObj:newTreeData
          })
          console.log(this.state.newObj);
          return
        }
        // 添加拖拽元素
        let newData = itemAdd(newPath, this.state.newObj, dragItem)
        // 删除元素 获得新数据
        newData = itemRemove(oldIndex, newData);
        this.setState({
          newObj:newData
        })
        console.log(this.state.newObj);
        return
      }

      // 新增流程 创建元素 => 插入元素 => 更新视图
      const id = nameOrIndex
      const newItem = _.cloneDeep(formItemData.find(item => (item.name === id)))
      // 为容器或者弹框时增加子元素
      if (newItem.name === 'Containers') {
        const ComponentsInfo = _.cloneDeep(GlobalComponent[newItem.name])
        // 判断是否包含默认数据
        newItem.children = [ComponentsInfo]
      }
      let Data = itemAdd(newPath, this.state.newObj, newItem)
      this.setState({
        newObj:Data
      })
      obj = this.state.newObj
    };

    // 拖拽的排序方法
    const sortableUpdate = e => {
      console.log(obj);
      // 交换数组
      const { newIndex, oldIndex } = e;
      // 父节点路径
      const parentPath = e.path[1].getAttribute('data-id');
      // 父元素 根节点时直接调用data
      let parent = parentPath ? getItem(parentPath, this.state.newObj) : this.state.newObj;
      // 当前拖拽元素
      const dragItem = parent[oldIndex];
      // 更新后的父节点
      parent = update(parent, {
        $splice: [[oldIndex, 1], [newIndex, 0, dragItem]],
      });
      // 最新的数据 根节点时直接调用data
      const Data = parentPath ? setInfo(parentPath, this.state.newObj, parent) : parent
      console.log(Data);
      // 调用父组件更新方法
      this.setState({
        newObj:Data
      })
    };


    // 递归函数
    const loop = (arr, index) => {
      return (
        arr.map((item, i) => {
          const indexs = index === '' ? String(i) : `${index}-${i}`;
          if (item) {
            if (item.children) {
              return (
                <div {...item.attr} data-id={indexs} key={indexs}>
                  <Sortable
                    key={uniqueId()}
                    style={{ minHeight: 100, margin: 10 }}
                    ref={c => c && c.sortable}
                    options={{
                      ...sortableOption,
                      onUpdate: e => sortableUpdate(e),
                      onAdd: e => sortableAdd(e),
                      onChoose: e => sortableChoose(e),
                      onSort: e => this.setState({
                        isChoose : false
                      }),
                    }}
                  >
                    {loop(item.children, indexs)}
                  </Sortable>
                </div>
              )
            }
            const ComponentInfo = GlobalComponent[item.name]
            return (
              <div
                data-id={indexs}
                key={indexs}
                type={item.name}
                className='formItemStyle'
                style={(this.state.isChoose && indexs === this.state.curItemKey) ? { border: '1px solid #FF3333' } : {}}
              >
                {
                  item.name !== 'Divider' &&
                  <div className='formItemLabel'>{this.state.isChoose ? (indexs === this.state.curItemKey ? this.state.curItemName : item.label) : item.label}</div>
                }
                {
                  renderDiffComponents(item, indexs, ComponentInfo)
                }
              </div>
            )
          } else {
            return null
          }
        })
      )
    };

    const renderDiffComponents = (item, indexs, ComponentInfo) => {
      switch (item.name) {
        case 'Divider':
          return <ComponentInfo key={indexs} {...item.attr}></ComponentInfo>
        case 'Select':
          return (
            <ComponentInfo key={indexs} defaultValue={item.attr.value}>
              {
                item.attr.options.map(subItem => <Option key={subItem.key} value={subItem.value + ''}>{subItem.label}</Option>)
              }
            </ComponentInfo>
          )
        default:
          return <ComponentInfo key={indexs} {...item.attr} />
      }
    }

    const getDataSource = (options) => {
      obj[this.state.curItemKey].attr.options = [...options];
      this.obj = obj
    }

    const save = (params) => {
      Modal.confirm({
        title: '提示',
        content: '是否修改该表单',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          try {
            let res = services.putRequest(services.requestList.updataField, params);
            message.success('修改成功')
          } catch (error) {
            console.log(error);
          }

        },
        onCancel() {
          console.log('Cancel');
        },
      });

    }

    const saveForm = () => {
      let text = []
      obj.map((element, index) => {
        text.push(changeObj(firstFormId, 0, element, index))
      });
      console.log(text);
      save(text)
    }
    return (
      <Layout>
        <Header className="header">
          <NavLink to='/basic'><Button type='dashed' className='backButton'>Back</Button></NavLink>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} justify='center' className='headerMenu'>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
          <Button onClick={saveForm}>保存</Button>
        </Header>
        <Layout>
          <Sider width={'15%'} style={{ height: '100%', borderLeft: 10, minHeight: 840, marginTop: 20, textAlign: 'center' }} theme='light'>
            <h3 className='textHead'>组件列表</h3>
            <Sortable
              options={{
                group: {
                  name: 'formItem',
                  pull: 'clone',
                  put: false,
                },
                sort: false,
              }}
            >
              {
                formItemData.map(item => (
                  <div
                    data-id={item.name}
                    key={item.name}
                    style={{ marginTop: 10 }}
                  >
                    <Tag>{item.label + '-' + item.name}</Tag>
                  </div>
                ))
              }
            </Sortable>
          </Sider>
          <Layout style={{ padding: '0 24px 24px', marginTop: 20 }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 300,
              }}
            >
              <Sortable
                className='formContent'
                ref={c => c && c.sortable}
                options={{
                  ...sortableOption,
                  onUpdate: e => sortableUpdate(e),
                  onAdd: e => sortableAdd(e),
                  onChoose: e => sortableChoose(e),
                  onSort: e => this.setState({
                    isChoose : false
                  }),
                }}
                key={uniqueId()}
                style={{ minHeight: '100%' }}
              >
                {loop(this.state.newObj, '')}
              </Sortable>
            </Content>
            <Sider theme='light' width={'20%'} style={{ textAlign: 'center' }}>
              <h3 className='textHead'>字段设置</h3>
              <Form className='itemForm'>
                <Form.Item label="组件Key">
                  <Input value={this.state.curItemKey} disabled />
                </Form.Item>
                <Form.Item label="标签名">
                  <Input value={this.state.curItemName} disabled={!this.state.isChoose} onChange={handleLabelChange} />
                </Form.Item>
                {
                  ['CheckboxGroup', 'RadioGroup', 'Select'].includes(this.state.curItemType) &&
                  <EditableTable
                    getDataSource={getDataSource}
                    curItemKey={this.state.curItemKey}
                    options={this.state.newObj[this.state.curItemKey].attr.options}
                    disabled={!this.state.isChoose}
                  />
                }
              </Form>
              <Button className='delBtn' onClick={handleDel} disabled={!this.state.isChoose}>删除</Button>
            </Sider>
          </Layout>
        </Layout>
      </Layout>
    );
  }
  componentWillMount(){
    const { itemDataT, secondFormId } = this.props.HomeStore;
    let arr = []
    if (itemDataT.length != 0) {
      let newObj = itemDataT.filter((txt)=>{
        return txt.secondFormId == secondFormId
      })
      newObj[0].properties.map((txt)=>{
        if (txt.propertyId != undefined) {
          let ele = {}
          ele.secondFormId = toJS(secondFormId)
          ele.label = txt.name
          ele.attr = toJS(txt.others)
          ele.propertyId = txt.propertyId
          ele.name = typeName[txt.typeId]
          arr.push(ele)
        }else{
          arr.push(txt)
        }
      })
    }
    this.setState({
      newObj:toJS(arr)
    })
  }
}

export default EditPage;