<template>
  <div style="display:flex;">
    <template v-for="(item, index) in listData">
      <el-card
        class="box-card"
        :key="index"
        :ref="`class_${item.id}`"
        style="width:280px;margin: 7px;"
      >
        <div slot="header" class="clearfix">
          <span>{{ item.name }}</span>
          <el-button
            style="float: right; padding: 3px 0"
            icon="el-icon-copy-document"
            type="text"
            @click="handleCopy(item.cid)"
            >复制</el-button
          >
        </div>
        <div v-for="(child, cindex) in item.list" :key="cindex" class="text item">
          {{ `${child.name}:${child.content}${child.suffix}` }}
        </div>
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
    };
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
    data && this.formatData(JSON.parse(data));
  },
  methods: {
    /**
     * 数据整理成需要的样式
     * 1.重复产品 采购数据 累加
     * 2.根据类别分类展示
     *
     */
    formatData(data) {
      //重复产品累加采购数量
      let gc = new Map();
      data.map(item => {
        let key = item.id;
        let p = item;
        if (gc.has(key)) {
          p = gc.get(key);
          p.content += +item.content;
        }
        gc.set(key, p);
      });
      let groupP = new Map();
      //按照类别分类 归纳
      for (let [key, value] of gc) {
        let cid = value.cid;
        if (groupP.has(cid)) {
          let list = groupP.get(cid);
          list.push(value);
          groupP.set(cid, list);
        } else {
          groupP.set(cid, [value]);
        }
      }
      let list = [];
      //转成对象解析
      for (let [key, value] of groupP) {
        let p = value.find(item => item.cName);
        list.push({
          name: p.cName,
          id: key,
          list: value
        });
      }
      console.log(list);
      this.listData = list;
    },
    showStorage(e) {
      if (!e) {
        e = window.event;
      }
      if (e.key === "SelectProducts") {
        console.log(e.newValue + "----" + e.oldValue);
        e.newValue && this.formatData(JSON.parse(e.newValue));
      }
    },
    handleCopy(key) {
      const self = this;
      let obj = self.listData.find(item => item.cid === key);
      let text = `\n`;

      obj.list.map(item => {
        text += `${item.name}:${item.content}${item.suffix}\n`;
      });
      self.$refs.text.value = text;
      self.$refs.text.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      self.$message({
        message: `${obj.name}:复制成功`,
        type: "success",
        duration: 1000
      });
    }
  }
};
</script>

<style></style>
