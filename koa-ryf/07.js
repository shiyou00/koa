const fs = require('fs');
const Koa = require('koa');
const app = new Koa();

const path = require('path');
const staticServer = require('koa-static');

const main = staticServer(path.join(__dirname));

app.use(main);
app.listen(3000);
