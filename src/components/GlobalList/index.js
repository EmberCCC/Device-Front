/**
 * @author zyn on 0611
 * @description 覆盖list页面 包括 Tab + Checked-Tag + List
 * @param {Object} tabs - tab选择 - 包括数据源dataSource、事件处理
 * @param {Object} Table - table选择 - 包括数据源dataSource、事件处理
 * @param {Object} CheckedTag - checked-tag 选择 - 包括数据源dataSource、事件处理
 * @param {Object} Modal - 弹窗 - 包含：
 *    isForm {Boolean} - 判断是否children需要判断对应的
 */
import React from 'react'
import Tabs from './Tabs'
import Table from './Table'
import CheckedTag from './CheckedTag'
import GlobalModal from '../GlobalModal'
import './index.less'
import { isEmpty } from 'lodash'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

/* 默认form表单布局 */
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
class GlobalList extends React.Component {
  render() {
    const { tabs, checkedTag, table, modal, } = this.props
    const { getFieldDecorator } = this.props.form
    return <div className='global-list-container'
    >
      {!isEmpty(tabs) && <Tabs
        {...tabs}
      />}
      {!isEmpty(checkedTag) && <CheckedTag
        {...checkedTag}
      />}
      <Table
        {...table}
      />
      {
        !isEmpty(modal) && modal.visible && <GlobalModal
          {...modal}
          onOk={this.onSubmit}
          children={
            modal.isForm ?
              <React.Fragment>
                {
                  modal.formColumns && modal.formColumns.map((item, i) => {
                    return !item.displayNone && <Form.Item {...(modal.formItemLayout || formItemLayout)}
                      label={item.label}
                      key={item.key}
                      {...item}
                    >
                      {item.getFieldDecorator ? getFieldDecorator(`${item.key}`, {
                        ...item.getFieldDecorator
                      })(
                        item.value
                      ) : item.value}
                    </Form.Item>
                  })
                }
                {
                  /* 扩展formitem - 用于页面需求罗列的选项框 */
                  modal.extendFormColumns && modal.extendFormColumns.length > 0 && modal.extendFormColumns.map(item => {
                    return <Form.Item {...(modal.formItemLayout || formItemLayout)}
                      label={`${item.label}`}
                      key={item.id}
                    >
                      {getFieldDecorator(`${item.key}-${item.id}`, {
                        rules: [
                          {
                            required: true,
                          }
                        ],
                        ...item.getFieldDecorator
                      })(
                        item.value
                      )}
                      {item.extChild && item.extChild}
                    </Form.Item>
                  })
                }
                {
                  modal.otherContent && modal.otherContent
                }
              </React.Fragment>
              : modal.children
          }
        />
      }
    </div>
  }
  onSubmit = () => {
    if (this.props.modal.isForm) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.props.modal.onOk(values)
        }
      });
    } else {
      this.props.modal.onOk()
    }
  }
}

const WrapperList = Form.create({})(GlobalList)
export default WrapperList;