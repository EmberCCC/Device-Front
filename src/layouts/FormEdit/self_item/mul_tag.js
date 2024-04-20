import { DeleteOutlined } from "@ant-design/icons";
import { Input, Switch } from "antd";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import './index.css'
const Mul_Tag = observer(({ FormStore, value, ...rest }) => {
    const { checked, schemaList, initSchema } = FormStore

    useEffect(() => {
        console.log(value);
        console.log(rest.addons);
    }, [])

    const onChange = (e) => {
        console.log('formEditSchema', toJS(FormStore.formEditSchema))
        let schema = toJS(FormStore.formEditSchema)
        if (checked === true) {
            FormStore.deleteAllTab()
        } else {
            schema.properties.Tabs = {
                type: 'any',
                widget: 'Tab'
            }
            let iList = [{ label: '标签一', key: nanoid(), fields: {} }, { label: '标签二', key: nanoid(), fields: {} }, { label: '标签三', key: nanoid(), fields: {} }]
            FormStore.setValue('schemaList', iList)
            FormStore.setValue('tabLastChoose', iList[0].key)
            FormStore.setValue('formEditSchema', schema)
            FormStore.setValue('formEditSchemaExtend', schema)
            FormStore.setValue('checked', !checked)
        }
        console.log('formEditSchema', toJS(schema))

        console.log(`switch to ${checked}`, schema);
    };

    const titleChange = (value, index) => {
        let iList = [...schemaList]
        iList[index].label = value
        FormStore.setValue('schemaList', iList);
    }
    const handleAdd = () => {
        let iObj = { label: '标签页', 'fields': {}, key: nanoid() }
        let iList = [...schemaList]
        iList.push(iObj)
        FormStore.setValue('schemaList', iList);
    }
    const handleDel = (index) => {
        let formEditSchema = FormStore.formEditSchema
        let iList = [...schemaList]
        let lastChoose = FormStore.tabLastChoose
        console.log('Delete',index,iList)
        if (iList[index].key == lastChoose) {
            let newChoose = iList[index === iList.length - 1 ? index - 1 : index + 1].key
            console.log('newChoose', newChoose)
            console.log('beforeChoose', iList[index].key);
            FormStore.changeFormEditSchema(newChoose, iList[index].key, true)
            FormStore.setValue('tabLastChoose', newChoose)
        } else {
            iList.splice(index, 1)
            FormStore.setValue('schemaList', iList)
            FormStore.setValue('formEditSchema', formEditSchema)
        }

    }
    return (
        <div className="total_tags">
            <div className="tags_title">
                <div>多标签显示</div>
                <Switch onChange={onChange} checked={checked} style={{ width: '20px' }} defaultChecked={schemaList.length > 0}>多标签显示</Switch>
            </div>

            <div className="all_tags">
                {checked && (
                    schemaList.map((item, index) => {
                        return (
                            <div className="one_tag" key={item.key}>
                                <Input defaultValue={item.label} className="one_title" onChange={(e) => titleChange(e.target.value, index)} />
                                {
                                    schemaList.length > 2 ? (
                                        <DeleteOutlined  onClick={() => handleDel(index)} />
                                    ) : (
                                        <DeleteOutlined style={{'color':'#aaa'}} />
                                    )
                                }
                            </div>
                        )
                    })
                )}
            </div>
            {
                checked && (
                    <div className="add_tag" onClick={handleAdd}>
                        +添加标签页
                    </div>
                )
            }
        </div>
    )
})
export default inject((stores) => ({ FormStore: stores.FormStore }))(Mul_Tag)