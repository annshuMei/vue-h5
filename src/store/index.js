import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/Users';
import messages from './modules/Messages';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    count: 1,
    // 功能数据 不建议删除
    keepAlivePages: ['home'],
    pageInit: false,
    ajaxCount: 0
    //
  },

  mutations: {
    // 功能函数 不建议删除
    SET_KEEPALIVEPAGES(state, arr) {
      state.keepAlivePages = arr;
    },
    UP_DatePageInit(state, pageInit) {
      state.pageInit = pageInit;
    },
    UP_DateAjaxCount(state, count) {
      state.ajaxCount = state.ajaxCount + count;
    }
    //
  },

  modules: {
    users,
    messages
  },

  strict: debug
});
