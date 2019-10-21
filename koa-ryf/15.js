const Koa = require('koa');
const app = new Koa();

// demos/17.js
const main = ctx => {
  ctx.throw(500);
};

app.on('error', (err, ctx) =>
  console.error('server error', err)
);

app.use(main);
app.listen(3000);
