import Vue from 'vue';
// 从@/components/home目录下加载所有.index.js的文件
const files = require.context('@/components/', true, /.index.js$/);
const components = files.keys().map(key => files(key).default);

components.map(c => {
  c.install && c.install(Vue);
});
