const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define('User', {
  // id: {
  //   allowNull: false,
  //   type: DataTypes.UUID,
  //   defaultValue: DataTypes.UUIDV4,
  //   primaryKey: true,
  //   autoIncrement: true
  // },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ldap: {
    type: DataTypes.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue("ldap", val.toUpperCase());
    }
  },
  shopName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: "ttzp_user"
});
User.sync({ force: false }).then(() => {
  User.create({
    name: "天天粥棚-润丰店",
    ldap: "ttzp1",
    password: "111111",
    shopName: "润丰"
  });
  User.create({
    name: "天天粥棚-桥航路",
    ldap: "ttzp2",
    password: "111111",
    shopName: "桥航路"
  });
  User.create({
    name: "天天粥棚-加工间",
    ldap: "ttzp3",
    password: "111111",
    shopName: "加工间"
  });
});

class UserModel {
  static async createUser(data) {
    return await User.create({
      name: data.name,
      ldap: data.ldap,
      showName: data.showName,
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