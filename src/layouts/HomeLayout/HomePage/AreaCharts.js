import React from 'react';
import { inject, observer } from 'mobx-react';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
} from 'bizcharts';

@inject('HomeStore')
@observer
class AreaCharts extends React.Component {
    render() {
        const data = this.props.HomeStore.staffInfo;
        const cols = {
            count: {
                min: 0
            },
            minute: {
                min: 0
            }
        };
        let chartIns = null;
        return (
            <div>
                <Chart height={300} data={data} scale={cols} forceFit onGetG2Instance={chart => {
                    chartIns = chart;
                }}>
                    <Axis name="name" />
                    <Axis name="count" />
                    <Legend
                        custom={true}
                        allowAllCanceled={true}
                        items={[
                            {
                                value: "维修工时",
                                marker: {
                                    symbol: "square",
                                    fill: "#6236FF",
                                    radius: 5
                                }
                            },
                            {
                                value: "维修次数",
                                marker: {
                                    symbol: "square",
                                    fill: "#32C5FF",
                                    radius: 5,
                                }
                            }
                        ]}
                        onClick={ev => {
                            const item = ev.item;
                            const value = item.value === '维修次数' ? 'count' : 'minute';
                            const checked = ev.checked;
                            const geoms = chartIns.getAllGeoms();
                            for (let i = 0; i < geoms.length; i++) {
                                const geom = geoms[i];
                                console.log(geom.getYScale().field, checked)
                                if (geom.getYScale().field === value) {
                                    if (checked) {
                                        geom.show();
                                    } else {
                                        geom.hide();
                                    }
                                }
                            }
                        }} />
                    <Tooltip itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>" />
                    <Geom type="areaStack" position="name*count" tooltip={false} color={[['l (270) 0:#FFFFFF 1:#32C5FF']]} />
                    <Geom type="lineStack" position="name*count" size={2} color={['#32C5FF']} />
                    <Geom type="areaStack" position="name*minute" tooltip={false} color={['l (270) 0:#FFFFFF 1:#6236FF']} />
                    <Geom type="lineStack" position="name*minute" size={2} color={['#6236FF']} />
                </Chart>
            </div>
        );
    }
}
export default AreaCharts;