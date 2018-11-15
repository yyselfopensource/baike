import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/IfQZxr0aE5JbqBRBNryqdLGUL1Gpbs1muAG3mfNgibMteALxicFvLqQxsrhFSvZGQJjpHibx305yB1NVmuQHDHs7A/132',
      created_at: '2018-11-09 09:38:15',
      deleted_at: null,
      id: 1,
      integral: 0,
      name: '哎哟小白兔',
      open_id: 'og1Vb0_paT9gWkaJdPBIEFg-MGls',
      referee: '21232f297',
      referral_code: 'RMhYXoTQ',
      tel: '0',
      updated_at: '2018-11-09 09:38:15'
    }
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo = payload
    }
  },
  actions: {

  }
})
