import Vue from 'vue'
function showLoading(msg: string) {

}
declare module 'vue/types/vue' {
  interface Vue {
    /**
     * 展示loading
     */
    $showLoading: function
    /**
     * 隐藏loading
     */
    $hideLoading: function
  }
}