import React,{PureComponent} from 'react';
import { Table } from 'antd';
import { omit,isEmpty } from 'lodash';

export default class TableLayout extends PureComponent {
  render(){
    const { pagination,...otherProps} = this.props;
    return <Table
      size='middle'
      {...otherProps}
      locale={{emptyText:'暂无数据'}}
      pagination={
        !isEmpty(pagination) ? pagination.total > 10 && {
          ...omit(pagination,'pageIndex'),
          current:pagination.pageIndex,
          showTotal:(total,range)=>{
            return <div style={{lineHeight:'26px'}}>
              总共{total}条，每页10条
            </div>
          }
        } : false
      }
      
    />
  }
}
