<template>
  <el-select v-model="t_value" placeholder="请选择">
    <el-option v-for="item in listData" :key="item.value" :label="item.label" :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select>
</template>

<script>
import {
  getValueByPath, valueEquals, isIE, isEdge,
} from 'element-ui/src/utils/util';

export default {
  props: {
    value: {
      type: Number,
    },

  },
  data() {
    return {
      t_value: this.value,
      listData: [],
      selectData: [],
    };
  },
  computed: {
    // getSelectOptions: {
    //   get() {

    //   },
    //   set(data) {
    //     this.listData = data;
    //   }
    // },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    formatData(data) {
      return data && data.map((item) => {
        item.label = `${item.categoryName}/${item.shopName}`;
        item.value = item.id;
        return item;
      });
    },
    fetchData() {
      const data = sessionStorage.getItem('categoryAll');
      if (data) {
        this.listData = JSON.parse(data);
        return true;
      }
      $axios.get('/categoryAll').then((res) => {
        if (res.data.code == 1) {
          this.listData = this.formatData(res.data.data);
          sessionStorage.setItem('categoryAll', JSON.stringify(this.listData));
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((error) => {
        this.$message.error(error.message);
      });
    },
  },
  watch: {
    t_value(n) {
      this.$emit('input', n);
    },
    value(val, oldVal) {
      if (!valueEquals(val, oldVal)) {
        this.t_value = val;
        // this.dispatch('ElFormItem', 'el.form.change', val);
      }
    },
  },
};
</script>

<style>
</style>
