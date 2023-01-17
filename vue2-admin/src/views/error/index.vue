<template>
  <h3>{{ errorText[$route.params.type] }}</h3>
</template>

<script>
export default {
  name: 'Error',
  data() {
    return {
      errorText: {
        403: '您无权访问该页面',
        404: '您访问的页面不存在',
        500: '服务器异常，请联系管理员'
      }
    };
  }
};
</script>
