<template>
  <div class="home">
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
      <el-tab-pane v-for="(item,index) in list" :label="item.name" :name="item.id">
        <div>{{item.id}}</div>
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
      const self = this;
      const key = `tab-${depId}`;
      let str = window.sessionStorage.getItem(key);
      if (str) {
        let data = JSON.parse(str);
        self.categoryData[key] = data;
      } else {
        $axios.get("/allByDep?id=" + depId).then(res => {
          if (res.data.code === 1) {
            self.categoryData[key] = res.data.data;
            window.sessionStorage.setItem(key, JSON.stringify(res.data.data));
          }
        }).catch(error => {
          console.log(error);
        });
      }
    },
    fetchData() {
      const self = this;
      $axios.get("/departmentAll").then(res => {
        if (res.data.code === 1) {
          self.list = res.data.data;
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
