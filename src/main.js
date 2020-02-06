import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'amfe-flexible';

import AlloyFinger from 'alloyfinger';
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger_vue';

import { PasswordInput, NumberKeyboard } from 'vant';
import { Button, Field } from 'vant';
import { Cell, CellGroup } from 'vant';
Vue.use(Button);
Vue.use(Field);
Vue.use(PasswordInput).use(NumberKeyboard);
Vue.use(Cell).use(CellGroup);

Vue.use(AlloyFingerPlugin, {
  AlloyFinger
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'my-menu';
  }
  next();
});

window.addEventListener('popstate', function(e) {
  router.isBack = true;
});

router.beforeEach((to, from, next) => {
  const isBack = router.isBack;
  const arr = store.state.keepAlivePages.slice();
  if (isBack) {
    const index = arr.indexOf(from.name);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  } else {
    const index = arr.indexOf(from.name);
    if (index === -1) {
      arr.push(from.name);
    }
    const indexTo = arr.indexOf(to.name);
    if (indexTo === -1) {
      arr.push(to.name);
    }
  }
  store.commit('SET_KEEPALIVEPAGES', arr);
  next();
});

router.afterEach((to, from) => {
  store.commit('UP_DatePageInit', true);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
