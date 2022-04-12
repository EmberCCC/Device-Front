/**
 * 首页豆腐块配置 连接到主页面
 */
import React from 'react';
import './index.less';
import { Empty, Card, Button, Modal } from 'antd';
import LineChart from './LineChart'
import PieChart from './PieChart'
import AreaCharts from './AreaCharts'
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@withRouter
@inject('HomeStore')
@observer
class HomePage extends React.Component {
  state = {
    isShow: false
  };
  render() {
    const { devInfo, workInfo, staffInfo } = this.props.HomeStore
    return (
      <div className='home_index'>
        <div className='home_page_title'>
          <div className='title_tag'>
            <div className='title_tag_left'>
              <span style={{ flex: 1, textAlign: 'right' }}>{this.getNumber(1)}</span>
              <div style={{ background: 'rgba(98,54,255,1)', width: 27, height: 7 }}></div>
            </div>
            <div className='title_tag_right'>
              <h3>当前未派工单</h3>
              <div>
                <img src='https://assets-boranet.oss-cn-hangzhou.aliyuncs.com/img/waiting.png' alt='待派' />
              </div>
            </div>
          </div>
          <div className='title_tag'>
            <div className='title_tag_left'>
              <span style={{ flex: 1, textAlign: 'right' }}>{this.getNumber(2)}</span>
              <div style={{ background: 'rgba(98,54,255,1)', width: 27, height: 7 }}></div>
            </div>
            <div className='title_tag_right'>
              <h3>当前进行中工单</h3>
              <div>
                <img src='https://assets-boranet.oss-cn-hangzhou.aliyuncs.com/img/doing.png' alt='进行中' />
              </div>
            </div>
          </div>
          <div className='title_tag'>
            <div className='title_tag_left'>
              <span style={{ flex: 1, textAlign: 'right' }}>{this.getNumber(3)}</span>
              <div style={{ background: 'rgba(98,54,255,1)', width: 27, height: 7 }}></div>
            </div>
            <div className='title_tag_right'>
              <h3>当前待结工单</h3>
              <div>
                <img src='https://assets-boranet.oss-cn-hangzhou.aliyuncs.com/img/done.png' alt='当前待结工单' />
              </div>
            </div>
          </div>
          <div className='title_tag'>
            <div className='title_tag_left'>
              <span style={{ flex: 1, textAlign: 'right' }}>{this.getNumber(4)}</span>
              <div style={{ background: 'rgba(98,54,255,1)', width: 27, height: 7 }}></div>
            </div>
            <div className='title_tag_right'>
              <h3>本周已结工单</h3>
              <div>
                <img src='https://assets-boranet.oss-cn-hangzhou.aliyuncs.com/img/success.png' alt='本周已结工单' />
              </div>
            </div>
          </div>
        </div>
        <div className="chart_content">
          <div style={{ width: '60%', float: 'left' }}>
            <h3>
              <span></span>最近7天已结
          </h3>
            {workInfo.length ? <LineChart /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无数据'} />}
          </div>
          <div style={{ width: '38%', float: 'right' }}>
            <h3>
              <span></span>设备分布
          </h3>
            {devInfo.length ? <PieChart /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无数据'} />}
          </div>
        </div>
        <div className="chart_content">
          <div style={{ width: '100%' }}>
            <h3>
              <span></span>人员维修情况
          </h3>
            {staffInfo.length ? <AreaCharts /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无数据'} />}
          </div>
        </div>
      </div>
    )
  }

  getNumber = (e) => {
    const { addInfo } = this.props.HomeStore
    let number = 0
    addInfo.map(item => {
      if (item.status === e) {
        number = item.number
        return
      }
    })
    return number
  }
  componentDidMount() {
    this.props.HomeStore.getOddCount()
    this.props.HomeStore.deviceInfo()
    this.props.HomeStore.getStaffInfo()
    this.props.HomeStore.workEndInfo()
  }
}

export default HomePage;


