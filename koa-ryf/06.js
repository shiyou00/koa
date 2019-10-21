const fs = require('fs');
const Koa = require('koa');
const app = new Koa();
// demos/06.js
const route = require('koa-route');

const about = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = '<a href="/">Index Page</a>';
};

const main = ctx => {
  ctx.response.body = 'Hello World';
};

app.use(route.get('/', main));
app.use(route.get('/about', about));



app.use(main);
app.listen(3000);
