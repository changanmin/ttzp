const UserModel = require("../schema/user.js");
const { Op } = require("sequelize");

module.exports = {
  login: async function (name, pwd) {
    let data;
    User.findAll({
      where: {
        name: {
          [Op.like]: "${name}%"
        }
      }
    })
    if (name == "admin" && pwd === "123") {
      data = {
        status: 0,
        data: {
          title: "ttttt",
          content: ""
        }
      }
    } else {
      data = {
        status: -1,
        data: {
          title: "失败",
          content: "请输入正确的账号密码"
        }
      }
    }
    return data;
  }
}