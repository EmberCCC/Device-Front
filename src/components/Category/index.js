/*
 * @Author: zhangliang
 * @Date: 2019-05-22 11:10:38
 * @Last Modified by: zhangliang
 * @Last Modified time: 2019-06-22 10:53:30
 * description:
 * 1.title:{String}传入的分类名称
 * 2.content:{Array}传入所有的标签内容
 * 3.onClick:点击标签时所调用的方法,父组件通过接参可以获取到点击的对象
 * 4.PopoTitle：气泡内的标题和key,例如PopoTitle = [{ 'title': '仓库名称', "key": 'name' }, { 'title': '仓库状态', "key": 'status' }]
 * 5.PopoVisible:是否显示气泡,默认false
 * 6.keyname:需要显示成标签的字段名
 * 7.defaultActiveKey:首次渲染需求的
 * 具体参考WarehouseManage.js
 */
import React, { Component } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Row, Col, Tag, Popover } from 'antd';
// import { oberver } from 'mobx-react';
import { observable, action, } from 'mobx';
import { isEmpty } from "lodash";
import './index.less'
class Category extends Component {
    @observable popoValue = {};
    @action changeValue(value) {
        this.popoValue = value;
    }
    constructor(props) {
        super(props)
        this.state = {
            selectedTags: !isEmpty(this.props.defaultActiveKey) ? [this.props.defaultActiveKey] : [],//激活状态的标签
            maskHeight: "32px",//遮罩层高度，用于遮住换行的标签，实现展开收起效果
            isSpread: true,//切换显示展开和收起
            popoValue: {},//气泡中的value
            popoContent: "",//气泡中的内容
            onToggle: this.props.notoggle || false
        }
    }
    //选中标签
    handleChange = (tag, checked) => {
        const { selectedTags } = this.state;
        if (this.state.onToggle) {
            this.setState({ selectedTags: [tag] }, () => {
                if (this.props.onClick) {
                    this.props.onClick(tag)
                }
            });
        } else {
            const nextSelectedTags = checked ? [tag] : selectedTags.filter(t => t !== tag);//多选
            this.setState({ selectedTags: nextSelectedTags }, () => {
                // console.log(this.state.selectedTags)
                if (this.props.onClick) {
                    this.props.onClick(tag)
                }
            });
        }

        // this.selectedTags = [tag]

    }
    //滑入标签
    handleMove = (tag, checked) => {
        // console.log(this.state.selectedTags, 11)
        this.changeValue(tag);
        this.setState({
            popoContent: (<div>{
                this.props.PopoTitle && this.props.PopoTitle.map((item, index) => (
                    // console.log(item, index, this.state.popoValue[item['key']])
                    <div key={index}> {item['title']}: {this.popoValue[item['key']]}</div>
                )
                )
            }</div>)
        });
    }
    render() {
        const CheckableTag = Tag.CheckableTag;
        const { selectedTags } = this.state;
        const tagsFromServer = this.props.content ? this.props.content : []
        const keyName = this.props.keyName ? this.props.keyName : ""
        const PopoVisible = this.props.PopoVisible ? this.props.PopoVisible : false
        const { ...otherProps } = this.props;

        this.categoryContent = React.createRef()
        return (
            <div className='categoryLayout' style={{ height: (this.state.maskHeight), overflow: 'hidden' }}>
                <Row>
                    <Col className='category-box'>
                        <div className='category-title'>{this.props.title}:</div>
                        <div className='category-content' ref={this.categoryContent}> {tagsFromServer.map((tag, index) => (
                            <CheckableTag
                                className='category-tag'
                                {...otherProps}
                                key={tag[keyName]}
                                checked={selectedTags.indexOf(tag) > -1}
                                onMouseEnter={checked => this.handleMove(tag, checked)}
                                onChange={checked => this.handleChange(tag, checked)}
                            >
                                {/* {console.log(toJS(selectedTags),selectedTags.indexOf(tag) > -1)} */}
                                {PopoVisible ? <Popover content={this.state.popoContent} trigger="hover">
                                    {tag[keyName]}
                                </Popover> : <span>{tag[keyName]}</span>}
                            </CheckableTag>
                        ))}</div>
                        <div className='category-spread' >
                            {
                                this.state.isSpread && <span onClick={this.spreadAll}>展开<DownOutlined /></span>
                            }
                            {
                                !this.state.isSpread && <span onClick={this.hideAll}>收起<UpOutlined /></span>
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
    //展开
    spreadAll = () => {
        this.setState({
            maskHeight: this.categoryContent.current.offsetHeight + 'px',
            isSpread: false
        })
    }
    //收起
    hideAll = () => {
        this.setState({
            maskHeight: '32px',
            isSpread: true
        })
    }
    // componentDidUpdate(a, b) {
    //     console.log(a, b)
    // }
}
export default Category;