<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="keepAlivePages">
        <router-view class="Router"></router-view>
      </keep-alive>
    </transition>
    <div class="loading_page" v-show="loading">
      <img class="loading_page_img" src="./assets/Loading/0127de5b0fbf9fa8012043d8b0a74b.gif" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'app',
  data() {
    return {
      transitionName: 'slide-right',
      loading: false
    };
  },

  computed: {
    ...mapState({
      keepAlivePages: 'keepAlivePages',
      pageInit: 'pageInit',
      ajaxCount: 'ajaxCount'
    })
  },

  watch: {
    $route(to, from) {
      const isBack = this.$router.isBack;
      if (isBack) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
      this.$router.isBack = false;
    },

    ajaxCount(count) {
      if (count > 0 && this.pageInit && this.loading === false) {
        this.loading = true;
      }
      if (count === 0) {
        this.loading = false;
        this.$store.commit('UP_DatePageInit', false);
      }
    }
  },

  methods: {}
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.route {
  font-weight: bold;
  color: #2c3e50;
  display: block;
  padding: 30px;
}

.Router {
  position: absolute;
  width: 100%;
  transition: all 1s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}
.loading_page {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  .loading_page_img {
    width: 200px;
    height: 200px;
  }
}
</style>
