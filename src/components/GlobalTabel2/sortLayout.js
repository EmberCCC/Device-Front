/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-08 06:52:37
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-08 12:04:18
 * @FilePath: \bl-device-manage-test\src\components\GlobalTabel2\sortLayout.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Button, Popover, Radio } from 'antd'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import stores from 'stores'
import './index.css'
const SortLayout = observer(({ TableStore ,HomeStore}) => {
    const [sortList, setSortList] = useState(JSON.parse(sessionStorage.getItem('sort_'+HomeStore.firstFormId)) || []);
    const [menu, setMenu] = useState(null)

    const handleAdd = (item) => {
        let iSort = [...sortList];
        iSort.push({ 'fieldInfo': toJS(item), 'type': 'up' })
        setSortList(iSort)
        console.log(sortList);
    }
    useEffect(() => {
        setMenu(
            (
                <div className='columns_list'>
                    {
                        TableStore.columns.map((item, index) => {
                            if (sortList.some(sort_item => sort_item['fieldInfo']['key'] == item['key'])) {
                                return (
                                    <div className="columns_item" key={index}>
                                        {item['title']}
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="columns_item item_uncheck" onClick={() => handleAdd(item)} key={index}>
                                        {item['title']}
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            )
        )
    }, [sortList])
    const handleChange = (e, item, index) => {
        const iItem = { 'fieldInfo': toJS(item['fieldInfo']), 'type': e.target.value }
        let iSortList = [...sortList]
        iSortList.splice(index,1,iItem);
        setSortList(iSortList)
        console.log(iSortList);
    }
    const handleSort = () => {
        console.log(toJS(TableStore.dataSource));
        sessionStorage.setItem("sort_"+HomeStore.firstFormId,JSON.stringify(sortList))
        TableStore.getSortDataSource(HomeStore.firstFormId);
    }
    const handleDel = (index) => {
        let iSortList = [...sortList]
        iSortList.splice(index,1)
        setSortList(iSortList);
        console.log(iSortList);
    }
    return (
        <div className='sort_layout'>
            <Popover content={menu} trigger='click'>
                <div className='sort_add'>
                    <Button>+添加排序规则</Button>
                </div>
            </Popover>
            <div className='sort_list'>
                {   
                    
                    sortList.map((item, index) => {
                        return (
                            <div className='list_item' key={index}>
                                <div className='list_item_title'>
                                    {item['fieldInfo']['title']}
                                </div>
                                <div className='list_item_check'>
                                    <Radio.Group onChange={(e) => handleChange(e, item, index)} defaultValue={item['type']}>
                                        <Radio.Button value="up">升序</Radio.Button>
                                        <Radio.Button value="down">降序</Radio.Button>
                                    </Radio.Group>
                                </div>
                                <div className='list_item_del'>
                                    <UnorderedListOutlined />
                                    <DeleteOutlined onClick={() => {handleDel(index)}} style={{cursor:'pointer'}}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='sort_btn'>
                <Button type='primary' onClick={handleSort}>排序</Button>
            </div>
        </div>
    )
})


export default inject((stores) => ({ TableStore: stores.TableStore ,HomeStore:stores.HomeStore}))(SortLayout);
