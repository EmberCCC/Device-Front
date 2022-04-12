/**
 * @description 甘特图组件
 * @author zyn on 0523
 * @param {Object} dataSource - 甘特图数据源  类似下面格式
 * {
      data: [
          { id: 1, equipName: '压铸机', capacity: 500, text:500,start_date:'2019-04-21',open:true },
          { id: 2, equipName: '压铸机02', capacity: 500, duration: 2,start_date:'2019-04-25',text:300, progress: 0.4 },
          { id:101, equipName:"压铸机 #1", capacity:200,text:200,process:0.5, start_date:"2019-04-21", duration:2,parent:1}
      ],
      links: [
          { id: 1, source: 1, target: 2, type: '0' }
      ]
    }
 * @param {String} className - 类名
 * @param {Array} dataSource - 数据源
 */

import React from 'react';
import Gantt from './Gantt';
import Toolbar from './Toolbar';

class GlobalGantt extends React.Component{
  state = {
    currentZoom:'Days',
    currentZoomZH:'天'
  }
  render(){
    const { dataSource,className,style,...otherProps } = this.props;
    const { currentZoomZH,currentZoom } = this.state;
    return <div className={className}
      style={style}
    >
      <div className="zoom-bar">
        <Toolbar zoom={currentZoomZH} onZoomChange={this.handleZoomChange} />
      </div>
      <div  className="gantt-container">
      <Gantt 
        tasks={dataSource} 
        zoom={currentZoom} 
        {...otherProps} />
      </div>
    </div>
  }
  handleZoomChange = (zoom) => {
    let current = '';
    switch(zoom){
      case '小时':current = 'Hours';
        break;
      case '天':current = 'Days';
        break;
      case '周':current = 'Weeks';
        break;
      default :current = 'Months';
        break;
    }
    this.setState({
      currentZoom: current,
      currentZoomZH:zoom
    });
  }
}

export default GlobalGantt;