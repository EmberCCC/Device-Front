import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Tooltip } from "antd";
import Math_Modal from "../FormModal/Math_Modal";
import './index.css'
import { DeleteTwoTone } from "@ant-design/icons";
export const Submit_check = ({ value, onChange, ...rest }) => {
    const [math, setMath] = useState(false);
    const [relValue, setRelValue] = useState("");
    const [checkList, setCheckList] = useState([]);
    const { addons } = rest;
    const handleInput = (event) => {
        onChange(event.target.value);
    }
    const handleLink = () => {
        console.log(1);
    }
    const openMath = () => {
        setMath(true);
    }
    const closeMath = () => {
        setMath(false);
    }
    const handleAdd = (info) => {
        if (info == 'true') {
            let list = checkList;
            list.push(relValue);
            setCheckList(list)
            onChange(checkList)
        }
        closeMath();
    }
    const handleDel = (index) => {
        console.log(index);
        let list = checkList;
        list.splice(index, 1);
        console.log(list);
        setCheckList([...list])
    }
    const title_item = (
        <div>
            <span className="title_left">提交校验</span>
            <span className="title_right">使用数学运算符编辑公式</span>
        </div>
    )
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {
                checkList.map((item, index) => {
                    return (
                        <div key={item} className='check_item_one'>
                            <Tooltip title={item}>
                                <div className='check_item'>{item}</div>
                            </Tooltip>
                            <Tooltip title={'删除'}>
                                <DeleteTwoTone twoToneColor="#DC143C" onClick={() => handleDel(index)} />
                            </Tooltip>
                        </div>
                    )
                })
            }
            <Button onClick={openMath}>添加校验条件</Button>

            <Modal
                visible={math}
                onCancel={closeMath}
                title={title_item}
                footer={null}
                width={800}
                destroyOnClose={true}
            >
                <Math_Modal title={"公式"} setValue={setRelValue} addItem={handleAdd} />
            </Modal>
        </div>
    )
}