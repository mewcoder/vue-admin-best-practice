<template>
  <el-container>
    <ASide />
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.el-container {
  height: 100vh;
}
.el-menu {
  height: 100%;
}
</style>
