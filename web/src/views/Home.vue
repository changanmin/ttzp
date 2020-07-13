<template>
  <div class="home" v-loading="loading">
    <el-card :body-style="{padding:'10px'}" shadow="always">
      <el-row>
        <el-col :span="4">
          <el-link type="primary" @click="handleGenerate">生成</el-link>
        </el-col>
        <el-col :span="16">欢迎您:{{shopName}}</el-col>
        <el-col :span="4">
          <el-link type="primary" @click="logout">退出</el-link>
        </el-col>
      </el-row>
    </el-card>
    <el-tabs
      type="border-card"
      style="margin-top:10px;"
      v-model="activeTab"
      @tab-click="handleClick"
    >
      <template v-for="(item,index) in listTab">
        <el-tab-pane :key="index" :label="item.name" :name="`${item.id}`">
          <!-- <ProductForm
            :ref="`${item.name}&${item.id}`"
            v-if="item.id"
            @get-data="handleGetData"
            :dataId="item.id"
          />-->
          <ProductForm
            :ref="`${item.name}&${item.id}`"
            v-if="item.id"
            @get-data="handleGetData"
            :dataId="item.id"
          />
        </el-tab-pane>
      </template>
      <el-tab-pane label="添加商品" name="addProduct">
        <AddProduct v-if="activeTab==='addProduct'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script> 
const AddProduct = (resolve) => import('./add/addProduct');
// const ProductForm = (resolve) => import("./add/dfrom");
const ProductForm = (resolve) => import("./add/table")


export default {
  name: 'Home',
  components: {
    AddProduct,
    ProductForm
  },
  data() {
    return {
      loading: true,
      activeTab: "",
      shopName: '',
      listTab: [],
      selectData: {},
    };
  },
  created() {
    const userInfoStr = sessionStorage.getItem('userInfo');
    const userInfo = JSON.parse(userInfoStr);
    this.shopName = userInfo.name;
    (async () => {
      let bool = await this.fetchData();
      console.log(bool);
      this.loading = false;
    })()
  },
  methods: {
    handleGetData({ id, list = [] } = {}) {
      console.log("handleGetData");
      /** 
       * 1.子组件每次更新数据后把选中的数据丢给父级，父级进行累计
       */
      if (!id || list.length <= 0) return false;
      /* 去除重复的数据 */
      // this.selectData.set(id, list);
      let item = this.listTab.find(item => item.id === id);
      this.$set(this.selectData, id, { dep: item, prs: list });
      window.localStorage.setItem("SelectProducts", JSON.stringify(this.selectData));
    },
    handleGenerate() {
      let url = window.location.origin + "/#/print";
      const printPage = window.open(url);
      printPage.opener = null;
    },
    /**
     * 退出登录
     */
    logout() {
      this.$confirm('确认退出？')
        .then(_ => {
          window.localStorage.clear();
          window.sessionStorage.clear();
          this.$router.push('/login');
        })
        .catch(_ => { });
    },
    handleClick(tab, event) {
      // 根据选中的 部门 选择部门下大类别和产品
      if (tab.name !== "addProduct") {
        this.fetchCategoryData(tab.name);
      }
    },
    fetchCategoryData(depId) {
      const self = this;
      return new Promise(resolve => {
        const key = `tab-${depId}`;
        $axios.get(`/allByDep?id=${depId}`).then((res) => {
          if (res.data.code === 1) {
            let index = self.listTab.findIndex(item => item.id === +depId);
            self.$set(self.listTab[index], "categoryData", res.data.data);
            // self.$set(self.categoryData, key, res.data.data);
          }
          resolve(true)
        }).catch((error) => {
          console.log(error);
        });
      })
    },
    fetchData() {
      const self = this;
      return new Promise(resolve => {
        $axios.get('/departmentAll').then(async (res) => {
          if (res.data.code === 1) {
            self.$set(self.$data, 'listTab', res.data.data);
            // // 生成多项列表内容
            // let obj = {};
            // res.data.data.forEach((item) => {
            //   obj[`tab-${item.id}`] = []
            // });
            // self.$set(self.$data, `categoryData`, obj);
            self.activeTab = `${self.listTab[0].id}`;
            resolve(true)
            // resolve(await self.fetchCategoryData(self.listTab[0].id));
          }
        }).catch((error) => {
          console.log(error);
        });
      });
    }
  }
};
</script>

<style>
.el-input__inner {
  font-weight: bolder;
}
</style>