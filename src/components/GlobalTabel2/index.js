/*
 * @Author: your name
 * @Date: 2022-04-07 11:58:39
 * @LastEditTime: 2022-05-06 05:05:42
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


@inject('HomeStore', 'TableStore')
@observer
class GlobalTabel2 extends React.Component {
    render() {
        const { dataSource, columns, PageInfo, isLoading } = this.props.HomeStore
        return (
            <div>
                <div className='search_bar'>

                    {/* 添加 */}
                    <Button type="primary" icon={<PlusOutlined />}
                        style={{ margin: '0 10px 10px 0', padding: '0 20px', verticalAlign: 'middle' }}
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
                        ...this.rowSelection,
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
                                this.props.TableStore.setIsModalEdit(true);
                                this.props.TableStore.setModalEditData(key, record);
                                this.props.TableStore.setDataPageModalVis(true);
                            }, // 点击行
                        };
                    }}
                />
                {
                    this.props.TableStore.dataPageModalVis && <GlobalModal
                        visible={this.props.TableStore.dataPageModalVis}
                        onOk={e => this.props.TableStore.setDataPageModalVis(false)}
                        onCancel={e => { this.props.TableStore.setDataPageModalVis(false); this.props.TableStore.setIsModalEdit(false); }}
                        children={
                            <GlobalForm type={true} dataInfo={this.props.TableStore.modalEditData} />
                        } />
                }
            </div>

        );
    }

    onChange = (e) => {
        this.props.HomeStore.PageInfo = e;
        this.props.HomeStore.PageInfo.pageIndex = e.current
        let params = {};
        params.firstFormId = this.props.HomeStore.firstFormId;
        this.props.HomeStore.countObj(params)
    }
    /* 删除方法 */
    onDelete = () => {
        console.log(11);
        if (this.props.TableStore.selectedIdsList.length > 0) {
            Modal.confirm({
                title: '筛选删除',
                content: '确定要删除选中的记录？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    let idArr = toJS(this.props.TableStore.selectedIdsList)
                    let params = []
                    idArr.map((item) => {
                        let idOne = {}
                        idOne.firstFormId = this.props.HomeStore.firstFormId
                        idOne.dataId = item.id
                        params.push(idOne);
                    })
                    console.log(params);
                    this.props.HomeStore.deleteObjs(params);
                    let params1 = {};
                    params1.firstFormId = this.props.HomeStore.firstFormId;
                    params1.pageIndex = this.props.HomeStore.PageInfo.pageIndex;
                    params1.pageSize = this.props.HomeStore.PageInfo.pageSize
                    this.props.HomeStore.queryAll(params1);
                    // 删除->数据库恢复->翻页->原来选中删除的标记不出现
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
    /* "导出"下拉框菜单 */
    exportMenu = (
        <Menu>
            <Menu.Item key="1">
                筛选后的数据
            </Menu.Item>
            <Menu.Item key="2">
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

    /* 表格第一列选择框事件 */
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRows);
            this.props.TableStore.selectedIdsList = toJS(selectedRows)
        },
    };


};

export default GlobalTabel2

