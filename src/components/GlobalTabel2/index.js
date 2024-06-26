import React, { createRef } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Checkbox, Dropdown, Menu, Modal, Popover, Row, Table } from 'antd';
import { ClockCircleOutlined, DeleteOutlined, DownOutlined, FilterOutlined, FullscreenExitOutlined, PlusOutlined, SortDescendingOutlined, UploadOutlined, FunnelPlotOutlined } from '@ant-design/icons';
import GlobalModal from 'components/GlobalModal';
import { toJS } from 'mobx';
import { firstFormName } from 'constants/status_constant';
import moment from 'moment';
import DataModal from './dataModal';
import FormLayout from 'layouts/FormLayout';
import MulChange from './mulChange';
import SortLayout from './sortLayout';
import SelectLayout from './selectLayout';

const ExportJsonExcel = require("js-export-excel");
@inject('HomeStore', 'TableStore')
@observer
class GlobalTabel2 extends React.Component {

    render() {
        const childrenRef = createRef()
        const { isLoading } = this.props.HomeStore
        const { selectedRowKeys, dataSource, columns, lastColumns, PageInfo } = this.props.TableStore;
        /* 表格第一列选择框事件 */
        const rowSelection = {
            selectedRowKeys,
            columnWidth: 50,
            onChange: (selectedRowKeys, selectedRows) => {
                this.props.TableStore.setSelectedRowKeys(selectedRowKeys);
                this.props.TableStore.selectedIdsList = toJS(selectedRows);
                this.props.TableStore.setDataPageModalVis(false);
            },
        };
        const checkChange = (value) => {
            this.props.TableStore.setFieldValue(value);
        }
        const visibleChange = (visible) => {
            if (visible == false) {
                this.props.TableStore.setLastColumns();
            }
        }
        const handleVis = (visible) => {
            if (visible == false) {
                childrenRef.current.setSort();
            }
        }
        const expandable = {
            columnTitle: <columnTitle />
        }
        const fieldChoose = (
            <div className='field_list'>
                <Checkbox.Group onChange={checkChange} defaultValue={this.props.TableStore.fieldValue}>
                    {columns.map((item, index) => {
                        return <>
                            <Checkbox value={item.key} key={index} style={{ width: '300px' }}>{item.title}</Checkbox>
                            <br />
                        </>
                    })}
                </Checkbox.Group>
            </div>
        )
        const handleSelVis = (visible) => {
            console.log(visible);
        }
        return (
            <div>
                <div className='search_bar'>
                    {
                        this.props.TableStore.model !== 'look' && <>
                            {/* 添加 */}
                            <Button type="primary" icon={<PlusOutlined />}
                                style={{ margin: '0 10px 10px 0', padding: '0 20px', verticalAlign: 'middle' }}
                                onClick={() => this.props.TableStore.setIsModalEdit(true)}
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
                            {/* 操作记录 */}
                            <Dropdown overlay={this.mulChangeMenu} placement="bottomLeft" >
                                <Button icon={<ClockCircleOutlined />}
                                    style={{ margin: '0 10px 10px 0', padding: '0 20px', verticalAlign: 'middle', border: 'none' }}
                                >
                                    操作记录
                                </Button>
                            </Dropdown>
                        </>
                    }


                    {/* 全屏 */}
                    <Button icon={<FullscreenExitOutlined />} style={{ border: 'none', margin: '0 10px 10px 10px', verticalAlign: 'middle', float: 'right' }} />
                    {/* 显示字段 */}
                    <div style={{ border: 'none', margin: '0 10px 10px 10px', verticalAlign: 'middle', float: 'right' }}>
                        <Popover placement="bottomRight" content={fieldChoose} trigger="click"
                            onOpenChange={visibleChange}
                        >
                            <Button icon={<FunnelPlotOutlined />} style={{ border: 'none', margin: '0 10px 10px 0', verticalAlign: 'middle', float: 'right' }} />
                        </Popover>
                    </div>
                    {/* 排序 */}
                    <div style={{ border: 'none', margin: '0 10px 10px 0', verticalAlign: 'middle', float: 'right' }}>
                        <Popover placement="bottomRight" content={<SortLayout cRef={childrenRef} />} trigger="click" destroyTooltipOnHide="true"
                            onOpenChange={handleVis}
                        >
                            <Button icon={<SortDescendingOutlined />} style={{ border: 'none', margin: '0 10px 10px 0', verticalAlign: 'middle', float: 'right' }} />
                        </Popover>
                    </div>
                    {/* 筛选条件 */}

                    <div style={{ border: 'none', margin: '0 10px 10px 0', verticalAlign: 'middle', float: 'right' }}>
                        <Popover placement="bottomRight" content={<SelectLayout type={'select'} />} trigger="click" destroyTooltipOnHide="true"
                            onOpenChange={handleSelVis}
                        >
                            <Button icon={<FilterOutlined />} style={{ border: 'none', margin: '0 10px 10px 0', verticalAlign: 'middle', float: 'right' }} />
                        </Popover>
                    </div>

                </div>
                {
                    <Table
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection,
                        }}
                        scroll={{ x: 1500, y: 600 }}
                        bordered
                        rowKey={record => record.key}
                        dataSource={dataSource}
                        columns={lastColumns}//标题
                        pagination={PageInfo}
                        // onChange={this.onChange}
                        expandable={expandable}
                        loading={isLoading}
                        onRow={this.props.TableStore.model != 'look' ? (key, record) => {
                            return {
                                onClick: event => {
                                    let dindex = 0;
                                    dataSource.forEach((one, index) => {
                                        if (one['key'] == key['key']) {
                                            dindex = index
                                        }
                                    })
                                    this.props.TableStore.getOneData({ 'formId': this.props.HomeStore.firstFormId, 'dataId': key.key }).then(() => {
                                        this.props.TableStore.setValue('dataId', key.key)
                                        this.props.TableStore.setDataPageModalVis(true);
                                        this.props.TableStore.setValue('itemIndex', dindex)
                                    })
                                }, // 点击行
                            };
                        } : null}
                    />
                }

