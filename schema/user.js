const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ldap: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(val) {
      this.setDataValue("ldap", val.toUpperCase());
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: "sys_user"
});
User.sync({ force: false });

class UserModel {
  static async createUser(data) {
    return await User.create({
      name: data.name,
      ldap: data.ldap,
      password: data.password,
    })
  }
  static async queryUserByLdap(ldap) {
    return await User.findOne({
      where: { ldap }
    })
  }
}
module.exports = UserModel