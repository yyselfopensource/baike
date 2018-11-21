<template>
  <div class="home">
    <div class="doudou-loading-wrapper">
      <div class="mouth">
        <div class="doudou-loading-semi-circle top">
          <div></div>
        </div>
        <div class="doudou-loading-semi-circle bottom">
          <div></div>
        </div>
      </div>
      <ul class="dots-container flex flex-between-center">
        <li
          v-for="index in 8"
          class="dot"
          :key="index">
        </li>
      </ul>
    </div>
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
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/functions.scss';

</style>
