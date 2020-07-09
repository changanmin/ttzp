<template>
  <div style="display:flex;">
    <template v-for="(item,key,index) in listData">
      <el-card class="box-card" :key="index" :ref="`class_${key}`" style="width:280px;margin: 7px;">
        <div slot="header" class="clearfix">
          <span>{{item.dep.name}}</span>
          <el-button
            style="float: right; padding: 3px 0"
            icon="el-icon-copy-document"
            type="text"
            @click="handleCopy(key)"
          >复制</el-button>
        </div>
        <div
          v-for="(child,cindex) in item.prs"
          :key="cindex"
          class="text item"
        >{{`${child.name}:${child.content}${child.suffix}`}}</div>
      </el-card>
    </template>
    <textarea ref="text" style="width:0px;height:0px;marign:0;padding:0;outline:none;"></textarea>
  </div>
</template>

<script>
export default {
  name: "Print",
  data() {
    return {
      listData: {}
    }
  },
  mounted() {
    /**
    * 这里提供一个方法用来监听要刷新的页面
    */
    if (window.addEventListener) {
      window.addEventListener("storage", this.showStorage, false);
    } else {
      window.attachEvent("onstorage", this.showStorage);
    }
    let data = window.localStorage.getItem("SelectProducts");
    data && (this.listData = JSON.parse(data));

  },
  methods: {
    showStorage(e) {
      if (!e) {
        e = window.event;
      }
      if (e.key === "SelectProducts") {
        console.log(e.newValue + "----" + e.oldValue);
        e.newValue && (this.listData = JSON.parse(e.newValue))
      }
    },
    handleCopy(key) {
      const self = this;
      let obj = self.listData[key];
      let text = `${obj.dep.name}\n`;
      obj.prs.map(item => {
        text += `${item.name}:${item.content}${item.suffix}\n`
      });
      self.$refs.text.value = text;
      self.$refs.text.select(); // 选择对象 
      document.execCommand("Copy"); // 执行浏览器复制命令 
      self.$message({
        message: `${obj.dep.name}:复制成功`,
        type: 'success',
        duration: 1000
      });
    }
  }
}
</script>

<style>
</style>