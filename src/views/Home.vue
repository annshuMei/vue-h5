<template>
  <div class="home">
    <div class="route" v-finger:tap="handlerToAbout">About</div>

    <div class="songlist_row_s" v-finger:swipe="swipeHandler">
      你可以滑动改变数字
    </div>
    <div>{{ storeNumber }}</div>

    <van-cell-group>
      <van-field v-model="value" placeholder="请输入" />
    </van-cell-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'home',

  data() {
    return {
      value: ''
    };
  },

  computed: {
    storeNumber() {
      return this.$store.state.users.count;
    }
  },

  methods: {
    ...mapActions(['incrementIfOddOnRootSum']),

    swipeHandler(e) {
      this.incrementIfOddOnRootSum();
    },

    handlerToAbout(e) {
      this.$router.push('/about');
    }
  }
};
</script>

<style lang="scss" scoped>
.songlist_row_s {
  width: 375px;
  height: 350px;
  background-color: red;
}
</style>
