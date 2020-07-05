<template>
  <div class="home" v-loading.fullscreen.lock="loading">
    <el-card :body-style="{padding:'10px'}" shadow="always">
      <el-row>
        <el-col :span="16">欢迎您:{{shopName}}</el-col>
        <el-col :span="4">
          <el-link type="primary" @click="logout">退出</el-link>
        </el-col>
      </el-row>
    </el-card>
    <!-- <el-alert title type="info" :closable="false" effect="dark"></el-alert> -->
    <el-tabs
      type="border-card"
      style="margin-top:10px;"
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane v-for="(item,index) in list" :label="item.name" :name="item.id+''">
        <!-- <div>{{categoryData['tab-'+item.id]}}</div> -->
        <el-card
          class="box-card"
          v-for="citem in categoryData['tab-'+item.id]"
          v-if="citem.Products.length > 0"
        >
          <div slot="header" class="clearfix">
            <span>{{citem.categoryName}}</span>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item v-for="pitem in citem.Products">
              <el-input v-model="pitem.desc" style="width:250px">
                <template slot="prepend">{{pitem.name}}</template>
                <template slot="append">{{pitem.suffix}}</template>
              </el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="添加商品" name="addProduct">
        <div>
          <AddProduct />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import AddProduct from "./add/addProduct";

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    AddProduct
  },
  data() {
    return {
      loading: true,
      activeName: null,
      shopName: "",
      list: [],
      categoryData: {},
    };
  },
  created() {
    this.fetchData();
    let userInfoStr = sessionStorage.getItem("userInfo");
    let userInfo = JSON.parse(userInfoStr);
    this.shopName = userInfo.name;
  },
  methods: {
    /**
     * 退出登录
     */
    logout() {
      window.sessionStorage.removeItem("token");
      this.$router.push("/");
    },
    handleClick(tab, event) {
      console.log(tab, event);
      //根据选中的 部门 选择部门下大类别和产品
      this.fetchCategoryData(tab.name);
    },
    fetchCategoryData(depId) {
      this.loading = true;
      const self = this;
      const key = `tab-${depId}`;
      let str = window.sessionStorage.getItem(key);
      if (str) {
        let data = JSON.parse(str);
        self.categoryData[key] = data;
        this.loading = false;
      } else {
        $axios.get("/allByDep?id=" + depId).then(res => {
          if (res.data.code === 1) {
            self.categoryData[key] = res.data.data;
            window.sessionStorage.setItem(key, JSON.stringify(res.data.data));
            this.loading = false;
          }
        }).catch(error => {
          console.log(error);
        });
      }
    },
    fetchData() {
      this.loading = true;
      const self = this;
      $axios.get("/departmentAll").then(res => {
        if (res.data.code === 1) {
          self.list = res.data.data;
          //生成多项列表内容
          self.list.forEach(item => {
            self.categoryData['tab-' + item.id] = [];
          })
          self.activeName = self.list[0].id + '';
          this.fetchCategoryData(self.list[0].id);
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
};
</script>