                {
                    this.props.TableStore.dataPageModalVis && <GlobalModal

                        title={firstFormName[this.props.HomeStore.firstFormId]}
                        width={1300}
                        visible={this.props.TableStore.dataPageModalVis}
                        onOk={e => { this.props.TableStore.setDataPageModalVis(false) }}
                        onCancel={e => {
                            this.props.TableStore.setDataPageModalVis(false);
                            this.props.TableStore.setIsModalEdit(false);
                            this.props.TableStore.setValue('formEdit', false);
                        }}
                        footer={null}
                        children={
                            <DataModal />
                        } />
                }
                {
                    this.props.TableStore.isModalEdit && <GlobalModal
                        title={firstFormName[this.props.HomeStore.firstFormId]}
                        width={800}
                        visible={this.props.TableStore.isModalEdit}
                        onOk={e => {
                            this.props.TableStore.setIsModalEdit(false)
                            if (this.props.TableStore.model == 'subitAndManage') {
                                this.props.TableStore.getAllData({ formId: this.props.HomeStore.firstFormId }, 'myself')
                            } else {
                                this.props.TableStore.getAllData({ formId: this.props.HomeStore.firstFormId }, 'all')
                            }
                        }}
                        onCancel={e => {
                            this.props.TableStore.setDataPageModalVis(false);
                            this.props.TableStore.setIsModalEdit(false);
                            this.props.TableStore.setValue('formEdit', false);
                            if (this.props.TableStore.model == 'subitAndManage') {
                                this.props.TableStore.getAllData({ formId: this.props.HomeStore.firstFormId }, 'myself')
                            } else {
                                this.props.TableStore.getAllData({ formId: this.props.HomeStore.firstFormId }, 'all')
                            }
                        }}
                        footer={null}
                        children={
                            <div className='modal_content'>
                                <FormLayout handleClose={() => {
                                    this.props.TableStore.setDataPageModalVis(false);
                                    this.props.TableStore.setIsModalEdit(false);
                                    this.props.TableStore.setValue('formEdit', false);
                                    if (this.props.TableStore.model == 'subitAndManage') {
                                        this.props.TableStore.getAllData({ formId: this.props.HomeStore.firstFormId }, 'myself')
                                    } else {
                                        this.props.TableStore.getAllData({ formId: this.props.HomeStore.firstFormId }, 'all')
                                    }
                                }} />
                            </div>
                        } />
                }
                {
                    this.props.TableStore.mulVis && <Modal
                        title={<>
                            <span className='mul_title'>批量修改</span>{this.props.TableStore.mulType == '1' && <span className='mul_header_line'>本次操作将修改{this.props.TableStore.selectedRowKeys.length}条数据</span>}
                        </>}
                        visible={this.props.TableStore.mulVis}
                        footer={null}
                        onCancel={() => this.props.TableStore.setValue('mulVis', false)}
                        children={
                            <MulChange />
                        }
                    />
                }
            </div>

        );
    }


    commExport = (data, export_list) => {
        console.log(export_list);
        let option = {}
        option.fileName = moment(new Date()).format('L') + '  ' + moment(new Date()).format('LTS')
        let sheetFilter = []
        let sheetHeader = []
        let columnWidths = []
        let sheetData = []
        let sheetName = firstFormName[this.props.HomeStore.firstFormId]
        export_list.map((item) => {
            item = JSON.parse(item)
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
                columnWidths: columnWidths
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
                    if (this.props.TableStore.selectedRowKeys.length == 1) {
                        this.props.TableStore.delOneData({ 'formId': this.props.HomeStore.firstFormId, 'dataId': toJS(this.props.TableStore.selectedRowKeys)[0] }).then(() => {
                            if (this.props.TableStore.model == 'subitAndManage') {
                                this.props.TableStore.getAllData({ formId: this.props.HomeStore.firstFormId }, 'myself')
                            } else {
                                this.props.TableStore.getAllData({ formId: this.props.HomeStore.firstFormId }, 'all')
                            }
                        })
                    } else {
                        this.props.TableStore.delMulData({ 'formId': this.props.HomeStore.firstFormId, 'dataIds': toJS(this.props.TableStore.selectedRowKeys) }).then(() => {
                            if (this.props.TableStore.model == 'subitAndManage') {
                                this.props.TableStore.getAllData({ formId: this.props.HomeStore.firstFormId }, 'myself')
                            } else {
                                this.props.TableStore.getAllData({ formId: this.props.HomeStore.firstFormId }, 'all')
                            }
                        })
                    }
                    // this.props.HomeStore.deleteObjs(params);
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
            let export_list = []
            const onChange = (list) => {
                export_list = list
                console.log(list);
            };
            Modal.confirm({
                title: '筛选导出',
                content: (
                    <div className='export_list'>
                        <Checkbox.Group style={{ width: '100%' }} onChange={(info) => {
                            let list = JSON.parse(JSON.stringify(info))
                            onChange(list)
                        }}>
                            {
                                this.props.TableStore.columns.map((item, index) => {
                                    console.log(toJS(item));
                                    return (
                                        <Row>
                                            <Checkbox key={index} value={JSON.stringify(item)}>
                                                {item.title}
                                            </Checkbox>
                                        </Row>
                                    )
                                })
                            }
                        </Checkbox.Group>
                    </div>

                ),
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    let option = this.commExport(toJS(this.props.TableStore.selectedIdsList), export_list);
                    let toExcel = new ExportJsonExcel(option)
                    toExcel.saveExcel();
                }
            })
        }
        else {
            Modal.warning({
                style: { height: '200px' },
                title: '筛选导出',
                content: '请选择需要导出的记录！',
            });
        }
    };

    onExportAll = () => {
        if (this.props.TableStore.dataSource.length > 0) {
            let export_list = []
            const onChange = (list) => {
                export_list = list
                console.log(list);
            };
            Modal.confirm({
                title: '全部导出',
                content: (
                    <div className='export_list'>
                        <Checkbox.Group style={{ width: '100%' }} onChange={(info) => {
                            let list = JSON.parse(JSON.stringify(info))
                            onChange(list)
                        }}>
                            {
                                this.props.TableStore.columns.map((item, index) => {
                                    console.log(toJS(item));
                                    return (
                                        <Row>
                                            <Checkbox key={index} value={JSON.stringify(item)}>
                                                {item.title}
                                            </Checkbox>
                                        </Row>
                                    )
                                })
                            }
                        </Checkbox.Group>
                    </div>

                ),
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    let option = this.commExport(toJS(this.props.TableStore.dataSource), export_list);
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
        console.log(toJS(this.props.TableStore.dataSource));
        let arr = this.props.TableStore.dataSource.map(one => {
            return one.key
        })
        if (this.props.TableStore.dataSource.length > 0) {
            Modal.confirm({
                title: '全部删除',
                content: '确定要删除全部记录？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {

                    this.props.TableStore.delMulData({ 'formId': this.props.HomeStore.firstFormId, 'dataIds': arr }).then(() => {
                        if (this.props.TableStore.model == 'subitAndManage') {
                            this.props.TableStore.getAllData({ formId: this.props.HomeStore.firstFormId }, 'myself')
                        } else {
                            this.props.TableStore.getAllData({ formId: this.props.HomeStore.firstFormId }, 'all')
                        }
                    })
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
            <Menu.Item key="2" onClick={this.onDeleteAll}>
                全部数据
            </Menu.Item>
        </Menu>
    );
    onMulChange = () => {
        if (this.props.TableStore.selectedIdsList.length > 0) {
            this.props.TableStore.setValue('mulType', '1')
            this.props.TableStore.setValue('mulVis', true);
        }
        else {
            Modal.warning({
                style: { height: '200px' },
                title: '批量修改',
                content: '请选择需要批量修改的记录！',
            });
        }
    }
    onMulLog = () => {
        this.props.TableStore.getBatchLog({ 'formId': toJS(this.props.HomeStore.firstFormId) })
        this.props.TableStore.setValue('mulType', '3')
        this.props.TableStore.setValue('mulVis', true);
    }
    /* "批量修改"下拉框菜单 */
    mulChangeMenu = (
        <Menu>
            <Menu.Item key="1" onClick={this.onMulChange}>
                批量修改
            </Menu.Item>
            <Menu.Item key="2" onClick={this.onMulLog}>
                批量修改记录
            </Menu.Item>
            <Menu.Item key="3" onClick={this.onMulPrint} disabled='false'>
                批量打印模板记录
            </Menu.Item>
        </Menu>
    )


};

export default GlobalTabel2

