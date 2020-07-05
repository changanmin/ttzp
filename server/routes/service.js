const { ProductModel, CategoryModel, DepartmentModel, UserModel } = require("./model")
const jwt = require("jsonwebtoken");
module.exports = {
  /**
   * 登录接口
   * 成功返回data
   */
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
          // ctx.session.logged = true;
          const token = jwt.sign({
            user: data.ldap,
            password: data.password
          }, '123123', { expiresIn: "1h" })
          ctx.body = {
            code: 1,
            token: token,
            userInfo: data,
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
  /**
   * 查询产品根据 二级大类分组
   */
  ProductQueryByDepId: async (ctx, next) => {
    let { offset = 0, limit = 10 } = ctx.request.body;
    let data = await ProductModel.pages({ offset, limit });
    console.log(data);
    let pageData = {
      list: data, code: 1, msg: "分页查询"
    }
    ctx.body = pageData;
  },
  /**
   * 查询一级部门类别所有数据
   */
  DepartmentQuery: async (ctx, next) => {
    let data = await DepartmentModel.Query();
    if (data && data.length > 0) {
      ctx.body = { data: data, code: 1, msg: "success" };
    } else {
      ctx.body = { data: [], code: -1, msg: "success" };
    }
  }
}