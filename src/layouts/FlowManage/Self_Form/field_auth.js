/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-24 16:26:33
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-25 18:20:44
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\Self_Form\field_auth.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MODELS, useXFlowApp, XFlowNodeCommands } from "@antv/xflow";
import { Checkbox, Col, Row } from "antd";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import './index.css'
const AuthShape = observer(({FlowStore, HomeStore, TableStore, FormStore, data, initData, typeId }) => {

    const { commandService, modelService } = useXFlowApp();
    const { formField } = FormStore
    const { loading } = FormStore
    useEffect(() => {
        // FormStore.getFormField({ 'formId': HomeStore.firstFormId })
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
                    <Col span={5}>简报</Col>
                </Row>
            </div>
            <div className="auth_item">
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
                                                        { ...iData}

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
                                                <Col span={8}><Checkbox value={'sketch'} /></Col>
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
export default inject((stores) => ({FlowStore:stores.FlowStore, HomeStore: stores.HomeStore, TableStore: stores.TableStore, FormStore: stores.FormStore }))(AuthShape)