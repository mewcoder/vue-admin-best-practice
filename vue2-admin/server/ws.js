const koa = require('koa');
const router = require('koa-router')();
const websocket = require('koa-websocket');
const app = websocket(new koa());

let wsObj = {};
let i = 0;

function broadcast() {
  setInterval(function () {
    let n = Math.random();
    if (n > 0.3) {
      let msg = JSON.stringify({ msg: i++ });
      for (let key in wsObj) {
        console.log('send to client:', key);
        wsObj[key].websocket.send(msg);
      }
    }
  }, 1000);
}
broadcast();
router.all('/ws', ctx => {
  // 客户端链接传过来的客户端身份
  const { uuid } = ctx.query;
  console.log('receive...', uuid);
  // 将链接保存起来
  wsObj[uuid] = ctx;
  // 监听客户端发送过来的信息
  ctx.websocket.on('message', function (message) {
    console.log(JSON.parse(message));
  });
  ctx.websocket.on('close', () => {
    delete wsObj[uuid];
    console.log(uuid, ':close websocket');
  });
});
// 使用路由
app.ws.use(router.routes()).use(router.allowedMethods());

//端口号后面可采用动态的
app.listen(3000, () => console.log('websocket 服务启动成功'));

// https://blog.csdn.net/qq_39425927/article/details/107975174
