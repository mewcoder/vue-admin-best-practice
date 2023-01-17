<template>
  <div>
    <template v-for="item in data">
      <el-submenu
        v-if="item.children && item.children.length"
        :key="item.path"
        :index="item.path"
      >
        <template slot="title">{{ item.meta.title }}</template>
        <ASideItem :data="item.children" />
      </el-submenu>

      <el-menu-item :key="item.path" :index="item.path">
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ASideItem',
  props: {
    data: Array,
    default: () => []
  }
};
</script>
