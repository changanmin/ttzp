<template>
  <div class="home">
    <el-alert title type="info" :closable="false" effect="dark"></el-alert>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="热菜" name="first"></el-tab-pane>
      <el-tab-pane label="面点" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    // HelloWorld,
  },
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }

};
</script>
