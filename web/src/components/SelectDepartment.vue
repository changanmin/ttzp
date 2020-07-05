<template>
  <el-select v-model="t_value" placeholder="请选择" multiple>
    <el-option v-for="item in listData" :key="item.value" :label="item.label" :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    value: [Number, Array]
  },
  data() {
    return {
      t_value: this.value,
      listData: [],
      selectData: [],
    }
  },
  computed: {

  },
  mounted() {
    this.fetchData();
  },
  methods: {
    formatData(data) {
      return data && data.map(item => {
        item.label = item.name;
        item.value = item.id
        return item;
      })
    },
    fetchData() {
      let data = sessionStorage.getItem("departmentAll");
      if (data) {
        this.listData = JSON.parse(data);
        return true;
      }
      $axios.get("/departmentAll").then(res => {
        if (res.data.code == 1) {
          this.listData = this.formatData(res.data.data);
          sessionStorage.setItem("departmentAll", JSON.stringify(this.listData));
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(error => {
        this.$message.error(error.message);
      })
    }
  },
  watch: {
    t_value(n) {
      this.$emit("input", n)
    },
    value(val, oldVal) {
      if (val !== oldVal) {
        this.t_value = val;
      }
    }
  }
}
</script>

<style>
</style>