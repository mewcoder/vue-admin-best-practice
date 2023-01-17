<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {};
  }
};
</script>
<style lang="scss">
body {
  margin: 0;
}
#app {
  height: 100vh;
}
</style>
