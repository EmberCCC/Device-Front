/**
 * @author zyn on 0513
 * @description 实现弹窗的拖拽、最大化、还原、关闭
 * @basic-params 基本实现参数可参照antd组件库Modal API
 * @param {Boolean} maxmin -是否支持最大化 - 默认值 false;
 * @param {Boolean} dragable -是否支持拖拽 - 默认值 false;
 * @param {String || ReactNode} children - Modal组件添加的content内容 - 默认 null
 */
import React, {Component} from 'react';
import {Modal,} from 'antd';
import classnames from 'classnames';
import {isEmpty} from 'lodash';
import './index.less';

export default class GlobalModal extends Component {
    state = {
        isFullScreen: false,
        isMouseMove: false,
        rootWidth: 0,
        rootHeight: 0,
        top: 0,
        left: 0,
    };

    render() {
        const {
            children,
            title,
            width,
            bodyStyle,
            style,
            maskStyle,
            className,
            okText,
            cancelText,
            ...otherProps
        } = this.props;
        const dragable = !isEmpty(this.props.dragable) ? this.props.dragable : true;
        // const maxmin = !isEmpty(this.props.maxmin) ? this.props.maxmin : true;
        const curBodyStyle = {
            ...bodyStyle,
        };
        const wholeStyle = {
            top: this.state.isFullScreen ? '0' : this.state.top + 'px',
            left: !this.state.isFullScreen && dragable && this.state.left + 'px',
            margin: this.state.isMouseMove && dragable && '0',
            paddingBottom: (this.state.isFullScreen || dragable) && '0',
            height: '100vh',
            ...otherProps.style
        }
        return <Modal
            wrapClassName={
                classnames({
                    'global-modal-zyn': true,
                })
            }
            title={<div>
                {title}
            </div>}
            // getContainer={
            //   ()=>document.getElementById('home_content')
            // }
            {...otherProps}
            style={{...wholeStyle}}
            bodyStyle={{...curBodyStyle}}
            // maskStyle={{position: 'absolute',...maskStyle}}
            width={this.state.isFullScreen ? this.state.rootWidth + 'px' : (width || '520px')}
            destroyOnClose={true}
            okText={okText || '确定'}
            cancelText={cancelText || '取消'}
        >
            {children}
        </Modal>;
    }

    /* 启动最大最小化模式 */
    onFullScreen = () => { //启动最大最小化模式
        let content = document.getElementById('home_content');
        this.setState({
            isFullScreen: !this.state.isFullScreen,
            rootHeight: content.offsetHeight,
            rootWidth: content.offsetWidth,
            top: 100,
            isMouseMove: false
        });
    }
    /* 启动组件拖拽功能 */
    onMouseDown = (event) => {
        let et = event || window.event;
        et.persist();
        let oModal = document.getElementsByClassName('ant-modal')[0],
            oMenu = document.getElementsByClassName('ant-sider-menu-content')[0],
            oHeader = document.getElementsByClassName('header_layout')[0],
            oCrumbs = document.getElementsByClassName('crumb_layout')[0];
        let oContent = document.getElementById('home_content'),
            oCmarginWidth = parseFloat(oContent.style.marginLeft) + parseFloat(oContent.style.marginRight),
            oCmarginHeight = parseFloat(oContent.style.marginTop) + parseFloat(oContent.style.marginBottom);
        let diffX = et.clientX - oModal.offsetLeft, diffY = et.clientY - oModal.offsetTop;
        document.onmousemove = (e) => {
            let ev = e || window.event;
            let minL = ev.clientX - diffX, minT = ev.clientY - diffY;
            let maxL = document.documentElement.clientWidth - oModal.offsetWidth - oMenu.offsetWidth - oCmarginWidth,
                maxT = document.documentElement.clientHeight - oModal.offsetHeight - oHeader.offsetHeight - oCrumbs.offsetHeight - oCmarginHeight;
            minL <= 0 && (minL = 0);
            minT <= 0 && (minT = 0);
            minL >= maxL && (minL = maxL);
            minT >= maxT && (minT = maxT);
            this.setState({
                left: minL, top: minT,
                isMouseMove: true
            });
            return false;
        }
        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
            this.releaseCapture && this.releaseCapture();
        };
        this.setCapture && this.setCapture();
        return false;
    }

    /* 启动组件实现可拉伸窗口功能 : 八个方向的拉伸 */
    /* 后续更新 */

}
