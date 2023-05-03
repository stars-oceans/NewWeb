import { createStore } from 'vuex';
import createPersistedstate from 'vuex-persistedstate';
export default createStore({
  state: {
    NewsList : []
  },
  getters: {
  },
  mutations: {
    uploadNewList(state, value){
        state.NewsList = value
    }
  },
  actions: {
  },
  modules: {
  },
 // 持久化
 plugins:[createPersistedstate({
  // 这里就是 放置持久化的地方
  paths : ['NewsList']
})],

})
