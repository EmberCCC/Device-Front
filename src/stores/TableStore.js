/*
 * @Description: 
 * @version: 
 * @Author: zhihao
 * @Date: 2022-04-17 15:22:43
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-14 00:05:59
 */

import { message, Modal } from 'antd';
import { getSchema, restore } from 'layouts/FormEdit/changeTool';
import { observable, action, toJS, makeObservable } from 'mobx';
import { isDataExist } from 'utils/dataTools';
import * as services from '../services/home';

class Table {

	constructor() {
		makeObservable(this);
	}
	@observable isModalEdit = false; //保养数据的对话框是否为编辑状态
	@observable dataPageModalVis = false; //弹窗是否可见
	@observable selectedIdsList = [];   // 保养数据表格第一列的选择ID列表  
	@observable allSelectedIdsList = [];  //全选ID列表
	@observable selectedDate = '';//日历选中的日期
	@observable chosenDateRow = [];//选中日期的保养数据
	@observable chosenDateRowName = [];
	@observable selectedRowKeys = [];
	@observable columns = []; //表格使用的columns
	@observable dataSource = [];
	@observable columnsList = [];
	@observable showColumns = [];
	@observable lastColumns = [];
	@observable fieldValue = [];
	@observable modalFieldValue = [];
	@observable sortList = [];
	@observable model = "submit"; //模式控制;
	@observable PageInfo = { pageSize: 5, pageIndex: 1 }
	@observable itemIndex = 1;
	@observable detailData = {};
	@observable modalField = [];
	@observable modalData = {};
	@observable isLoading = false;
	@observable mulVis = false;
	@observable mulType = '1';
	@observable batchLog = [];
	@observable formArr = [];
	@observable formData = {};
	@observable formEdit = false;
	@observable schema = {};
	@observable relSortList = [];
	@observable allData = [];



	@action getModel() {
		return this.model;
	}

	//修改展示模式
	@action.bound changeModel(value) {
		this.model = value;
	}

	@action.bound setFieldValue(value) {
		this.fieldValue = value
	}
	@action.bound clearSort() {
		this.relSortList = [];
	}
	sortFunction(objA, objB, id) {
		let sortList = JSON.parse(sessionStorage.getItem('sort_' + id));
		for (let index = 0; index < sortList.length; index++) {
			const element = sortList[index];
			if (!objA.hasOwnProperty(element['fieldInfo']['key'])) {
				return 1
			} else if (!objB.hasOwnProperty(element['fieldInfo']['key'])) {
				return -1
			}
			if (objA[element['fieldInfo']['key']] === objB[element['fieldInfo']['key']]) {
				continue
			} else if (element['type'] == 'up') {
				return objA[element['fieldInfo']['key']] > objB[element['fieldInfo']['key']] ? 1 : -1
			} else if (element['type'] == 'down') {
				return objA[element['fieldInfo']['key']] > objB[element['fieldInfo']['key']] ? -1 : 1
			}
			return 0
		}
	}

	@action.bound getSortDataSource(id) {
		let iDataSource = toJS([...this.dataSource]);
		let sortList = JSON.parse(sessionStorage.getItem('sort_' + id));
		console.log(sortList);
		if (sortList.length == 0) {
			iDataSource.sort(function (a, b) {
				return a['key'] === b['key'] ? 0 : a['key'] > b['key'] ? 1 : -1
			})
		}
		iDataSource.sort((a, b) => this.sortFunction(a, b, id))
		this.setValue('dataSource', iDataSource)
		console.log(toJS(iDataSource));
	}
	@action.bound changeSort(value) {
		this.relSortList = value;
		this.getSortDataSource();
	}
	@action.bound setLastColumns() {
		let iColumns = []
		this.columns.forEach((item) => {
			if (this.fieldValue.indexOf(item.key) > -1) {
				iColumns.push(item);
			}
		})
		this.lastColumns = iColumns
		// console.log();
	}

	//是否展示对话框
	@action.bound setDataPageModalVis(visible) {
		this.dataPageModalVis = visible;
	}


	//是否编辑对话框
	@action.bound setIsModalEdit(editble) {
		this.isModalEdit = editble;
	}

	@action.bound setSelectedRowKeys(keys) {
		this.selectedRowKeys = keys;
	}

	@action.bound setValue(key, value) {
		this[key] = value;
	}

