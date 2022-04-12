import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
} from "bizcharts";

@inject('HomeStore')
@observer
class BiaxChart extends React.Component {
    render() {
        const data = this.props.HomeStore.staffInfo;
        const scale = {
            count: {
                min: 0
            },
            minute: {
                min: 0
            }
        };
        let chartIns = null;
        return <div>
            <Chart
                height='380'
                padding='auto'
                scale={scale}
                forceFit
                data={data}
                onGetG2Instance={chart => {
                    chartIns = chart;
                }}
            >
                <Legend
                    custom={true}
                    allowAllCanceled={true}
                    items={[
                        {
                            value: "维修工时",
                            marker: {
                                symbol: "square",
                                fill: "#3DA4FF",
                                radius: 5
                            }
                        },
                        {
                            value: "维修次数",
                            marker: {
                                symbol: "hyphen",
                                stroke: "#9AD681",
                                radius: 5,
                                lineWidth: 3
                            }
                        }
                    ]}
                    onClick={ev => {
                        const item = ev.item;
                        const value = item.value;
                        const checked = ev.checked;
                        const geoms = chartIns.getAllGeoms();

                        for (let i = 0; i < geoms.length; i++) {
                            const geom = geoms[i];

                            if (geom.getYScale().field === value) {
                                if (checked) {
                                    geom.show();
                                } else {
                                    geom.hide();
                                }
                            }
                        }
                    }}
                />
                <Axis
                    name="count"
                    grid={null}
                    label={{
                        textStyle: {
                            fill: "#fdae6b"
                        }
                    }}
                />
                <Axis name="name" label={{
                    rotate: data.length > 15 ? 12 : 0,
                    autoRotate: data.length > 15 ? false : true,
                    textStyle: data.length > 15 ? {
                        textAlign: 'start '
                    } : {},
                }} />
                <Tooltip />
                <Geom type="interval" position="name*minute" color="#3DA4FF" />
                <Geom
                    type="line"
                    position="name*count"
                    size={3}
                    color="#9AD681"
                />
                <Geom
                    type="point"
                    position="name*count"
                    size={3}
                    color="#9AD681"
                    shape="circle"
                />
            </Chart>
        </div>
    }

}
export default BiaxChart;