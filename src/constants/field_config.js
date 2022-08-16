/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-02 08:07:00
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-15 20:46:39
 * @FilePath: \bl-device-manage-test\src\constants\field_config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var elements = [
    {
        text: '单行文本',
        name: '0',
        schema: {
            title: '单行文本',
            type: 'string',
            typeId: '0'
        },
        setting: {
            title: {
                title: '标题',
                type: 'string',
            },
            title_vis: {
                title: '显示标题',
                type: 'boolean',
                props: {
                    defaultValue: true
                }
            },
            describe: {
                title: '描述信息',
                type: 'string',
                widget: 'RichTextEditor'
            },
            default_type: {
                title: '默认值',
                type: 'string',
                enum: ['1', '2', '3'],
                enumNames: ['自定义', '数据联动', '公式编辑'],
                widget: 'select',
                props: {
                    defaultValue: '1'
                }
            },
            default: {
                type: 'any',
                widget: 'link_item',
                dependencies: ['default_type']
            },
            link_condition: {
                type: 'any',
                widget: 'link_condition',
                hidden: "{{rootValue.default_type != 2}}"
            },
            width: {
                title: '元素宽度',
                type: 'string',
                widget: 'percentSlider'
            },
            placeholder: {
                title: '提示文字',
                type: 'string'
            },
            pattern: {
                title: '格式',
                type: 'string',
                enum: [
                    '',
                    '^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$',
                    '^(\\(\\d{3,4}-)|\\d{3.4}-)?\\d{7,8}$',
                    '[1-9]\\d{5}(?!\\d)',
                    '(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)',
                    '^\\w+([-+.]\\w+)\\*@\\w+([-.]\\w+)\\*\\.\\w+([-.]\\w+)\\*$'],
                enumNames: ['无', '手机号码', '电话号码', '邮政编码', '身份证号码', '邮箱'],
                widget: 'select',
                props: {
                    defaultValue: '无'
                }
            },
            scan: {
                title: '扫码',
                type: 'any',
                enum: ['input_scan', 'change'],
                enumNames: ['扫码输入', '可修改扫码结果'],
                widget: 'checkboxes'
            },
            required: {
                title: '必填',
                type: 'boolean'
            },
            check: {
                type: 'object',
                properties: {
                    check_only: {
                        title: '不允许重复值',
                        type: 'boolean'
                    },
                    check_info: {
                        title: '自定义提示内容',
                        type: 'string',
                        hidden: '{{!rootValue.check_only == true}}'
                    }
                }
            },
            hidden: {
                title: '隐藏',
                type: 'boolean'
            },
            disabled: {
                title: '不可编辑',
                type: 'boolean',
                props: {
                    disabled: '{{rootValue.hidden}}'
                }
            }
        }
    }, {
        text: '多行文本',
        name: '1',
        schema: {
            title: '多行文本',
            type: 'string',
            widget: 'self_textarea',
            // format: 'textarea',
            typeId: '1'
        },
        setting: {
            title: {
                title: '标题',
                type: 'string',
            },
            title_vis: {
                title: '显示标题',
                type: 'boolean',
                props: {
                    defaultValue: true
                }
            },
            describe: {
                title: '描述信息',
                type: 'string',
                widget: 'RichTextEditor'
            },
            placeholder: {
                title: '提示文字',
                type: 'string'
            },
            default_type: {
                title: '默认值',
                type: 'string',
                enum: ['1', '2', '3'],
                enumNames: ['自定义', '数据联动', '公式编辑'],
                widget: 'select',
                props: {
                    defaultValue: '1'
                }
            },
            default: {
                type: 'any',
                widget: 'link_item',
                dependencies: ['default_type']
            },
            link_condition: {
                type: 'any',
                widget: 'link_condition',
                hidden: "{{rootValue.default_type != 2}}"
            },
            width: {
                title: '元素宽度',
                type: 'string',
                widget: 'percentSlider'
            },
            required: {
                title: '必填',
                type: 'boolean'
            },
            check: {
                type: 'object',
                properties: {
                    check_only: {
                        title: '不允许重复值',
                        type: 'boolean',
                    },
                    check_info: {
                        title: '自定义提示内容',
                        type: 'string',
                        hidden: '{{!rootValue.check_only == true}}'
                    }
                }
            },
            hidden: {
                title: '隐藏',
                type: 'boolean'
            },
            disabled: {
                title: '不可编辑',
                type: 'boolean',
                props: {
                    disabled: '{{rootValue.hidden}}'
                }
            }
        }
    }, {
        text: '数字',
        name: '2',
        schema: {
            title: '数字',
            type: 'number',
            widget: 'self_number',
            typeId: '2'
        },
        setting: {
            title: {
                title: '标题',
                type: 'string',
            },
            title_vis: {
                title: '显示标题',
                type: 'boolean',
                props: {
                    defaultValue: true
                }
            },
            describe: {
                title: '描述信息',
                type: 'string',
                widget: 'RichTextEditor'
            },
            placeholder: {
                title: '提示文字',
                type: 'string'
            },
            self_pattern: {
                title: '格式',
                type: 'any',
                widget: "self_pattern"
            },
            default_type: {
                title: '默认值',
                type: 'string',
                enum: ['1', '2', '3'],
                enumNames: ['自定义', '数据联动', '公式编辑'],
                widget: 'select',
                props: {
                    defaultValue: '1'
                }
            },
            default: {
                type: 'any',
                widget: 'link_item',
                dependencies: ['default_type']
            },
            link_condition: {
                type: 'any',
                widget: 'link_condition',
                hidden: "{{rootValue.default_type != 2}}"
            },
            width: {
                title: '元素宽度',
                type: 'string',
                widget: 'percentSlider'
            },
            required: {
                title: '必填',
                type: 'boolean'
            },
            math_round: {
                title: '限定数值范围',
                type: 'boolean'
            },
            minLength: {
                title: '最小数字',
                type: 'number',
                hidden: '{{!rootValue.math_round}}',
                props: {
                    placeholder: '空为不限制'
                }
            },
            maxLength: {
                title: '最大数字',
                type: 'number',
                hidden: '{{!rootValue.math_round}}',
                props: {
                    placeholder: '空为不限制'
                }
            },
            hidden: {
                title: '隐藏',
                type: 'boolean'
            },
            disabled: {
                title: '不可编辑',
                type: 'boolean',
                props: {
                    disabled: '{{rootValue.hidden}}'
                }
            }
        }
    }, {
        text: '日期选择',
        name: '3',
        schema: {
            title: '日期选择',
            type: 'string',
            widget: 'self_datapick',
            typeId: '3'
        },
        setting: {
            title: {
                title: '标题',
                type: 'string',
            },
            title_vis: {
                title: '显示标题',
                type: 'boolean',
                props: {
                    defaultValue: true
                }
            },
            describe: {
                title: '描述信息',
                type: 'string',
                widget: 'RichTextEditor'
            },
            placeholder: {
                title: '提示文字',
                type: 'string'
            },
            format: {
                title: '类型',
                type: 'string',
                enum: ['dateTime', 'date'],
                enumNames: ['年-月-日 时:分:秒', '年-月-日'],
                props: {
                    defaultValue: 'dateTime'
                }
            },
            default_type: {
                title: '默认值',
                type: 'string',
                enum: ['1', '2', '3'],
                enumNames: ['自定义', '数据联动', '公式编辑'],
                widget: 'select',
                props: {
                    defaultValue: '1'
                }
            },
            default: {
                type: 'any',
                widget: 'link_item',
                dependencies: ['default_type']
            },
            link_condition: {
                type: 'any',
                widget: 'link_condition',
                hidden: "{{rootValue.default_type != 2}}"
            },
            width: {
                title: '元素宽度',
                type: 'string',
                widget: 'percentSlider'
            },
            required: {
                title: '必填',
                type: 'boolean'
            },
            hidden: {
                title: '隐藏',
                type: 'boolean'
            },
            disabled: {
                title: '不可编辑',
                type: 'boolean',
                props: {
                    disabled: '{{rootValue.hidden}}'
                }
            }

        }
    }, {
        text: '单选按钮组',
        name: '4',
        schema: {
            title: '单选按钮组',
            type: 'string',
            widget: 'self_radio',
            typeId: '4'
        },
        setting: {
            title: {
                title: '标题',
                type: 'string',
            },
            title_vis: {
                title: '显示标题',
                type: 'boolean',
                props: {
                    defaultValue: true
                }
            },
            describe: {
                title: '描述信息',
                type: 'string',
                widget: 'RichTextEditor'
            },
            className: {
                title: '展示方式',
                type: 'string',
                widget: 'radio',
                enum: ['item_row', 'item_column'],
                enumNames: ['横向排列', '纵向排列'],
                props: {
                    defaultValue: 'item_row'
                }
            },
            enumList: {
                title: '选项',
                type: 'array',
                widget: 'simpleList',
                className: 'frg-options-list',
                items: {
                    type: 'object',
                    properties: {
                        value: {
                            title: '',
                            type: 'string',
                            className: 'frg-options-input',
                            props: {},
                            placeholder: '字段'
                        },
                        label: {
                            title: '',
                            type: 'string',
                            hidden: true,
                            className: 'frg-options-input',
                            props: {
                                value: "{{rootValue.value}}"
                            },
                            placeholder: '名称'
                        }
                    }
                },
                props: {
                    hideMove: false,
                    hideCopy: true
                }
            },
            width: {
                title: '元素宽度',
                type: 'string',
                widget: 'percentSlider'
            },
            required: {
                title: '必填',
                type: 'boolean'
            },
            hidden: {
                title: '隐藏',
                type: 'boolean'
            },
            disabled: {
                title: '不可编辑',
                type: 'boolean',
                props: {
                    disabled: '{{rootValue.hidden}}'
                }
            }
        }
    }, {
        text: '复选框组',
        name: '5',
        schema: {
            title: '复选框组',
            type: 'any',
            widget: 'self_radio',
            typeId: '5'

        },
        setting: {
            title: {
                title: '标题',
                type: 'string',
            },
            title_vis: {
                title: '显示标题',
                type: 'boolean',
                props: {
                    defaultValue: true
                }
            },
            describe: {
                title: '描述信息',
                type: 'string',
                widget: 'RichTextEditor'
            },
            className: {
                title: '展示方式',
                type: 'string',
                widget: 'radio',
                enum: ['item_row', 'item_column'],
                enumNames: ['横向排列', '纵向排列'],
                props: {
                    defaultValue: 'item_row'
                }
            },
            enumList: {
                title: '选项',
                type: 'array',
                widget: 'simpleList',
                className: 'frg-options-list',
                items: {
                    type: 'object',
                    properties: {
                        value: {
                            title: '',
                            type: 'string',
                            className: 'frg-options-input',
                            props: {},
                            placeholder: '字段'
                        },
                        label: {
                            title: '',
                            type: 'string',
                            hidden: true,
                            className: 'frg-options-input',
                            props: {
                                value: "{{rootValue.value}}"
                            },
                            placeholder: '名称'
                        }
                    }
                },
                props: {
                    hideMove: false,
                    hideCopy: true
                }
            },
            width: {
                title: '元素宽度',
                type: 'string',
                widget: 'percentSlider'
            },
            required: {
                title: '必填',
                type: 'boolean'
            },
            hidden: {
                title: '隐藏',
                type: 'boolean'
            },
            disabled: {
                title: '不可编辑',
                type: 'boolean',
                props: {
                    disabled: '{{rootValue.hidden}}'
                }
            }
        }
    }, {
        text: '下拉框',
        name: '6',
        schema: {
            title: '下拉框',
            type: 'any',
            widget: 'self_select',
            order: 1,
            typeId: '6'
        },
        setting: {
            title: {
                title: '标题',
                type: 'string',
            },
            title_vis: {
                title: '显示标题',
                type: 'boolean',
                props: {
                    defaultValue: true
                }
            },
            describe: {
                title: '描述信息',
                type: 'string',
                widget: 'RichTextEditor'
            },
            placeholder: {
                title: '提示文字',
                type: 'string'
            },
            option_type: {
                title: '选项',
                type: 'string',
                widget: 'select',
                enum: ['1', '2', '3'],
                enumNames: ['自定义', '关联其他表单', '数据联动'],
                props: {
                    defaultValue: '1'
                }
            },
            option_list: {
                type: 'any',
                widget: 'select_option',
                dependencies: ['option_type']
            },
            option_sort: {
                title: '选项排序',
                type: 'string',
                widget: 'select',
                enum: ['<v', '>v', '<n', '>n'],
                enumNames: ['按选项的值：升序', '按选项的值：降序', '按提交时间：升序', '按提交时间：降s序',],
                hidden: "{{rootValue.option_type != 2}}",
                props: {
                    defaultValue: '<v'
                }
            },
            width: {
                title: '元素宽度',
                type: 'string',
                widget: 'percentSlider',
                props: {
                    defaultValue: '100%'
                }
            },
            required: {
                title: '必填',
                type: 'boolean'
            },
            check: {
                type: 'object',
                properties: {
                    check_only: {
                        title: '不允许重复值',
                        type: 'boolean'
                    },
                    check_info: {
                        title: '自定义提示内容',
                        type: 'string',
                        hidden: '{{!rootValue.check_only == true}}',
                    }
                }
            },
            hidden: {
                title: '隐藏',
                type: 'boolean'
            },
            disabled: {
                title: '不可编辑',
                type: 'boolean',
                props: {
                    disabled: '{{rootValue.hidden}}'
                }
            }
        }
    }, {
        text: '下拉复选框',
        name: '7',
        schema: {
            title: '下拉复选框',
            description: '下拉多选',
            type: 'any',
            widget: 'self_select',
            order: 1,
            typeId: '7'
        },
        setting: {
            title: {
                title: '标题',
                type: 'string',
            },
            title_vis: {
                title: '显示标题',
                type: 'boolean',
                props: {
                    defaultValue: true
                }
            },
            describe: {
                title: '描述信息',
                type: 'string',
                widget: 'RichTextEditor'
            },
            option_type: {
                title: '选项',
                type: 'string',
                widget: 'select',
                enum: ['1', '2', '3'],
                enumNames: ['自定义', '关联其他表单', '数据联动'],
                props: {
                    defaultValue: '1'
                }
            },
            option_list: {
                type: 'any',
                widget: 'select_option',
                dependencies: ['option_type']
            },
            option_sort: {
                title: '选项排序',
                type: 'string',
                widget: 'select',
                enum: ['<v', '>v', '<n', '>n'],
                enumNames: ['按选项的值：升序', '按选项的值：降序', '按提交时间：升序', '按提交时间：降序',],
                hidden: "{{rootValue.option_type != 2}}",
                props: {
                    defaultValue: '<v'
                }
            },
            width: {
                title: '元素宽度',
                type: 'string',
                widget: 'percentSlider'
            },
            required: {
                title: '必填',
                type: 'boolean'
            },
            check: {
                type: 'object',
                properties: {
                    check_only: {
                        title: '不允许重复值',
                        type: 'boolean'
                    },
                    check_info: {
                        title: '自定义提示内容',
                        type: 'string',
                        hidden: '{{!rootValue.check_only == true}}',
                    }
                }
            },
            hidden: {
                title: '隐藏',
                type: 'boolean'
            },
            disabled: {
                title: '不可编辑',
                type: 'boolean',
                props: {
                    disabled: '{{rootValue.hidden}}'
                }
            }
        }
    }, {
        text: '分割线',
        name: '8',
        props: {
            className: 'left_my_item'
        },
        schema: {
            title: '分割线',
            type: 'any',
            widget: "self_divider",
            typeId: '8'
        },
        setting: {
            title: {
                title: '标题',
                type: 'string',
            },
            title_vis: {
                title: '显示标题',
                type: 'boolean',
                props: {
                    defaultValue: true
                }
            },
            width: {
                title: '元素宽度',
                type: 'string',
                widget: 'percentSlider'
            },
            describe: {
                title: '描述信息',
                type: 'string',
                widget: 'RichTextEditor'
            },
            hidden: {
                title: '隐藏',
                type: 'boolean'
            }
        }
    }];
