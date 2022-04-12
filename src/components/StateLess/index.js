/**
 * @description 项目通用的无状态组件 可扩展
 */
import React from 'react';
import classnames from 'classnames';
import { deviceStatus, planStatus,workStatus } from 'constants/status_constant';


/**
 * @author zyn
 * @description 判断table中某状态前的小圆点
 * @param {Number} value 状态类型
 */
import './index.less';

export function circleStatus(value, type,data={}) {
	let isOrder = type === 'device',
		isPlan = type === 'plan',
		isWork = type === 'work',
		isMaintain = type === 'maintain';
  let isGreen = isOrder ? value === 1: isPlan ? value === 1 : isWork ? [1,].includes(value) : isMaintain ? value ===1 : false ,
		isRed = isOrder ? [0].includes(value) : isPlan ? value === 2 : isMaintain ? [2,3,4].includes(value) : 
			isWork ? [6].includes(value):false ,
			isReject= isWork ? value === 3 : false,
    isBlue = isWork ? value === 5 : false,
    isGray = isWork ? [7,8].includes(value) : false ,
		isYellow = isWork ? [0].includes(value) : false ,
		isDeepGreen = isWork ? [2,4,9,10].includes(value) : false;
	return (
		<span className='circle-status'>
			<span
				className={classnames({
					'circle-green': isGreen,
					'circle-deepGreen':isDeepGreen,
					'circle-blue': isBlue,
					'circle-gray': isGray,
					'circle-red': isRed,
					'circle-yellow': isYellow,
					'circle-reject':isReject
				})}
			/>
			<span>{
        isOrder ? deviceStatus[value] : 
          isPlan ? planStatus[value] : 
            isMaintain ? data[value] : 
						workStatus[value]
      }</span>
		</span>
	);
}
