import { Divider } from 'antd'
import React, { useEffect } from 'react'
import './index.css'
export const Self_divider = (props) => {
  const { schema } = props
  return (
    <div style={{width:'100%'}}>
      <Divider />
      <div className="self_rich_text" dangerouslySetInnerHTML={{ __html: schema.describe }} />
    </div>
  )
}
