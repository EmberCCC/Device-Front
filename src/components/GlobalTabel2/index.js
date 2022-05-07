/*
 * @Author: your name
 * @Date: 2022-04-07 11:58:39
 * @LastEditTime: 2022-05-07 21:05:39
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\components\GlobalTabel\index.js
 */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Dropdown, Menu, Modal, Table } from 'antd';
import { DeleteOutlined, DownOutlined, EyeOutlined, FilterOutlined, FullscreenExitOutlined, PlusOutlined, SortDescendingOutlined, UploadOutlined } from '@ant-design/icons';
import GlobalModal from 'components/GlobalModal';
import GlobalForm from 'components/GlobalForm';
import TableLayout from 'components/TableLayout';
import { toJS } from 'mobx';
import { firstFormName } from 'constants/status_constant';
import moment from 'moment';

const ExportJsonExcel = require("js-export-excel");
@inject('HomeStore', 'TableStore')
@observer
class GlobalTabel2 extends React.Component {
    render() {
        const { dataSource, columns, PageInfo, isLoading } = this.props.HomeStore
        const {selectedRowKeys} = this.props.TableStore;
        /* 表格第一列选择框事件 */
        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.props.TableStore.setSelectedRowKeys(selectedRowKeys);
                this.props.TableStore.selectedIdsList = toJS(selectedRows)
            },
        };
        return (
            <div>
                <div className='search_bar'>

                    {/* 添加 */}
                    <Button type="primary" icon={<PlusOutlined />}
                        style={{ margin: '0 10px 10px 0', padding: '0 20px', verticalAlign: 'middle' }}
                        onClick={this.addObj}
                    >
                        添加
                    </Button>

                    {/* 导出 */}
                    <Dropdown overlay={this.exportMenu} placement="bottomLeft" >
                        <Button icon={<UploadOutlined />} style={{ border: 'none', margin: '0 10px 10px 0', verticalAlign: 'middle' }}>
                            导出<DownOutlined />
                        </Button>
                    </Dropdown>

                    {/* 删除 */}
                    <Dropdown overlay={this.deleteMenu} placement="bottomLeft" >
                        <Button icon={<DeleteOutlined />} style={{ border: 'none', margin: '0 10px 10px 0', verticalAlign: 'middle' }}>
                            删除<DownOutlined />
                        </Button>
                    </Dropdown>

                    {/* 全屏 */}
                    <Button icon={<FullscreenExitOutlined />} style={{ border: 'none', margin: '0 10px 10px 10px', verticalAlign: 'middle', float: 'right' }} />
                    {/* 显示字段 */}
                    <Button icon={<EyeOutlined />} style={{ border: 'none', margin: '0 10px 10px 0', verticalAlign: 'middle', float: 'right' }} />
                    {/* 排序 */}
                    <Button icon={<SortDescendingOutlined />} style={{ border: 'none', margin: '0 10px 10px 0', verticalAlign: 'middle', float: 'right' }} />
                    {/* 筛选条件 */}
                    <Button icon={<FilterOutlined />} style={{ border: 'none', margin: '0 10px 10px 0', verticalAlign: 'middle', float: 'right' }}>
                        筛选条件
                    </Button>
                </div>
                <TableLayout
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={PageInfo}
                    onChange={this.onChange}
                    loading={isLoading}
                    scroll={{ x: 1300 }}
                    // scroll={{ x: 200 ,y:420}}
                    onRow={(key, record) => {
                        return {
                            onClick: event => {
                                // this.props.TableStore.setIsModalEdit(true);

                                this.props.TableStore.setModalEditData(key, record);
                                this.props.TableStore.setDataPageModalVis(true);
                            }, // 点击行
                        };
                    }}
                />
                {
                    this.props.TableStore.dataPageModalVis && <GlobalModal
                        visible={this.props.TableStore.dataPageModalVis}
                        onOk={e => { this.props.TableStore.setDataPageModalVis(false) }}
                        onCancel={e => { this.props.TableStore.setDataPageModalVis(false); this.props.TableStore.setIsModalEdit(false); }}
                        children={
                            <GlobalForm type={true} dataVis={true} dataInfo={this.props.TableStore.modalEditData} />
                        } />
                }
                {
                    this.props.TableStore.isModalEdit && <GlobalModal
                        visible={this.props.TableStore.isModalEdit}
                        onOk={e => this.props.TableStore.setIsModalEdit(false)}
                        onCancel={e => { this.props.TableStore.setDataPageModalVis(false); this.props.TableStore.setIsModalEdit(false); }}
                        children={
                            <GlobalForm type={true} dataVis={false}/>
                        } />
                }
            </div>

        );
    }
    addObj = () => {
        this.props.TableStore.setIsModalEdit(true);
    }
    onChange = (e) => {
        this.props.TableStore.setSelectedRowKeys([]);
        console.log(this.props.TableStore.selectedRowKeys);
        this.props.HomeStore.PageInfo = e;
        this.props.HomeStore.PageInfo.pageIndex = e.current
        let params = {};
        params.firstFormId = this.props.HomeStore.firstFormId;
        this.props.HomeStore.countObj(params)
        params.pageIndex = e.current;
        params.pageSize = this.props.HomeStore.PageInfo.pageSize
        this.props.HomeStore.queryAll(params)
    }

    commDele = (data) => {
        let params = []
        data.map((item) => {
            let idOne = {}
            idOne.firstFormId = this.props.HomeStore.firstFormId
            idOne.dataId = item.id
            params.push(idOne);
        })
        return params
    }

    commExport = (data) => {
        let option = {}
        option.fileName = moment(new Date()).format('L') + '  ' + moment(new Date()).format('LTS')
        let sheetFilter = []
        let sheetHeader = []
        let columnWidths = []
        let sheetData = []
        let sheetName = firstFormName[this.props.HomeStore.firstFormId]
        this.props.HomeStore.columns.map((item) => {
            sheetFilter.push(item.dataIndex)
            sheetHeader.push(item.title)
            columnWidths.push('10');
        })
        data.map((item) => {
            let obj = {}
            for (const key in item) {
                if (key != 'id' && key != 'key') {
                    obj[key] = item[key]
                }
            }
            sheetData.push(obj);
        })
        option.datas = [
            {
                sheetData: sheetData,
                sheetFilter: sheetFilter,
                sheetHeader: sheetHeader,
                sheetName: sheetName,
                columnWidths:columnWidths
            },
            {
                sheetData: sheetData
            }
        ]
        return option;
    }
    /* 删除方法 */
    onDelete = () => {
        if (this.props.TableStore.selectedIdsList.length > 0) {
            Modal.confirm({
                title: '筛选删除',
                content: '确定要删除选中的记录？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    let params = this.commDele(toJS(this.props.TableStore.selectedIdsList))
                    console.log(params);
                    this.props.HomeStore.deleteObjs(params);
                    let params1 = {};
                    params1.firstFormId = this.props.HomeStore.firstFormId;
                    params1.pageIndex = this.props.HomeStore.PageInfo.pageIndex;
                    params1.pageSize = this.props.HomeStore.PageInfo.pageSize
                    this.props.HomeStore.countObj({ firstFormId: this.props.HomeStore.firstFormId })
                    this.props.HomeStore.queryAll(params1);
                    // 删除->数据库恢复->翻页->原来选中删除的标记不出现
                    this.props.TableStore.setSelectedRowKeys([]);
                    this.props.TableStore.selectedIdsList = [];
                }
            })
        }
        else {
            Modal.warning({
                title: '筛选删除',
                content: '请选择需要删除的记录！',
            });
        }
    };

    /* 导出方法 */
    onExport = () => {
        if (this.props.TableStore.selectedIdsList.length > 0) {
            Modal.confirm({
                title: '筛选导出',
                content: '确定要导出选中的记录？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    let option = this.commExport(toJS(this.props.TableStore.selectedIdsList));
                    let toExcel = new ExportJsonExcel(option)
                    toExcel.saveExcel();
                }
            })
        }
        else {
            Modal.warning({
                title: '筛选导出',
                content: '请选择需要导出的记录！',
            });
        }
    };

    onExportAll = () => {
        if (this.props.HomeStore.dataSource.length > 0) {
            Modal.confirm({
                title: '全部导出',
                content: '确定要导出全部记录？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    let option = this.commExport(toJS(this.props.HomeStore.dataSource));
                    let toExcel = new ExportJsonExcel(option)
                    toExcel.saveExcel();
                }
            })
        }
        else {
            Modal.warning({
                title: '全部导出',
                content: '无记录可导出！',
            });
        }
    }

    onDeleteAll = () => {
        if (this.props.HomeStore.dataSource.length > 0) {
            Modal.confirm({
                title: '全部删除',
                content: '确定要删除全部记录？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    let params = this.commDele(toJS(this.props.HomeStore.dataSource))
                    console.log(params);
                    this.props.HomeStore.deleteObjs(params);
                    let params1 = {};
                    params1.firstFormId = this.props.HomeStore.firstFormId;
                    params1.pageIndex = this.props.HomeStore.PageInfo.pageIndex;
                    params1.pageSize = this.props.HomeStore.PageInfo.pageSize
                    this.props.HomeStore.queryAll(params1);
                    this.props.HomeStore.countObj({ firstFormId: this.props.HomeStore.firstFormId })
                    // 删除->数据库恢复->翻页->原来选中删除的标记不出现
                    this.props.TableStore.setSelectedRowKeys([]);
                    this.props.TableStore.selectedIdsList = [];
                }
            })
        }
        else {
            Modal.warning({
                title: '全部删除',
                content: '无记录可删除！',
            });
        }
    }
    /* "导出"下拉框菜单 */
    exportMenu = (
        <Menu>
            <Menu.Item key="1" onClick={this.onExport}>
                筛选后的数据
            </Menu.Item>
            <Menu.Item key="2" onClick={this.onExportAll}>
                全部数据
            </Menu.Item>
        </Menu>
    );

    /* "删除"下拉框菜单 */
    deleteMenu = (
        <Menu>
            <Menu.Item key="1" onClick={this.onDelete}>
                筛选后的数据
            </Menu.Item>
            <Menu.Item key="2">
                全部数据
            </Menu.Item>
        </Menu>
    );



};

export default GlobalTabel2

