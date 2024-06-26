import React, { useEffect, useState } from "react";
import { Button, Cascader, DatePicker, Input, Modal } from "antd";
import Math_Modal from "../FormModal/Math_Modal";
import './index.css'
import { options } from "constants/address";
import User_choose from "../user_choose";
import moment from "moment";
export const Link_item = ({ value, onChange, ...rest }) => {
    const [math, setMath] = useState(false);
    const [relValue, setRelValue] = useState('');
    const { addons } = rest;
    useEffect(() => {
        if (addons.formData.default_type == '2') {
            if (addons.formData.typeId == '20' && addons.formData.default == undefined) {
                onChange([])
            } else {
                onChange('')
            }
        }
    }, [addons.formData.default_type])
    useEffect(() => {
        console.log('format',addons.formData);
        console.log(moment(addons.formData.default).isValid())
        console.log(value);
        if (addons.formData.self_setting?.mul == false && Object.prototype.toString.call(value) === '[object Array]' && value.length > 1) {
            onChange([])
        }

    }, [addons.formData.self_setting?.mul])
    const handleInput = (event) => {
        onChange(event.target.value);
    }
    const openMath = () => {
        setMath(true);
    }
    const closeMath = () => {
        setMath(false);
    }
    const handleAdd = (info) => {
        if (info == 'true') {
            onChange(relValue)
        }
        closeMath();
    }
    const handleUpdate = (value) => {
        onChange(value)
        console.log(value);
    }
    const title_item = (
        <div>
            <span className="title_left">公式编辑</span>
            <span className="title_right">使用数学运算符编辑公式</span>
        </div>
    )
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {
                addons.dependValues[0] != '2' && addons.dependValues[0] != '3' && addons.formData.$id.substring(2, 3) == 0 &&
                <Input onChange={handleInput} defaultValue={addons.formData.default} />
            }
            {
                addons.dependValues[0] != '2' && addons.dependValues[0] != '3' && addons.formData.$id.substring(2, 3) == 1 &&
                <Input.TextArea onChange={handleInput} defaultValue={addons.formData.default} />
            }
            {
                addons.dependValues[0] != '2' && addons.dependValues[0] != '3' && addons.formData.$id.substring(2, 3) == 3 &&
                <DatePicker
                    format={addons.formData.format == 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'}
                    value={addons.formData.default!==undefined && moment(addons.formData.default).isValid() && moment(addons.formData.default)}
                    showTime
                    onChange={(e) => {
                        // onChange(moment(e).format(obj[format]))
                        onChange(e)
                    }} />
            }
            {
                addons.dependValues[0] != '2' && addons.dependValues[0] != '3' && addons.formData.$id.substring(2, 3) == 9 && (
                    <div>
                        <Cascader
                            style={{ width: '100%' }}
                            placeholder={'请选择地址'}
                            options={options}
                            changeOnSelect
                            onChange={(e) => {
                                console.log(e);
                            }}
                        />
                    </div>
                )

            }
            {
                addons.formData.typeId == '20' && addons.formData?.self_setting?.type == '1' && addons.formData?.default_type != '2' && (
                    <User_choose disabled={false} handleUpdate={handleUpdate} mode={addons.formData.self_setting.mul} initUserList={value == undefined || value == "" ? [] : value} initChooseList={addons.formData.self_setting.scope} />
                )
            }
            {
                addons.dependValues[0] == '3' &&
                <Button onClick={openMath}>公式编辑</Button>
            }
            <Modal
                visible={math}
                onCancel={closeMath}
                title={title_item}
                footer={null}
                width={800}
                destroyOnClose='true'
            >
                <Math_Modal title={'车间'} setValue={setRelValue} addItem={handleAdd} />
            </Modal>
        </div>
    )
}
