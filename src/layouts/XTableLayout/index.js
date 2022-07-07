/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-06 22:04:09
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-06 22:58:13
 * @FilePath: \bl-device-manage-test\src\layouts\XTableLayout\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Search, Table, useTable, withTable } from 'table-render';
import stores from 'stores'



const XTableLayout = observer(({ TableStore, HomeStore }) => {
    const { columns, dataSource ,schema} = TableStore
    useEffect(() => {
        console.log(toJS(columns));
        console.log(toJS(dataSource));
    }, [])
    const searchApi = () => {
        return {
            rows:dataSource,
            total:dataSource.length
        }
    }
    return (
        <>
            <Search api={searchApi} schema={schema}/>
            <Table
                pagination={{ pageSize: 3 }}
                columns={columns}

            />
        </>
    )
})

export default inject((stores) => ({ TableStore: stores.TableStore, HomeStore: stores.HomeStore }))(XTableLayout);