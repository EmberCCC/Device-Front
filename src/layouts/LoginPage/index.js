import React from 'react';
import { Input, Checkbox, Button, Form, Dropdown } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  AlertTwoTone,
  ThunderboltTwoTone,
  ToolTwoTone,
  AccountBookTwoTone, EditTwoTone
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { setCookie, clearCookie } from 'utils/dataTools';
import LoginLayout from './loginLayout';
import LoginHeader from "../../components/LoginHeader";


const iconConfig={
    twoToneColor: '#F5A623'
}
@withRouter
@inject('HomeStore')
@observer
class LoginPage extends React.Component {


  render() {
    return (
      <div className='login_main'>
        <LoginHeader/>
        <div className='shadow'></div>
        <div className='login_content'>
          <div className='content_first'>
            <div className='first_left'>
              <div className='first_lineO'>解决设备全生命周期管理难题</div>
              <div className='first_lineT'>一张二维码就能搞定设备管理？手机扫描设备二维码，
                <br />即可解决设备档案管理、巡检、报修、保养、分析预警等问题
              </div>
              <button className='first_btn'>点击预览方案</button>
              <div className='first_lineTh'>* 初次注册并安装应用者，默认为管理员</div>
            </div>
            <div className='first_right'>
                <LoginLayout />
            </div>
          </div>
          <div className='content_second'>
            <div className='second_item'>
              <div>
                <ThunderboltTwoTone className={'content_second_icon'}
                              {...iconConfig}
                />
              </div>
              <div className='item_title'>提高点检巡检效率</div>
              <div className='item_lable'>12%-28%</div>
            </div>
            <div className='second_item'>
              <div>
                <AlertTwoTone className={'content_second_icon'}
                              {...iconConfig}
                />
              </div>
              <div className='item_title'>提高故障响应速度</div>
              <div className='item_lable'>15-30min/工单</div>
            </div>
            <div className='second_item'>
              <div>
                <ToolTwoTone className={'content_second_icon'}
                              {...iconConfig}
                />
              </div>
              <div className='item_title'>提高保养工作效率</div>
              <div className='item_lable'>16%-36%</div>
            </div>
            <div className='second_item'>
              <div>
                <AccountBookTwoTone className={'content_second_icon'}
                                    {...iconConfig}
                />
              </div>
              <div className='item_title'>降低设备维护成本</div>
              <div className='item_lable'>12-27%</div>
            </div>
            <div className='second_item'>
              <div>
                <EditTwoTone className={'content_second_icon'}
                                    {...iconConfig}
                />
              </div>
              <div className='item_title'>节省人工统计成本</div>
              <div className='item_lable'>3人天/月</div>
            </div>
          </div>
          {/*<div className='content_third'>*/}
          {/*  <div className='third_item'>*/}
          {/*    <div className='t_img'></div>*/}
          {/*    <div className='t_title'>为设备建立线上档案</div>*/}
          {/*    <div className='t_content'>设备基础信息 + 点检记录 + 维修记录 + 保养记录 + 备件更换记录 + ……</div>*/}
          {/*  </div>*/}
          {/*  <div className='third_item'>*/}
          {/*    <div className='t_img'></div>*/}
          {/*    <div className='t_title'>手机扫码管理设备</div>*/}
          {/*    <div className='t_content'>手机扫设备上的二维码 `{'>'}` 更新设备状态 `{'>'}` 发现问题报修 `{'>'}` 报修消息实时通知</div>*/}
          {/*  </div>*/}
          {/*  <div className='third_item'>*/}
          {/*    <div className='t_img'></div>*/}
          {/*    <div className='t_title'>微信接收提醒</div>*/}
          {/*    <div className='t_content'>无需安装App，微信收到提醒，手机随时随地看统计表</div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className='content_forth'>*/}
          {/*  <div className='for_title'>覆盖20类+二维码设备管理场景</div>*/}
          {/*  <div className='f_item'>*/}
          {/*    <div className='f_img'></div>*/}
          {/*    <div className='f_title'>生产车间设备管理</div>*/}
          {/*    <div className='f_info'>锅炉、磨刀机、成型机…</div>*/}
          {/*    <div className='f_btn'>查看效果</div>*/}
          {/*  </div>*/}
          {/*  <div className='f_item'>*/}
          {/*    <div className='f_img'></div>*/}
          {/*    <div className='f_title'>石油化工电子巡更</div>*/}
          {/*    <div className='f_info'>高配房、热风炉、配碱车间…</div>*/}
          {/*    <div className='f_btn'>查看效果</div>*/}
          {/*  </div>*/}
          {/*  <div className='f_item'>*/}
          {/*    <div className='f_img'></div>*/}
          {/*    <div className='f_title'>物业小区区域巡查</div>*/}
          {/*    <div className='f_info'>电梯、水泵房、配电室…</div>*/}
          {/*    <div className='f_btn'>查看效果</div>*/}
          {/*  </div>*/}
          {/*  <div className='f_item'>*/}
          {/*    <div className='f_img'></div>*/}
          {/*    <div className='f_title'>消防器材安全巡查</div>*/}
          {/*    <div className='f_info'>灭火器、消防安全巡查…</div>*/}
          {/*    <div className='f_btn'>查看效果</div>*/}
          {/*  </div>*/}
          {/*  <div className='f_item'>*/}
          {/*    <div className='f_img'></div>*/}
          {/*    <div className='f_title'>建筑施工设备点检</div>*/}
          {/*    <div className='f_info'>塔吊、配电箱、技术交底…</div>*/}
          {/*    <div className='f_btn'>查看效果</div>*/}
          {/*  </div>*/}
          {/*  <div className='f_item'>*/}
          {/*    <div className='f_img'></div>*/}
          {/*    <div className='f_title'>更多场景</div>*/}
          {/*    <div className='f_info'>区域/店铺巡查、校区巡查…</div>*/}
          {/*    <div className='f_btn'>查看效果</div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className='content_fifth'>*/}
          {/*  <div className='fi_title'>*/}
          {/*    方案优势*/}
          {/*  </div>*/}
          {/*  <ul className='fif_ul'>*/}
          {/*    <li className='fif_item'>*/}
          {/*      <div className='fif_exact'>*/}
          {/*        <div className='fif_img'></div>*/}
          {/*        <div className='fif_info'>*/}
          {/*          <div className='fif_title'>一张二维码，</div>*/}
          {/*          <div className='fif_title'>开启设备管理之路</div>*/}
          {/*          <ul className='info_ul'>*/}
          {/*            <li className='info_d'>一物对一码：每个设备对应一张专属二维码，扫码即可查看相应信息；</li>*/}
          {/*            <li className='info_d'>有事扫一扫：不管是想要巡检、维修还是查看信息、分析，扫码全部搞定！</li>*/}
          {/*          </ul>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </li>*/}
          {/*    <li className='fif_item'>*/}
          {/*      <div className='fif_exact' style={{height:'444px',flexDirection:'row-reverse'}}>*/}
          {/*        <div className='fif_img'></div>*/}
          {/*        <div className='fif_info'>*/}
          {/*          <div className='fif_title'>从静到动，</div>*/}
          {/*          <div className='fif_title'>全方位管理设备信息</div>*/}
          {/*          <ul className='info_ul'>*/}
          {/*            <li className='info_d'>设备档案：不管是设备的巡检、维修、保养、备件更换等动态记录，还是说明书、基础信息等静态资料，扫码即可查看；</li>*/}
          {/*            <li className='info_d'>实时更新：设备信息在线记录后，会实时更新。</li>*/}
          {/*          </ul>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </li>*/}
          {/*    <li className='fif_item'>*/}
          {/*      <div className='fif_exact' style={{height:'556px'}}>*/}
          {/*        <div className='fif_img'></div>*/}
          {/*        <div className='fif_info'>*/}
          {/*          <div className='fif_title'>无纸化巡检，</div>*/}
          {/*          <div className='fif_title'>已检待检清晰呈现</div>*/}
          {/*          <ul className='info_ul'>*/}
          {/*            <li className='info_d'>自定义巡检周期：手机自动接收巡检消息提醒，防止员工遗忘；</li>*/}
          {/*            <li className='info_d'>规避假巡检：GPS定位+拍照水印</li>*/}
          {/*            <li className='info_d'>已检待检：实时展示已检设备信息、未检设备信息，防止遗漏。</li>*/}
          {/*          </ul>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </li>*/}
          {/*    <li className='fif_item'>*/}
          {/*      <div className='fif_exact' style={{height:'728px',flexDirection:'row-reverse'}}>*/}
          {/*        <div className='fif_img'></div>*/}
          {/*        <div className='fif_info'>*/}
          {/*          <div className='fif_title'>3秒报修，</div>*/}
          {/*          <div className='fif_title'>有效减少停机时间</div>*/}
          {/*          <ul className='info_ul'>*/}
          {/*            <li className='info_d'>信息丰富：支持图、文、视频描述故障信息，方便维修人员排查；</li>*/}
          {/*            <li className='info_d'>有事扫一扫：不管是想要巡检、维修还是查看信息、分析，扫码全部搞定！</li>*/}
          {/*            <li className='info_d'>实时提醒：维修工单将实时提醒到维修人员，减少故障持续时间。</li>*/}
          {/*          </ul>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </li>*/}
          {/*    <li className='fif_item'>*/}
          {/*      <div className='fif_exact' style={{height:'502px'}}>*/}
          {/*        <div className='fif_img'></div>*/}
          {/*        <div className='fif_info'>*/}
          {/*          <div className='fif_title'>日历化管理，</div>*/}
          {/*          <div className='fif_title'>保养计划简单有序</div>*/}
          {/*          <ul className='info_ul'>*/}
          {/*            <li className='info_d'>保养计划：通过日历的方式查看保养计划，待保养计划一目了然；</li>*/}
          {/*            <li className='info_d'>实时提醒：根据保养日历，消息将会在指定时间提醒到个人。</li>*/}
          {/*          </ul>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </li>*/}
          {/*    <li className='fif_item'>*/}
          {/*      <div className='fif_exact' style={{height:'610px',flexDirection:'row-reverse'}}>*/}
          {/*        <div className='fif_img'></div>*/}
          {/*        <div className='fif_info'>*/}
          {/*          <div className='fif_title'>进出有度，</div>*/}
          {/*          <div className='fif_title'>追踪备件领用记录</div>*/}
          {/*          <ul className='info_ul'>*/}
          {/*            <li className='info_d'>库存查看：实时展示备件的库存情况；</li>*/}
          {/*            <li className='info_d'>领用追踪：谁什么时候领用了什么都记录在案；</li>*/}
          {/*            <li className='info_d'>库存预警：库存不足时，自动提醒相应责任人。</li>*/}
          {/*          </ul>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </li>*/}
          {/*    <li className='fif_item'>*/}
          {/*      <div className='fif_exact' style={{height:'574px'}}>*/}
          {/*        <div className='fif_img'></div>*/}
          {/*        <div className='fif_info'>*/}
          {/*          <div className='fif_title'>多维分析，</div>*/}
          {/*          <div className='fif_title'>实时查看设备状态</div>*/}
          {/*          <ul className='info_ul'>*/}
          {/*            <li className='info_d'>一物对一码：移动端查看：支持电脑/手机查看设备分析报表；</li>*/}
          {/*            <li className='info_d'>多维度报表：提供多种类型的报表，提升设备管理精度；</li>*/}
          {/*            <li className='info_d'>筛选查询：可自定义筛选条件，查看不同类别的设备状态。</li>*/}
          {/*          </ul>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
        </div>
        <div className='login_footer'></div>
      </div>);
  }
}
export default LoginPage;
