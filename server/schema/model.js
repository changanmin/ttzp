
const { DataTypes } = require("sequelize");
const sequelize = require("./db");
/**
 * 大类表
 */
const Category = sequelize.define('Category', {
  // id: {
  //   allowNull: false,
  //   type: DataTypes.UUID,
  //   defaultValue: DataTypes.UUIDV4,
  //   primaryKey: true
  // },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
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
}
);

const Product = sequelize.define('Product', {
  // id: {
  //   allowNull: false,
  //   type: DataTypes.UUID,
  //   defaultValue: DataTypes.UUIDV4,
  //   primaryKey: true
  // },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  suffix: {
    type: DataTypes.STRING,
  },
  desc: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'ttzp_product',
  // 不要添加时间戳属性 (updatedAt, createdAt)
  // timestamps: false,
}
);
const Department = sequelize.define('department', {
  // id: {
  //   allowNull: false,
  //   type: DataTypes.UUID,
  //   defaultValue: DataTypes.UUIDV4,
  //   primaryKey: true
  // },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'ttzp_department',
  // 不要添加时间戳属性 (updatedAt, createdAt)
  // timestamps: false,
}
);

Department.hasMany(Category);
Category.belongsTo(Department);
Category.hasMany(Product);
Product.belongsTo(Category);


Category.sync({ force: false }).then(resolve => { }).catch(error => {
  console.log(error)
});
Product.sync({ force: false }).then(resolve => { }).catch(error => {
  console.log(error)
});
Department.sync({ force: false }).then(resolve => { }).catch(error => {
  console.log(error)
});
class DepartmentModel {
  static async pages() {
    return await Department.findAll()
  }
}
class CategoryModel {
  static async create(data) {
    return await Category.create(data)
  }
  static async pages() {
    return await Category.findAll()
  }
}
class ProductModel {
  static async create(data) {
    return await Product.create(data)
  }
  static async pages(pages) {
    // return await Product.findAll({ offset: pages.offset, limit: pages.limit, order: [["id", "DESC"]] })
    return {};
  }
  static async queryByCategory(data) {
    // return await Product.findAll({
    //   where: {
    //     categoryCode: data
    //   }
    // })
  }
}


module.exports = {
  CategoryModel, ProductModel, DepartmentModel
}