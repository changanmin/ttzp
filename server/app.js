const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koajwt = require("koa-jwt");
const index = require('./routes/router')
// const session = require("koa-session")
const cors = require("koa2-cors");

// error handler
onerror(app)

// app.keys = ['some secret hurr'];

// const CONFIG = {
//   key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
//   /** (number || 'session') maxAge in ms (default is 1 days) */
//   /** 'session' will result in a cookie that expires when session/browser is closed */
//   /** Warning: If a session cookie is stolen, this cookie will never expire */
//   maxAge: 86400000,
//   overwrite: true, /** (boolean) can overwrite or not (default true) */
//   httpOnly: true, /** (boolean) httpOnly or not (default true) */
//   signed: true, /** (boolean) signed or not (default true) */
//   rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
//   renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
// };
app.use(koajwt({
  secret: "123123"
}).unless({
  path: [/^\/login/]
}))
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors({
  origin: function (ctx) {
    return ctx.header.origin
  },
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}))
app.use(async (ctx, next) => {
  return next().catch(error => {
    if (error.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: error.message
      }
    } else {
      throw error;
    }
  })
})

// app.use(session(CONFIG, app));
//定义允许直接访问的url
// const allowpage = ['/login']
//拦截
// function localFilter(ctx) {
//   let url = ctx.originalUrl
//   if (allowpage.indexOf(url) > -1) {
//     // logger.info('当前地址可直接访问')
//   } else {
//     if (ctx.session.logged) {
//       // if (url === '/') {
//       //   ctx.render('index')
//       // }
//       console.log('login status validate success')
//     } else {
//       console.log('login status validate fail')
//       console.log(ctx.request.url)
//       ctx.redirect('/login')
//     }
//   }
// }
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(views(__dirname + '/views', {
  extension: 'nunjucks'
}))

// app.use(async (ctx, next) => {
//   localFilter(ctx)
//   await next()
// })
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
module.exports = app
