/*
 * @Author: your name
 * @Date: 2022-03-26 12:43:21
 * @LastEditTime: 2022-04-08 22:16:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\constants\status_constant.js
 */
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
	Input:1,
	TextArea:2,
	InputNumber:3,
	DatePicker:4,
	RadioGroup:5,
	CheckboxGroup:6,
	Select:7,
	Divider:8,
	RangePicker:9
}

export const typeName = {
	1:'Input',
	2:'TextArea',
	3:'InputNumber',
	4:'DatePicker',
	5:'RadioGroup',
	6:'CheckboxGroup',
	7:'Select',
	8:'Divider',
	9:'RangePicker'
}