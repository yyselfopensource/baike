<template>
  <van-pull-refresh
    v-model="refreshIng"
    loading-text="正在刷新"
    @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      :offset="100"
      :immediate-check="immediateCheck"
      @load="onLoad"
    >
      <slot :list="list"></slot>
      <slot v-if="(list.length === 0) && (!loading || !immediateCheck)" name="empty">
        <div class="default-empty-data">
          <img :src="icons.emptyData" alt="">
        </div>
      </slot>
      <slot v-if="finished && (list.length > 0) && !refreshIng" name="finished">
        <p class="finished">加载完成，没有更多数据</p>
      </slot>
      <div
        v-show="immediateCheck"
        slot="loading"
        class="van-list__loading"><div class="van-loading van-loading--circular van-loading" style="color: rgb(201, 201, 201);"><span class="van-loading__spinner van-loading__spinner--circular"><svg viewBox="25 25 50 50" class="van-loading__circular"><circle cx="50" cy="50" r="20" fill="none"></circle></svg></span></div><span class="van-list__loading-text">加载中...</span></div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import emptyData from '../assets/empty-data.png'

export default {
  props: {
    dataUrl: String,
    formatMethod: {
      type: Function,
      default: a => a
    }
  },
  data () {
    return {
      icons: {
        emptyData
      },
      // 正在刷新
      refreshIng: false,
      // 下拉加载中
      loading: false,
      // 加载完成，没有更多数据
      finished: false,
      list: [],
      requestIng: false,
      // 立即检查加载
      immediateCheck: true
    }
  },
  methods: {
    async onRefresh () {
      await this.loadMore()
      this.refreshIng = false
    },
    async onLoad () {
      if (!this.immediateCheck) {
        return
      }
      await this.loadMore()
      this.loading = false
    },
    async loadMore () {
      if (this.requestIng) {
        return
      }
      this.requestIng = true
      let list = await this.$http.get(`${this.copmutedDataUrl}&start=${this.list.length}`).catch((msg) => {
        this.$toast('加载失败，请重试')
        this.immediateCheck = false
      })
      this.requestIng = false
      if (!list) {
        return
      }
      list = (list.data ? list.data : list).map(this.formatMethod)
      if (list.length > 0) {
        if (this.refreshIng) {
          this.list = list
          this.finished = false
          this.$toast('刷新成功')
        } else {
          this.list = this.list.concat(list)
        }
      } else {
        this.finished = true
      }
    },
    initStatus (clearList) {
      this.refreshIng = false
      this.loading = false
      this.finished = false
      this.immediateCheck = true
      if (clearList) {
        this.list = []
      }
    }
  },
  watch: {
    dataUrl () {
      this.initStatus(true)
      this.loading = true
      this.onLoad()
    }
  },
  computed: {
    copmutedDataUrl () {
      return this.dataUrl.includes('?') ? this.dataUrl : `${this.dataUrl}?`
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  }
}
</script>

<style lang="scss">
@import 'src/styles/functions.scss';
@import 'src/styles/variables.scss';

.default-empty-data {
  margin:0 auto;
  width: rrem(351px);
  height: rrem(363px);
  transform: translateY(#{rrem(400px)})
}
.finished {
  color: $bottom-mark-color;
}
</style>
