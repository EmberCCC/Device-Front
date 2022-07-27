/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-02 08:07:00
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-27 07:48:39
 * @FilePath: \bl-device-manage-test\src\constants\field_config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var elements = [
    {
        text: '单行文本',
        name: '0',
        props: {
            className: 'left_my_item'
        },
        schema: {
            title: '单行文本',
            type: 'string'
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
            description: {
                title: '描述信息',
                type: 'string',
                widget: 'textarea'
            },
            default_type: {
                title: '默认值',
                type: 'string',
                enum: ['1', '2', '3'],
                enumNames: ['自定义', '数据联动', '公式编辑'],
                widget: 'select'
            },
            default: {
                type: 'any',
                widget: 'link_item',
                dependencies: ['default_type']
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
                widget: 'select'
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
            format: 'textarea'
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
            description: {
                title: '描述信息',
                type: 'string',
                widget: 'RichText'
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
                widget: 'select'
            },
            default: {
                type: 'any',
                widget: 'link_item',
                dependencies: ['default_type']
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
            type: 'number'
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
            description: {
                title: '描述信息',
                type: 'string',
                widget: 'RichText'
            },
            placeholder: {
                title: '提示文字',
                type: 'string'
            },
            pattern: {
                title: '格式',
                type: 'string',
                props: {
                    placeholder: '填写正则表达式'
                }
            },
            default_type: {
                title: '默认值',
                type: 'string',
                enum: ['1', '2', '3'],
                enumNames: ['自定义', '数据联动', '公式编辑'],
                widget: 'select'
            },
            default: {
                type: 'any',
                widget: 'link_item',
                dependencies: ['default_type']
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
            format: 'date'
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
            description: {
                title: '描述信息',
                type: 'string',
                widget: 'RichText'
            },
            placeholder: {
                title: '提示文字',
                type: 'string'
            },
            format: {
                title: '类型',
                type: 'string',
                enum: ['dateTime', 'date', 'time'],
                enumNames: ['年-月-日 时:分:秒', '年-月-日', '时:分:秒']
            },
            default: {
                title: '默认值',
                type: 'string',
                format: '{{rootValue.format}}'
            },
            // default_type: {
            //     title: '默认值',
            //     type: 'string',
            //     enum: ['1', '2', '3'],
            //     enumNames: ['自定义', '数据联动', '公式编辑'],
            //     widget: 'select'
            // },
            // default: {
            //     type: 'any',
            //     widget: 'link_item',
            //     format: '{{rootValue.format}}',
            //     dependencies: ['default_type']
            // },
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
            enum: ['1', '2', '3'],
            enumNames: ['选项一', '选项二', '选项三'],
            widget: 'radio'
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
            description: {
                title: '描述信息',
                type: 'string',
                widget: 'RichText'
            },
            display_ways: {
                title: '展示方式',
                type: 'string',
                widget: 'radio',
                enum: ['row', 'column'],
                enumNames: ['横向排列', '纵向排列']
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
                            className: 'frg-options-input',
                            props: {},
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
            type: 'array',
            widget: 'checkboxes',
            items: {
                type: 'string'
            },
            enum: ['A', 'B', 'C', 'D'],
            enumNames: ['杭州', '武汉', '湖州', '贵阳']
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
            description: {
                title: '描述信息',
                type: 'string',
                widget: 'RichText'
            },
            display_ways: {
                title: '展示方式',
                type: 'string',
                widget: 'radio',
                enum: ['row', 'column'],
                enumNames: ['横向排列', '纵向排列']
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
                            className: 'frg-options-input',
                            props: {},
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
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
            widget: 'select'
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
            description: {
                title: '描述信息',
                type: 'string',
                widget: 'RichText'
            },
            placeholder: {
                title: '提示文字',
                type: 'string'
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
                            className: 'frg-options-input',
                            props: {},
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
            type: 'array',
            enum: ['A', 'B', 'C', 'D'],
            enumNames: ['杭州', '武汉', '湖州', '贵阳'],
            widget: 'multiSelect'
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
            description: {
                title: '描述信息',
                type: 'string',
                widget: 'RichText'
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
                            className: 'frg-options-input',
                            props: {},
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
            widget: "self_divider"
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
            description: {
                title: '描述信息',
                type: 'string',
                widget: 'textarea'
            },
            hidden: {
                title: '隐藏',
                type: 'boolean'
            }
        }
    }];
export const defaultSettings = [{
    title: '基础字段',
    widgets: elements,
    show: true,
    useCommon: true // TODO: 是否将common
}]
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