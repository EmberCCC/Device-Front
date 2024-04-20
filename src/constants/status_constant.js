/* 设备状态 */
export const deviceStatus = {
	0:'禁用',
	1:'启用'
}

/* 工单状态 */
export const workStatus = {
	0:"未派单",
	1:"已派单",
	2:"已响应",
	3:"已拒绝",
	4:"进行中",
	5:"已完成",
	6:"未完成",
	7:'已重派',
	8:'已完结',
	9:'待件中',
	10:'待件结束'
}

/* 生产计划单状态 */
export const planStatus = {
	1:'未处理',
	2:'已排程'
}

export const workLevel = {
	1:'紧急',
	2:'高级',
	3:'一般'
}

//组件类型
export const typeId = {
	Input:0,
	TextArea:1,
	InputNumber:2,
	DatePicker:3,
	RadioGroup:4,
	CheckboxGroup:5,
	Select:6,
	Divider:7,
	RangePicker:8,
	Containers:13
}

export const typeName = {
	0:'Input',
	1:'TextArea',
	2:'InputNumber',
	3:'DatePicker',
	4:'RadioGroup',
	5:'CheckboxGroup',
	6:'Select',
	7:'Divider',
	8:'RangePicker',
	14:'Containers'
}

export const firstFormName = {
	1:'机房',
	2:'设备类型',
	3:'部门',
	4:'设备状态',
	5:'保养等级与频次',
	6:'仓库',
	7:'单位',
	8:'安装地点',
	9:'设备巡检单',
	10:'巡检方案',
	11:'巡检内容计划',
	12:'巡检时间计划',
	13:'设备报修单',
	14:'设备保养单',
	15:'保养计划基础表',
	16:'备件台账',
	17:'备件入库单',
	18:'备件领用单',
}

export const state = {
	0:"待办",
	1:"进行中",
	2:"已结束",
}