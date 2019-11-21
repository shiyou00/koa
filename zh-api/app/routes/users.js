const jwt = require("koa-jwt");
const { secret } = require("../config");
const Router = require('koa-router');
const router = new Router({prefix:'/users'});
const { find,findById,create,update,deleteU,login,checkOwner } = require('../controllers/users');

// 认证用户
const auth = jwt({secret});

router.get('/',find);

router.post('/',create);

router.get("/:id",findById);

router.patch("/:id",auth,checkOwner,update);

router.delete("/:id",auth,checkOwner,deleteU);

router.post("/login",login);

module.exports = router;