	@action.bound async delOneData(params) {
		console.log(params);
		try {
			var res = await services.putRequestFormData(services.requestList.delOneData, params);
			if (isDataExist(res)) {
				Modal.success({
					content: res.data.msg
				})
			} else {
				Modal.error({
					content: res.data.msg
				})
			}
		} catch (error) {
			return error.code
		}
	}
	@action.bound async delMulData(params) {
		try {
			var res = await services.putRequest(services.requestList.delBatchDel, params);
			if (isDataExist(res)) {
				Modal.success({
					content: res.data.msg
				})
			} else {
				Modal.error({
					content: res.data.msg
				})
			}
		} catch (error) {

		}
	}
	@action.bound async getBatchLog(params) {
		this.setValue('isLoading', true);
		this.setValue('batchLog', []);
		try {
			let res = await services.getRequest(services.requestList.getBatchLog, params);
			if (isDataExist(res)) {
				this.setValue('batchLog', res.data.data);
				this.setValue('isLoading', false);
			}
		} catch (error) {
			console.log(error);
		}
	}
	@action.bound async getOneData(params) {
		this.setValue('detailData', {});
		this.setValue('isLoading', true);
		try {
			let res = await services.getRequest(services.requestList.getOneData, params);
			this.setValue('detailData', res.data.data);
			let data = {};
			let field = [];
			let formObj = toJS(this.detailData['form']);
			console.log(formObj);
			let formObj2 = {
				'formFields': JSON.stringify(formObj),
				'properties': "{\"displayType\":\"column\",\"labelWidth\":120,\"type\":\"object\"}"
			}
			this.setValue('formArr', restore({ 'form': formObj2, 'fields': toJS(this.detailData['fields']) }))
			this.setValue('formData', this.detailData['data'])
			data['createPerson'] = this.detailData['data']['createPerson'];
			data['createTime'] = this.detailData['data']['createTime'];
			data['updateTime'] = this.detailData['data']['updateTime'];
			data['id'] = this.detailData['data']['id']
			let formData = JSON.parse(toJS(this.detailData['data']['formData']));
			for (const key in formData) {
				if (Object.hasOwnProperty.call(formData, key)) {
					const element = formData[key];
					data[key] = element
				}
			}
			toJS(this.detailData['fields']).forEach(element => {
				field.push(element);
			});
			field.push({ 'name': '创建人', 'id': 'createPerson' })
			field.push({ 'name': '创建时间', 'id': 'createTime' })
			field.push({ 'name': '更新时间', 'id': 'updateTime' })
			this.setValue('modalField', field);
			this.setValue('modalData', data);
			this.setValue('isLoading', false);
		} catch (error) {
			console.log(error);
		}
	}
	@action.bound async mulChange(params) {
		try {
			let res = await services.putRequest(services.requestList.mulChangeData, params);
			if (isDataExist(res)) {
				Modal.success({
					content: "批量修改数据成功"
				})
			}
		} catch (error) {
			console.log(error);
		}
	}

	@action.bound async getAllData(params, type) {
		this.setValue('columns', [])
		this.setValue('dataSource', [])
		this.setValue('fieldValue', [])
		this.setValue('schema', {})
		this.setValue('isLoading', true);
		this.setValue('allData', []);
		try {
			if (type == 'myself') {
				var res = await services.getRequest(services.requestList.getUserData, params);
			} else {
				var res = await services.getRequest(services.requestList.getAllData, params);
			}
			let data = res.data.data;
			let iColumns = []
			let iDataSource = [];
			let iFieldValue = [];
			data.fields.map((item) => {
				let jsonItem = JSON.parse(item['detailJson']);
				jsonItem['fieldId'] = item['id'];
				iColumns.push({ 'title': jsonItem.title, 'dataIndex': item.id, 'key': item.id, 'detailJson': jsonItem });
				iFieldValue.push(item.id)
			})
			data.fieldsValue.map((item) => {
				let obj = {}
				obj.createPerson = item.createPerson;
				obj.createTime = item.createTime;
				obj.updateTime = item.updateTime;
				obj.key = item.id;

				let iObj = JSON.parse(toJS(item.formData))
				for (const front in iObj) {
					obj[front] = iObj[front]
					iColumns.map((info) => {
						if (info['key'] == front && ['4', '6'].indexOf(info['detailJson']['typeId']) > -1) {
							let index = info['detailJson']['enum'].indexOf(iObj[front])
							obj[front] = info['detailJson']['enumNames'][index];
						} else if (info['key'] == front && ['5', '7'].indexOf(info['detailJson']['typeId']) > -1) {
							obj[front] = ""
							// console.log(typeof (iObj[front]));
							let iArr = iObj[front].substring(1, iObj[front].length - 1).split(',')
							iArr.map((one, index) => {
								let oneIndex = info['detailJson']['enum'].findIndex(item => item.charCodeAt() == one.substring(1,one.length - 1).charCodeAt())
								if (index == 0) {
									obj[front] += info['detailJson']['enumNames'][oneIndex]
								} else {
									obj[front] += ","
									obj[front] += info['detailJson']['enumNames'][oneIndex]
								}
							})
						}
					})
				}
				iDataSource.push(obj)
			})
			this.setValue('dataSource', iDataSource)
			this.setValue('allData', iDataSource)
			iFieldValue.push('createPerson')
			iFieldValue.push('createTime')
			iFieldValue.push('updateTime')
			iColumns.push({ 'title': '创建人', 'dataIndex': 'createPerson', 'key': 'createPerson' });
			iColumns.push({ 'title': '创建时间', 'dataIndex': 'createTime', 'key': 'createTime' });
			iColumns.push({ 'title': '更新时间', 'dataIndex': 'updateTime', 'key': 'updateTime' });
			this.setValue('fieldValue', iFieldValue)
			this.setValue('modalFieldValue', iFieldValue)
			this.setValue('columns', iColumns)
			this.setValue('showColumns', iColumns)
			this.setValue('lastColumns', iColumns)
			data.fields.push({ 'name': '创建人', 'id': 'createPerson' })
			data.fields.push({ 'name': '创建时间', 'id': 'createTime' })
			data.fields.push({ 'name': '更新时间', 'id': 'updateTime' })
			this.setValue('columnsList', data.fields)
			this.setValue('isLoading', false);
			this.setValue('schema', getSchema(iColumns, iDataSource));
			console.log(iColumns);
			console.log(iDataSource);
		} catch (error) {
			console.log(error);
		}
	}

