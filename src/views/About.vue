<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
/**
 * 算法一步一步写，暂时就不考虑增加数组的方法了
 */
class Algorithm {
  array = []
  times = 0
  constructor (arr) {
    this.array = this.defineArray(arr)
  }
  /**
   * @param {[]} arr
   */
  defineArray (arr) {
    let classContext = this
    let result = new Proxy(arr, {
      // 暂时不考虑会调用数组函数的情况
      get (target, property) {
        classContext.render('get', property)
        return target[property]
      },
      set (target, property, value) {
        classContext.render('set', property, value)
        target[property] = value
      }
    })

    return result
  }
  /**
   * 渲染函数，实际上将真正的渲染函数放到队列里面按时执行
   */
  render (method, key) {
    setTimeout(() => {
      this.renderCharts(method, key)
    }, this.times * 1000)
    this.times += 1
  }
  /**
   * 真正的渲染函数
   */
  renderCharts (method, key) {
    console.log(this.array, method, key)
  }
}
window.a = new Algorithm([1, 2, 3])
export default {
  data () {
    return {

    }
  }
}
</script>
