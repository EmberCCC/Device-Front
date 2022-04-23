/*
 * @Author: your name
 * @Date: 2022-04-07 11:58:39
 * @LastEditTime: 2022-04-23 14:20:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\components\GlobalTabel\index.js
 */
import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Form, Select, Modal, message, Divider } from 'antd';
import { toJS } from 'mobx';
import { GlobalComponent } from 'layouts/TableEdit/config';
import { typeName } from 'constants/status_constant';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  itemData,
  ...restProps
}) => {
  if (index != undefined) {
    let item = itemData[index];
    const ComponentInfo = GlobalComponent[item.name]
    let re = toJS(record)
    return (
      <td>
        {editing ? (
          <Form.Item
            key={index}
            name={item.label}
            className='formItemStyle'
            width='20%'
          >
            {
              renderDiffComponents(item, index, ComponentInfo, re[item.propertyId] || '')
            }
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  }
  return (
    <td>
      {children}
    </td>
  );
};
const { Option } = Select;
const renderDiffComponents = (item, indexs, ComponentInfo, value) => {
  console.log(item);
  switch (item.name) {
    case 'Divider':
      return <ComponentInfo key={indexs} {...item.attr}></ComponentInfo>
    case 'Select':
      return (
        <ComponentInfo key={indexs}>
          {
            item.attr.options.map(subItem => <Option key={subItem.key} value={subItem.value + ''}>{subItem.label}</Option>)
          }
        </ComponentInfo>
      )
    default:
      return <ComponentInfo key={indexs} {...item.attr} />
  }
}
const GlobalTabel = (props) => {
  const [form] = Form.useForm();
  const data = props.dataSource
  const firstFormId = props.firstFormId
  const secondFormId = props.secondFormId
  const itemDataT = props.itemDataT;
  const [editingKey, setEditingKey] = useState('');
  const del = props.del
  const getData = props.getData
  const updataData = props.updataData
  let isLoading = props.loading
  let page = { pageIndex: 1, pageSize: 2 }
  let itemData = []
  useEffect(() => {
    page = { pageIndex: 1, pageSize: 2 }
  }, []);
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    setEditingKey(record.key);
  };

  const pageChange = (e) => {
    page.pageIndex = e.current;
    getData(page);
    setEditingKey('');
  };

  const cancel = (e) => {
    // getData(page);
    itemData = []
    setEditingKey('');
  };

  const changeField = () => {
    let obj = []
    if (itemDataT.length != 0) {
      let itemData1 = itemDataT.filter(function (txt) {
        return txt.secondFormId == secondFormId
      })
      if (itemData1.length == 0) {
        return [];
      }
      toJS(itemData1)
      if (itemData1[0].properties != undefined && itemData1[0].properties.length != 0) {
        let properties = {}
        properties = toJS(itemData1[0].properties)
        properties.forEach(element => {
          let ele = {}
          ele.label = element.name
          ele.attr = element.others
          // delete ele.attr.value
          ele.propertyId = element.propertyId
          ele.name = typeName[element.typeId]
          obj.push(ele)
        });
      } else {
        itemData = []
        return []
      }
    }
    itemData = obj
    return obj
  }
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
      } else {
        newData.push(row);
      }
      const item = newData[index];
      let params = {}
      params.firstFormId = firstFormId.toString()
      params.secondFormId = secondFormId.toString()
      params.dataId = item.id.toString()
      Modal.confirm({
        title: '提示',
        content: '是否确认修改该条数据',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          let newObj = {}
          Object.keys(itemData).map((obj) => {
            newObj[itemData[obj].propertyId] = itemData[obj].attr.value
          })
          params.updateData = newObj
          itemData = []
          updataData(params)
          getData(page);
          setEditingKey('')
          message.success('修改成功')
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const deleteRecord = (txt) => {
    let params1 = {}
    let params2 = {}
    params1.firstFormId = firstFormId
    params2.firstFormId = firstFormId
    params1.secondFormId = secondFormId
    params1.dataId = (txt.id).toString()
    Modal.confirm({
      title: '提示',
      content: '是否确认删除该条数据',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        del(params1)
        getData(page)
        props.countObj(params2);
        setEditingKey('')
        message.success('删除成功')
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const columns = props.columns
  let obj = columns
  const text = obj.pop()
  if (text != undefined && !('align' in text)) {
    obj.push(text)
  }
  obj.push({
    align: 'right',
    width: '20%',
    title: '操作',
    dataIndex: '操作',
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <a
            onClick={() => save(record.key)}
            style={{
              marginRight: 8,
            }}
          >
            Save
          </a>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <a>Cancel</a>
          </Popconfirm>
          <Divider type='vertical' />
          <a onClick={() => deleteRecord(record)}>Delete</a>
        </span>
      ) : (
        <span>
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </a>
        </span>
      );
    },
  })
  changeField();
  for (let index = 0; index < columns.length - 4; index++) {
    const element = columns[index];
    element.editable = true
  }

  const handleLabelChange = (e) => {
    console.log(e);
    const x = Object.keys(e);
    itemData.map(item => {
      if (item.label == x[0]) {
        item.attr.value = e[x[0]];
      }
    })
  }

  const mergedColumns = columns.map((col, index) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.type,
        dataIndex: col.dataIndex,
        title: col.title,
        index: index,
        itemData: itemData,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false} onValuesChange={handleLabelChange}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={props.PageInfo}
        onChange={pageChange}
        loading={isLoading}
        scroll={{x:200}}
      />
    </Form>
  );


};

export default GlobalTabel

