/*
 * @Author: your name
 * @Date: 2022-04-26 22:13:06
 * @LastEditTime: 2022-06-28 18:48:56
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\HomeLayout\WebSocket.js
 */
import { PubSub } from 'pubsub-js';
let websocket,
    lockReconnect = false;
let createWebSocket = (url) => {
    let id = sessionStorage.getItem('id');
    let username = sessionStorage.getItem('username');
    let tenementId = sessionStorage.getItem('tenementId');
    websocket = new WebSocket(url + "/" + id.toString() + "/" + username + "/" + tenementId.toString());
    websocket.onopen = function () {
        heartCheck.reset().start();
    };
    websocket.onerror = function () {
        reconnect(url);
    };
    websocket.onclose = function (e) {
        heartCheck.reset();
    };
    websocket.onmessage = function (event) {
        lockReconnect = true;
        //event 为服务端传输的消息，在这里可以处理
        let data = event.data;//把获取到的消息处理成字典，方便后期使用
        PubSub.publish('message', data); //发布接收到的消息 'message' 为发布消息的名称，data 为发布的消息

    };
};
let reconnect = (url) => {
    if (lockReconnect) return;
    // 没连接上会一直重连，设置延迟避免请求过多
    setTimeout(function () {
        createWebSocket(url);
        lockReconnect = false;
    }, 4000);
};
let heartCheck = {
    timeout: 6000, // 6秒
    timeoutObj: null,
    reset: function () {
        clearInterval(this.timeoutObj);
        return this;
    },
    start: function () {
        this.timeoutObj = setInterval(function () {
            // 这里发送一个心跳，后端收到后，返回一个心跳消息，
            // onmessage拿到返回的心跳就说明连接正常
            websocket.send('HeartBeat');
        }, this.timeout);
    },
};
// 关闭连接
let closeWebSocket = () => {
    websocket && websocket.close();
};
export { websocket, createWebSocket, closeWebSocket };