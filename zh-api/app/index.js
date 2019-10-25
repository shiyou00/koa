const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const app = new Koa();
const routing = require('./routes/index');

app.use(bodyparser());
routing(app);
app.listen(3000,()=>{
  console.log('程序已启动在3000端口');
});
