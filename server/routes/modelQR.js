/**
 * 关联数据思路
 * 1.取出1级类别
 * 2.查询2级类别要关联到的
 */
User.sync({ force: true }).then(() => {
  User.create({
    name: "天天粥棚-润丰店",
    ldap: "ttzp1",
    password: "111111",
    shopName: "润丰"
  });
  Category.sync({ force: true }).then(async (resolve) => {
    // let arr = [{
    //   cname: "干菜",
    //   sname: "仁义干菜店",
    // }, {
    //   cname: "蔬菜",
    //   sname: "小龙干菜店"
    // },
    // {
    //   cname: "猪肉",
    //   sname: "双汇猪肉点"
    // },
    // {
    //   cname: "豆制品",
    //   sname: "豆制品"
    // },
    // {
    //   cname: "仓库",
    //   sname: "天天粥棚仓库"
    // },
    // {
    //   cname: "加工间",
    //   sname: "天天粥棚加工间"
    // }, {
    //   cname: "采购",
    //   sname: "采购"
    // },
    // {
    //   cname: "莲菜网",
    //   sname: "莲菜网"
    // },
    // {
    //   cname: "酒水",
    //   sname: "欣欣批发"
    // }];
    // for (const iterator of arr) {
    //   await Category.create({
    //     categoryName: iterator.cname,
    //     shopName: iterator.sname,
    //     tel: "13300000000",
    //     address: "",
    //     remarks: ""
    //   });
    // }
    Product.sync({ force: true }).then(async resolve => {
      Department.sync({ force: true }).then(async resolve => {
        let arr = ["热菜", "面点", "粥", "前厅"];
        for (const iterator of arr) {
          await Department.create({
            name: iterator
          });
        }
        CategoryDepartment.sync({ force: true }).then(resolve => {
          ProductDepartment.sync({ force: true });
        })
      }).catch(error => {
      });
    }).catch(error => {
      console.log(error)
    });
  }).catch(error => {
    console.log(error)
  });
});