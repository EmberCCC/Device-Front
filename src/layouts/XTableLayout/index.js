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