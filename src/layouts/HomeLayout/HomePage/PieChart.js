import React from 'react';
import { inject, observer } from 'mobx-react';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";

@inject('HomeStore')
@observer
class PieChart extends React.Component {
    render() {
        const { DataView } = DataSet;
        const data = this.props.HomeStore.devInfo;
        const dv = new DataView();
        dv.source(data).transform({
            type: "percent",
            field: "number",
            dimension: "customerName",
            as: "percent"
        });
        const cols = {
            percent: {
                formatter: val => {
                    val = +Number(val * 100).toFixed(2) + "%";
                    return val;
                }
            }
        };
        return <div>
            <Chart
                height='300'
                data={dv}
                scale={cols}
                padding={'auto'}
                forceFit
            >
                <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
                <Axis name="percent" />
                <Legend
                    position="bottom"
                />
                <Tooltip
                    showTitle={false}
                    itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                />
                <Geom
                    type="intervalStack"
                    position="percent"
                    color="customerName"
                    tooltip={[
                        "customerName*percent",
                        (customerName, percent) => {
                            percent = +Number(percent * 100).toFixed(2) + "%";
                            return {
                                name: customerName,
                                value: percent
                            };
                        }
                    ]}
                    style={{
                        lineWidth: 1,
                        stroke: "#fff"
                    }}
                >
                    {/*<Label
                        content="percent"
                        formatter={(val, customerName) => {
                            return customerName.point.customerName + ": " + val;
                        }}
                    />*/}
                </Geom>
            </Chart>
        </div>
    }

}
export default PieChart;