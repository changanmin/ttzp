<template>
  <div :loading="loading">
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
        <template v-for="(child,cIndex) in item.Products">
          <label :for="'input_'+child.id">{{child.name}}</label>
          <el-input
            v-model.trim="child.content"
            class="myinput"
            :name="'input_'+child.id"
            :key="cIndex"
            @change="handleGeneratorData"
          >
            <template slot="append">{{child.suffix}}</template>
          </el-input>
        </template>
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
.myinput {
  margin: 5px;
}
.el-input-group {
  width: auto;
}
.myinput .el-input__inner {
  min-width: 80px;
  max-width: 90px;
}
</style>