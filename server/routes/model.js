
const { DataTypes } = require("sequelize");
const sequelize = require("./db");
/**
 * 用户表
 */
const User = sequelize.define('User', {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ldap: {
    unique: true,
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
/**
 * 大类表
 */
const Category = sequelize.define('Category', {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  shopName: {
    type: DataTypes.STRING,
  },
  tel: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING
  },
  remarks: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'ttzp_category'
});
/**
 * 产品表
 */
const Product = sequelize.define('Product', {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,

    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  suffix: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING,
  },
  desc: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'ttzp_product',
  // 不要添加时间戳属性 (updatedAt, createdAt)
  // timestamps: false,
});
/**
 * 部门表
 */
const Department = sequelize.define('department', {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'ttzp_department',
  // 不要添加时间戳属性 (updatedAt, createdAt)
  // timestamps: false,
});
// const ProductDepartment = sequelize.define('ProductDepartment', {
//   productId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Product, // 'Movies' 也可以使用
//       key: 'id'
//     }
//   },
//   departmentId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Department, // 'Actors' 也可以使用
//       key: 'id'
//     }
//   }
// }, {
//   tableName: 'ttzp_pdid',
//   // 不要添加时间戳属性 (updatedAt, createdAt)
//   // timestamps: false,
// });
// const CategoryDepartment = sequelize.define("CategoryDepartment", {
//   departmentId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Product,
//       key: 'id'
//     }
//   },
//   categoryId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Department,
//       key: 'id'
//     }
//   }
// }, {
//   tableName: 'ttzp_cdid',
//   // 不要添加时间戳属性 (updatedAt, createdAt)
//   // timestamps: false,
// })

//部门和产品是多对多关系
Department.belongsToMany(Product, { through: "ProductDepartment" });
Product.belongsToMany(Department, { through: "ProductDepartment" });

//部门和供应商分类为多对多关系
Department.belongsToMany(Category, { through: "CategoryDepartment" });
Category.belongsToMany(Department, { through: "CategoryDepartment" });

//供应商和产品为一对多关系
Category.hasMany(Product, {
  foreignKey: {
    name: 'cid'
  }
})
Product.belongsTo(Category, {
  foreignKey: {
    name: 'cid'
  }
});

(async () => {
  await sequelize.sync();
  await User.create({
    name: "天天粥棚-润丰店",
    ldap: "ttzp1",
    password: "111111",
    shopName: "润丰"
  });
  let arr = [{
    categoryName: "干菜",
    shopName: "仁义干菜店",
    tel: "13300000000",
    address: "",
    remarks: ""
  }, {
    categoryName: "蔬菜",
    shopName: "小龙干菜店",
    tel: "13300000000",
    address: "",
    remarks: ""
  },
  ];
  await Category.bulkCreate(arr);
  await Department.bulkCreate([
    { name: "热菜" },
    { name: "面点" },
    { name: "粥" },
    { name: "前厅" },
  ]);
})();




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
class DepartmentModel {
  static async Query() {
    return await Department.findAll()
  }
}
class CategoryModel {
  static async create(data) {
    return await Category.create(data)
  }
  static async all() {
    return await Category.findAll()
  }

  static async allByDep(id) {
    return await Category.findAll({
      include: [
        {
          model: Product,
          include: {
            model: Department,
            where: {
              id: id
            }
          }
        }
      ]
    })
  }
}
class ProductModel {
  static async create(data) {
    // name: "",//商品名称
    // suffix: "",//计量单位
    // desc: "",//备注
    // category: "",//关联的类别
    // department: [],//关联的部门
    const hasProduct = await Product.findOne({
      where: {
        name: data.name
      }
    })
    if (hasProduct) {
      return false;
    }
    // let category = await Category.findOne({ where: { id: data.category } });
    let product = await Product.create({
      name: data.name,
      suffix: data.suffix,
      desc: data.desc,
      cid: data.category,
      content: "",
    });

    const dep = await Department.findAll({ where: { id: data.department } });
    product.setDepartments(dep);
    // for (const iterator of data.department) {
    //   const dep = await Department.findAll({ where: { id: iterator } });
    //   product.setDepartments(dep);
    // } 
  }
  static async all() {
    // return await Product.findAll({ offset: pages.offset, limit: pages.limit, order: [["id", "DESC"]] })
    return await Product.findAll({
      include: [{
        model: Department,
        require: true
      }, {
        model: Category
      }]
    });
  }
  static async delProduct(id) {
    return await Product.destroy({
      where: {
        id: id
      }
    })
  }
  static async updateProduct(params) {

    await Product.update({
      name: params.name,
      suffix: params.suffix,
      content: params.content,
      desc: params.desc,
      cid: params.category,
    }, {
      where: {
        id: params.id
      }
    });
    const product = await Product.findOne({ where: { id: params.id } });
    const dep = await Department.findAll({ where: { id: params.department } });
    await product.setDepartments(dep);
    return await this.all();
  }
}


module.exports = {
  CategoryModel, ProductModel, DepartmentModel, UserModel
}