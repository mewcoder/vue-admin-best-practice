// 都挂在home路由下面
export default [
  {
    path: '/about',
    name: 'About',
    component: 'about/index',
    meta: { title: '详情', code: '001' }
  },
  {
    path: '/list',
    name: 'List',
    component: 'list/index',
    meta: { title: '虚拟列表', code: '002' }
  },
  {
    path: '/form',
    name: 'Form',
    component: 'form/index',
    meta: { title: '表单', code: '003' }
  },
  {
    path: '/upload',
    name: 'Upload',
    component: 'upload/index',
    meta: { title: '上传', code: '004' }
  },
  {
    path: '/real-time',
    name: 'RealTime',
    component: 'real-time/index',
    meta: { title: '实时地图', code: '005' }
  }
];
