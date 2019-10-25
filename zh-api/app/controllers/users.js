const db = [{name:"lion"}];

class UsersCtl{
  find(ctx){
    ctx.body = db;
  }
  findById(ctx){
    if(ctx.params.id * 1 >= db.length){
      ctx.throw(412,'先决条件失败');
    }
    ctx.body = db[ctx.params.id];
  }
  create(ctx){
    ctx.verifyParams({
      name: {type: 'string',required:true}
    });
    db.push(ctx.request.body);
    ctx.body = ctx.request.body;
  }
  update(ctx){
    db[ctx.params.id * 1] = ctx.request.body;
    ctx.body = ctx.request.body;
  }
  deleteU(ctx){
    db.splice(ctx.params.id * 1 , 1);
    ctx.status = 204;
  }
}

module.exports = new UsersCtl();
