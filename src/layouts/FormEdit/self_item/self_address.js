import { Cascader, Divider, Input } from 'antd'
import { options } from 'constants/address'
import React, { useEffect } from 'react'
import './index.css'
export const Self_address = (props) => {
    const { schema } = props
    useEffect(() => {
        console.log(props);
        console.log(schema);
    }, [])
    return (
        <div style={{ width: '100%' }}>
            <div className="self_rich_text" dangerouslySetInnerHTML={{ __html: schema.describe }} />
            <Cascader
                style={{ width: '100%' }}
                placeholder={'请选择地址'}
                options={options}
                changeOnSelect
                onChange={(e) => {
                    console.log(e);
                }}
            />
            {
                schema.address_pattern == '2' && (
                    <Input.TextArea
                        style={{ marginTop: '10px' }}
                        onChange={(e) => {
                            console.log(e.target.value);
                        }}
                    />
                )
            }
        </div>
    )
}
