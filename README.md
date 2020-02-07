# hello-world

## 开始

```
npm install
```

### 用于开发的编译

```
npm run serve
```

### 为生产而编译和缩小

```
npm run build
```

### 链接和修复文件

```
npm run lint
```

### 自定义配置

See [Configuration Reference](https://cli.vuejs.org/config/).

# 使用插件(开发期望)

- vue
- vue-router
- vuex
- sass
- eslint
- prettier
- axios
- alloyfinger
- postcss-pxtorem

## 我们推荐使用 vsCode 工具处理编程风格统一

- 推荐格式化 vsCode 插件
  - ESLint
  - Psth Intellisense

## 我们推荐使用 alloyfinger 事件响应

- v-finger:tap：点击事件
- v-finger:singleTap：单击事件，和 tap 的区别是相差 250ms
- v-finger:longTap：长按事件，当点击时长超过 750ms 时候触发
- v-finger:doubleTap：双击事件
- v-finger:pressMove：拖拽移动事件
- v-finger:multipointStart：多点触控事件开始事件
- v-finger:multipointEnd：多点触控事件结束事件
- v-finger:swipe：滑动事件
- v-finger:rotate：旋转事件
- v-finger:pinch：缩放事件

## postcss-pxtorem 适应配置

- 默认设计稿大小 375px
- 你可以在项目中 css 或 style 中使用 px 应用将自行转换 rem 来做到适配
- 但是我们并不推荐使用 375px 以上尺寸

- 在 utils/rem/index.js 文件中我们将 amfe-flexible 提供源码复制出来并做修改
  > 你将发现如果屏幕大于 540px 时 375px 不再是一屏的宽度，这是我们为了做到 Pad 视觉适配所做调整。不让 html 根 fontSize 大于 54 是为了在大屏时也能正常显示。在开发当中我们推荐使用 100%
  ```
  if (rem >= 54) {
    docEl.style.fontSize = `${54}px`;
  } else {
    docEl.style.fontSize = `${rem}px`;
  }
  ```
-

## vueRouter 文本

- 我们默认路由模式为 hash 若需使用 history 模式请移步 [HTML5 History 模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html)

- 我们推荐你的 router 只做页面导航

  > 若需要镶嵌组件时应该先考虑是否需要根据不同状态改变
  > 我们更推荐你的组件是在页面引用

- 如果你想同时在同级展示多个试图 而不是镶嵌展示 我们推荐使用 router 的命名视图
- 我们建议你的路由模块根据 Navicat 底部模块导航来组织他们更容易理解。例如：
  > Lication: 应用
  > Person: 个人中心
- 我们更推荐你的组件加载方式是懒加载 由此提高应用性能
- 你的 title 是动态改变 你可以在配置路由中添加 meta.title 动态你想要的 title
  >
- 更多介绍 请移步 官网文档 [Vue Router](https://router.vuejs.org/zh/guide/#html)
- 我们更推荐路由组件传参使用 route props 来提高你的组件解耦 示例 1

```示例1
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}

{ path: '/user/:id', component: User, props: true }
```

## Vuex 文本

![Vuex图片](https://vuex.vuejs.org/vuex.png)

- 在使用 Vuex 时应该遵守官网认可模式进行调用，及如图所示
- 由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态

```示例
computed: {
    count () {
      return this.$store.state.count
    }
}
```

- 我们希望你的异步操作都进行在 Actions 中 请记住 mutation 必须同步执行的限制
- 我们默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的
- 若希望你的模块具有更高的封装度 请移步 [Module 命名空间](https://vuex.vuejs.org/zh/guide/modules.html)
- 我们默认开发环境中开启 Vuex 严格模式
- 我们建议你的模块根据 API 获取的数据模型来组织他们更容易理解。例如：
  > Users:用户
  > Messages:通讯
- 如需使用大型 module 模块用法 可参考[vuex 的 module 模块用法](https://www.jianshu.com/p/6b9578831d3e)

## axios 及 api 封装

- 请求拦截器
  > 我们推荐将登录 token 的传输封装在请求拦截器中 我们默认未做拦截请求，若你需要用到请求拦截添加 token 请移步 [headers.Authorization](https://segmentfault.com/q/1010000012364132)
  > 我们建议你在开始项目之前调制好你的对接 这对你来说很重要
- 响应拦截器
  > 我们根据网上模板为你配置了响应拦截器，但考虑到不同的开发团队有不同的 Promise 所以我们建议你在开始项目之前调制好你的对接
  > 这对你来说很重要
- 我们默认封装了 get post 方法 若需要更多方法请移步 http.js 文件
- 我们希望你能够将你所有的接口都定义在 API 文件当中 并做好 模块 与 备注

## 选用 VantUI 做为帮助开发组件 (可以根据项目选择自己的 UI 组件)

```示例
import { Button } from 'vant';
```

- 我们推荐使用以上方式加载所需要的组件
- 如需定制主题请移步 [定制主题](https://youzan.github.io/vant/#/zh-CN/theme)
- 我们默认使用 Vant 底部安全区适配来适配 iPhone X 等机型底部存在的指示条 使用如下

```示例
<!-- 开启 safe-area-inset-bottom 属性 -->
<van-number-keyboard safe-area-inset-bottom />
```

![Vant适配X图](https://b.yzcdn.cn/vant/safearea.png)

## 路由切换动画 + keep alive 动态管理缓存

- 我们默认动画为 slide-left slide-right 如需自定义页面动画请移步 App.vue
- keepAlivePages 用于保存缓存的组件 我们 push 保存 home 组件并 pop 删除 about 组件
  > 你可以很好的体验 home 与 about 的输入框的不同
- 我们使用 provide/inject 来进行页面刷新 如需了解详情请移步 About.vue

## 遗留问题

- 我们更推荐使用 swiper 它能帮你完成更高体验的应用
- 我们希望你的所有图片都是通过懒加载的方式 来优化项目 如需使用 Vant 懒加载请移步[图片懒加载](https://youzan.github.io/vant/#/zh-CN/lazyload)
- 为了保留功能 请在初始化项目时谨慎删除不需要的代码

## 待优化

- 页面布局使用填充方案
- swiper 动态导航 二级镶嵌

# 我们使用的 vsCode 插件如下

- Auto Rename Tag
- ESLint
- Git History
- Path Intellisense
- Prettier - Code formatter
- Sass
- Vetur
