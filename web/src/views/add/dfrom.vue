<template>
  <div :loading="loading" v-if="dataId && dataList">
    <template v-for="(item,index) in dataList">
      <el-card
        style="margin:10px 0 0 0;"
        class="box-card"
        v-if="item.Products.length > 0"
        :key="index"
      >
        <div slot="header" class="clearfix" style="text-align:left;">
          <span>{{item.categoryName}}</span>
        </div>
        <div style="text-align:left;">
          <template v-for="(child,cIndex) in item.Products">
            <el-input
              v-model.trim="child.content"
              style="width:200px;margin:5px;"
              :key="cIndex"
              @change="handleGeneratorData"
            >
              <template slot="prepend">{{child.name}}</template>
              <template slot="append">{{child.suffix}}</template>
            </el-input>
          </template>
        </div>
      </el-card>
    </template>
  </div>
</template>

<script>
export default {
  name: "ProductForm",
  props: {
    dataId: {
      type: Number,
      require: true
    },
  },
  data() {
    return {
      loading: true,
      dataList: null,
    }
  },
  async created() {
    // this.$set(this.$data, "dataList", this.sourceData)
    if (this.dataId) {
      let flag = await this.init(this.dataId);
      flag && (this.loading = false)
    }
  },
  mounted() {

  },
  methods: {
    init(id) {
      new Promise(resolve => {
        $axios.get(`/allByDep?id=${id}`).then((res) => {
          if (res.data.code === 1) {
            this.$set(this.$data, "dataList", res.data.data);
            resolve(true)
          }
          resolve(true)
        }).catch((error) => {
          console.log(error);
        });
      })
    },
    getSelected() {
      let products = [];
      this.dataList.map(item => {
        item.Products.map(pItem => {
          if (pItem.content) {
            products.push(pItem);
          }
        })
      });
      let data = {
        id: this.dataId,
        list: products
      }
      this.$emit("get-data", data)
      return data;
    },
    handleGeneratorData() {
      this.getSelected();
    }
  }
}
</script>

<style>
</style>