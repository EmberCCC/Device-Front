import { DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Button, Popover, Radio, Tooltip } from 'antd'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import React, { useEffect, useImperativeHandle, useState } from 'react'
import stores from 'stores'
import './index.less'
const SortLayout = observer(({ TableStore, HomeStore, cRef }) => {
    const [sortList, setSortList] = useState(JSON.parse(sessionStorage.getItem('sort_' + HomeStore.firstFormId)) || []);
    const [menu, setMenu] = useState(null)
    useImperativeHandle(cRef, () => ({
        setSort: () => {
            setSortList(JSON.parse(sessionStorage.getItem('sort_' + HomeStore.firstFormId)) || [])
        }
    }))
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
                                if (['createPerson', 'updateTime', 'createTime'].indexOf(item['key']) > -1 || item['detailJson']['typeId'] < 8) {
                                    return (
                                        <div className="columns_item item_uncheck" onClick={() => handleAdd(item)} key={index}>
                                            {item['title']}
                                        </div>
                                    )
                                }
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
        iSortList.splice(index, 1, iItem);
        setSortList(iSortList)
        console.log(iSortList);
    }
    const handleSort = () => {
        console.log(toJS(TableStore.dataSource));
        sessionStorage.setItem("sort_" + HomeStore.firstFormId, JSON.stringify(sortList))
        TableStore.getSortDataSource(HomeStore.firstFormId);
    }
    const handleDel = (index) => {
        let iSortList = [...sortList]
        iSortList.splice(index, 1)
        setSortList(iSortList);
        console.log(iSortList);
    }
    return (
        <div className='sort_layout'>
            <Popover content={menu} trigger='click' placement="bottomLeft">
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
                                    <Tooltip title='删除' placement='top'>
                                        <DeleteOutlined onClick={() => { handleDel(index) }} style={{ cursor: 'pointer', marginLeft: '5px' }} />
                                    </Tooltip>
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


export default inject((stores) => ({ TableStore: stores.TableStore, HomeStore: stores.HomeStore }))(SortLayout);
