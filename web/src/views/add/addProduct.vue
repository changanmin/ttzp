<template>
  <div>
    <!-- 1.添加产品名称和计量单位
    2.关联类型（category）
    3.关联部门可以选多个-->
    <el-form ref="form" :model="form" :inline="true" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="form.suffix"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="类别">
        <SelectCategory v-model="form.category" />
      </el-form-item>
      <el-form-item label="所属部门">
        <SelectDepartment v-model="form.department" />
      </el-form-item>
      <!-- name: "",//商品名称
        suffix: "",//计量单位
        desc: "",//备注
        category: [],//关联的类别
      department: [],//关联的部门-->
      <el-form-item>
        <el-button type="primary" @click="handleAddProduct">立即创建</el-button>
        <el-button>取消</el-button>
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
          <el-button @click="handleClickUpd(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { SelectCategory, SelectDepartment } from "../../components/index";
export default {
  components: {
    SelectCategory, SelectDepartment
  },
  data() {
    return {
      tableData: [],
      form: {
        name: "",//商品名称
        suffix: "",//计量单位
        desc: "",//备注
        category: null,//关联的类别
        department: [],//关联的部门
      }
    }
  },
  created() {
    //初始化数据
    this.init();
  },
  methods: {
    reset() {
      this.form = {
        name: "",//商品名称
        suffix: "",//计量单位
        desc: "",//备注
        category: "",//关联的类别
        department: [],//关联的部门
      }
    },
    handleAddProduct() {
      //添加商品
      $axios.post('/addProduct', this.form).then(res => {
        if (res.data.code === 1) {
          this.$message.success(res.data.message || "添加商品成功");
          this.init();
          this.reset();
          this.$refs['form'].resetFields();
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(error => {
        this.$message.error(error.message);
      });
    },
    init() {
      $axios.get('/productAll').then(res => {
        if (res.data.code === 1) {
          this.tableData = (function () {
            return res.data.data.map(item => {
              if (item.departments) {
                item.depNames = item.departments.map(ditem => ditem.name + ",");
              }
              return item;
            })
          })();
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(error => {
        this.$message.error(error.message);
      })
    },
    handleClickDel() {

    },
    handleClickUpd() {

    }
  }
}
</script>

<style>
</style> */