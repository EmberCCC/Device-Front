/*
 * @Author: your name
 * @Date: 2022-04-07 11:58:39
 * @LastEditTime: 2022-04-11 13:42:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\components\GlobalTabel\index.js
 */
import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography ,Modal, message,Divider } from 'antd';
import { toJS } from 'mobx';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td>
      {editing ? (
        <Form.Item
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const GlobalTabel = (props) => {
  const [form] = Form.useForm();
  const data = props.dataSource
  const firstFormId = props.firstFormId
  const secondFormId = props.secondFormId
  const [editingKey, setEditingKey] = useState('');
  const del = props.del
  const getData = props.getData
  const updataData = props.updataData
  let isLoading = props.loading
  let page = { pageIndex: 1, pageSize: 2 }
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = (e) => {
    console.log(e.current);
    console.log(page);
    page.pageIndex = e.current;
    getData(page)
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        let params = {}
        params.firstFormId = firstFormId
        params.secondFormId = secondFormId
        params.dataId = item.id.toString()
        console.log(toJS(data[index]));
        Modal.confirm({
          title: '提示',
          content: '是否确认修改该条数据',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            getData(page)
            message.success('修改成功')
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    
        updataData(params)
        newData.splice(index, 1, { ...item, ...row });
      } else {
        newData.push(row);
      }
      setEditingKey('');
      getData(page)
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const deleteRecord = (txt) => {
    let params = {}
    params.firstFormId = firstFormId
    params.secondFormId = secondFormId
    params.dataId = (txt.id).toString()
    Modal.confirm({
      title: '提示',
      content: '是否确认删除该条数据',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        del(params)
        getData(page)
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
  if (text != undefined && !('align' in text) ) {
    obj.push(text)
  }
  obj.push({
    align: 'right',
    width:'20%',
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
          <Divider type='vertical'/>
          <a onClick={() =>deleteRecord(record)}>Delete</a>
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

  for (let index = 0; index < columns.length - 4; index++) {
    const element = columns[index];
    element.editable = true
  }
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
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
        onChange={cancel}
        loading={isLoading}
      />
    </Form>
  );


};

export default GlobalTabel