var strongElements = [
    {
        text: '地址',
        name: '9',
        schema: {
            title: '地址',
            type: 'any',
            typeId: '9',
            widget: 'self_address'
        },
        setting: {
            title: {
                title: '标题',
                type: 'string',
            },
            title_vis: {
                title: '显示标题',
                type: 'boolean',
                props: {
                    defaultValue: true
                }
            },
            describe: {
                title: '描述信息',
                type: 'string',
                widget: 'RichTextEditor'
            },
            default_type: {
                title: '默认值',
                type: 'string',
                enum: ['1', '2', '3'],
                enumNames: ['自定义', '数据联动', '公式编辑'],
                widget: 'select',
                props: {
                    defaultValue: '1'
                }
            },
            default: {
                type: 'any',
                widget: 'link_item',
                dependencies: ['default_type']
            },
            address_pattern: {
                title: '类型',
                type: 'string',
                widget: 'select',
                enum: ['1', '2'],
                enumNames: ['省-市-区', '省-市-区-详细地址'],
                props: {
                    defaultValue: '1'
                }
            },
            required: {
                title: '必填',
                type: 'boolean'
            },
            hidden: {
                title: '隐藏',
                type: 'boolean'
            },
            disabled: {
                title: '不可编辑',
                type: 'boolean',
                props: {
                    disabled: '{{rootValue.hidden}}'
                }
            },
            width: {
                title: '元素宽度',
                type: 'string',
                widget: 'percentSlider'
            }
        }
    },
    {
        text: '关联查询',
        name: '14',
        schema: {
            title: '关联查询',
            type: 'any',
            typeId: '14',
            widget: 'self_linkquery'
        },
        setting: {
            title: {
                title: '标题',
                type: 'string',
            },
            title_vis: {
                title: '显示标题',
                type: 'boolean',
                props: {
                    defaultValue: true
                }
            },
            describe: {
                title: '描述信息',
                type: 'string',
                widget: 'RichTextEditor'
            },
            linkquery_condition: {
                type: 'any',
                widget: 'linkquery_condition'
            },
            width: {
                title: '元素宽度',
                type: 'string',
                widget: 'percentSlider'
            },
            hidden: {
                title: '隐藏',
                type: 'boolean'
            },
        }
    },
    {
        text: '关联数据',
        name: '15',
        schema: {
            title: '关联数据',
            type: 'any',
            typeId: '15',
            widget: 'self_linkquery'
        },
        setting: {
            title: {
                title: '标题',
                type: 'string',
            },
            title_vis: {
                title: '显示标题',
                type: 'boolean',
                props: {
                    defaultValue: true
                }
            },
            describe: {
                title: '描述信息',
                type: 'string',
                widget: 'RichTextEditor'
            },
            linkquery_condition: {
                type: 'any',
                widget: 'linkquery_condition'
            },
            width: {
                title: '元素宽度',
                type: 'string',
                widget: 'percentSlider'
            },
            hidden: {
                title: '隐藏',
                type: 'boolean'
            },
        }
    }
]

