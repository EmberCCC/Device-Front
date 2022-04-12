import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";

@inject('HomeStore')
@observer
class AreaChart extends React.Component {
  render() {
    const data = toJS(this.props.HomeStore.workInfo);
    // console.log(data)
    // const data = [{ currentDate: '2019-07-07', number: 1 }, { currentDate: '2019-07-08', number: 1 }, { currentDate: '2019-07-09', number: 2 }, { currentDate: '2019-07-10', number: 1 }, { currentDate: '2019-07-11', number: 1 }, { currentDate: '2019-07-12', number: 0 }, { currentDate: '2019-07-13', number: 1 },]
    const cols = {
      currentDate: {
        // min: 10000
      },
      number: {
        range: [0, 1]
      }
    };
    return <div>
      <Chart height='300' padding='auto' data={data} scale={cols} forceFit >
        <Axis name="currentDate" />
        <Axis
          name="number"
        // label={{
        //   formatter: val => {
        //     return (val / 10000).toFixed(1) + "k";
        //   }
        // }}
        />
        <Tooltip
          crosshairs={{
            type: "line"
          }}
          itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>结算工单数: {value}</li>"
        />
        {/*<Geom type="area" position="currentDate*number" shape="smooth" />*/}
        <Geom type="line" position="currentDate*number" shape="smooth" size={2} color="l(90) 0:#32C5FF  1:#BEF4FF" />
      </Chart>
    </div>
  }
}
export default AreaChart;