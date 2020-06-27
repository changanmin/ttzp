const UserModel = require("../schema/user");
// const ProductModel = require("../schema/product");
// const CategoryModel = require("../schema/category");
const { ProductModel, CategoryModel } = require("../schema/model")
const jwt = require("jsonwebtoken");
module.exports = {
  login: async (ctx, next) => {
    let { ldap = "", password = "" } = ctx.request.body;
    if (!ldap || !password) {
      ctx.body = {
        code: -1,
        message: "用户名或密码不能为空"
      }
    } else {
      let data = await UserModel.queryUserByLdap(ldap);
      if (data) {
        if (data.password === password) {
          ctx.session.logged = true;
          const token = jwt.sign({
            user: ldap,
            password: password
          }, '123123', { expiresIn: "1h" })
          ctx.body = {
            code: 1,
            token: token,
            message: "登录成功"
          }
        } else {
          ctx.body = { message: "用户密码错误", code: -1 };
        }
      } else {
        ctx.body = { message: "用户不存在", code: -1 };
      }
    }
  },
  //获取所有产品
  productPages: async (ctx, next) => {
    let { offset = 0, limit = 10 } = ctx.request.body;
    let data = await ProductModel.pages({ offset, limit });
    console.log(data);
    let pageData = {
      list: data, code: 1, msg: "分页查询"
    }
    ctx.body = pageData;
  },
  categoryAll: async (ctx, next) => {
    let data = await CategoryModel.pages()
    ctx.body = data;
  }
}