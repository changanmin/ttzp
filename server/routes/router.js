const router = require('koa-router')()
const Service = require("./service");
const { ProductModel, CategoryModel, DepartmentModel, UserModel } = require("./model")
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello!'
  })
})
//登录
router.post('/login', Service.login);

//

//
//查询产品
// router.post("/productPages", Service.productPages);

//查询类别
// router.get("/getCategory", Service.categoryAll);
router.get("/departmentAll", Service.DepartmentQuery);
router.get("/categoryAll", async (ctx) => {
  try {
    let data = await CategoryModel.all();
    ctx.body = {
      code: 1,
      data: data,
      message: "success"
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      data: [],
      message: error.message
    }
  }
});
router.get("/productAll", async (ctx, next) => {
  try {
    let data = await ProductModel.all();
    ctx.body = {
      code: 1,
      data: data,
      message: "success"
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      data: null,
      message: error.message
    }
  }
});
router.post("/addProduct", async (ctx, next) => {
  try {
    let params = ctx.request.body;
    let data = await ProductModel.create(params);
    ctx.body = {
      code: 1,
      data: data,
      message: "添加产品成功"
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      data: null,
      message: error.message
    }
  }
});
router.get("/allByDep", async (ctx) => {
  let data = await CategoryModel.allByDep(ctx.query.id);
  ctx.body = {
    code: 1,
    data: data,
    message: "success"
  }
})


module.exports = router
