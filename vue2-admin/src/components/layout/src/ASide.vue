<template>
  <el-aside width="200px">
    <el-menu
      router
      unique-opened
      background-color="#373737"
      text-color="#fff"
      active-text-color="#2080F7"
      :default-active="$route.path"
    >
      <ASideItem :data="menuList" />
    </el-menu>
    <el-button class="logout" type="text" @click="logout">退出</el-button>
  </el-aside>
</template>
<script>
import { getCodes, clearUser } from '@/utils/auth';
export default {
  name: 'ASide',
  data() {
    return {
      menuList: []
    };
  },
  mounted() {
    this.filterMenu();
  },
  methods: {
    filterMenu() {
      console.log('init menus...');
      const codes = getCodes();
      const home = this.$router.options.routes.find(item => item.path === '/');
      this.menuList = home.children.filter(child => {
        return codes.includes(child.meta.code);
      });
    },
    logout() {
      clearUser();
      this.$message.success('退出成功');
      this.$router.replace({ path: '/login' });
      // location.reload(); // = F5
    }
  }
};
</script>
<style lang="scss" scoped>
.el-menu {
  height: 100%;
}
.logout {
  position: fixed;
  bottom: 5px;
  left: 20px;
}
</style>
