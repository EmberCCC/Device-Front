/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-04 12:43:55
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-14 05:34:00
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\self_item\link_item.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import { Button, Cascader, DatePicker, Input, Modal } from "antd";
import Math_Modal from "../FormModal/Math_Modal";
import './index.css'
import moment from "moment";
import { options } from "constants/address";
import User_choose from "../user_choose";
export const Link_item = ({ value, onChange, ...rest }) => {
    const [math, setMath] = useState(false);
    const [relValue, setRelValue] = useState('');
    const { addons } = rest;
    useEffect(() => {
        console.log(addons.formData.typeId);
        console.log(addons);
        console.log(value);
        // addons
    }, [])
    useEffect(() => {
        if (addons.formData.default_type == '2') {
            if (addons.formData.typeId == '20') {
                onChange([])
            } else {
                onChange('')
            }
        }
    }, [addons.formData.default_type])
    useEffect(() => {
        onChange([])
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
                <DatePicker value={addons.formData.default} showTime onChange={(e) => {
                    let format = addons.formData.format == undefined ? 'date' : addons.formData.format
                    let obj = {
                        'date': 'YYYY-MM-DD',
                        'dateTime': 'YYYY-MM-DD hh:mm:ss',
                        'time': 'hh:mm:ss'
                    }
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
                    <User_choose disabled={false} handleUpdate={handleUpdate} mode={addons.formData.self_setting.mul} initUserList={value == undefined ? [] : value} initChooseList={addons.formData.self_setting.scope} />
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