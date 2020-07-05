<template>
  <el-select v-model="value" placeholder="请选择" multiple>
    <el-option v-for="item in listData" :key="item.value" :label="item.label" :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select>
</template>

<script>
import { getValueByPath, valueEquals, isIE, isEdge } from 'element-ui/src/utils/util';
export default {
  data() {
    return {
      listData: [],
      selectData: [],
    }
  },
  computed: {
    getSelectOptions() {
      return this.listData && this.listData.map(item => {
        item.label = item.name + "/" + item.suffix + "/" + item.desc;
        item.value = item.id;
        return item;
      })
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let data = sessionStorage.getItem("productAll");

      if (data) {
        this.listData = JSON.stringify(data);
        return true;
      }
      $axios.get("/productAll").then(res => {
        if (res.data.code == 1) {
          this.listData = res.data.data;
          sessionStorage.setItem("productAll", res.data.data);
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(error => {
        this.$message.error(error.message);
      })
    }
  }
}
</script>

<style>
</style>