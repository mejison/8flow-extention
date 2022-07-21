import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import * as modules from './modules'
console.log(modules)
export default new Vuex.Store({
    modules,
})
