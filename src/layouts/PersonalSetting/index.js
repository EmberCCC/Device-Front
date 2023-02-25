import React, {useEffect, useState} from 'react'
import {inject, observer} from "mobx-react";
import GlobalHeader from "../../components/GlobalHeader";
import './index.less'


const PersonalSettingPage = observer(({ HomeStore }) => {
    useEffect(()=>{
        HomeStore.ownMessage()
        console.log(HomeStore.myInfo)
    },[])
    return (
     <div className={"Groud"}>
         <GlobalHeader />
         <div className={"Setting"}>
             <div className={"Setting-department Setting-container"}>
                 <div className={"Setting-container-line"}>
                     <div className={"Setting-container-line-header"}>
                        当前所在企业
                     </div>
                     <div>

                     </div>
                 </div>
             </div>
             <div className={"Setting-title"}>
                 基本信息
             </div>
             <div className={"Setting-container"}>
                 <div className={"Setting-container-line"}>
                     <div className={"Setting-container-line-header"}>
                         通讯录姓名
                     </div>
                     <div>

                     </div>
                 </div>
                 <div className={"Setting-container-line"}>
                     <div className={"Setting-container-line-header"}>
                         企业内昵称
                     </div>
                     <div>

                     </div>
                 </div>
                 <div className={"Setting-container-line"}>
                     <div className={"Setting-container-line-header"}>
                         账户名称
                     </div>
                     <div>

                     </div>
                 </div>

             </div>
             <div className={"Setting-title"}>
                 账号安全
             </div>
             <div className={"Setting-container"}>
                 <div className={"Setting-container-line"}>
                     <div className={"Setting-container-line-header"}>
                         密码
                     </div>
                     <div>

                     </div>
                 </div>
                 <div className={"Setting-container-line"}>
                     <div className={"Setting-container-line-header"}>
                         手机
                     </div>
                     <div>

                     </div>
                 </div>
                 <div className={"Setting-container-line"}>
                     <div className={"Setting-container-line-header"}>
                         邮箱
                     </div>
                     <div>

                     </div>
                 </div>
             </div>
             <div className={"Setting-container Setting-container-last"}>
                 <div className={"Setting-container-line"}>
                     <div className={"Setting-container-line-header"}>
                         退出账户
                     </div>
                     <div>

                     </div>
                 </div>
             </div>
         </div>


     </div>
    )

})

export default inject((stores) => ({ HomeStore: stores.HomeStore, }))(PersonalSettingPage);