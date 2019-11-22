const jwt = require("koa-jwt");
const { secret } = require("../config");
const Router = require('koa-router');
const router = new Router({prefix:'/users'});
const {
  find,
  findById,
  create,
  update,
  deleteU,
  login,
  checkOwner,
  listFollowing,
  follow,
  unFollow,
  listFollower,
  checkUserExist
} = require('../controllers/users');

// 认证用户
const auth = jwt({secret});

router.get('/',find);

router.post('/',create);

router.get("/:id",findById);

router.patch("/:id",auth,checkOwner,update);

router.delete("/:id",auth,checkOwner,deleteU);

router.post("/login",login);

router.get("/:id/following",listFollowing);

router.get("/:id/follower",listFollower);

router.put("/following/:id",auth,checkUserExist, follow);

router.delete("/unFollow/:id",auth,checkUserExist, unFollow);

module.exports = router;
