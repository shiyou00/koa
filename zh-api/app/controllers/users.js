const jsonwebtoken = require("jsonwebtoken");
const User = require('../models/users');
const { secret } = require("../config");

class UsersCtl{

  async find(ctx){
    ctx.body = await User.find();
  }

  async findById(ctx){
    const { fields } = ctx.query;
    const selectFields = fields&&fields.split(",").filter(f=>f).map(f=> ' +' + f).join("");
    const user = await User.findById(ctx.params.id).select(selectFields);
    if(!user) { ctx.throw(404, '用户不存在')}
    ctx.body = user;
  }

  async create(ctx){
    ctx.verifyParams({
      name: {type: 'string',required:false},
      password: {type: 'string',required:false},
    });

    const { name } = ctx.request.body;
    const repeatedUser = await User.findOne({ name });

    if(repeatedUser) ctx.throw(409, '用户已经存在') ;

    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }

  async checkOwner(ctx,next){
    if(ctx.params.id !== ctx.state.user._id){
      ctx.throw(403,'没有权限');
    }
    await next();
  }

  async update(ctx){
    ctx.verifyParams({
      name: {type: 'string',required:false},
      password: {type: 'string',required:false}
    });
    const user = await User.findByIdAndUpdate(ctx.params.id,ctx.request.body);
    if(!user) { ctx.throw(404, '用户不存在')}
    ctx.body = user;
  }

  async deleteU(ctx){
    const user = await User.findByIdAndRemove(ctx.params.id);
    if(!user) { ctx.throw(404, '用户不存在')}
    ctx.status = 204;
  }

  async login(ctx){
    // 校验请求体的用户名和密码
    ctx.verifyParams({
      name: {type: 'string',required:true},
      password: {type: 'string',required:true}
    });

    const user = await User.findOne(ctx.request.body);
    if(!user){ ctx.throw(401,"用户名或密码不正确")}
    // 生成token
    const { _id, name } = user;
    const token = jsonwebtoken.sign({_id, name},secret,{expiresIn:'1d'});
    ctx.body = { token };
  }

  // 某个用户关注的列表
  async listFollowing(ctx){
    const user = await User.findById(ctx.params.id).select('+following').populate('following');
    if(!user){ctx.throw(404)}
    ctx.body = user.following;
  }

  // 某个用户的粉丝
  async listFollower(ctx){
    const users = await User.find({following: ctx.params.id});
    ctx.body = users;
  }

  async checkUserExist(ctx,next){
    const user = await User.findById(ctx.params.id);
    if(!user){ctx.throw(404,'用户不存在')}
    await next();
  }

  async follow(ctx){
    const me = await User.findById(ctx.state.user._id).select('+following');
    if(!me.following.map(id=>id.toString()).includes(ctx.params.id)){
      me.following.push(ctx.params.id);
      me.save();
    }
    ctx.status = 204;
  }

  async unFollow(ctx){
    const me = await User.findById(ctx.state.user._id).select('+following');
    const index = me.following.map(id=>id.toString()).indexOf(ctx.params.id);
    if(index>-1){
      me.following.splice(index,1);
      me.save();
    }
    ctx.status = 204;
  }

}

module.exports = new UsersCtl();
