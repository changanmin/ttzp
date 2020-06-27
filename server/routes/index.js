const router = require('koa-router')()
const Service = require("../controller/user");
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello!'
  })
})
//登录
router.post('/login', Service.login);
//查询产品
router.post("/productPages", Service.productPages);

//查询类别
router.post("/queryCategory", Service.categoryAll);


module.exports = router