	@action.bound async getScreenData(params, type) {
		this.setValue('columns', [])
		this.setValue('dataSource', [])
		this.setValue('fieldValue', [])
		this.setValue('schema', {})
		this.setValue('isLoading', true);
		try {
			if (type == 'myself') {
				var res = await services.putRequest(services.requestList.getScreenDataUser, params);
			} else {
				var res = await services.putRequest(services.requestList.getScreenData, params);
			}
			let data = res.data.data;
			let iColumns = []
			let iDataSource = [];
			let iFieldValue = [];
			data.fields.map((item) => {
				let jsonItem = JSON.parse(item['detailJson']);
				jsonItem['fieldId'] = item['id'];
				let obj = {}
				if (['4', '5', '6', '7'].indexOf(jsonItem['typeId']) > -1) {
					jsonItem['enum'].map((item, index) => {
						obj[item] = jsonItem['enumNames'][index]
					})
				}
				iColumns.push({ 'title': jsonItem.title, 'dataIndex': item.id, 'key': item.id, 'detailJson': jsonItem, 'exchange': obj });
				iFieldValue.push(item.id)
			})
			data.fieldsValue.map((item) => {
				let obj = {}
				obj.createPerson = item.createPerson;
				obj.createTime = item.createTime;
				obj.updateTime = item.updateTime;
				obj.key = item.id;
				let iObj = JSON.parse(toJS(item.formData))
				for (const front in iObj) {
					obj[front] = iObj[front]
				}
				iDataSource.push(obj)
			})
			this.setValue('dataSource', iDataSource)
			iFieldValue.push('createPerson')
			iFieldValue.push('createTime')
			iFieldValue.push('updateTime')
			iColumns.push({ 'title': '创建人', 'dataIndex': 'createPerson', 'key': 'createPerson' });
			iColumns.push({ 'title': '创建时间', 'dataIndex': 'createTime', 'key': 'createTime' });
			iColumns.push({ 'title': '更新时间', 'dataIndex': 'updateTime', 'key': 'updateTime' });
			this.setValue('fieldValue', iFieldValue)
			this.setValue('modalFieldValue', iFieldValue)
			this.setValue('columns', iColumns)
			this.setValue('showColumns', iColumns)
			this.setValue('lastColumns', iColumns)
			data.fields.push({ 'name': '创建人', 'id': 'createPerson' })
			data.fields.push({ 'name': '创建时间', 'id': 'createTime' })
			data.fields.push({ 'name': '更新时间', 'id': 'updateTime' })
			this.setValue('columnsList', data.fields)
			this.setValue('isLoading', false);
			this.setValue('schema', getSchema(iColumns, iDataSource));
			console.log(iColumns);
			console.log(iDataSource);
		} catch (error) {
			console.log(error);
		}
	}


}

let TableStore = new Table();
export default TableStore;
