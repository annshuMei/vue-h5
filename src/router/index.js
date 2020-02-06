import Vue from 'vue';
import VueRouter from 'vue-router';

import lication from './routers/lication';
import person from './routers/person';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [...lication, ...person]
});

export default router;
