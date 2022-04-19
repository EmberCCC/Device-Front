/*
 * @Author: your name
 * @Date: 2022-03-22 09:57:59
 * @LastEditTime: 2022-04-19 22:38:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage\src\layouts\TableEdit\index.js
 */

import React, { Component } from 'react';
import { Tag, Layout, Button, Modal, message, Form, Input, Select, Tabs, InputNumber } from 'antd';
import { EditOutlined } from '@ant-design/icons';
// Default SortableJS
import Sortable from 'react-sortablejs';
import _ from 'lodash';
import uniqueId from 'lodash/uniqueId';
import update from 'immutability-helper';
import { indexToArray, getItem, setInfo, isPath, getCloneItem, itemRemove, itemAdd, changeObj } from '../../utils/loashTools';
import { formItemData, GlobalComponent } from './config';
import EditableTable from './EditableTable/index';
import './index.css'
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


@inject('HomeStore')
@observer
class EditPage extends Component {
  state = {
    totalObj: [],
    newObj: [],
    curItemKey: '',
    curItemName: '',
    curItemType: '',
    curItemMention: '',
    curItemDescripe: '',
    isChoose: false
  }
  render() {
    const { firstFormId, secondFormId } = this.props.HomeStore;                  // 组件数据
    const { TabPane } = Tabs;
    let obj = this.state.newObj

    const handleLabelChange = (e) => {
      const val = e.target.value;
      this.setState({
        curItemName: val
      })
      obj[this.state.curItemKey].label = val;
      this.setState({
        newObj: obj
      })
    }

    const handleMentionChange = (e) => {
      const val = e.target.value;
      this.setState({
        curItemMention: val
      })
      obj[this.state.curItemKey].attr.placeholder = val;
      this.setState({
        newObj: obj
      })
    }

    const handleDescripeChange = (e) => {
      const val = e.target.value;
      this.setState({
        curItemDescripe: val
      })
      obj[this.state.curItemKey].attr.descripe = val;
      this.setState({
        newObj: obj
      })
    }

    const handleDel = () => {
      let newTreeData = itemRemove(this.state.curItemKey, obj);
      this.setState({
        curItemKey: '',
        curItemName: '',
        curItemType: ''
      })
      this.setState({
        newObj: newTreeData
      })
    }

    const sortableChoose = (e) => {
      console.log(this.state.newObj);
      console.log(e)
      this.setState({
        isChoose: true
      })
      const curKey = e.item.getAttribute('data-id');
      const curName = e.item.firstChild.innerText;
      const curType = e.item.getAttribute('type');
      const curMention = e.item.getAttribute('mention');
      const curDescripe = e.item.getAttribute('descripe');
      this.setState({
        curItemKey: curKey,
        curItemName: curName,
        curItemType: curType,
        curItemMention: curMention,
        curItemDescripe: curDescripe
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
            newObj: newTreeData
          })
          return
        }
        // 添加拖拽元素
        let newData = itemAdd(newPath, this.state.newObj, dragItem)
        // 删除元素 获得新数据
        newData = itemRemove(oldIndex, newData);
        this.setState({
          newObj: newData
        })
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
        newObj: Data
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
      // 调用父组件更新方法
      this.setState({
        newObj: Data
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
                        isChoose: false
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
                mention={item.attr.placeholder ? item.attr.placeholder : ''}
                className='formItemStyle'
                style={(this.state.isChoose && indexs === this.state.curItemKey) ? { border: '1px solid blue', borderRadius: '5px' } : {}}
              >
                {
                  item.name !== 'Divider' &&
                  <div className='formItemLabel'>{this.state.isChoose ? (indexs === this.state.curItemKey ? this.state.curItemName : item.label) : item.label}</div>
                }
                {
                  item.attr.descripe &&
                  <div className='formItemDescripe'>{item.attr.descripe}</div>
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
      this.setState({
        newObj: obj
      })
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
          console.log(params);
          console.log('Cancel');
        },
      });

    }

