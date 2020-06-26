const router = require('koa-router')()
const User = require("../controller/user");
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/login', async (ctx, next) => {
  await ctx.render("login", { message: "" })
})

router.post('/login', User.login);

module.exports = router
