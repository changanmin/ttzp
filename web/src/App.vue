<template>
  <div id="app" ref="ttzpHome">
    <!-- <div id="nav">
      <router-link to="/">首页</router-link>|
      <router-link to="/about">用户</router-link>|
      <router-link to="/product">产品</router-link>
    </div>-->
    <router-view />
  </div>
</template>
<script>
</script>
<style lang="scss">
body {
  // background-image: url(https://api.xygeng.cn/Bing);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  max-width: 100vw;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
