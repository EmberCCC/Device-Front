import { MODELS, useXFlowApp, XFlowNodeCommands } from "@antv/xflow";
import { Checkbox, Col, Row } from "antd";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import './index.css'
const AuthShape = observer(({ FlowStore, HomeStore, TableStore, FormStore, data, initData, typeId }) => {

    const { commandService, modelService } = useXFlowApp();
    const { formField } = FormStore
    const { loading } = FormStore
    useEffect(() => {
        console.log(data);
        console.log(toJS(formField['fields']));
        let iObj = {}
        formField['fields'].map((item) => {
            if (!data.hasOwnProperty(item['id'])) {
                iObj[item['id']] = ['look']
            } else if (data[item['id']].indexOf('look') <= -1) {
                iObj[item['id']] = data[item['id']].push('look')
            } else {
                iObj[item['id']] = data[item['id']];
            }
        })
        console.log(iObj);
    }, [])
    return (
        <div className="all_auth">
            <div className="auth_title">
                <Row>
                    <Col span={9}>
                        字段
                    </Col>
                    <Col span={5}>可见</Col>
                    {
                        typeId == 1 && (
                            <Col span={5}>可编辑</Col>
                        )
                    }
                    {
                        typeId == -1 && (
                            <Col span={5}>可编辑</Col>
                        )
                    }
                    <Col span={5}>简报</Col>
                </Row>
            </div>
            <div className="auth_item">
                {/* <div className="auth_one">
                    <Row>
                        <Col span={9}>全选</Col>
                        <Col span={15}>
                            <Checkbox.Group style={{ width: '100%' }} onChange={(value) => {
                                console.log(data);
                                console.log(toJS(formField));
                                console.log(value);
                            }}>
                                <Row>
                                    <Col span={8}><Checkbox value={'-1'} /></Col>
                                    {
                                        typeId == 1 && (
                                            <Col span={8}><Checkbox value={'-2'} /></Col>
                                        )
                                    }
                                    {
                                        typeId == -1 && (
                                            <Col span={8}><Checkbox value={'-2'} /></Col>
                                        )
                                    }
                                </Row>
                            </Checkbox.Group>

                        </Col>
                    </Row>
                </div> */}
                {
                    formField['fields'].map((item, index) => {
                        let obj = {}
                        return (
                            <div className="auth_one" key={index}>
                                <Row>
                                    <Col span={9}>{item['name']}</Col>
                                    <Col span={15}>
                                        <Checkbox.Group key={index} defaultValue={data?.[item['id']]} style={{ width: '100%' }} onChange={(value) => {
                                            let nValue = value
                                            MODELS.SELECTED_NODE.useValue(modelService).then(res => {
                                                let iData = res.data
                                                res.data['auth_info'][item['id']] = nValue
                                                commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
                                                    nodeConfig:
                                                        { ...iData }

                                                })
                                            })
                                        }}>
                                            <Row>
                                                <Col span={8}><Checkbox value={'look'} /></Col>
                                                {
                                                    typeId == 1 && (
                                                        <Col span={8}><Checkbox value={'edit'} /></Col>
                                                    )
                                                }
                                                {
                                                    typeId == -1 && (
                                                        <Col span={8}><Checkbox value={'edit'} /></Col>
                                                    )
                                                }
                                                <Col span={8}><Checkbox disabled value={'sketch'} /></Col>
                                            </Row>
                                        </Checkbox.Group>

                                    </Col>
                                </Row>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
})
export default inject((stores) => ({ FlowStore: stores.FlowStore, HomeStore: stores.HomeStore, TableStore: stores.TableStore, FormStore: stores.FormStore }))(AuthShape)
