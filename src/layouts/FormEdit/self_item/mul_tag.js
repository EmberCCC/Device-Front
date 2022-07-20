/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-17 11:56:33
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-19 21:52:02
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\self_item\mul_tag.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DeleteOutlined } from "@ant-design/icons";
import { Input, Switch } from "antd";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import './index.css'
const Mul_Tag = observer(({ FormStore, value, onChange, ...rest }) => {
    const { checked, subFormName, schemaList, initSchema } = FormStore
    useEffect(() => {
        console.log(value);
        console.log(rest.addons);
    }, [])
    const handleChange = (checked) => {
        FormStore.setValue('checked', checked);
        console.log(value);
        if (checked == false) {
            FormStore.setValue('subFormList', []);
            FormStore.setValue('schemaList', []);
            onChange(true);

        } else if (checked == true && schemaList.length <= 0) {
            console.log();
            let list = [{ name: '标签一', fields: {} }, { name: '标签二', fields: {} }, { name: '标签三', fields: {} }]
            let list2 = ['标签一', '标签二', '标签三']
            FormStore.setValue('subFormList', list);
            FormStore.setValue('subFormName', list2);
            FormStore.setValue('schemaList', list);
            onChange(false);
        }

    }

    const titleChange = (value, index) => {
        let iList = [...subFormName]
        iList.splice(index, 1, value)
        FormStore.setValue('subFormName', iList);
    }
    const handleAdd = () => {
        let iObj = { name: '标签页', 'fields': {} }
        let iList = [...schemaList]
        let iList2 = [...subFormName]
        iList2.push('标签页');
        iList.push(iObj)
        FormStore.setValue('subFormName', iList2);
        FormStore.setValue('schemaList', iList);
        onChange(iList);
    }
    const handleDel = (index) => {
        let iList = [...schemaList]
        let iList2 = [...subFormName]
        iList.splice(index, 1)
        iList2.splice(index, 1)
        console.log(iList);
        onChange(iList);
        FormStore.setValue('subFormName', iList2);
        FormStore.setValue('schemaList', iList);
    }
    return (
        <div className="total_tags">
            <div className="tags_title">
                <div>多标签显示</div>
                <Switch onChange={handleChange} style={{ width: '20px' }} defaultChecked={value}>多标签显示</Switch>
            </div>

            <div className="all_tags">
                {checked && (
                    subFormName.map((item, index) => {
                        return (
                            <div className="one_tag" key={index}>
                                <Input defaultValue={item} className="one_title" onChange={(e) => titleChange(e.target.value, index)} />
                                {
                                    subFormName.length > 2 ? (
                                        <DeleteOutlined onClick={() => handleDel(index)} />
                                    ) : (
                                        <DeleteOutlined />
                                    )
                                }
                            </div>
                        )
                    })
                )}
            </div>
            {
                schemaList.length > 0 && (
                    <div className="add_tag" onClick={handleAdd}>
                        +添加标签页
                    </div>
                )
            }
        </div>
    )
})
export default inject((stores) => ({ FormStore: stores.FormStore }))(Mul_Tag)