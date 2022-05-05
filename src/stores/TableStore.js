/*
 * @Description: 
 * @version: 
 * @Author: zhihao
 * @Date: 2022-04-17 15:22:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-28 18:28:14
 */

import { observable, action, toJS, runInAction } from 'mobx';
import { message } from 'antd';
import * as services from '../services/home';
import { isDataExist } from 'utils/dataTools';
import { omit } from 'lodash';

class Table {

	@observable contentSearchOptions = {};
	@observable planSearchOptions = {};
	@observable dataSearchOptions = {};
	@observable maintenanceList = [];//保养数据表的数据源
	@observable maintenancePageInfo = {
		pageIndex: 1,
		pageSize: 10
	};
	@observable isModalEdit = false; //保养数据的对话框是否为编辑状态
	@observable modalEditData = {};
	@observable maintenanceContentList = [];//保养内容表的数据源
	@observable contentCheckedRow = []; //选中设备的所有记录
	@observable maintenancePlanList = [];//保养计划表的数据源
	@observable planCheckedRow = {};
	@observable gangedInputVis = false; //保养内容中的联动输入框是否可见
	@observable dataPageModalVis = false; //弹窗是否可见
	@observable calendarPageModalVis = false;
	@observable contentPageModalVis = false;
	@observable planPageModalVis = false;
	@observable selectedIdsList = [];   // 保养数据表格第一列的选择ID列表  
	@observable allSelectedIdsList = [];  //全选ID列表
	@observable selectedDate = '';//日历选中的日期
	@observable chosenDateRow = [];//选中日期的保养数据
	@observable chosenDateRowName = [];

	//是否展示对话框
	@action.bound setDataPageModalVis(visible) {
		this.dataPageModalVis = visible;
	}

	@action.bound setModalEditData(data){
		this.modalEditData = data;
	}

	//是否编辑对话框
	@action.bound setIsModalEdit(editble){
		this.isModalEdit = editble;
	}


}

let TableStore = new Table();
export default TableStore;
