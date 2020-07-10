const router = require('koa-router')()
const Service = require("./service");
const { ProductModel, CategoryModel, DepartmentModel, UserModel } = require("./model")
router.get('/', async (ctx, next) => {
  await ctx.render("index");
})
//登录
router.post('/login', Service.login);
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
/** 
 * 删除关联
 */
router.get("/delProduct", async (ctx) => {
  let data = await ProductModel.delProduct(ctx.query.id);
  if (data === 1) {
    let allData = await ProductModel.all();
    ctx.body = {
      code: 1,
      data: allData,
      message: "success"
    }
  } else {
    ctx.body = {
      code: 0,
      data: false,
      message: "删除商品失败"
    }
  }
})
router.post("/updateProduct", async (ctx) => {
  try {
    let params = ctx.request.body;
    let allData = await ProductModel.updateProduct(params);
    ctx.body = {
      code: 1,
      data: allData,
      message: "更新产品成功"
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      data: null,
      message: error.message
    }
  }
});

module.exports = router