    const saveForm = () => {
      let test = this.state.totalObj.filter((item) => {
        return item.secondFormId != secondFormId
      })
      this.state.newObj.map((item, index) => {
        item.secondFormId = secondFormId
        item.order = (index + 1).toString()
        test.push(item)
      })
      this.setState({
        totalObj: test
      })
      let arr = test
      let text = []
      arr.map((element) => {
        text.push(changeObj(firstFormId, element))
      });
      console.log(text);
      save(text)
    }

    const changeTabs = (e) => {
      let test = this.state.totalObj.filter((item) => {
        return item.secondFormId != secondFormId
      })
      this.state.newObj.map((item, index) => {
        item.secondFormId = secondFormId
        item.order = (index + 1).toString()
        test.push(item)
      })
      let arr = []
      arr = this.state.totalObj.filter((item) => {
        return item.secondFormId == Number(e)
      })
      this.setState({
        totalObj: test,
        newObj: arr
      })
      this.props.HomeStore.changeSecondFormId(Number(e))
    }
    return (
      <Layout>
        <Header className="header">
          <Button>新手引导</Button>
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
              <Tabs size='large' activeKey={this.props.HomeStore.secondFormId.toString()} onChange={changeTabs}>
                {this.props.HomeStore.itemDataT.map((item, index) => {
                  return <TabPane tab={<div><EditOutlined />{item.secondFormId + 1}</div>} key={(index).toString()} />
                })}
              </Tabs>
              <Sortable
                className='formContent'
                ref={c => c && c.sortable}
                options={{
                  ...sortableOption,
                  onUpdate: e => sortableUpdate(e),
                  onAdd: e => sortableAdd(e),
                  onChoose: e => sortableChoose(e),
                  onSort: e => this.setState({
                    isChoose: false
                  }),
                }}
                key={uniqueId()}
                style={{ minHeight: '100%' }}
              >

                {loop(this.state.newObj, '')}
              </Sortable>
            </Content>
            <Sider theme='light' width={'20%'} style={{ textAlign: 'center' }}>
              <h3 className='textHead'>字段属性</h3>
              <Form className='itemForm'>
                <Form.Item label="标签名">
                  <Input value={this.state.curItemName} disabled={!this.state.isChoose} onChange={handleLabelChange} />
                </Form.Item>
                <Form.Item label="提示文字">
                  <Input value={this.state.curItemMention} disabled={!this.state.isChoose} onChange={handleMentionChange} />
                </Form.Item>
                <Form.Item label="描述信息">
                  <Input value={this.state.curItemDescripe} disabled={!this.state.isChoose} onChange={handleDescripeChange} />
                </Form.Item>
                <Form.Item label="格式">
                  <Input disabled={!this.state.isChoose} />
                </Form.Item>
                <Form.Item label="默认值">
                  <Input disabled={!this.state.isChoose} />
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
  componentWillMount() {
    const { secondFormId, firstFormId } = this.props.HomeStore;
    let params = {};
    params.firstFormId = firstFormId;
    this.props.HomeStore.queryField(params)
    let arr = []
    let newArr = []
    if (this.props.HomeStore.itemDataT.length != 0) {
      this.props.HomeStore.itemDataT.map((item, index) => {
        let order = 1;
        if (item.properties != undefined && item.properties.length != 0) {
          item.properties.map((txt) => {
            let ele = {}
            ele.secondFormId = toJS(item.secondFormId)
            ele.label = txt.name
            ele.attr = toJS(txt.others)
            ele.propertyId = txt.propertyId || ""
            ele.name = typeName[txt.typeId]
            ele.order = (order++).toString();

            arr.push(ele)
            if (ele.secondFormId == secondFormId) {
              newArr.push(ele)
            }
          })
        }
      })
    }
    this.setState({
      newObj: newArr,
      totalObj: toJS(arr)
    })
  }
}

export default EditPage;