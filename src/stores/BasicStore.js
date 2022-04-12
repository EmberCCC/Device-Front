/*
 * @Author: your name
 * @Date: 2022-03-31 23:08:16
 * @LastEditTime: 2022-04-11 14:52:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\stores\SpareStore
 */
import { observable, action } from 'mobx';

class Basic {
    
    @observable PageInfo = {pageIndex: 1, pageSize: 2};

    
}

let BasicStore = new Basic();
export default BasicStore;