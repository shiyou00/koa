const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const app = new Koa();
const routing = require('./routes/index');
const mongoose = require('mongoose');
const { connectionStr } = require('./config');
const path = require('path');

mongoose.connect(connectionStr,{ useNewUrlParser: true,useUnifiedTopology: true },()=> console.log('MongoDB 连接成功了'));
mongoose.connection.on("error", (e)=> console.log(e));

app.use(koaStatic(path.join(__dirname,'public')));

// 错误处理
app.use(error({
  postFormat: (e,{stack,...rest})=>{
    return process.env.NODE_ENV === 'production' ? rest:{stack,...rest};
  }
}));
// 解析post body 数据
app.use(koaBody({
  multipart: true,
  formidable:{
    uploadDir:path.join(__dirname,'/public/uploads'),
    keepExtensions: true
  }
}));

// 校验参数
app.use(parameter(app));
// 匹配路由
routing(app);
// 监听端口
app.listen(3000,()=>{
  console.log('程序已启动在3000端口');
});
