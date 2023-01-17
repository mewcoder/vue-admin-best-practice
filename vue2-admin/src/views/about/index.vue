<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-row>
      <el-button type="primary" v-debounce="test">add</el-button>
      <el-button type="warning" v-permission="['admin', 'user']">
        edit
      </el-button>
      <el-button type="danger" v-permission="['admin']">del</el-button>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'About',
  data() {
    return {};
  },
  methods: {
    test() {
      console.log('test');
    }
  }
};
</script>
