/*
 * @Author: your name
 * @Date: 2022-04-26 22:13:06
 * @LastEditTime: 2022-04-26 23:45:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\HomeLayout\WebSocket.js
 */
import { PubSub } from 'pubsub-js';
let websocket,
    lockReconnect = false;
let createWebSocket = (url) => {
    websocket = new WebSocket(url+"/1/admin/1");
    console.log('ws connect')
    websocket.onopen = function () {
        console.log('ws open')
        heartCheck.reset().start();
    };
    websocket.onerror = function () {
        reconnect(url);
    };
    websocket.onclose = function (e) {
        heartCheck.reset()
        console.log('ws closed: ' + e.code + ' ' + e.reason + ' ' + e.wasClean);
    };
    websocket.onmessage = function (event) {
        lockReconnect = true;
        //event 为服务端传输的消息，在这里可以处理
        let data = event.data;//把获取到的消息处理成字典，方便后期使用
        console.log(data);
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