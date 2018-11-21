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
  name: 'chapter1',
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

$loading-mouth-width: rrem(120px);
$loading-mouth-bgcolor: #f55;
$semi-circle-child-class: 'div';

@keyframes semi-circle-rotate-top {
  0% {
    transform: rotate(-45deg);
  }
  50% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(-45deg);
  }
}
@keyframes semi-circle-rotate-bottom {
  0% {
    transform: rotate(45deg);
  }
  50% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(45deg);
  }
}
@keyframes mouth-move {
  0% {
    transform: translateX(0);
  }
  // 95% {
  //   transform: translateX(calc(100% - #{$loading-mouth-width}));
  // }
  100% {
    transform: translateX(100%);
  }
}
@keyframes dots-move {
  0% {
    clip: rect(0 100vw 100px 0);
  }
  100% {
    clip: rect(0 100vw 100px 100vw);
  }
}
$animation-once-time: 5.6s;
.home {
  .doudou-loading-wrapper {
    position: relative;
    margin-top: 100px;
  }
  .mouth {
    animation: mouth-move $animation-once-time infinite linear; // cubic-bezier(.61,.62,1,.89);
  }
  .doudou-loading-semi-circle {
    $animation-time: .8s;
    @include semi-circle($loading-mouth-width, $semi-circle-child-class);
    >#{$semi-circle-child-class} {
      background-color: $loading-mouth-bgcolor;
    }
    &.top {
      transform-origin: 50% 100%;
      transform: rotate(-45deg);
      animation: semi-circle-rotate-top $animation-time infinite;
    }
    &.bottom {
      >#{$semi-circle-child-class} {
        transform: translateY(-50%);
      }
      transform-origin: 50% 0;
      transform: rotate(45deg);
      animation: semi-circle-rotate-bottom $animation-time infinite;
    }
  }
}
.dots-container {
  position: absolute;
  top: 45%;
  // transform: translateY(-50%);
  width: 100%;
  animation: dots-move $animation-once-time infinite linear;
  .dot {
    @include circle(rrem(20px));
    background-color: #f55;
    // @for $i from 1 through 8 {
    //   &:nth-child(#{$i}) {

    //   }
    // }
  }
}
</style>
