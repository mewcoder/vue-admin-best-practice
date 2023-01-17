// const path = require('path');

const Koa = require('koa');

const Router = require('koa-router');

const multiparty = require('multiparty');

const app = new Koa();
const router = new Router();

function saveFormFile(req) {
  return new Promise((resolve, reject) => {
    new multiparty.Form({
      uploadDir: 'temp' //目录
    }).parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
}

router.post('/api/upload', async ctx => {
  console.log('receive...');
  const data = await saveFormFile(ctx.req);
  console.log(data);
  ctx.body = '{"code":200,"msg":"ok"}';
});

router.get('/api/getTest', async ctx => {
  ctx.response.body = '成功';
});

router.post('/api/postTest', async ctx => {
  console.log(ctx.request.body);
  ctx.response.body = '上传成功';
});

app.use(router.routes());

app.listen(4000, () => {
  console.log('server is running at port 4000');
});
