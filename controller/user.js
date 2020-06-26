const UserModel = require("../schema/user");
const jwt = require("jsonwebtoken");
module.exports = {
  login: async (ctx, next) => {
    let { ldap = "", password = "" } = ctx.request.body;
    if (!ldap || !password) {
      await ctx.render("login", {
        code: -1,
        message: "用户名或密码不能为空"
      })
    } else {
      let data = await UserModel.queryUserByLdap(ldap);
      if (data) {
        if (data.password === password) {
          ctx.session.logged = true;
          ctx.redirect("/");
        } else {
          await ctx.render("login", { message: "用户密码错误" });
        }
      } else {
        await ctx.render("login", { message: "用户不存在" });
      }
    }
  },
}