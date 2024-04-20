import React from 'react';
import './index.less';
import { Button } from 'antd';
export default class GlobalFooter extends React.Component{
  render(){
    const { btns,...otherProps } = this.props;
    return <div className='bl_footer'>
      {
        btns.map((btn,i)=>{
          return <Button 
            type={btn.type} 
            key={i}
            onClick={btn.onClick}
            {...otherProps}
          >{btn.name}</Button>
        })
      }
    </div>
  }
}