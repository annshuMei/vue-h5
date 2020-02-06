// 应用 相关路由规则
const _import_ = (file) => () => import(`@/views/${file}.vue`);

export default [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'home'
    },
    component: _import_('Home')
  }
];
