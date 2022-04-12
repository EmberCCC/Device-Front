## 待解决问题
- 右侧侧边栏样式 btn 按钮

## 开发日记
- form 提交
```
// 需求布局
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

// 需求Row Col 

// form项
<Form.Item {...formItemLayout} label="订单号">
  {getFieldDecorator('key', {
    initialValue: '',
    rules: [
      {
        required: true,
        message: 'sth',
      },
    ],
  })(
    <Input placeholder="填写" 
      style={{width:'200px'}}
      disabled={status !== 'add'}
    />
  )}
</Form.Item>

// 提交
this.props.form.validateFieldsAndScroll((err, values) => {
  if (!err) {
    //...todo Sth.
  }
});

//赋值操作
this.props.form.setFieldsValue({planNumber:this.store.generateOrderId});

// 组件包裹
const WrappedDynamicRule = Form.create({})(AddModal);
export default WrappedDynamicRule;

```

# eject之后修改样式文件