var departmentElements = [
    {
        text: '成员单/多选',
        name: '20',
        schema: {
            title: '成员单/多选',
            type: 'any',
            typeId: '20',
            widget: 'self_department_user'
        },
        setting: {
            title: {
                title: '标题',
                type: 'string',
            },
            title_vis: {
                title: '显示标题',
                type: 'boolean',
                props: {
                    defaultValue: true
                }
            },
            describe: {
                title: '描述信息',
                type: 'string',
                widget: 'RichTextEditor'
            },
            self_setting: {
                title: '可选范围',
                type: 'any',
                widget: "self_setting"
            },
            default_type: {
                title: '默认值',
                type: 'string',
                enum: ['1', '2'],
                enumNames: ['自定义', '数据联动'],
                widget: 'select',
                hidden: "{{rootValue.self_setting?.type != 1}}",
                props: {
                    defaultValue: '1'
                }
            },
            default: {
                type: 'any',
                widget: 'link_item'
            },
            link_condition: {
                type: 'any',
                widget: 'link_condition',
                hidden: "{{rootValue.default_type != 2}}"
            },
            required: {
                title: '必填',
                type: 'boolean'
            },
            check: {
                type: 'object',
                properties: {
                    check_only: {
                        title: '不允许重复值',
                        type: 'boolean'
                    },
                    check_info: {
                        title: '自定义提示内容',
                        type: 'string',
                        hidden: '{{!rootValue.check_only == true}}'
                    }
                }
            },
            hidden: {
                title: '隐藏',
                type: 'boolean'
            },
            disabled: {
                title: '不可编辑',
                type: 'boolean',
                props: {
                    disabled: '{{rootValue.hidden}}'
                }
            },
            width: {
                title: '元素宽度',
                type: 'string',
                widget: 'percentSlider'
            }
        }
    },
]
export const defaultSettings = [
    {
        title: '基础字段',
        widgets: elements,
        show: true,
        useCommon: true // TODO: 是否将common
    },
    {
        title: '增强字段',
        widgets: strongElements,
        show: true,
        useCommon: true
    },
    {
        title: '部门成员字段',
        widgets: departmentElements,
        show: true,
        useCommon: true
    }

]
export const defaultGlobalSettings = {
    type: 'object',
    properties: {
        submit_check: {
            title: '表单提交校验',
            type: 'any',
            widget: 'submit_check'
        },
        mul_tag: {
            type: 'any',
            widget: "mul_tag",
        },
        column: {
            title: '整体布局',
            type: 'number',
            enum: [1, 2, 3],
            enumNames: ['一行一列', '一行二列', '一行三列'],
            props: {
                placeholder: '默认一行一列'
            }
        },
        displayType: {
            title: '标签展示模式',
            type: 'string',
            default: 'column',
            enum: ['row', 'column'],
            enumNames: ['同行', '单独一行'],
            widget: 'radio'
        }
    }
};
export const defaultGlobalSettingsi = {
    type: 'object',
    properties: {
        submit_check: {
            title: '表单提交校验',
            type: 'any',
            widget: 'submit_check'
        },
        column: {
            title: '整体布局',
            type: 'number',
            enum: [1, 2, 3],
            enumNames: ['一行一列', '一行二列', '一行三列'],
            props: {
                placeholder: '默认一行一列'
            }
        },
        labelWidth: {
            title: '标签宽度',
            type: 'number',
            widget: 'slider',
            max: 300,
            default: 120,
            props: {
                hideNumber: true
            }
        },
        displayType: {
            title: '标签展示模式',
            type: 'string',
            default: 'column',
            enum: ['row', 'column'],
            enumNames: ['同行', '单独一行'],
            widget: 'radio'
        }
    }
};
export const defaultCommonSetting = {
}
/**
 * , {
    title: '增强字段',
    widgets: advancedElements
}, {
    title: '部门成员字段',
    widgets: layouts
}
 */