import { createStore } from 'vuex'
import ModuleUser from './user'
import ModuleProduct from './product'
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: ModuleUser,
    product: ModuleProduct
  }
})
