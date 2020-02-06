// 个人中心 相关路由规则
const _import_ = (file) => () => import(`@/views/${file}.vue`);

export default [
  {
    path: '/about',
    name: 'about',
    meta: {
      title: '个人中心'
    },
    component: _import_('About')
  }
];
