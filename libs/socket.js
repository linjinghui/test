
export default function (opt) {
  // "ws://"+location.host+"/cfws/conference/";
  // "wss://47.93.80.37:8050/module-conference/conference/";
  var option = Object.assign({
    url: '',
    onOpen: function () {},
    onMessage: function () {},
    onError: function () {},
    onClose: function () {},
    sendMessage: function () {}
  }, opt);
  var ws = connectWs(url);

  if (!url) {
    return '';
  }

  // 创建socket连接
  function connectWs (url) {
    return new WebSocket(url);
  }

  ws.onopen = function () {
    // socket 连接成功
    option.onOpen();
  }

  ws.onmessage = function (evt) {
    // 服务端推送
    // console.info("=================");
    // console.info("1、此次推送内容：" + evt.data);
    option.onMessage(evt.data);
  }

  ws.onerror = function (evt) {
    // socket 错误
    option.onError(evt);
  }

  ws.onclose = function (evt) {
    // socket连接关闭
    // console.info('socket连接关闭，准备重新连接，当前连接次数：' + _this.socket.connectNum)
    option.onClose(evt);
  }
  return ws;
}