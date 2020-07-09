<template>
  <div>
    <!-- 1.添加产品名称和计量单位
    2.关联类型（category）
    3.关联部门可以选多个-->
    <el-form ref="form" :model="form" :rules="rules" :inline="true" label-width="80px">
      <el-form-item v-show="form.id" label="id">{{form.id}}</el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="suffix">
        <el-input v-model="form.suffix"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="category">
        <SelectCategory v-model="form.category" />
      </el-form-item>
      <el-form-item label="所属部门" prop="department">
        <SelectDepartment v-model="form.department" />
      </el-form-item>
      <!-- name: "",//商品名称
        suffix: "",//计量单位
        desc: "",//备注
        category: [],//关联的类别
      department: [],//关联的部门-->
      <el-form-item>
        <el-button type="primary" @click="handleAddProduct">{{form.id?"修改产品":"添加商品"}}</el-button>
        <el-button v-show="form.id" @click="handleCancelEdit">取消编辑</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="40"></el-table-column>
      <el-table-column prop="name" label="名称" width="200"></el-table-column>
      <el-table-column prop="Category.categoryName" label="关联类别" width="120"></el-table-column>
      <el-table-column prop="depNames" label="关联部门" width="200"></el-table-column>
      <el-table-column prop="suffix" label="计量单位" width="100"></el-table-column>
      <el-table-column prop="desc" label="备注" width="200"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClickDel(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="handleClickUpd(scope.row,'edit')" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { SelectCategory, SelectDepartment } from '../../components/index';

export default {
  components: {
    SelectCategory, SelectDepartment,
  },
  data() {
    return {
      tableData: [],
      form: {
        name: '', // 商品名称
        suffix: '', // 计量单位
        desc: '', // 备注
        category: null, // 关联的类别
        department: [], // 关联的部门
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        suffix: [
          { required: true, message: '请填写计量单位', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择一个所属类别', trigger: 'change' }
        ],
        department: [
          { type: 'array', required: true, message: '请至少选择一个所属部门', trigger: 'change' }
        ]
      }
    };
  },
  created() {
    // 初始化数据
    this.init();
  },
  methods: {
    reset() {
      this.form = {
        name: '', // 商品名称
        suffix: '', // 计量单位
        desc: '', // 备注
        category: null, // 关联的类别
        department: [], // 关联的部门
      };
    },
    handleAddProduct() {
      if (this.form.id) {
        this.handleClickUpd({}, "submit");
      } else {
        // 添加商品
        $axios.post('/addProduct', this.form).then((res) => {
          if (res.data.code === 1) {
            this.$message.success(res.data.message || '添加商品成功');
            this.init();
            this.reset();
            this.$refs.form.resetFields();
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((error) => {
          this.$message.error(error.message);
        });
      }

    },
    init() {
      $axios.get('/productAll').then((res) => {
        if (res.data.code === 1) {
          this.tableData = (function () {
            return res.data.data.map((item) => {
              if (item.departments) {
                item.depNames = item.departments.map((ditem) => `${ditem.name},`);
              }
              return item;
            });
          }());
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((error) => {
        this.$message.error(error.message);
      });
    },
    handleClickDel(row) {
      console.log(row);
      $axios.get("/delProduct?id=" + row.id).then(res => {
        if (res.data.code == 1) {
          this.tableData = (function () {
            return res.data.data.map((item) => {
              if (item.departments) {
                item.depNames = item.departments.map((ditem) => `${ditem.name},`);
              }
              return item;
            });
          }());
          this.$message.success(res.data.message || '删除商品成功');
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((error) => {
        this.$message.error(error.message);
      });
    },
    handleClickUpd(row, action) {
      if (action === "edit") {
        let dep = (row.departments && row.departments.map(item => item.id)) || []
        let obj = {
          id: row.id,
          name: row.name, // 商品名称
          suffix: row.suffix, // 计量单位
          desc: row.desc, // 备注
          category: row.cid, // 关联的类别
          department: dep, // 关联的部门
        }
        this.$set(this.$data, "form", obj)
      } else if (action === "submit") {
        $axios.post("/updateProduct", this.form).then(res => {
          if (res.data.code == 1) {
            this.tableData = (function () {
              return res.data.data.map((item) => {
                if (item.departments) {
                  item.depNames = item.departments.map((ditem) => `${ditem.name},`);
                }
                return item;
              });
            }());
            this.reset();
            this.$message.success(res.data.message || '更新商品成功');
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((error) => {
          this.$message.error(error.message);
        });
      }
    },
    handleCancelEdit() {
      //取消编辑
      this.reset();
    }
  },
};
</script>

<style>
</style> */
