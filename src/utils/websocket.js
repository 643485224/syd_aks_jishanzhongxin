/*
考虑到登录之后要始终连接服务器接收消息，所以把websocket实例对象作为模块抛出，在main.js中引入，使全局都可以获得ws并且使用相关方法。
由于刷新页面时，ws会自动断开连接，所以在App.vue组件挂载时再次连接服务器
连接websocket WebSocket 协议本质上是一个基于 TCP 的协议
     方法：
     WebSocket.close()   关闭连接:WebSocket 连接或连接尝试（如果有的话）。如果连接已经关闭，则此方法不执行任何操作。
     WebSocket.send()    使用连接发送数据:方法将需要通过 WebSocket 链接传输至服务器的数据排入队列，并根据所需要传输的 data bytes 的大小来增加 bufferedAmount的值。若数据无法传输（例如数据需要缓存而缓冲区已满）时，套接字会自行关闭。
     事件：
     WebSocket.onopen    连接建立时触发:属性定义一个事件处理程序，当WebSocket 的连接状态readyState 变为1时调用;这意味着当前连接已经准备好发送和接受数据。这个事件处理程序通过 事件（建立连接时）触发。
     WebSocket.onclose   连接关闭时触发:属性返回一个事件监听器，这个事件监听器将在 WebSocket 连接的readyState 变为 CLOSED时被调用，它接收一个名字为“close”的 CloseEvent 事件。
     WebSocket.onerror   通信发生错误时触发:当websocket的连接由于一些错误事件的发生 (例如无法发送一些数据) 而被关闭时，一个error事件将被引发。
     WebSocket.onmessage 客户端接收服务端数据时触发:message 事件会在 WebSocket 接收到新消息时被触发。
*/
export default {
  ws: {},
  setWs: function (newWs) {
    this.ws = newWs
  },
  start() { // 发送心跳
    clearInterval(this.timeoutObj)
    this.timeoutObj = setInterval(() => {
      if (this.ws && this.ws.readyState == 1) {
        console.log('发送心跳')
        this.ws.send(JSON.stringify({
          //后端需要接收的数据
        }));
      }
    }, 10 * 1000) //十秒发一次
  },
  localSocket(userName) { //连接ws，根据连接服务器是否需要参数设置该方法是否需要接收参数
    if ("WebSocket" in window) {
      // console.log("您的浏览器支持 WebSocket!");
      // location.host
      this.ws = new WebSocket(`ws://199.168.22.8:8081/websocket/${userName}`);
      this.setWs(this.ws);
      this.ws.onopen = () => {
        console.log('websocket连接成功');
        //连接上之后要发心跳包
        this.start()
      };

      this.ws.onclose = function () {
        // 关闭 websocket
        console.log("连接已关闭...");
        //断线重新连接
        setTimeout(() => {
          this.localSocket(userId);
        }, 2000);
      };
    } else {
      // 浏览器不支持 WebSocket
      console.log("您的浏览器不支持 WebSocket!");
      this.openNotificationWithIcon('error', '浏览器', '您的浏览器不支持显示消息请更换', 1, 1)
    }
  },
}
