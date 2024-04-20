import { Menu, Radio } from 'antd';
import React, { Component } from 'react'
import './index.css'
class ExpandLayout extends Component {
  render() {
    return (
      <div className='main_content'>
        <div className='side_menu'>
          <Menu>
            <Menu.Item>
              <span className='item_name'>数据标题</span>
            </Menu.Item>
            <Menu.Item>
              <span>数据日志</span>
            </Menu.Item>
            <Menu.Item>
              <span>数据评论</span>
            </Menu.Item>
            <Menu.Item>
              <span>推送提醒</span>
            </Menu.Item>
            <hr className='item_line'/>
            <Menu.Item>
              <span>提交提示</span>
            </Menu.Item>
            <Menu.Item>
              <span>打印模板</span>
            </Menu.Item>
            <Menu.Item>
              <span>智能助手</span>
            </Menu.Item>
            <Menu.Item>
              <span>数据推送</span>
            </Menu.Item>
          </Menu>
        </div>
        <div className='content'>
          <div className='content_title'>
            <span>数据标题</span>
            <span className='content_describe'>数据标题用于快速辨识一条数据，适用于数据表格首列标题、关联数据、数据详情页等功能场景中</span>
          </div>
          <div className='content_content'>
            <div>
              <Radio.Group defaultValue={1}>
                <Radio value={1}>默认标题</Radio>
                <Radio value={2}>自定义标题</Radio>
              </Radio.Group>
            </div>
            <div className='content_in'>
              <input className='content_input'></input>
            </div>
            <div>
              <button className='content_save'>保存设置</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ExpandLayout;
