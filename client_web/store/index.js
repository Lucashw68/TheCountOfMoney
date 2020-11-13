import Vuex from 'vuex'

import modules from './modules'

const createStore = () => {
  return new Vuex.Store({
    strict: false,
    modules,
  })
}

export default createStore
