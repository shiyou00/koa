const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const app = new Koa();
const routing = require('./routes/index');
// 错误处理
app.use(error({
  postFormat: (e,{stack,...rest})=>{
    return process.env.NODE_ENV === 'production' ? rest:{stack,...rest};
  }
}));
// 解析post body 数据
app.use(bodyparser());
// 校验参数
app.use(parameter(app));
// 匹配路由
routing(app);
// 监听端口
app.listen(3000,()=>{
  console.log('程序已启动在3000端口');
});
