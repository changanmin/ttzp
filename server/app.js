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
// const cors = require("koa2-cors");

// routes
// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public/dist'))
app.use(views(__dirname + '/public/dist', {
  extension: 'html'
}));
app.use(index.routes(), index.allowedMethods())
app.use(koajwt({
  secret: "123123"
}).unless({
  path: [/^\/login/]
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


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
module.exports = app
