import { Checkbox, Radio } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import { useEffect } from "react";
import './index.css'
const Self_radio = observer((props) => {
    const { schema } = props;
    useEffect(() => {
        // console.log(props);
        // console.log(schema);
        console.log(props.value);
    }, [props])
    return (
        <div style={{ width: '100%' }} >
            <div className="self_rich_text" dangerouslySetInnerHTML={{ __html: schema.describe }} />
            {
                schema.typeId == '4' && (
                    <Radio.Group
                        onBlur={() => {
                            props.FormStore.handleBlur(schema)
                        }}
                        controls={false}
                        value={props.value}
                        onChange={(e) => {
                            console.log(e.target.value);
                            props.onChange(e.target.value)
                        }}
                        style={{ width: '100%' }}
                        disabled={schema.disabled}
                        placeholder={schema.placeholder}
                    >
                        {
                            schema.hasOwnProperty('enum') && schema.enum.map((item, index) => {
                                return (
                                    <Radio value={item} key={index}>{item}</Radio>
                                )
                            })
                        }
                    </Radio.Group>
                )
            }
            {
                schema.typeId == '5' && (
                    <Checkbox.Group
                        onBlur={() => {
                            console.log(schema);
                            console.log(props);
                            props.FormStore.handleBlur(schema)
                        }}
                        controls={false}
                        value={props.value}
                        onChange={(e) => {
                            console.log(e);
                            props.onChange(e)
                        }}
                        style={{ width: '100%' }}
                        disabled={schema.disabled}
                        placeholder={schema.placeholder}
                    >
                        {
                            schema.hasOwnProperty('enum') && schema.enum.map((item, index) => {
                                return (
                                    <Checkbox value={item} key={index}>{item}</Checkbox>
                                )
                            })
                        }
                    </Checkbox.Group>
                )
            }
        </div>
    );
})

export default inject((stores) => ({ FormStore: stores.FormStore }))(Self_radio)