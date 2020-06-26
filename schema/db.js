const Sequelize = require("sequelize");
const sequelize = new Sequelize("ttzp", "root", 'root1111', {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql"
})
sequelize.authenticate().then(() => {
  console.log("数据库已链接成功");
}).catch(err => {
  console.error("数据库链接失败", err);
});

module.exports = sequelize;

// await sequelize.sync({ force: true });
// { Sequelize, Op, Model, DataTypes }
/*
您在模型中定义的每一列都必须具有数据类型。Sequelize提供了许多内置数据类型。要访问内置数据类型，必须导入DataTypes：
String
const { DataTypes } = require("sequelize"); // Import the built-in data types
DataTypes.STRING             // VARCHAR(255)
DataTypes.STRING(1234)       // VARCHAR(1234)
DataTypes.STRING.BINARY      // VARCHAR BINARY
DataTypes.TEXT               // TEXT
DataTypes.TEXT('tiny')       // TINYTEXT
DataTypes.CITEXT             // CITEXT          PostgreSQL and SQLite only.

Boolean
DataTypes.BOOLEAN            // TINYINT(1)

Number
DataTypes.INTEGER            // INTEGER
DataTypes.BIGINT             // BIGINT
DataTypes.BIGINT(11)         // BIGINT(11)

DataTypes.FLOAT              // FLOAT
DataTypes.FLOAT(11)          // FLOAT(11)
DataTypes.FLOAT(11, 10)      // FLOAT(11,10)

DataTypes.REAL               // REAL            PostgreSQL only.
DataTypes.REAL(11)           // REAL(11)        PostgreSQL only.
DataTypes.REAL(11, 12)       // REAL(11,12)     PostgreSQL only.

DataTypes.DOUBLE             // DOUBLE
DataTypes.DOUBLE(11)         // DOUBLE(11)
DataTypes.DOUBLE(11, 10)     // DOUBLE(11,10)

DataTypes.DECIMAL            // DECIMAL
DataTypes.DECIMAL(10, 2)     // DECIMAL(10,2)

无符号和零填充整数-仅限于MySQL / MariaDB
在MySQL和MariaDB的，数据类型INTEGER，BIGINT，FLOAT和DOUBLE可以或设置为无符号ZEROFILL（或两者），如下所示：

DataTypes.INTEGER.UNSIGNED
DataTypes.INTEGER.ZEROFILL
DataTypes.INTEGER.UNSIGNED.ZEROFILL
// You can also specify the size i.e. INTEGER(10) instead of simply INTEGER
// Same for BIGINT, FLOAT and DOUBLE
日期
DataTypes.DATE       // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
DataTypes.DATE(6)    // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision
DataTypes.DATEONLY   // DATE without time


UUID
对于UUID，请使用DataTypes.UUID。它成为UUIDPostgreSQL和SQLite以及CHAR(36)MySQL 的数据类型。Sequelize可以自动为这些字段生成UUID，只需使用Sequelize.UUIDV1或Sequelize.UUIDV4作为默认值即可：

{
  type: DataTypes.UUID,
  defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
}
*/