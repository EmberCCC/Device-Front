import { Card } from 'antd';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react'
import moment from 'moment';
import '../index.css'



@inject('MessageStore')
@observer
class LoginPage extends Component {
    render() {
        const { itemLog } = this.props.MessageStore;
        const log = toJS(this.props.MessageStore.itemLog.message) || []
        console.log(log);
        return (
            <div className='LogPage'>
                <p style={{textAlign:'center'}}>日志记录：</p>
                {log.map((element) => {
                    return <Card style={{margin:'5px',borderRadius:'5px'}}>
                        <p>解决人：{element.solvePeopleNickname}</p>
                        <p>解决时间:{moment(element.solveTime).format('LLLL')}</p>
                        <p>{element.isPass}</p>
                        {/* <p></p> */}
                    </Card>
                })
                }
            </div>
        )
    }
}

export default LoginPage;
