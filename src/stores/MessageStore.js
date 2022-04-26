/*
 * @Author: your name
 * @Date: 2022-03-31 23:08:16
 * @LastEditTime: 2022-04-25 22:50:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\stores\SpareStore
 */
import { observable, action } from 'mobx';
import { isDataExist } from '../utils/dataTools';
import * as services from '../services/design';

class Message {
    @observable data = ['11','23']
    @observable modalVisible = false

    @action setData(arr) {
        this.data = arr
    }

    @action changeModal() {
        this.modalVisible = !this.modalVisible;
    }
}

let MessageStore = new Message();
export default MessageStore;