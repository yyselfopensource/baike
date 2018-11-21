<template>
  <div
    v-if="showApp"
    id="app">
    <van-tabs
      v-model="activeTab">
      <van-tab
        v-for="tab in tabs"
        :key="tab.title"
        :title="tab.title">
      </van-tab>
    </van-tabs>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { menus } from './router'
export default {
  components: {
  },
  data () {
    return {
      showApp: false,
      activeTab: 0,
      tabs: menus
    }
  },
  methods: {
    ...mapMutations([
      'setUserInfo'
    ]),
    login () {
      let userInfo = this.$route.query
      this.setUserInfo(userInfo)
      this.showApp = true
    }
  },
  computed: {
    hideTabbar () {
      return ![
        '/',
        '/me',
        '/follow'
      ].includes(this.$route.path)
    }
  },
  created () {
    this.login()
  },
  watch: {
    activeTab (newTab) {
      this.$router.push(this.tabs[newTab])
    }
  },
  mounted () {
    window.keepScroll = {
      scrollElements: {},
      scrollTops: {}
    }
    let fn = (e) => {
      window.keepScroll.scrollElements[this.$route.path] = e.target
    }
    window.addEventListener('scroll', fn, true)
  }
}
</script>

<style lang="scss">
$bottom-height: 50px;
#app {
  position: relative;
  // padding-bottom: $bottom-height;
  height: 100vh;
  widows: 100vw;
  overflow: auto;
  font-family: 'PingFangSC-Medium', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  &.hide-tabbar {
    padding-bottom: 0;
    .my-tabbar {
      display: none;
    }
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
