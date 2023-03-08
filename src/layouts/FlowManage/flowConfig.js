/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-25 15:05:57
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-25 16:17:33
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\flowConfig.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Checkbox, Select, Switch } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";

const Flow_Config = observer(({ HomeStore, FlowStore }) => {
    const { flowProperty } = FlowStore
    return (
        <div>
            <div className="formItem_title">
                <div className="formItem_name">流程提醒</div>
                <div>
                    <Checkbox defaultChecked={flowProperty['flowProperty']['wx']} onChange={(value) => {
                        let iObj = { ...flowProperty }
                        iObj['flowProperty']['wx'] = value.target.checked;
                        FlowStore.setValue('flowProperty', iObj)
                        console.log(value.target.checked);
                    }}>使用微信提醒节点负责人、抄送人</Checkbox>
                </div>
                <div>
                    <Checkbox defaultChecked={flowProperty['flowProperty']['mail']} onChange={(value) => {
                        let iObj = { ...flowProperty }
                        iObj['flowProperty']['mail'] = value.target.checked;
                        FlowStore.setValue('flowProperty', iObj)
                        console.log(value.target.checked);
                    }}>使用邮件提醒节点负责人、抄送人</Checkbox>
                </div>
            </div>
            <div className="formItem_open">
                <div className="formItem_name">流程发起后允许撤回</div>
                <Switch defaultChecked={flowProperty['flowProperty']['withdraw']} onChange={(value) => {
                    let iObj = { ...flowProperty }
                    iObj['flowProperty']['withdraw'] = value;
                    FlowStore.setValue('flowProperty', iObj)
                    console.log(value);
                }} checkedChildren="开" unCheckedChildren="关" />
            </div>
            <div className="formItem_open">
                <div className="formItem_name">允许流程发起人催办</div>
                <Switch defaultChecked={flowProperty['flowProperty']['cuiBan']} onChange={(value) => {
                    let iObj = { ...flowProperty }
                    iObj['flowProperty']['cuiBan'] = value;
                    FlowStore.setValue('flowProperty', iObj)
                    console.log(value);
                }} checkedChildren="开" unCheckedChildren="关" />
            </div>
            <div className="formItem_open">
                <div className="formItem_name">允许查看流程动态和流转图</div>
                <Switch defaultChecked={flowProperty['flowProperty']['see']} onChange={(value) => {
                    let iObj = { ...flowProperty }
                    iObj['flowProperty']['see'] = value
                    FlowStore.setValue('flowProperty', iObj)
                    console.log(value);
                }} checkedChildren="开" unCheckedChildren="关" />
            </div>
            <div className="formItem_title">
                <div className="formItem_name">自动提交规则</div>
                <Select disabled defaultValue={flowProperty['flowProperty']['rule']} style={{ width: '100%' }} onChange={(value) => {
                    let iObj = { ...flowProperty }
                    iObj['flowProperty']['rule'] = value;
                    FlowStore.setValue('flowProperty', iObj)
                    console.log(value);
                }}>
                    <Select.Option value={0}>不启用</Select.Option>
                    <Select.Option value={1}>负责人与上一节点处理人相同</Select.Option>
                    <Select.Option value={2}>负责人处理过该流程</Select.Option>
                </Select>
            </div>
        </div>
    )
})

export default inject((stores) => ({ HomeStore: stores.HomeStore, FlowStore: stores.FlowStore }))(Flow_Config)
