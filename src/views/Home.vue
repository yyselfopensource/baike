<template>
  <div class="home">
    主页
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/functions.scss';

.home {
  .swipe-img-container {
    height: rrem(488px);
  }
  .tabs-container {
    padding-right: rrem(120px);
    @media screen and(min-width: 375px){
      padding-right: rrem(230px);
    }
    /deep/ .van-tab--active {
      font-size: 16px;
    }
  }
}
</style>
